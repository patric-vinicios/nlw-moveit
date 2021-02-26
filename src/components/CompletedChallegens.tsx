import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/CompletedChallegens.module.css';

export function CompletedChallegens() {
	const { challengesCompleted } = useContext(ChallengesContext);

	return (
		<div className={styles.completedChallengesContainer}>
			<span>Desafios completos</span>
			<span>{challengesCompleted}</span>
		</div>
	)
}