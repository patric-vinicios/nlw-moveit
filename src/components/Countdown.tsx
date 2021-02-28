import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../context/ChallengesContext';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
	const {
		minutes, 
		seconds, 
		hasFinished, 
		isActive, 
		resetCountdown, 
		startCountdown
	} = useContext(CountdownContext)


	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
	const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');






	return (
		<div>
			<div className={styles.countDownContainer}>
				<div>
					<span>{minuteLeft}</span>
					<span>{minuteRight}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secondLeft}</span>
					<span>{secondRight}</span>
				</div>
			</div>

			{hasFinished ? (
				<button
					disabled
					className={styles.countDownButton}

				>
					Ciclo encerrado
					<img src="/icons/done.png" alt="Done"/>
				</button>
			) : (
					<>
						{isActive ? (
							<button
								type="button"
								className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
								onClick={resetCountdown}
							>
								Abandonar um ciclo
							</button>

						) : (
								<button
									type="button"
									className={styles.countDownButton}
									onClick={startCountdown}
								>
									Iniciar um ciclo
								</button>

							)}
					</>
				)}
		</div>

	)
}