import React, { useEffect, useMemo, useRef, useState } from "react";
import { SignInButton } from "../SignInButton";
import Link from "next/link";

import styles from "./styles.module.scss";
import { useRouter } from "next/dist/client/router";

const menuOrder = [
  {
    title: "Home",
    path: "/",
    prefetch: true,
  },
  {
    title: "Posts",
    path: "/posts",
    prefetch: true,
  },
];

export const Header: React.FC = () => {
  const { asPath } = useRouter();
  const navRef = useRef(null);
  const [widths, setWidths] = useState<number[]>([]);
  const selectedIndex = menuOrder.findIndex((el) => el.path === asPath);

  useEffect(() => {
    let array = [].slice.call(navRef.current.children);
    setWidths(array.map((el) => el.offsetWidth));
  }, []);

  const barWidth = useMemo(() => widths[selectedIndex] ?? 0, [
    widths,
    selectedIndex,
  ]);

  const barOffset = useMemo(
    () =>
      widths
        .slice(0, selectedIndex)
        .reduce((storage, current) => storage + current + 32, 0),
    [widths, selectedIndex]
  );

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="images/logo.svg" alt="logo" />
        <nav ref={navRef}>
          {menuOrder.map((menuItem, index) => (
            <Link href={menuItem.path}>
              <a className={index === selectedIndex && styles.active}>
                {menuItem.title}
              </a>
            </Link>
          ))}

          <div style={{ width: barWidth, left: barOffset }} />
        </nav>
        <SignInButton />
      </div>
    </div>
  );
};
