"use client";
import styles from "../page.module.css";
import SearchBoxWithDataTable from "../view_model/SearchBoxWithDataTable";
import ResponsiveAppBar from "../view_model/ResponsiveAppBar";
import { useState } from "react";

export default function Home() {
  const initPage = (
    <main className={styles.main}>
      <div className={styles.description}>
        <ResponsiveAppBar />
      </div>

      <div className={styles.main}>
        <SearchBoxWithDataTable />
      </div>
    </main>
  );

  const [loggedIn, logIn] = useState<boolean>(false);

  const [content, setContent] = useState<any>(initPage);
  return content;
}