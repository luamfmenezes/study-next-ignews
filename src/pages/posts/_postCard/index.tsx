import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

import styles from "./styles.module.scss";

interface PostCardProps {
  post: {
    slug: string;
    imageUrl: string;
    dateRelative: string;
    title: string;
    excerpt: string;
  };
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const containerRef = useRef(null);
  const [opened, setOpened] = useState(false);

  const style = useMemo(() => {
    if (!containerRef?.current) {
      return {};
    }

    const { x } = containerRef.current.getBoundingClientRect();

    if (opened) {
      return { left: -x + 80 };
    }
    return {};
  }, [containerRef, opened]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpened(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={styles.container}
      onClick={() => setOpened(true)}
      onBlur={() => setOpened(false)}
      ref={containerRef}
    >
      <div
        className={`${styles.content} ${opened && styles.opened}`}
        style={style}
      >
        <img src={post.imageUrl} alt={post.slug} />
        <div>
          <time>{post.dateRelative}</time>
          <strong>{post.title}</strong>
          <p>{post.excerpt}</p>
          <Link href={`/posts/${post.slug}`}>
            <button>Read more 📚</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
