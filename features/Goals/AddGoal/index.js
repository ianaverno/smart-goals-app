import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createGoalThunk, removeErrorDetails } from '../goalsSlice';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import styles from './AddGoal.module.scss';

export default function AddGoal() {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.goals.errorDetails);
  

  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [startingValue, setStartingValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [interval, setInterval] = useState('');
  const [targetDate, setTargetDate] = useState(new Date());
  
  const onDescriptionChanged = (e) => {
    setDescription(e.target.value)

    if (errors.description) {
      dispatch(removeErrorDetails('description'));
    }
  }

  const onUnitChange = (e) => {
    setUnit(e.target.value)

    if (errors.unit_of_measure) {
      dispatch(removeErrorDetails('unit_of_measure'));
    }
  }

  const onStartingValueChanged = (e) => {
    setStartingValue(e.target.value)

    if (errors.starting_value) {
      dispatch(removeErrorDetails('starting_value'));
    }
  }

  const onDateChanged = (date) => {
    setTargetDate(date)

    if (errors.starting_value) {
      dispatch(removeErrorDetails('target_date'));
    }
  }

  const onTargetValueChanged = (e) => {
    setTargetValue(e.target.value)

    if (errors.target_value) {
      dispatch(removeErrorDetails('target_value'));
    }
  }

  const onIntervalChanged = (payload) => {
    setInterval(payload.value);

    if (errors.interval) {
      dispatch(removeErrorDetails('interval'));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      description,
      interval,
      starting_value: startingValue,
      target_value: targetValue,
      unit_of_measure: unit,
      target_date: targetDate
    };

    dispatch(createGoalThunk(payload));
  }

  const intervalOptions = [
    { value: 'daily', label: 'daily' },
    { value: 'weekly', label: 'weekly' },
    { value: 'monthly', label: 'monthly' },
    { value: 'yearly', label: 'yearly' }
  ]
  return (
    <section className={styles.container}>
      <form> 
        <h2>What would you like to achieve?</h2>

        <label>Description <sup>*</sup><small>{errors.description}</small></label>
        <input 
          className={styles.text}
          type="text" 
          placeholder="Define your goal"
          value={description}
          onChange={onDescriptionChanged}
        />

        <label>Target date<sup>*</sup><small>{errors.target_date}</small></label>
        <div className={styles.field}>
          <DatePicker 
            selected={targetDate} 
            onChange={(date) => onDateChanged(date)} 
            calendarStyles= {{
              calendarContainer: 'calendarContainer',
              dayPickerContainer: 'dayPickerContainer',
              monthsList: 'monthsList',
              daysOfWeek: 'daysOfWeek',
              dayWrapper: 'dayWrapper',
              selected: 'selected',
              heading: 'heading'
            }}
          />
        </div>

        <label>Interval <sup>*</sup><small>{errors.interval}</small></label>
        <div className={styles.field}>
          <Select 
            options={intervalOptions} 
            width={"100%"}
            placeholder={"How often would you like to track progress?"}
            onChange={onIntervalChanged}
          />
        </div>

        <label>Unit of measure <small>{errors.unit_of_measure}</small></label>
        <input 
          className={styles.text}
          type="text" 
          placeholder="What will you measure it with? (ex: clients, steps a day, hours a week)"
          value={unit}
          onChange={onUnitChange}
        />
      
        <label>Starting value <sup>*</sup><small>{errors.starting_value}</small></label>
        <input
          className={styles.number}
          type="number"
          placeholder="What is your starting point?"
          value={startingValue}
          onChange={onStartingValueChanged}
        />

        <label>Target value <sup>*</sup><small>{errors.target_value}</small></label>
        <input
          className={styles.number}
          type="number"
          placeholder="Where do you want to end up?"
          value={targetValue}
          onChange={onTargetValueChanged}
        />

        <button className={styles.submit} onClick={handleSubmit}>
          Add goal
        </button>
      </form>
    </section>
  )
}
