import styles from "./styles.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <LoginModal />
    </main>
  );
}

function LoginModal() {
  return (
    <div className={styles.modalCard}>
      
    </div>
  );
}
