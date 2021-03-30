import React from "react";

import styles from "./styles.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="images/logo.svg" alt="logo" />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
      </div>
    </div>
  );
};
