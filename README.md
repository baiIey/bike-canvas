# Cycle()
This experiment explores how a population of a thousand unique self-selected individuals, equipped with a given set of tools, responded when prompted to recall and reproduce a familiar object.

* Prompt :	For this task, we ask that you draw a bicycle.
* Audience : Amazon's Mechanical Turk
* Average time per assignment : 131 seconds
* Reward per assignment : $0.15
* Countries of origin : 30

This project and its [paper](https://docs.google.com/document/d/11AXoIEOM2QBKDXbr_oeL1rdR6JgghLhevXqeBKCfE48/edit?usp=sharing) describe the psychological phenomenon of overlooking cotidian objects. It explores the consequences of such oversight and considers the outcomes of an experiment in which we asked 1,000 randomly self-selected people to draw a bicycle without looking at a picture.

### Similar Works
* [The Sheep Market](http://www.thesheepmarket.com/) by [Aaron Koblin](http://www.aaronkoblin.com/work/thesheepmarket/)
* [Velocipedia](https://www.behance.net/GianlucaGimini)
* [The Science of Cycology: can you draw a bicycle?](http://road.cc/content/blog/90885-science-cycology-can-you-draw-bicycle)

### References
* [De/Serializing Recordings in Recordable HTML5 Canvas](http://ramkulkarni.com/blog/deserializing-recordings-in-recordable-html5-canvas/)
* [Foundations of Data Science](https://www.cs.cornell.edu/jeh/book2016June9.pdf)
* [Deep Neural Networks for YouTube Recommendations](http://static.googleusercontent.com/media/research.google.com/en//pubs/archive/45530.pdf)

### Development
* Commission audience on [Amazon's Mechanical Turk](https://requester.mturk.com/)
* Prompt audience to "Draw a Bike"
* Use [serialization](http://ramkulkarni.com/blog/deserializing-recordings-in-recordable-html5-canvas/) to capture [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) drawings as a string
* Store strings using [Firebase's real-time database](https://firebase.google.com/docs/database/)
* Recall all strings from Firebase, deserialize, and playback

### Mechanical Turk
We requested 1000 submissions from [Amazon's Mechanical Turk](https://requester.mturk.com/), asking only that workers "Draw a bike", and paid them $0.15 each to do so.

### Firebase Anonymous Authentication
We control access to our Firebase database by [authenticating anonymously](https://firebase.google.com/docs/auth/web/anonymous-auth) for each of our Mechanical Turks. The authentication listener creates a unique ID for each user, which we associate with our submissions when doing initial QA.
```javascript
$("#startBtn").click(function(){
			$("#intro").hide();
			$("#draw").show();
			console.log("startBtn did press")
			startRecording();
			console.log("recording...")
			firebase.auth().signInAnonymously();
	    console.log('sign in anonymously')

			// auth listener
			firebase.auth().onAuthStateChanged(firebaseUser => {
				console.log(firebaseUser);
			});
		});
```

### Serialization
This block saves the content on canvas as a string and passes it to Firebase.
```javascript
$("#serializeBtn").click(function() {
  var serResult = serializeDrawing(drawing);

  console.log("serializeBtn/Submit did press");
  $("#draw").hide();
  $("#exit").show();
  if (serResult != null)
  {
    $("#serDataTxt").val(serResult);
    // showSerializerDiv();
    console.log("serialization worked");
    console.log(serResult);
    firebase.database().ref('UIDs/').push({
      drawing: serResult
    });
  } else
  {
    alert("Error serializing data");
    console.log("serialization error");
  }
});
```

### Fetch Drawings
This loops through drawings in order of submission with Firebase's [forEach() method](https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot). The callback provided to will be called synchronously with a DataSnapshot for each child
```javascript
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
```
