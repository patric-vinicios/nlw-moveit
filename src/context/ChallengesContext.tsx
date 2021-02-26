import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
	type: 'body' | 'eye';
	description: string;
	amount: number;

}

interface ChallegensProviderProps {
	children: ReactNode;
}

interface ChallegensContextData {
	level: number;
	levelUp: () => void;
	currentExperience: number;
	challengesCompleted: number;
	startNewChallenge: () => void;
	activeChallenge: Challenge;
	resetChallenge: () => void;
	experienceToNextLevel: number;
	completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallegensContextData);

export function ChallegensProvider({ children }: ChallegensProviderProps) {
	const [level, setLevel] = useState(0);
	const [currentExperience, setCurrentExperience] = useState(0);
	const [challengesCompleted, setChallengesCompleted] = useState(0);
	const [activeChallenge, setActiveChallenge] = useState(null);
	const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

	useEffect(() => {
		Notification.requestPermission();
	}, [])

	function levelUp() {
		setLevel(level + 1);

	}

	function startNewChallenge() {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIndex];
		setActiveChallenge(challenge);

		new Audio('/notification.mp3').play();

		if(Notification.permission === 'granted'){
			new Notification('Novo desafio 🎉 ', {
				body: ` Valendo ${challenge.amount} XP`
			})
		}
	}

	function resetChallenge() {
		setActiveChallenge(null);
	}

	function completeChallenge() {
		if (!activeChallenge) {
			return
		}
		const { amount } = activeChallenge;

		let finalExperience = currentExperience + amount;

		if (finalExperience >= experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel;
			levelUp();
		}
		setCurrentExperience(finalExperience);
		setActiveChallenge(null);
		setChallengesCompleted(challengesCompleted + 1);

	}

	return (
		<ChallengesContext.Provider
			value={{
				level,
				levelUp,
				currentExperience,
				challengesCompleted,
				startNewChallenge,
				activeChallenge,
				resetChallenge,
				experienceToNextLevel,
				completeChallenge

			}}>
			{children}
		</ChallengesContext.Provider>

	)
}