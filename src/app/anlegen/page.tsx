"use client";
import styles from "../page.module.css";
import LoginForm from "../view_model/LoginForm";
import { hasCookie } from "cookies-next";

export default function Home() {
  if (hasCookie("auth")) {
    window.location.href = "/create";
    return;
  }
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
