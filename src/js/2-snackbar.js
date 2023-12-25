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
    setTimeout(() => {
      resolve(delayValue);
      iziToast.success({
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        position: 'topRight',
      });
    }, delayValue);
  } else if (rejectBtn) {
    setTimeout(() => {
      reject(delayValue);
      iziToast.error({
        message: `❌ Rejected promise in ${delayValue}ms`,
        position: 'topRight',
      });
    }, delayValue);
  }
};

// активація кліку
const submitForm = e => {
  e.preventDefault();
  new Promise(createPromise);
};

form.addEventListener('submit', submitForm);
