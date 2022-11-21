let [milliseconds, seconds, minutes] = [0, 0, 0];
let time = $('#lblTime');
let intervalID = null;

$(function () {
    clearInterval(intervalID);
    intervalID = setInterval(displayTimer, 10);

    function displayTimer() {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
        }

        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;
        let ms = milliseconds < 10 ? "0" + milliseconds : String(milliseconds).substring(0, 2);

        time.text(`${m} : ${s} : ${ms}`);
    }
});