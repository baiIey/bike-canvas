// Initialize Firebase
var config = {
  apiKey: "AIzaSyD0DnENJ0BWibQdwA1Nw-pnSK_MJBj8tyM",
  authDomain: "gray-area-mt-canvas.firebaseapp.com",
  databaseURL: "https://gray-area-mt-canvas.firebaseio.com",
  storageBucket: "gray-area-mt-canvas.appspot.com",
  messagingSenderId: "668088233358"
};
firebase.initializeApp(config);

// Loop through drawings in order of submission with the forEach() method. The callback provided to will be called synchronously with a DataSnapshot for each child

firebase.database().ref("UIDs").once("value",function() {});
var query = firebase.database().ref("UIDs").orderByKey();

query.once("value")
  .then(function(snapshot) {
    var a = snapshot.numChildren();
    console.log(a);
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var serResult = snapshot.child(key).child("drawing").val();

      // console.log(drawing);
      var eName = childSnapshot.val().resultname;
      document.getElementById("draw").innerHTML += '<canvas class="canvas">'+serResult+'</canvas>';

      drawing = new RecordableDrawing("canvas");
  });
});
