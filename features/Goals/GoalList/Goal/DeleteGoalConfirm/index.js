import { useDispatch } from 'react-redux';
import { destroyGoalThunk } from '../../../goalsSlice';
import styles from './DeleteGoalConfirm.module.scss';

export default function DeleteGoalConfirm({url, onCancel}) {
  const dispatch = useDispatch();

  const onConfirm = () => {
    dispatch(destroyGoalThunk(url));
  }

  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <div className={styles.prompt}>
          Delete this goal?
        </div>

        <div className={styles.actions}>
          <button className={styles.alert} onClick={onConfirm}>
            Confirm
          </button>
          
          <button onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
