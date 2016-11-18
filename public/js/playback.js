playbackInterruptCommand = "";

$(document).bind("pageinit", function()
{
  $("#pauseBtn").hide();
  $("#playBtn").hide();
  drawing = new RecordableDrawing("canvas1");

  $("#recordBtn").click(function(){
    var btnTxt = $("#recordBtn .ui-btn-text").text();
    if (btnTxt == 'Stop')
      stopRecording();
    else
      startRecording();
  });

  $("#playBtn").click(function(){
    var btnTxt = $("#playBtn .ui-btn-text").text();
    if (btnTxt == 'Stop')
      stopPlayback();
    else
      startPlayback();
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
  $("#playBtn").hide();
  $("#pauseBtn").hide();
  $("#clearBtn").hide();

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
    $("#clearBtn").hide();

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
    $("#clearBtn").hide();
    $("#playBtn").show();
  });
}
