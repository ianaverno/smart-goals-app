import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStatThunk } from './../../../goalsSlice';
import styles from './EditGoalStat.module.scss';

export default function EditGoalStat({stat, unit, onCancel}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(stat.value);

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStatThunk(stat.url, { value: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <div className={styles.prompt}>
          Track record for {stat.date}:
        </div>

        <form> 
          <label htmlFor="value"> {unit}</label>
          <input 
            type="number" 
            id="value" 
            name="value" 
            value={value} 
            onChange={onChange} 
          />
        </form>

        <div className={styles.actions}>
          <button className={styles.alert} onClick={onSubmit}>
            Update
          </button>
          
          <button onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
