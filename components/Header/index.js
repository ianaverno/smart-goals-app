import { TiDelete } from "react-icons/ti";
import styles from './Header.module.scss';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
  const dispatch = useDispatch;


  const handleClick = () => {

  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <strong>Lab</strong>Goals
        <sub>alpha</sub>
      </div>

      <div className={styles.cta}>
        <button onClick={handleClick}>
          <TiDelete size={48}/>
        </button>
      </div>

      <div className={styles.links}>
        links
      </div>
    </header>
  )
}
