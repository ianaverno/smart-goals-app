import { useSelector, useDispatch } from 'react-redux';
import { toggleForm } from '../../features/Goals/goalsSlice';
import AddGoal from "../../features/Goals/AddGoal";
import { TiDelete, TiSocialGithub } from 'react-icons/ti';
import styles from './Header.module.scss';


export default function Header() {
  const dispatch = useDispatch();
  const showForm = useSelector((state) => state.goals.form);
  const status = useSelector((state) => state.goals.status);

  const handleClick = () => {
    dispatch(toggleForm());
  };

  const headerState = showForm ? styles.form : styles.idle;
  const buttonState = status == 'loaded' ? null : styles.hidden;
  
  const formNode = showForm ? <AddGoal /> : null;

  return (
    <header className={`${styles.header} ${headerState}`}>
      <div className={styles.topbar}>
        <div className={styles.logo}>
          <strong>Lab</strong><span>Goal</span>s
          <sub>alpha</sub>
        </div>

        <div className={styles.cta}>
          <button className={buttonState} onClick={handleClick}>
            <TiDelete size={48}/>
          </button>
        </div>

        <div className={styles.links}>
          <div className={styles.git}>
            <a
              href="https://github.com/ianaverno/smart-goals-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>frontend</span>
            </a>
            
            <TiSocialGithub />

            <a
              href="https://github.com/ianaverno/smart-goal-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>backend</span>
            </a>
          </div>
        </div>
      </div>

      {formNode}
    </header>
  )
}
