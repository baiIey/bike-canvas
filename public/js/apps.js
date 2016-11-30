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
var query = firebase.database().ref("UIDs").orderByKey();

query.once("value")
  .then(function(snapshot) {
    var a = snapshot.numChildren();
    console.log(a);
    snapshot.forEach(function(childSnapshot) {
      // key will return the unique user ID for each drawing submission
      var key = childSnapshot.key;
      // drawing will be the actual contents of the child
      var drawing = snapshot.child(key).child("drawing").val();
      // var drawing = childSnapshot.val();
      console.log(drawing);

      var eName = childSnapshot.val().resultname;
      document.getElementById("draw").innerHTML += '<canvas class="canvas">'+drawing+'</canvas>';
  });
});
