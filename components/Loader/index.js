import { TbFidgetSpinner } from "react-icons/tb";
import styles from './Loader.module.scss'

export default function Loader({size}) {
  return (
    <div className={styles.spinner}>
      <TbFidgetSpinner size={size}/>
    </div>
  )
}
