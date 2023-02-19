import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TiDelete } from "react-icons/ti";
import DeleteGoalConfirm from './DeleteGoalConfirm'; 
import styles from './Goal.module.scss';

export default function Goal({goal}) {
  const chartData = goal.stats

  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const onDeleteGoalClicked = () => {
    setDeleteConfirm(true)
  }

  const onDeleteCancel = () => {
    setDeleteConfirm(false)
  }

  let deleteConfirmNode = blur = null;

  if (deleteConfirm) {
    deleteConfirmNode = (
      <DeleteGoalConfirm url={goal.url} onCancel={onDeleteCancel} /> 
    )

    blur = styles.blur
  }

  return (
    <article className={styles.goal}>
      <div className={`${styles.content} ${blur}`}>
        <header>
          <h2>
            {goal.description}

            <sup>
              {goal.interval}
            </sup>
          </h2>

          <div className={styles.actions}>
            <button onClick={onDeleteGoalClicked}>
              <TiDelete size={20} />
            </button>
          </div>
        </header>

        <section className={styles.progress}>
          <h3>
            Target: {goal.target_value} {goal.unit_of_measure} by { goal.target_date }
          </h3>

          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={600} height={100} margin={{left: 0}} data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Bar 
                dataKey="value" 
                barSize={8} 
                fill="#5043d1"
              />
            </BarChart >
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      
      { deleteConfirmNode }
    </article>
  )
}
