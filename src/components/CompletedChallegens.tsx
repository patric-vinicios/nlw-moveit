import styles from '../styles/components/CompletedChallegens.module.css';

export function CompletedChallegens(){
    return(
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>5</span>
        </div>
    )
}