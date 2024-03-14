import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

export const NBR_OF_DICE = 5;
export const NBR_OF_THROWS = 3;
export const BONUS_POINTS_LIMIT = 63;
export const BONUS_POINTS = 50;
export const MIN_DIE_NUM = 1;
export const MAX_DIE_NUM = 6;
const SCOREBOARD_SIZE = 5;

const initialState = {
	board: [],
	nbrSum: Array(6).fill(0),
	nbrSelectPossible: false,
	dieSelectPossible: false,
	throwPossible: true,
	getBonus: false,
	gameOver: false,
	throwsLeft: NBR_OF_THROWS,
	sum: 0,
	status: '',
	selectedDice: Array(NBR_OF_DICE).fill(false),
	usedNbrs: Array(6).fill(false)
};

export const Gameboard = ({ route }) => {
	const { playerName } = route.params;
	const [state, setState] = useState(initialState);
	const [totalScore, setTotalScore] = useState(0);
	const [scoreTime, setScoreTime] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkGameStatus();
		let total = state.sum;
		if (total >= BONUS_POINTS_LIMIT) {
			setState(prevState => ({ ...prevState, getBonus: true }));
			total += BONUS_POINTS;
		}
		setTotalScore(total);
		if (state.gameOver) {
			const currentDate = new Date();
			const formattedTime = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
			setScoreTime(formattedTime);
			addToScoreboard(total, formattedTime);
			Alert.alert("Your total score: " + total);
		}
		setLoading(false);
	}, [state.sum, state.getBonus, state.throwsLeft, state.gameOver]);
	

	const { board, selectedDice, usedNbrs, throwsLeft, gameOver, sum } = state;

	const addToScoreboard = async (totalScore, scoreTime) => {
		try {
			const scoreboardData = await AsyncStorage.getItem('scoreboard');
			let scoreboard = [];
			if (scoreboardData !== null) {
				scoreboard = JSON.parse(scoreboardData);
			}
	
			const newScoreboardEntry = { playerName, totalScore, scoreTime };
			const newScoreboard = [...scoreboard, newScoreboardEntry];
			newScoreboard.sort((a, b) => b.totalScore - a.totalScore);
			const updatedScoreboard = newScoreboard.slice(0, SCOREBOARD_SIZE);
			await AsyncStorage.setItem('scoreboard', JSON.stringify(updatedScoreboard));
			console.log(updatedScoreboard);
		} catch (error) {
			console.error('Error adding score to scoreboard:', error);
		}
	};

	const checkGameStatus = () => {
		if (throwsLeft === 0) {
			setState(prevState => ({ ...prevState, status: 'Select a number.', throwPossible: false, nbrSelectPossible: true }));
		} else if (throwsLeft < NBR_OF_THROWS) {
			setState(prevState => ({ ...prevState, status: 'Throw again or select a number', throwPossible: true, nbrSelectPossible: true, dieSelectPossible: true }));
		} else if (throwsLeft === NBR_OF_THROWS && !usedNbrs.every(x => x === true)) {
			setState(prevState => ({ ...prevState, status: 'Throw the die.', throwPossible: true, nbrSelectPossible: false, dieSelectPossible: false }));
		} else if (throwsLeft === NBR_OF_THROWS && usedNbrs.every(x => x === true)) {
			setState(prevState => ({ ...prevState, status: 'Game over! All points selected.', throwPossible: false, dieSelectPossible: false, nbrSelectPossible: false, gameOver: true }));
		}

		if (sum >= BONUS_POINTS_LIMIT && !state.getBonus) {
			setState(prevState => ({ ...prevState, getBonus: true }));
		}
	};

	const selectDice = (i) => {
		const clickedDieValue = parseInt(board[i].match(/(\d+)/)[0]);
		const dice = [...selectedDice];

		if (dice[i]) {
			dice[i] = false;

			for (let j = 0; j < NBR_OF_DICE; j++) {
				const diceValue = parseInt(board[j].match(/(\d+)/)[0]);
				if (diceValue === clickedDieValue) {
					dice[j] = false;
				}
			}
		} else {
			dice.fill(false);

			for (let j = 0; j < NBR_OF_DICE; j++) {
				const diceValue = parseInt(board[j].match(/(\d+)/)[0]);
				if (diceValue === clickedDieValue) {
					dice[j] = true;
				}
			}
		}
		setState(prevState => ({ ...prevState, selectedDice: dice }));
	};

	const throwDice = () => {
		if (state.throwPossible && !gameOver) {
			const newBoard = [...board];
			for (let i = 0; i < NBR_OF_DICE; i++) {
				if (!selectedDice[i]) {
					const randomNumber = Math.floor(Math.random() * 6 + 1);
					newBoard[i] = 'dice-' + randomNumber;
				}
			}
			setState(prevState => ({ ...prevState, board: newBoard, throwsLeft: throwsLeft - 1 }));
		} else if (gameOver) {
			newGame();
		}
	};

	const useNbr = (i) => {
		const nbrs = [...usedNbrs];
		if (throwsLeft === 0 && state.nbrSelectPossible && !nbrs[i]) {
			if (i >= MIN_DIE_NUM - 1 && i <= MAX_DIE_NUM - 1) {
				nbrs[i] = true;
				let tempSum = 0;
				for (let x = 0; x < selectedDice.length; x++) {
					const diceVal = parseInt(board[x].match(/(\d+)/)[0]);
					if (diceVal - 1 === i && selectedDice[x]) {
						tempSum += diceVal;
					}
				}
				const newSum = sum + tempSum;
				const newNbrSum = [...state.nbrSum];
				newNbrSum[i] = tempSum;
				setState(prevState => ({ ...prevState, usedNbrs: nbrs, sum: newSum, nbrSum: newNbrSum, selectedDice: Array(NBR_OF_DICE).fill(false), throwsLeft: NBR_OF_THROWS }));
			} else {
				setState(prevState => ({ ...prevState, status: "Selected number is out of range!" }));
			}
		} else if (nbrs[i]) {
			setState(prevState => ({ ...prevState, status: "You already selected points for " + (i + 1) }));
		} else {
			setState(prevState => ({ ...prevState, status: "You cannot select a score while you have throws left." }));
		}
	};

	const checkBonus = () => {
		if (sum >= BONUS_POINTS_LIMIT) {
			return "You got the bonus!";
		} else {
			return "You are " + (BONUS_POINTS_LIMIT - sum) + " points away from the bonus.";
		}
	};

	const newGame = () => {
		setState(initialState);
		throwDice();
	};

	const renderDiceRow = () => {
		let diceRow = [];
		for (let i = 0; i < NBR_OF_DICE; i++) {
			diceRow.push(
				<Pressable
					key={"row" + i}
					onPress={() => selectDice(i)}
				>
					<MaterialCommunityIcons
						name={board[i]}
						key={"row" + i}
						size={65}
						color={selectedDice[i] ? "black" : "#9f4dfc"}
					/>
				</Pressable>
			);
		}
		return diceRow;
	};

	const renderNbrRow = () => {
		let nbrRow = [];
		for (let i = 0; i < 6; i++) {
			nbrRow.push(
				<View style={styles.numbers} key={"nbrRow" + i}>
					<Text style={[styles.nbrSum, {paddingLeft: 20, paddingTop: 10, paddingBottom: 10,}]}>{state.nbrSum[i]}</Text>
					<Pressable
						key={"nbrRow" + i}
						onPress={() => useNbr(i)}
					>
						<MaterialCommunityIcons
							name={'numeric-' + (i + 1) + '-circle'}
							key={"nbrRow" + i}
							size={50}
							color={usedNbrs[i] ? "black" : "#9f4dfc"}
						/>
					</Pressable>
				</View>
			);
		}
		return nbrRow;
	};

	return (
		<View style={styles.gameboard}>
			<View style={[styles.flex, styles.dropShadow]}>
				{renderDiceRow()}
			</View>
			<Text style={styles.gameinfo}>Throws left: {throwsLeft}</Text>
			<Text style={styles.gameinfo}>{state.status}</Text>
			<Pressable style={[styles.button, styles.dropShadow]} onPress={throwDice}>
				<Text style={styles.buttonText}>{gameOver ? 'New Game' : 'Throw dice'}</Text>
			</Pressable>
			{loading ? (
				<ActivityIndicator size="large" color="skyblue" />
			) : (
				<Text style={[styles.gameinfo, styles.gamevalue]}>Total: {totalScore}</Text>
			)}
			<Text style={styles.gameinfo}>{checkBonus()}</Text>
			<View style={[styles.flex, styles.dropShadow]}>
				{renderNbrRow()}
			</View>
		</View>
	);
};

export default Gameboard;