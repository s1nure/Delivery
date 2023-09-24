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
