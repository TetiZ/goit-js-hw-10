'use strict';

//1. Використовуючи делегуваня, відстежуй на формі подію input і щоразу //записуй у локальне сховище об'єкт з полями email і message, у яких //зберігай поточні значення полів форми. Нехай ключем для сховища буде //рядок "feedback-form-state".

const form = document.querySelector('.feedback-form');

form.addEventListener('input', saveToStorage);

function saveToStorage(e) {
  e.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  const providedData = JSON.stringify({ email: email, message: message });

  const storageKey = 'feedback-form-state';
  localStorage.setItem(storageKey, providedData);
}

//2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є //збережені дані, то заповнюй ними поля форми. В іншому випадку поля //повинні бути порожніми.

window.addEventListener('load', fillFormFields);

function fillFormFields(e) {
  e.preventDefault();

  const inStorage = localStorage.getItem('feedback-form-state');

  if (inStorage) {
    const storedData = JSON.parse(inStorage);
    form.elements.email.value = storedData.email;
    form.elements.message.value = storedData.message;
  } else {
    form.elements.email.value = '';
    form.elements.message.value = '';
  }
}

//3. Під час сабміту форми очищай сховище і поля форми, а також виводь у //консоль об'єкт з полями email, message та їхніми поточними значеннями.

form.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();

  const inStorage = localStorage.getItem('feedback-form-state');
  console.log(JSON.parse(inStorage));

  localStorage.removeItem('feedback-form-state');
  form.reset();
}
