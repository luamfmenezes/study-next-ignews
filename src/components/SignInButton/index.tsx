import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export const SignInButton: React.FC = () => {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button className={styles.signInButton}>
      <FaGithub color="#04d361" />
      SignIn with Github
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.signInButton}>
      <FaGithub color="#eba417" />
      SignIn with Github
    </button>
  );
};
