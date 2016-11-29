// Initialize Firebase
var config = {
  apiKey: "AIzaSyD0DnENJ0BWibQdwA1Nw-pnSK_MJBj8tyM",
  authDomain: "gray-area-mt-canvas.firebaseapp.com",
  databaseURL: "https://gray-area-mt-canvas.firebaseio.com",
  storageBucket: "gray-area-mt-canvas.appspot.com",
  messagingSenderId: "668088233358"
};
firebase.initializeApp(config);

// Get elements
// var preObject = document.getElementById('object');

// Create reference
// var dbRefObject = firebase.database().ref().child('UIDs');

// Sync drawing changes
// dbRefObject.on('value', snap => console.log(snap.val ()));
// dbRefObject.on('value', snap => {
// preObject.innerText = JSON.stringify(snap.val());
//});

// Loads drawings and listens for upcoming ones
function loadDrawings(){
  // Reference to the /UIDs/ database path
  this.imageRef = firebase.database().ref('UIDs');
  // Makes sure we remove previous listeners
  this.imageRef.off();

  // Loads the last n images and listens for new ones.
  var setImage = function(data){
    var val = data.val();
    this.displayImage(data.key, val.drawing);
  }.bind(this);
  this.imageRef.limitToLast(1).on('child_added', setImage);
  this.imageRef.limitToLast(1).on('child_changed', setImage);
};

// Displays a Image in the UI.
function displayImage(key, drawing) {
  console.log(drawing);
};

loadDrawings();
displayImage();
