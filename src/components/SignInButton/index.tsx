import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, useSession, signOut } from "next-auth/client";

import styles from "./styles.module.scss";

export const SignInButton: React.FC = () => {
  const [session] = useSession();

  return session ? (
    <button onClick={() => signOut()} className={styles.signInButton}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button onClick={() => signIn("github")} className={styles.signInButton}>
      <FaGithub color="#eba417" />
      SignIn with Github
    </button>
  );
};
