import Map from './_components/map';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Map />
    </main>
  );
}
