$(document).ready(function () {
    var timeInterval;
    $('#poll-results').hide();
    loadSavedData();

    // Timer logic
    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var t = getTimeRemaining(endtime);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                $('#clock-div div > span').css({'background-color': 'red'});
                clearInterval(timeInterval);
                var userAnswer = confirm('You run out of time! Do you want to try it again?');
                if (userAnswer) {
                    $('#clock-div div > span').css({'background-color': '#1fe50e'});
                    initializeClock('clock-div', new Date(Date.parse(new Date()) + 5 * 60 * 1000));
                }
            }
        }

        updateClock();
        timeInterval = setInterval(updateClock, 1000);
    }

    var deadline = new Date(Date.parse(new Date()) + 5 * 60 * 1000);
    initializeClock('clock-div', deadline);

    // Questions logic
    localStorage.setItem('first-answer-correct', 'Yes');
    localStorage.setItem('second-answer-correct', 'It depends');
    localStorage.setItem('third-answer-correct', 'May be');

    var questionsDivs = $('div[id*="question"]');
    questionsDivs.each(function () {
        var questionNumber = $(this).attr('id');
        var currentInputs = $(this).children('input');
        currentInputs.each(function () {
            $(this).on('change', function () {
                var currentAnswer = $(this).next().text();
                localStorage.setItem(questionNumber, currentAnswer);
            });
        });
    });

    // Submit already filled poll
    $('#submit').on('click', function () {
        // Stop timer
        clearInterval(timeInterval);

        // Prevent submit without answer the questions
        if (!localStorage.getItem('first-question') || !localStorage.getItem('second-question') || !localStorage.getItem('third-question')) {
            alert('You have to answer all questions!');
            return;
        }

        var results = $('#poll-results');
        results.show();

        var firstPollQuestionAnswer = $('#first-question-answer');
        firstPollQuestionAnswer.text('Your answer: ' + localStorage.getItem('first-question'));
        checkAnswer('first-question', 'first-answer-correct', firstPollQuestionAnswer);

        var secondPollQuestionAnswer = $('#second-question-answer');
        secondPollQuestionAnswer.text('Your answer: ' + localStorage.getItem('second-question'));
        checkAnswer('second-question', 'second-answer-correct', secondPollQuestionAnswer);

        var thirdPollQuestionAnswer = $('#third-question-answer');
        thirdPollQuestionAnswer.text('Your answer: ' + localStorage.getItem('third-question'));
        checkAnswer('third-question', 'third-answer-correct', thirdPollQuestionAnswer);
    });

    function checkAnswer(question, answer, answerContainer) {
        if (localStorage.getItem(question) === localStorage.getItem(answer)) {
            answerContainer.append($('<span>').addClass('correct-message').text(' (Correct!)'));
        } else {
            answerContainer.append($('<span>').addClass('incorrect-message').text(' (Incorrect!)'));
        }
    }

    function loadSavedData() {
        switch (localStorage.getItem('first-question')) {
            case 'Yes':
                $('#first-question-yes').attr('checked', true);
                break;
            case 'No':
                $('#first-question-no').attr('checked', true);
                break;
            case 'May be':
                $('#first-question-maybe').attr('checked', true);
                break;
            case 'It depends':
                $('#first-question-it-depends').attr('checked', true);
                break;
        }

        switch (localStorage.getItem('second-question')) {
            case 'Yes':
                $('#second-question-yes').attr('checked', true);
                break;
            case 'No':
                $('#second-question-no').attr('checked', true);
                break;
            case 'May be':
                $('#second-question-maybe').attr('checked', true);
                break;
            case 'It depends':
                $('#second-question-it-depends').attr('checked', true);
                break;
        }

        switch (localStorage.getItem('third-question')) {
            case 'Yes':
                $('#third-question-yes').attr('checked', true);
                break;
            case 'No':
                $('#third-question-no').attr('checked', true);
                break;
            case 'May be':
                $('#third-question-maybe').attr('checked', true);
                break;
            case 'It depends':
                $('#third-question-it-depends').attr('checked', true);
                break;
        }
    }
});