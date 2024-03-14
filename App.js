import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './style/style'
import BottomNavigator from './components/BottomNavigator';
import { horizontalSize, verticalSize, mediumSize } from './components/Metrics';

export default function App() {
	return (
		<NavigationContainer>
			<View style={styles.container}>
				<Header style={{ width: horizontalSize(100), height: verticalSize(50) }} />
				<Footer style={{ marginBottom: mediumSize(20) }} />
				<BottomNavigator />
			</View>
		</NavigationContainer>
	)
};
