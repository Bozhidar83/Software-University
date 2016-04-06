$(document).ready(function() {
    if (!localStorage.getItem('name')) {
        var name = prompt('Please, enter your name:', '');
        if (!name) {
            throw new Error('Invalid name!');
        }

        localStorage.setItem('name', name);
        localStorage.setItem('totalVisits', 1);
        sessionStorage.setItem('sessionVisits', 1);
    } else {
        localStorage.setItem('totalVisits', parseInt(localStorage.getItem('totalVisits')) + 1);
        if (!sessionStorage.getItem('sessionVisits')) {
            sessionStorage.setItem('sessionVisits', 1);
        } else {
            sessionStorage.setItem('sessionVisits', parseInt(sessionStorage.getItem('sessionVisits')) + 1);
        }

        var greeting = 'Welcome, ' + localStorage.getItem('name') + '!';
        $('#greeting').text(greeting);

        var visits = 'Your total visits on this page: ' + localStorage.getItem('totalVisits') + ' times.';
        $('#visits-count').text(visits);

        var visitsPerSession = 'For this session, you have visited this page: ' + sessionStorage.getItem('sessionVisits')
            + (sessionStorage.getItem('sessionVisits') === '1' ? ' time.' : ' times.');
        $('#visits-per-session').text(visitsPerSession);
    }
});