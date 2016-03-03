$(document).ready(function () {
    //options (1 - On, 0 - Off)
    var timer,
        autoSlide = 1,
        hoverPause = 1,
        autoSlideSeconds = 5000;

    $('#carousel-ul li:first').before($('#carousel-ul li:last'));

    //check if auto sliding is enabled
    if (autoSlide) {
        timer = setInterval('slide("right")', autoSlideSeconds);
    }

    //check if hover pause is enabled
    if (hoverPause == 1) {
        $('#carousel-ul').hover(function () {
            clearInterval(timer)
        }, function () {
            timer = setInterval('slide("right")', autoSlideSeconds);
        });
    }
});

function slide(where) {
    var selector = '#carousel-ul li',
        itemWidth = $(selector).outerWidth(),
        leftIndent;

    if (where == 'left') {
        leftIndent = parseInt($('#carousel-ul').css('left')) + itemWidth;
    } else {
        leftIndent = parseInt($('#carousel-ul').css('left')) - itemWidth;
    }

    $('#carousel-ul:not(:animated)').animate({'left': leftIndent}, 700, function () {
        if (where == 'left') {
            $(selector + ':first').before($(selector + ':last'));
        } else {
            $(selector + ':last').after($(selector + ':first'));
        }

        $('#carousel-ul').css({'left' : itemWidth * (-1)});
    });
}