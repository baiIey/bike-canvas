// Initialize Firebase
var config = {
  apiKey: "AIzaSyD0DnENJ0BWibQdwA1Nw-pnSK_MJBj8tyM",
  authDomain: "gray-area-mt-canvas.firebaseapp.com",
  databaseURL: "https://gray-area-mt-canvas.firebaseio.com",
  storageBucket: "gray-area-mt-canvas.appspot.com",
  messagingSenderId: "668088233358"
};
firebase.initializeApp(config);

// Create reference
// var dbRefObject = firebase.database().ref().child('UIDs');

// Sync drawing changes
// dbRefObject.on('value', snap => console.log(snap.val ()));
//});

// // Loads drawings and listens for upcoming ones
// function loadDrawings(){
//   // Reference to the /UIDs/ database path
//   this.ref = firebase.database().ref('UIDs');
//   // Makes sure we remove previous listeners
//   this.ref.off();
//   // Loads the last n images and listens for new ones.
//   var setImage = function(data){
//     var val = data.val();
//     this.displayImage(data.key, val.drawing);
//   }.bind(this);
//   this.ref.limitToLast(1).on('child_added', setImage);
//   this.ref.limitToLast(1).on('child_changed', setImage);
// };
//
// // Displays a Image in the UI.
// function displayImage(key, drawing) {
//   console.log(drawing);
//   //var len = drawing.length;
//   // for (var i = 0; i < len; i++) {
//   //  console.log(drawing);
//   //}
// };

// Loop through drawings in order of submission with the forEach() method. The callback provided to will be called synchronously with a DataSnapshot for each child
var query = firebase.database().ref("UIDs").orderByKey();

query.once("value")
  .then(function(snapshot) {
    var a = snapshot.numChildren();
    console.log(a);
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var drawing = snapshot.child(key).child("drawing").val();
      // var childData = childSnapshot.val();
      // console.log(drawing);
  });
});

var htmlElements = "";
for (var i = 0; i < 5; i++) {
   htmlElements += '<canvas class="canvas"></canvas>';
}
var container = document.getElementById("draw");
container.innerHTML = htmlElements;

//loadDrawings();
//displayImage();
