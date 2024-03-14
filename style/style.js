import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	header: {
		marginTop: 30,
		marginBottom: 15,
		backgroundColor: '#f6ed45',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	footer: {
		position: 'absolute',
		zIndex: 1,
		bottom: 80,
		left: 0,
		right: 0,
		marginTop: 20,
		backgroundColor: '#f5ed9e',
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center'
	},
	title: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 24,
		textAlign: 'center',
		margin: 10,
	},
	author: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 15,
		textAlign: 'center',
		margin: 10,
	},
	gameboard: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	gameinfo: {
		backgroundColor: '#fff',
		textAlign: 'center',
		fontSize: 20,
		marginTop: 7
	},
	row: {
		marginTop: 20,
		padding: 10
	},
	flex: {
		flexDirection: "row"
	},
	button: {
		margin: 30,
		flexDirection: "row",
		padding: 10,
		backgroundColor: "#2badd5",
		width: 150,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 100,
	},
	buttonText: {
		color:"#000000",
		fontSize: 20
	},
	scoreCategory: {
		width: 50, 
		height: 100, 
		borderRadius: 60,
		justifyContent: 'center', 
		alignItems: 'center', 
		backgroundColor: '#ee8927',
	},
	scoreboardContainer: {
		backgroundColor: '#be7a2a',
		borderRadius: 10, 
		padding: 20,
		marginTop: 10, 
		height: 400,
		justifyContent: 'top',
		alignItems: 'center',
	},
	scoreboardText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold', 
		fontFamily: 'Arial', 
		paddingTop: 2,
		marginBottom: 2,
		top: 0,
		paddingLeft: 5,
		
	},
	rulesText: {
		color: 'black',
		fontSize: 15,
		fontWeight: 'bold', 
		fontFamily: 'Arial',
		textAlign: 'center',
		padding: 7,
	},
	topScoresText: {
		color: 'black',
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	scoreHeader:{
		marginTop: 10,
		marginBottom: 15,
		flexDirection: 'row',
	},
	scoreLabel:{
		paddingHorizontal: 35,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	clearButton:{
		margin: 30,
		flexDirection: "row",
		padding: 10,
		marginTop: 50,
		backgroundColor: "#cc2a0d",
		width: 150,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	clearButtonText: {
		color:"#fff",
		fontSize: 20
	},
	nameInput:{
		height: 40,
		width: 200,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 10,
		paddingHorizontal: 10,
		marginBottom: 20,
		textAlign: 'center',
	},
	welcomeText:{
	fontSize: 30,
	fontWeight: 'bold',
	color: '#1a84da',
	},
	horizontal: {
	flexDirection: 'row',
	alignItems: 'center',
	paddingRight:40,
	},
});