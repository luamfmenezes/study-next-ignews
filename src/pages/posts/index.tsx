import Head from "next/head";
import React from "react";

import styles from "./styles.module.scss";

const Posts: React.FC = () => {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>12 asdhjask</time>
            <strong>Title of the post</strong>
            <p>Ina diasohdj adsklhjdaskd klashdjklashjdklajsdkljskl</p>
          </a>
        </div>
      </main>
    </>
  );
};

export default Posts;
