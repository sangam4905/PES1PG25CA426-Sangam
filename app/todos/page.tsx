import TodoApp from "./TodoApp";
import styles from "./todo.module.css";

export default function TodosPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.brand}>
            <span className={styles.brandIcon} aria-hidden="true" />
            <span>Tasklist</span>
          </div>
          <span className={styles.course}>PES University · MCA</span>
        </div>
      </header>

      <main className={styles.main}>
        <TodoApp />

        <footer className={styles.footer}>
          <span>Sangam B R · PES1PG25CA426</span>
          <span>WAF-II · Unit 4</span>
        </footer>
      </main>
    </div>
  );
}
