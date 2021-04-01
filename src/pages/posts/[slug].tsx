import { formatRelative } from "date-fns";
import gql from "graphql-tag";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { RichText } from "prismic-dom";
import React from "react";
import { prismicGraphql } from "../../services/prismic-graphql";
import styles from "./post.module.scss";

interface Post {
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  dateRelative: string;
}

interface PostPros {
  post: Post;
}
const Post: React.FC<PostPros> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.dateRelative}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  const session: any = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/preview/${slug}`,
        permanent: false,
      },
    };
  }

  const query = gql`
    query getPost($uid: String!) {
      allPosts(uid: $uid) {
        edges {
          node {
            _meta {
              uid
              id
              lastPublicationDate
            }
            title
            content
            thumbnail
          }
        }
      }
    }
  `;

  const response = await prismicGraphql.query({
    query,
    variables: {
      uid: slug,
    },
  });

  const el = response.data.allPosts.edges[0];

  const post: Post = {
    title: RichText.asText(el.node.title),
    slug: el.node._meta.uid,
    content: RichText.asHtml(el.node.content),
    imageUrl: el.node.thumbnail.url,
    dateRelative: formatRelative(
      new Date(el.node._meta.lastPublicationDate),
      new Date()
    ),
  };

  return {
    props: {
      post,
    },
  };
};

export default Post;
