const shopingButton = document.querySelector("#shoping-button");
const modal = document.querySelector(".modal");
const modalDialog = document.querySelector(".modal-dialog");
const closeButton = document.querySelector(".button-close");
shopingButton.addEventListener("click", function (event) {
    modal.classList.add("active");

});

closeButton.addEventListener("click", function (event) {
    modal.classList.remove("active")
});

new WOW().init();

const buttonAuth = document.querySelector('.button-auth');
const buttonCloseAuth = document.querySelector(".close-auth");
const modalAuth = document.querySelector(".modal-auth");

const logInform = document.querySelector("#logInform");
const inputLogin = document.querySelector("#login");
const inputPass = document.querySelector("#password");
const buttonOut = document.querySelector(".button-out");
const userName = document.querySelector(".user-name")

function toggleAuth() {
    modalAuth.classList.toggle('active');
}
let login = localStorage.getItem('gloDelivery');

function checkOut() {
    if (login) {
        authorized();
    }
    else {
        notAuthorized();
    }
}
checkOut();

function notAuthorized() {
    console.log('Не авторизован')


    function logIn(event) {
        event.preventDefault();
        login = inputLogin.value;
        if(!inputLogin.value || !inputPass.value){

            alert("Логін або пароль не були введені!!")
            return;
        }
        localStorage.setItem('gloDelivery',login);
        buttonAuth.style.display = 'none';
        toggleAuth();
        logInform.removeEventListener("submit", logIn);
        buttonAuth.removeEventListener('click', toggleAuth);
        buttonCloseAuth.removeEventListener('click', toggleAuth);
        logInform.reset();
        checkOut();

    }
    logInform.addEventListener("submit", logIn);
    buttonAuth.addEventListener('click', toggleAuth);
    buttonCloseAuth.addEventListener('click', toggleAuth);

}
function authorized() {
    console.log('Авторизован');

    function logOut() {
        login = null;
        buttonAuth.style.display = "";
        buttonOut.style.display = "";
        userName.style.display = "";
        localStorage.removeItem('gloDelivery');
        buttonOut.removeEventListener('click', logOut);
        checkOut();

    }
    userName.textContent = login;
    buttonAuth.style.display = "none";
    buttonOut.style.display = "block";
    userName.style.display = "block";
    buttonOut.addEventListener('click', logOut);

}


