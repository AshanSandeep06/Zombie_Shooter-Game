let [milliseconds, seconds, minutes] = [0, 0, 0];
let time = $('#lblTime');
let intervalID = -1;

$(function () {
    $('#gamePlaySection').css('display', 'none');
    $('.hs').css('display', 'none');
    $('#btnStartPlay').css('display', 'block');
});

$('#btnPlay').on('click', function () {
    $('#homePageSection').css('display', 'none');
    $('#gamePlaySection').fadeIn(1000);
});

$('#btnStartPlay').on('click', function () {
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

    $('#btnStartPlay').fadeOut(500);
    $('.hs').fadeIn(1000);
});

/* --------------------------------------------------------------------------------------------------- */

/* To Move the rocket to left or right and sending bullets */
$(document).on('keydown', function (event) {
    var rocketPosition = $("#rocket").position();

    // To Move left, the Rocket
    // 37 ---> ArrowLeft
    if (event.keyCode === 37 && rocketPosition.left > 0) {
        $("#rocket").css('left', rocketPosition.left - 15 + 'px');
    }

    // To Move right, the Rocket
    // 39 ---> ArrowRight
    if (event.keyCode === 39 && rocketPosition.left <= 956) {
        $("#rocket").css('left', rocketPosition.left + 15 + 'px');
    }

    // To Fire bullets from the Rocket
    // 38 ---> ArrowUp && 32 ---> Space
    if (event.keyCode === 38 || event.keyCode === 32) {

    }

});
