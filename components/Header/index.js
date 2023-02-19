import styles from './Header.module.css';
import { FaBeer } from 'react-icons/fa';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <strong>Lab</strong>Goals
        <sub>alpha</sub>
      </div>
    </header>
  )
}
