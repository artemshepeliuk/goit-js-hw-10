import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const datetimePicker = document.getElementById("datetime-picker");
    const timerButton = document.querySelector(".timer-btn");
    const timerFields = {
      days: document.querySelector("[data-days]"),
      hours: document.querySelector("[data-hours]"),
      minutes: document.querySelector("[data-minutes]"),
      seconds: document.querySelector("[data-seconds]")
    };
    let userSelectedDate = null;
    let countdownInterval = null;

    flatpickr(datetimePicker, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate && userSelectedDate.getTime() > new Date().getTime()) {
      timerButton.disabled = false;
    } else {
          iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight',
            timeout: 3000
          });

            timerButton.disabled = true;
        }
      }
    });

    function addLeadingZero(value) {
      return String(value).padStart(2, "0");
    }

    function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor((ms % hour) / minute);
      const seconds = Math.floor((ms % minute) / second);

      return { days, hours, minutes, seconds };
    }

    function updateTimer() {
      const timeLeft = userSelectedDate - new Date();
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(timeLeft);

      timerFields.days.textContent = addLeadingZero(days);
      timerFields.hours.textContent = addLeadingZero(hours);
      timerFields.minutes.textContent = addLeadingZero(minutes);
      timerFields.seconds.textContent = addLeadingZero(seconds);
    }

    timerButton.addEventListener("click", () => {
      timerButton.disabled = true;
      datetimePicker.disabled = true;
      countdownInterval = setInterval(updateTimer, 1000);
    });
