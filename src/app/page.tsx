import styles from './page.module.css';
import Bar from '@/components/bar/Bar';
import Nav from '@/components/nav/Nav';
import CenterBlock from '@/components/centerblock/Centerblock';
import Sidebar from '@/components/sidebar/Sidebar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <CenterBlock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
