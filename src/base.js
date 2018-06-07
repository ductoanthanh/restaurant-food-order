import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCUcE-nChbJl0Ny-4j3fMuM4urV-Pmi6ag",
    authDomain: "catch-of-the-day-toan-thanh.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-toan-thanh.firebaseio.com",
  });

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;