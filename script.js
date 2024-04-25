$(document).ready(function() {

  //pop up information box
  $('.modal-trigger').leanModal();

  //store audio
  var audio = $("#audio")[0];

  //initialize display
  $("#break-num").hide();
  $("#break-display").hide();
  $("#pause").hide();
  $("#resume").hide();
  $("#reset").hide();

  //set original state to "work"
  var state = "work";

  //manually changing times
  //increase work time button
  var workTime = parseInt($("#work-time-set").html());
  $("#add-work-btn").click(function() {
    if (workTime < 60) {
      workTime += 1;
      $("#work-time-set").html(workTime);
      $("#work-time-display").html(workTime + ":00");
    } //end if
  }) //end add-work-btn click
  //decrease work time button
  $("#minus-work-btn").click(function() {
    if (workTime > 1) {
      workTime -= 1;
      $("#work-time-set").html(workTime);
      $("#work-time-display").html(workTime + ":00");
    } //end if
  }) //end minus-work-btn click
  //increase break time button
  var breakTime = parseInt($("#break-time-set").html());
  $("#add-break-btn").click(function() {
    if (breakTime < 60) {
      breakTime += 1;
      $("#break-time-set").html(breakTime);
      $("#break-time-display").html(breakTime + ":00");
    } //end if
  }) //end add-work-btn click
  //decrease work time button
  $("#minus-break-btn").click(function() {
    if (breakTime > 1) {
      breakTime -= 1;
      $("#break-time-set").html(breakTime);
      $("#break-time-display").html(breakTime + ":00");
    } //end if
  }) //end minus-work-btn click
  var extBreakTime = parseInt($("#ext-break-time-set").html());
  $("#add-ext-break-btn").click(function() {
    if (extBreakTime < 60) {
      extBreakTime += 1;
      $("#ext-break-time-set").html(extBreakTime);
      $("#ext-break-time-display").html(extBreakTime + ":00");
    } //end if
  }) //end add-work-btn click
  //decrease work time button
  $("#minus-ext-break-btn").click(function() {
    if (extBreakTime > 1) {
      extBreakTime -= 1;
      $("#ext-break-time-set").html(extBreakTime);
      $("#ext-break-time-display").html(extBreakTime + ":00");
    } //end if
  }) //end minus-work-btn click

  //necessary variables
  var workCountdown;
  var breakCountdown;

  var currentWorkTime;
  var currentBreakTime;

  var pomNum = 1;
  var breakNum = 0;

  //to increase pomodoro/break # by 1 each time
  function increment(n) {
    n++;
    return n;
  }; //end increment

  //start button
  $("#start").click(function() {
    audio.play();
    $("#start").hide();
    $("#pause").show();
    $("#resume").hide();
    $("#reset").show();
    if (state === "work") {
      workCountdown = workTime * 60;
      currentWorkTime = setInterval(workTimer, 1000);
    } else if (state === "break" && breakNum%4 !== 0) {
      breakCountdown = breakTime * 60;
      currentBreakTime = setInterval(breakTimer, 1000);
    } else if (state === "break" && breakNum%4 === 0) {
      breakCountdown = extBreakTime * 60;
      currentBreakTime = setInterval(breakTimer, 1000);
    }
  }); //end start button

  //work timer countdown
  function workTimer() {
    workCountdown --;
    if (workCountdown === 0) {
      audio.play();
      clearInterval(currentWorkTime);
      $("#work-display").hide();
      $("#work-num").hide();
      $("#break-display").show();
      breakNum = increment(breakNum);
      $("#break-num").html("הפסקה #" + breakNum);
      $("#break-num").show();
      $("#pause").hide();
      $("#reset").hide();
      $("#start").show();
      state = "break";
      if (breakNum%4===0) {
        $("#break-num").html("הפסקה ארוכה");
        $("#break-time-display").html(extBreakTime + ":00");
      }
      else {
      $("#break-time-display").html(breakTime + ":00");
      }
    }
    if (workCountdown % 60 >= 10) {
      $("#work-time-display").html(Math.floor(workCountdown/60) + ":" + workCountdown%60);
    }
    else {
      $("#work-time-display").html(Math.floor(workCountdown/60) + ":0" + workCountdown%60);
    }
  } //end workTimer

  //break timer countdown
  function breakTimer() {
    breakCountdown --;
    if (breakCountdown === 0) {
      audio.play();
      clearInterval(currentBreakTime);
      $("#break-display").hide();
      $("#break-num").hide();
      $("#work-display").show();
      pomNum = increment(pomNum);
      $("#work-num").html("פומודורו #" + pomNum);
      $("#work-num").show();
      $("#pause").hide();
      $("#reset").hide();
      $("#start").show();
      state = "work";
      $("#work-time-display").html(workTime + ":00");
    }
    if (breakCountdown % 60 >= 10) {
      $("#break-time-display").html(Math.floor(breakCountdown/60) + ":" + breakCountdown%60);
    }
    else {
      $("#break-time-display").html(Math.floor(breakCountdown/60) + ":0" + breakCountdown%60);
    }
  } //end breakTimer

  //pause button
  $("#pause").click(function() {
    if (state==="work") {
      clearInterval(currentWorkTime);
    }
    if (state==="break") {
      clearInterval(currentBreakTime);
    }
    $("#start").hide();
    $("#pause").hide();
    $("#resume").show();
    $("#reset").show();
  }); //end pause button

  //resume button
  $("#resume").click(function() {
    $("#resume").hide();
    $("#pause").show();
    $("#reset").show();
    if (state==="work") {
      currentWorkTime = setInterval(workTimer, 1000);
    }
    if (state==="break") {
      currentBreakTime = setInterval(breakTimer, 1000);
    }
  }); //end resume button

  //reset button
  $("#reset").click(function() {
    clearInterval(currentWorkTime);
    $("#work-time-display").html(workTime + ":00");
    clearInterval(currentBreakTime);
    $("#break-time-display").html(breakTime + ":00");
    $("#break-display").hide();
    breakNum = 0;
    $("#break-num").hide();
    $("#work-display").show();
    pomNum = 1;
    $("#work-num").html("פומודורו #" + pomNum);
    $("#work-num").show();
    $("#pause").hide();
    $("#resume").hide();
    $("#reset").hide();
    $("#start").show();
  }); //end reset button

}); //end ready
