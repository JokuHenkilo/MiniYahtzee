import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, Alert } from 'react-native';
import styles from '../style/style';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

	const SCOREBOARD_SIZE = 5;
	const Scoreboard = () => {
	const [scoreboard, setScoreboard] = useState([]);

	const fetchScoreboard = async () => {
		try {
			const scoreboardData = await AsyncStorage.getItem('scoreboard');
			console.log('Scoreboard data:', scoreboardData);
			if (scoreboardData) {
				setScoreboard(prevScoreboard => {
					const updatedScoreboard = JSON.parse(scoreboardData);
					console.log('Scoreboard updated:', updatedScoreboard);
					return updatedScoreboard;
				});
			} else {
				setScoreboard([]);
			}
		} catch (error) {
			console.error('Error loading scoreboard:', error);
			Alert.alert('Error', 'Failed to load scoreboard.');
		}
	};

	const clearScores = async () => {
		try {
			await AsyncStorage.removeItem('scoreboard');
			setScoreboard([]);
		} catch (error) {
			console.error('Error clearing scoreboard:', error);
			Alert.alert('Error', 'Failed to clear scoreboard.');
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			fetchScoreboard();
		}, [])
	);

	return (
		<View style={styles.container}>
			<Text style={styles.topScoresText}>Top {SCOREBOARD_SIZE} Scores</Text>
			<View style={styles.scoreboardContainer}>
				<View style={styles.scoreHeader}>
					<Text style={styles.scoreLabel}>Player</Text>
					<Text style={styles.scoreLabel}>Date</Text>
					<Text style={styles.scoreLabel}>Score</Text>
				</View>
				{scoreboard.length > 0 ? (
					scoreboard.map((entry, index) => (
						<View key={index} style={[styles.scoreboardEntry, styles.horizontal]}>
							<Text style={[styles.scoreboardText, { paddingLeft: 20 }]}>{entry.playerName + "				"}</Text>
							<Text style={[styles.scoreboardText, { paddingLeft: 10 }]}>{entry.scoreTime + "			 "}</Text>
							<Text style={[styles.scoreboardText, { paddingLeft: 30 }]}>
								{entry.totalScore}
							</Text>
						</View>

					))
				) : (
					<Text style={[styles.scoreLabel, { textAlign: 'center' }]}>No scores yet.</Text>
				)}
				<Pressable style={[styles.clearButton, styles.dropShadow]} onPress={clearScores}>
					<Text style={styles.clearButtonText}>Clear Scores</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Scoreboard;
