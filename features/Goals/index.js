import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllGoals, fetchGoalsThunk } from './goalsSlice';

import Loader from '../../components/Loader';
import GoalList from "./GoalList";
import styles from './Goals.module.css';

export default function Goals() {
  const dispatch = useDispatch();
  const goals = useSelector(selectAllGoals);

  const goalsStatus = useSelector((state) => state.goals.status);
  const error = useSelector((state) => state.goals.error);

  let content;
  
  switch (goalsStatus) {
    case 'idle':
    case 'loading':
      let errorNode = null;
      if (error) {
        errorNode = (
          <div className={styles.error}>
            Error: {error}
          </div> 
        )
      }
      content = (
        <>
          <Loader size={36} error={error} />
        </>
      )
      break
    case 'loaded':
      content = (
        <>
          <GoalList goals={goals}/>
        </>
      )
      break
    default:
      break;
  }

  useEffect(() => {
    console.log(goalsStatus)
    if (goalsStatus === 'idle') {
      dispatch(fetchGoalsThunk());
    }
  }, [goalsStatus, dispatch]);

  return (
    <div className={styles.goals} >
      {content}
    </div>

  )
}
