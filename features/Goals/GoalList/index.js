import Goal from './Goal'
import styles from './GoalList.module.css'


export default function GoalList({goals}) {
  const items = goals.map((g) => {
    return(
      <Goal goal={g} key={g.id} />
    )
  });

  return (
    <section className={styles.goalList}>
      {items}
    </section>
  )
}
