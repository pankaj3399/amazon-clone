import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyAaNTIeAx6uh0ox_EHrVeX2FCixDGjevtA',
	authDomain: 'challenge-564f3.firebaseapp.com',
	databaseURL: 'https://challenge-564f3.firebaseio.com',
	projectId: 'challenge-564f3',
	storageBucket: 'challenge-564f3.appspot.com',
	messagingSenderId: '334948933345',
	appId: '1:334948933345:web:b6c2bdc2ed4f62e6f861a0',
	measurementId: 'G-J0K05NXWNJ'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
