window.addEventListener('DOMContentLoaded', function () {
  stopWatch();
});

function stopWatch() {
  const appendTens = document.getElementById('tens');
  const appendSeconds = document.getElementById('seconds');
  const buttonStart = document.getElementById('start');
  const buttonStop = document.getElementById('stop');
  const buttonReset = document.getElementById('reset');
  let seconds = '00';
  let tens = '00';
  let Interval;

  buttonStart.addEventListener('click', function () {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
  });

  buttonStop.addEventListener('click', function () {
    clearInterval(Interval);
  });

  buttonReset.addEventListener('click', function () {
    clearInterval(Interval);
    tens = '00';
    seconds = '00';
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
  });

  function startTimer() {
    tens++;

    if (tens <= 9) {
      appendTens.innerHTML = `0${tens}`;
    }

    if (tens > 9) {
      appendTens.innerHTML = tens;
    }

    if (tens > 99) {
      console.log('seconds');
      seconds++;
      appendSeconds.innerHTML = `0${seconds}`;
      tens = 0;
      appendTens.innerHTML = '00';
    }

    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }
  }
}
