playbackInterruptCommand = "";

	$(document).bind("pageinit", function()
	{
		$("#pauseBtn").hide();
		// $("#playBtn").hide();
		drawing = new RecordableDrawing("canvas2");

		$("#recordBtn").click(function(){
			var btnTxt = $("#recordBtn .ui-btn-text").text();
			if (btnTxt == 'Stop')
				stopRecording();
			else
				startRecording();
		});

		$("#playBtn").click(function(){
			var btnTxt = $("#playBtn .ui-btn-text").text();
			console.log("playBtn did click");
			if (btnTxt == 'Stop')
				stopPlayback();
			else
				startPlayback();
		});

		$("#startBtn").click(function(){
			$("#intro").hide();
			$("#draw").show();
			console.log("startBtn did press")
			// startRecording();
			// console.log("recording...")
			// firebase.auth().signInAnonymously();
	    // console.log('sign in anonymously')
		});

		$("#pauseBtn").click(function(){
			var btnTxt = $("#pauseBtn .ui-btn-text").text();
			if (btnTxt == 'Pause')
			{
				pausePlayback();
			} else if (btnTxt == 'Resume')
			{
				resumePlayback();
			}
		});

		$("#clearBtn").click(function(){
			drawing.clearCanvas();
			console.log("clearBtn did press");
			startRecording();
			console.log("Cleared. Recording...");
		});

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
		$("#serializeBtn").click(function() {
					var serResult = serializeDrawing(drawing);
					if (serResult != null)
					{
						$("#serDataTxt").val(serResult);
						showSerializerDiv();
					} else
					{
						alert("Error serializing data");
					}
				});

				function showSerializerDiv(showSubmit)
				{
					$("#drawingDiv").hide();
					$("#serializerDiv").show();
					if (showSubmit)
						$("#okBtn").show();
					else
						$("#okBtn").hide();
				}

				function hideSerializerDiv()
				{
					$("#drawingDiv").show();
					$("#serializerDiv").hide();
				}

				$("#deserializeBtn").click(function(){
					showSerializerDiv(true);
				});
	});



	function stopRecording()
	{
		$("#recordBtn .ui-btn-text").text("Record");
		$("#playBtn").show();
		$("#clearBtn").show();
		$("#pauseBtn").hide();

		drawing.stopRecording();
	}

	function startRecording()
	{
		$("#recordBtn .ui-btn-text").text("Stop");
		// $("#playBtn").hide();
		$("#pauseBtn").hide();
		// $("#clearBtn").hide();

		drawing.startRecording();
	}

	function stopPlayback()
	{
		playbackInterruptCommand = "stop";
	}

	function startPlayback()
	{
		drawing.playRecording(function() {
			//on playback start
			$("#playBtn .ui-btn-text").text("Stop");
			$("#recordBtn").hide();
			$("#pauseBtn").show();
			$("#clearBtn").hide();

			playbackInterruptCommand = "";
		}, function(){
			//on playback end
			$("#playBtn .ui-btn-text").text("Play");
			$("#playBtn").show();
			$("#recordBtn").show();
			$("#clearBtn").show();
			$("#pauseBtn").hide();
		}, function() {
			//on pause
			$("#pauseBtn .ui-btn-text").text("Resume");
			$("#recordBtn").hide();
			$("#playBtn").hide();
			// $("#clearBtn").hide();

		}, function() {
			//status callback
			return playbackInterruptCommand;
		});
	}

	function pausePlayback()
	{
		playbackInterruptCommand = "pause";
	}

	function resumePlayback()
	{
		playbackInterruptCommand = "";
		drawing.resumePlayback(function(){
			$("#pauseBtn .ui-btn-text").text("Pause");
			$("#pauseBtn").show();
			$("#recordBtn").hide();
			// $("#clearBtn").hide();
			$("#playBtn").show();
		});
	}
