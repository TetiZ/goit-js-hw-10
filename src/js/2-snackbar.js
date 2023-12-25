'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const submitBtn = document.querySelector('button');

// Promises creation

const createPromise = (resolve, reject) => {
  const delayValue = form.elements.delay.value;
  const fulfillBtn = document.querySelector('[value="fulfilled"]:checked');
  const rejectBtn = document.querySelector('[value="rejected"]:checked');

  if (fulfillBtn) {
    setTimeout(() => resolve(delayValue), delayValue);
    iziToast.success({
      message: `✅ Fulfilled promise in ${delayValue}ms`,
      position: 'topRight',
    });
  } else if (rejectBtn) {
    setTimeout(() => reject(delayValue), delayValue);
    iziToast.error({
      message: `❌ Rejected promise in ${delayValue}ms`,
      position: 'topRight',
    });
  }
};

// активація кліку
const submitForm = e => {
  e.preventDefault();
  new Promise(createPromise);
};

form.addEventListener('submit', submitForm);
