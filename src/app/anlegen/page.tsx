"use client";
import styles from "../page.module.css";
import { hasCookie } from "cookies-next";
import ResponsiveAppBar from "../view_model/ResponsiveAppBar";
import CreateBuch from "../view_model/CreateBuch";

export default function Home() {
  if (!hasCookie("auth")) {
    window.location.href = "/anmelden";
    return;
  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <ResponsiveAppBar />
      </div>

      <div className={styles.main}>
        <CreateBuch />
      </div>
    </main>
  );
}
