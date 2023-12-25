'use strict';

// Імпорти
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// x-mas :)

iziToast.show({
  image: '../img/x-mas.jpg',
  imageWidth: 150,
  position: 'center',
  title: `Merry X-mas!`,
  message: `Спасибі, що допомагаєте навіть у свята:)`,
  layout: 2,
});

// Змінні

const input = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('button');
startBtn.setAttribute('disabled', true);

let userSelectedDate;

const daysQuantity = document.querySelector('[data-days]');
const hoursQuantity = document.querySelector('[data-hours]');
const minutesQuantity = document.querySelector('[data-minutes]');
const secondsQuantity = document.querySelector('[data-seconds]');

let timeCounter;

// ********** ВИБІР ДАТИ ************

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= new Date().getTime()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.removeAttribute('disabled');
    }
  },
};

const datePicker = flatpickr(input, options);

// ********** ВІДЛІК ЧАСУ ************

// Інтервал - налаштування роботи таймера

const startTimer = () => {
  const timerId = setInterval(() => {
    const selectedDate = userSelectedDate.getTime();
    const currentDate = Date.now();

    const timeDifference = selectedDate - currentDate;
    if (timeDifference > 0) {
      timeCounter = convertMs(timeDifference);
      updateTimerDisplay();
    } else {
      clearInterval(timerId);
    }
  }, 1000);
  startBtn.setAttribute('disabled', true);
};

// налаштування конвертації часу в дні, години, хвилини, секунди

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

// налаштування оновлення значень на сторінці

const updateTimerDisplay = () => {
  daysQuantity.textContent = formatNumbers(timeCounter.days);
  hoursQuantity.textContent = formatNumbers(timeCounter.hours);
  minutesQuantity.textContent = formatNumbers(timeCounter.minutes);
  secondsQuantity.textContent = formatNumbers(timeCounter.seconds);
};

// форматування чисел
const formatNumbers = value => {
  return value.toString().padStart(2, '0');
};
// активація кнопки і таймера
startBtn.addEventListener('click', startTimer);
