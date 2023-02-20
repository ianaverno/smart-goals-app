import { useState } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import DeleteGoalConfirm from './DeleteGoalConfirm'; 
import EditGoalStat from './EditGoalStat';
import { TiDelete } from 'react-icons/ti';
import styles from './Goal.module.scss';

const StatTooltip = ({active, payload, label}) => {
  if (active && payload && payload.length) {
    return(
      <div className={styles.tooltip}>
        <small className={styles.date}>{label}</small>
        <div className={styles.value}>
          {`${payload[0].value} ${payload[0].unit}`}
        </div>
        <em className={styles.hint}>Click to edit</em>
      </div>
    )
  }
}

export default function Goal({goal}) {
  const chartData = goal.stats;

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editStat, setEditStat] = useState({});

  const onDeleteGoalClicked = () => {
    setDeleteConfirm(true);
  }

  const onDeleteCancel = () => {
    setDeleteConfirm(false);
  }

  const onEditClose = () => {
    setEditStat({})
  }

  const handleBarClick = (bar) => {
    console.log(bar.payload);
    if (bar.payload.url) {
      setEditStat(bar.payload);
    }
  }

  let deleteConfirmNode;
  let blur;
  let editStatNode;

  if (deleteConfirm) {
    deleteConfirmNode = (
      <DeleteGoalConfirm url={goal.url} onCancel={onDeleteCancel} /> 
    )

    blur = styles.blur
  };

  if (editStat.url) {
    editStatNode = (
      <EditGoalStat stat={editStat} unit={goal.unit_of_measure} onCancel={onEditClose}/>
    )

    blur = styles.blur;
  }

  return (
    <article className={styles.goal}>
      <div className={`${styles.content} ${blur}`}>
        <header>
          <h2>
            <span>{goal.description}</span>&nbsp;<sup>{goal.interval}</sup>
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
              <ComposedChart 
                data={chartData}
                width={600} 
                height={100} 
                margin={{left: 0}} 
              >
                <XAxis dataKey="date" />
                <YAxis dataKey="value" />
                <Tooltip content={StatTooltip} />
                <Bar  
                  width={10}
                  dataKey="value" 
                  fill="#5043d1"
                  minPointSize={2}
                  background={true}
                  unit={goal.unit_of_measure}
                  onClick={(payload) => handleBarClick(payload)}
                  style={{cursor: 'pointer'}}
                />
            </ComposedChart >
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      
      { deleteConfirmNode }
      { editStatNode }
    </article>
  )
}
