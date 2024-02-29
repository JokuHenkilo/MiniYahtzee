import React, { useState, useRef, useEffect } from 'react';
import { Pressable, View, Text, TextInput, Button, Keyboard, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NBR_OF_DICE, NBR_OF_THROWS, MAX_DIE_NUM, MIN_DIE_NUM, BONUS_POINTS_LIMIT, BONUS_POINTS } from './Gameboard'; 
import styles from '../style/style';

const Home = ({ }) => {
	const [playerName, setPlayerName] = useState('');
	const [showRules, setShowRules] = useState(false);
	const inputRef = useRef(null);
	const navigation = useNavigation();

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleNext = () => {
		Keyboard.dismiss();
		if (playerName.trim()) {
			setShowRules(true);
		} else {
			Alert.alert('Error', 'Player name invalid!');
		}
	};

	const handlePlay = () => {
		navigation.navigate('Gameboard', { playerName: playerName });
	};
	
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			{showRules ? (
				<View style={{ alignItems: 'center' }}>
					<Text style={styles.welcomeText}>Welcome, {playerName}!</Text>
					<Text style={styles.rulesText}>The Rules</Text>
					<Text style={styles.rulesText}>THE GAME: Upper section of the classic Yahtzee dice game. You have {NBR_OF_DICE} dices and for every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in order to get the same dice spot counts as many as possible. At the end of the turn, you must select your points from {MIN_DIE_NUM} to {MAX_DIE_NUM}. The order for selecting those is free.</Text>
					<Text style={styles.rulesText}>POINTS: After each turn, the game calculates the sum for the dices you selected. Only the dices having the same spot count are calculated. Inside the game, you cannot select the same points from {MIN_DIE_NUM} to {MAX_DIE_NUM} again.</Text>
					<Text style={[styles.rulesText, { marginBottom: 60 }]}>GOAL: To get as many points as possible. {BONUS_POINTS_LIMIT} points is the limit of getting a bonus, which gives you {BONUS_POINTS} points more.</Text>
					<Pressable style={[styles.button, styles.dropShadow]} onPress={handlePlay}>
						<Text style={styles.buttonText}>Play</Text>
					</Pressable>
				</View>
				) : (
				<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -60 }}>
					<Text style={[styles.rulesText, { paddingBottom: 20 }]}>Enter player name:</Text>
					<TextInput
						ref={inputRef}
						style={styles.nameInput}
						onChangeText={text => setPlayerName(text)}
						value={playerName}
					/>
					<Button
						title="Next"
						onPress={handleNext}
						disabled={!playerName.trim()}
						titleStyle={{ textAlign: 'center' }}
					/>
				</View>
			)}
		</View>
	);
};

export default Home;