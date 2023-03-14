import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const every = {
  dateTime: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hoursTimer: document.querySelector('span[data-hours]'),
  minutesTimer: document.querySelector('span[data-minutes]'),
  secondsTimer: document.querySelector('span[data-seconds]'),
};

const CURRENT_DATE = new Date();
let SELECTED_DATE = new Date();
let delta;

every.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < CURRENT_DATE) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
    } else {
      every.startButton.disabled = false;
      SELECTED_DATE = selectedDates[0];
      console.log(every.dateTime.value);
    }
  },
};

flatpickr(every.dateTime, options);
require('flatpickr/dist/themes/material_blue.css');

every.startButton.addEventListener('click', startTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days =
    Math.floor(ms / day) < 10
      ? addLeadingZero(Math.floor(ms / day))
      : Math.floor(ms / day);
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function startTimer() {
  every.startButton.disabled = true;
  every.dateTime.disabled = true;
  getDeltaTime();
}

function getDeltaTime() {
  startTimer = setInterval(() => {
    delta = SELECTED_DATE - Date.now();
    const dateOffset = convertMs(delta);

    if (delta <= 0) {
      clearInterval(timerId);
    } else {
      clockView(dateOffset);
    }
  }, 1000);
}

function clockView(dateOffset) {
  every.daysValue.textContent = dateOffset.days;
  every.hoursTimer.textContent = dateOffset.hours;
  every.minutesTimer.textContent = dateOffset.minutes;
  every.secondsTimer.textContent = dateOffset.seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
