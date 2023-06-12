import Image from "next/image";
import styles from "./page.module.css";
import SearchBoxWithDataTable from "./view_model/SearchBoxWithDataTable";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

export default function Home({ data }: any) {
  console.log(data);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <ResponsiveAppBar />
      </div>

      <div className={styles.main}>
        <SearchBoxWithDataTable />
      </div>
    </main>
  );
}
