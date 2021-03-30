import React from "react";

import styles from "./styles.module.scss";

interface SubscriveButtonProps {
  priceId: string;
}

export const SubscriveButton = ({ priceId }: SubscriveButtonProps) => {
  return (
    <button type="button" className={styles.subscriveButton}>
      Subscribe now
    </button>
  );
};
