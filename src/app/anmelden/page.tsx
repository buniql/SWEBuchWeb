"use client";
import styles from "../page.module.css";
import LoginForm from "../view_model/LoginForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
