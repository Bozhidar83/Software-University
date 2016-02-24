var resetButton = document.getElementById('reset');

function reset(){
    window.location.reload();
}

resetButton.addEventListener('click', reset);

var validateButton = document.getElementById('validate');

function validate(){
    var email = document.getElementById('email');
    var emailText = email.value;
    var element = document.getElementById('check-field');
    element.innerText = emailText;

    var emailRegex = /(\S+@\S+\.\S+)/;
    var result = emailText.match(emailRegex);
    if (result !== null) {
        element.style.backgroundColor = 'lightgreen';
    } else {
        element.style.backgroundColor = 'red';
    }
}

validateButton.addEventListener('click', validate);