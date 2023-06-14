"use client";
import styles from "../page.module.css";
import ResponsiveAppBar from "../view_model/ResponsiveAppBar";
import { useState } from "react";
import SearchBoxWithMediaCards from "../view_model/SearchBoxWithMediaCards";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <ResponsiveAppBar />
      </div>

      <div className={styles.main}>
        <SearchBoxWithMediaCards />
      </div>
    </main>
  );
}
