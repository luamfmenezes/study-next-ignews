import { formatRelative } from "date-fns";
import gql from "graphql-tag";
import { GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";
import React, { useEffect } from "react";
import { prismicGraphql } from "../../services/prismic-graphql";
import styles from "./preview.module.scss";

interface Post {
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  dateRelative: string;
}

interface PostPreviewPros {
  post: Post;
}
const PostPreview: React.FC<PostPreviewPros> = ({ post }) => {
  const session: any = useSession()[0];
  const { push } = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      push(`/posts/${post.slug}`);
    }
  }, [session]);

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
          <div className={styles.continueReading}>
            <Link href="/">
              <>
                Whanna continue reading ?<a>Subscribe now 🤗</a>
              </>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

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
    content: RichText.asHtml(el.node.content.splice(0, 3)),
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
    revalidate: 60 * 60 * 24,
  };
};

export default PostPreview;
