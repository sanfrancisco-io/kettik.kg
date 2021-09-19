import firebase from "firebase";

var config = {
    apiKey: "AIzaSyA_tV91YUhcTpky1FekUt4Ila251vG8y0U",
    authDomain: "kettik-f67c1.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://kettik-f67c1-default-rtdb.firebaseio.com",
    storageBucket: "kettik-f67c1.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();