var checkbox = document.getElementById('invoice-checkbox');

function showInvoiceInfo(){
    var element = document.getElementById("invoice");
    if (checkbox.checked) {
        element.style.visibility = 'visible';
    } else {
        element.style.visibility = 'hidden';
    }
}

checkbox.addEventListener('change', showInvoiceInfo);

function clearForm(){
    window.location.reload();
}

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', clearForm);

function register(){
    alert("Under construction!!!");
}

var registerButton = document.getElementById('register');
registerButton.addEventListener('click', register);