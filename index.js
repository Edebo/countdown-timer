const form = document.querySelector("form");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const result = document.querySelector("#result");

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
      result.innerHTML = "Time expired";
    }
  }, 1000);
});
