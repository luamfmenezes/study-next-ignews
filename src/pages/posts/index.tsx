import gql from "graphql-tag";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { prismicGraphql } from "../../services/prismic-graphql";
import { RichText } from "prismic-dom";
import { formatRelative } from "date-fns";

import styles from "./styles.module.scss";

interface Post {
  title: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
  dateRelative: string;
}

interface PostsPros {
  posts: Post[];
}

const Posts: React.FC<PostsPros> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <a key={post.slug}>
              <time>{post.dateRelative}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await prismicGraphql.query({
    query: gql`
      query {
        allPosts {
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
    `,
  });

  const posts = response.data.allPosts.edges.map((el) => {
    const post: Post = {
      title: RichText.asText(el.node.title),
      slug: el.node._meta.uid,
      excerpt:
        el.node.content.find((content) => content.type === "paragraph")?.text ??
        "",
      imageUrl: el.node.thumbnail.url,
      dateRelative: formatRelative(
        new Date(el.node._meta.lastPublicationDate),
        new Date()
      ),
    };
    return post;
  });

  return {
    props: { posts },
  };
};

export default Posts;
