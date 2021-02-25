import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
	const {startNewChallenge} = useContext(ChallengesContext);


	const [time, setTime] = useState(0.1 * 60);
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
	const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

	let countDownTimeout: NodeJS.Timeout;

	useEffect(() => {
		if (isActive && time > 0) {
			countDownTimeout = setTimeout(() => {
				setTime(time - 1)
			}, 1000)
		} else if (isActive && time === 0) {
			setHasFinished(true);
			setIsActive(false);
			startNewChallenge();

		}

	}, [isActive, time])

	const startCountdown = () => {
		setIsActive(true);

	}

	const resetCountdown = () => {
		clearTimeout(countDownTimeout);
		setIsActive(false);
		setTime(0.1 * 60);

	}


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