import { getDictionary } from "@/app/[lang]/dictionaries";
import styles from "./page.module.css";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;

  const dict = await getDictionary(lang)

  return (
    <div className={styles.page}>
      <h1>{dict.title}</h1>
    </div>
  );
}
