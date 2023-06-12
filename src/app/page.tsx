import Image from "next/image";
import styles from "./page.module.css";
import SearchBoxWithDataTable from "./components/searchQuery";
import MediaCard from "./components/MediaCard";

export default function Home({ data }: any) {
  console.log(data);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/buchweblogo.png"
            alt="buchweblogo"
            className={styles.vercelLogo}
            width={128}
            height={128}
            priority
          />
        </a>
      </div>

      <div className={styles.left}>
        <SearchBoxWithDataTable />
      </div>
    </main>
  );
}
