import Head from "next/head";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome</span>
          <h1>
            News about the <span>Next</span> world.
          </h1>
          <p>
            Get access to all the publication <br />
            <span>for $9.99 month</span>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </div>
  );
}
