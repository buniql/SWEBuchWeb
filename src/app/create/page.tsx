"use client";
import styles from "../page.module.css";
import ResponsiveAppBar from "../view_model/ResponsiveAppBar";
import { useState } from "react";
import CreateBuch from "../view_model/CreateBuch";

export default function Home() {
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
