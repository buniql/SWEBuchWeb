import styles from "./page.module.css";
import ResponsiveAppBar from "./view_model/ResponsiveAppBar";
import SearchBoxWithMediaCards from "./view_model/SearchBoxWithMediaCards";

export default function Home({ data }: any) {
  console.log(data);
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
