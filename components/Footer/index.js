import { GoBug } from "react-icons/go";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        © LabGoals 2023 
      </div>

      <a
        href="https://github.com/ianaverno/smart-goals-app/issues/new"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>report a</span> <GoBug/>
      </a>
    </footer>
  )
}
