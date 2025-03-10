import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
const inputDelay = form.querySelector('input[name="delay"]');
const inputState = form.querySelectorAll('input[name="state"]');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const delay = parseInt(inputDelay.value);
  const state = Array.from(inputState).find(radio => radio.checked).value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight'
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight'
      });
    });
});
