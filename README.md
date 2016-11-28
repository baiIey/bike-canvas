# Draw a Bike
This project and its [paper](https://docs.google.com/document/d/11AXoIEOM2QBKDXbr_oeL1rdR6JgghLhevXqeBKCfE48/edit?usp=sharing) describe the psychological phenomenon of overlooking cotidian objects. It explores the consequences of such oversight and considers the outcomes of an experiment in which we asked 10,000 randomly self-selected people to draw a bicycle without looking at a picture.

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
```
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
```
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

### References
* [De/Serializing Recordings in Recordable HTML5 Canvas](http://ramkulkarni.com/blog/deserializing-recordings-in-recordable-html5-canvas/)
* [Record and Playback Drawing in HTML5 Canvas](http://ramkulkarni.com/blog/record-and-playback-drawing-in-html5-canvas/)
* [Record and Playback Drawing in HTML5 Canvas – Part II](http://ramkulkarni.com/blog/record-and-playback-drawing-in-html5-canvas-part-ii/)
