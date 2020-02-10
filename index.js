const form = document.querySelector("form");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const result = document.querySelector("#result");
const audio = document.querySelector("#audio");
const alarmStop = document.querySelector("#alarm-stop");
const hack = document.querySelector("#hack");

let message = "You have been HACKED 🤣🤣🤣!!!";
let timeouts = [];
function typeMessage(message) {
  for (let i = 0; i < message.length; i++) {
    timeouts.push(
      setTimeout(() => {
        hack.innerHTML += message.charAt(i);
      }, 500 * i)
    );
  }
}

function countDown(stopTime) {
  let timeValue = stopTime - +new Date();
  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(timeValue / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (timeValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((timeValue % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeValue % (1000 * 60)) / 1000);

  result.innerHTML = `${days}d :${hours}hr :${minutes}min :${seconds}s`;
  return timeValue;
}

form.addEventListener("submit", e => {
  e.preventDefault();

  dateArray = date.value.split("-");
  timeArray = time.value.split(":");

  stopTime = new Date(
    +dateArray[0],
    +dateArray[1] - 1,
    +dateArray[2],
    +timeArray[0],
    +timeArray[1]
  );

  const timeDifference = +stopTime - +new Date();
  if (timeDifference < 0) {
    return (result.innerHTML = "You cannot down to the past");
  }
  // countDown(timeDifference);
  let x = setInterval(() => {
    let remaining = countDown(+stopTime);

    if (remaining < 0) {
      clearInterval(x);

      audio.play();
      alarmStop.style.display = "inline-block";
      document.body.style.backgroundImage = "url('hack.gif')";
      document.body.style.backgroundSize = "contain";
      result.innerHTML = "Time expired";
      hack.innerHTML = "";
    }
  }, 1000);
});

alarmStop.addEventListener("click", e => {
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  audio.pause();
  audio.currentTime = 0;
  result.innerHTML = "0d: 0hr: 0m: 0s";
  alarmStop.style.display = "none";
  document.body.style.background = "linear-gradient(to right,#155799,#159957)";
  hack.innerHTML = "";
});
audio.addEventListener("playing", function() {
  typeMessage();
});
