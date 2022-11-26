let [milliseconds, seconds, minutes] = [0, 0, 0];
let time = $('#lblTime');
let intervalID = -1;
$("#txtScore").val(0);
let movZomIntervalID = -1;

$(function () {
    $('#level_1_section').css('display', 'none');
    $('.hs, .bullet').css('display', 'none');
    $('#btnStartPlay').css('display', 'block');

    /* For GameWin modal (This modal is not closed when click outside of this modal) */
    $('#gameWinModal').modal({backdrop: 'static', keyboard: false});
    $('#gameLostModal').modal({backdrop: 'static', keyboard: false});
});

$('#btnPlay').on('click', function () {
    $('#homePageSection').css('display', 'none');
    $('.bullet').css('display', 'block');
    $('#level_1_section').fadeIn(1000);
});

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

$('#btnStartPlay').on('click', function () {
    clearInterval(intervalID);
    intervalID = setInterval(displayTimer, 10);

    $('#btnStartPlay').fadeOut(500);
    $('.hs').fadeIn(1000);

    movZomIntervalID = window.setInterval(moveZombies, 750);
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
    if (event.keyCode === 39 && rocketPosition.left < 956) {
        $("#rocket").css('left', rocketPosition.left + 15 + 'px');
    }

    // To Fire bullets from the Rocket
    // 38 ---> ArrowUp && 32 ---> Space
    if ($('#btnStartPlay').css('display') === "none") {
        if (event.keyCode === 38 || event.keyCode === 32) {
            if (event.keyCode === 38) {
                fireBullets(rocketPosition);
            } else {
                fireBullets(rocketPosition);
            }
        }
    }

});

function fireBullets(rocketPosition) {
    var bullet = $('<div>');
    bullet.css('display', 'none');
    bullet.attr('class', 'bullet');
    $("#level_1_gamePlayContainer").append(bullet);

    var moveBullet = setInterval(function () {
        var bulletPosition = parseInt(window.getComputedStyle($(bullet).get(0)).getPropertyValue("bottom"));

        if (bulletPosition > 700) {
            clearInterval(moveBullet);
        }

        bullet.css('left', rocketPosition.left + "px");
        bullet.css('display', 'block');
        bullet.css('bottom', bulletPosition + 10 + "px");

        destroyingZombies($(bullet).get(0));
    }, 8);
}

$(document).on('keyup', function (event) {
    if ($('.hs').css('display') === 'block') {
        if (event.keyCode === 38 || event.keyCode === 32) {
            var shootSound = new Audio('assets/audio/ShootSound.mp3');
            shootSound.play();
        }
    }
});

// run the currently selected effect
/*function runEffect(object) {
    console.log($(object))
    var options = {};
    var selectedEffect = 'explode';
    // Run the effect
    $(object).hide( selectedEffect, options, 1000, this.callback);

    this.callback = function() {
        setTimeout(function() {
            $(object).removeAttr( "style" ).hide();
        }, 1000 );
    }

}*/

function destroyingZombies(bullet) {
    var displayedZombies = $('.display-zombies');

    for (let zombie of displayedZombies) {
        var bulletPosition = bullet.getBoundingClientRect();
        var zombiePosition = $(zombie).get(0).getBoundingClientRect();

        if (bulletPosition.right <= zombiePosition.right && bulletPosition.left >= zombiePosition.left &&
            bulletPosition.top >= zombiePosition.top && bulletPosition.bottom <= zombiePosition.bottom) {
            $(zombie).css('display', 'none');
            // runEffect($(zombie));
        }
    }
}

var count = 0;

function moveZombies() {
    var displayedZombies = $('.display-zombies');

    for (let zombie of displayedZombies) {
        var randomValue = Math.floor((Math.random() * 50) + 1);

        var existTopValue = parseInt($(zombie).css('top'));
        var newTopValue = existTopValue + randomValue;
        $(zombie).css('top', newTopValue + "px");

        if (newTopValue > 679) {
            // count++;
            /* 2022-11-26 */
            $('#rocket').css('display', 'none');
            clearInterval(intervalID);
            clearInterval(movZomIntervalID);
            $('#gameLostModal').modal('show');
            $('#gameLostModal').show();
        }

        var destroyedZombiesCount = 0;

        if ($('.hs').css('display') === 'block') {
            for (let i = 0; i < displayedZombies.length; i++) {
                if ($(displayedZombies[i]).css('display') === "none") {
                    destroyedZombiesCount++;
                }
            }
        }

        if (destroyedZombiesCount === displayedZombies.length) {
            $('#rocket').css('display', 'none');
            clearInterval(intervalID);
            $('#gameWinModal').modal('show');
            $('#gameWinModal').show();
        }
    }
}

$('#btnPlayAgain').on('click', function () {
    /*$('#level_1_section').css('display', 'none');
    $('#level_1_section').fadeIn(1000);*/

    $('#gameWinModal').modal('hide');
    clearInterval(intervalID);
    clearInterval(movZomIntervalID);
    $('.display-zombies').css('top', '0px');

    $('#rocket').css({left: "auto"});

    milliseconds = 0;
    seconds = 0;
    minutes = 0;

    $('#btnStartPlay').css('display', 'block');
    $('#lblTime').text("00 : 00 : 00");
});