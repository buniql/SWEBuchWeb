"use client";
import styles from "../page.module.css";
import { useState } from "react";
import SignIn from "../view_model/SignIn";

export default function Home() {
  const initPage = (
    <main className={styles.main}>
      <SignIn />
    </main>
  );

  const [loggedIn, logIn] = useState<boolean>(false);

  const [content, setContent] = useState<any>(initPage);
  return content;
}
