const shopingButton = document.querySelector('#shoping-button')
const modal = document.querySelector('.modal')
const modalDialog = document.querySelector('.modal-dialog')
const closeButton = document.querySelector('.button-close')
shopingButton.addEventListener('click', function (event) {
	modal.classList.add('active')
})

closeButton.addEventListener('click', function (event) {
	modal.classList.remove('active')
})

new WOW().init()

const buttonAuth = document.querySelector('.button-auth')
const buttonCloseAuth = document.querySelector('.close-auth')
const modalAuth = document.querySelector('.modal-auth')

const logInform = document.querySelector('#logInform')
const inputLogin = document.querySelector('#login')
const inputPass = document.querySelector('#password')
const buttonOut = document.querySelector('.button-out')
const userName = document.querySelector('.user-name')
const cards = document.querySelector('.cards')
const hrefs = document.querySelectorAll('.href')
// const blockMenu = document.querySelector('.card-text')

function toggleAuth() {
	modalAuth.classList.toggle('active')
	inputLogin.style.borderColor = ''
	inputPass.style.borderColor = ''

	if (modalAuth.classList.contains('active')) {
		window.disableScroll()
	} else {
		window.enableScroll()
	}
}
let login = localStorage.getItem('gloDelivery')

function checkOut() {
	if (login) {
		authorized()
	} else {
		notAuthorized()
	}
}
checkOut()

function notAuthorized() {
	console.log('Не авторизован')
	cards.addEventListener('click', openGoods)
	for (var i = 0; i < hrefs.length; i++) {
		hrefs[i].removeAttribute('href')
	}

	function openGoods(event) {
		const target = event.target
		const restaurant = target.closest('.card')
		if (restaurant) {
			toggleAuth()
		}
	}

	function logIn(event) {
		event.preventDefault()
		login = inputLogin.value
		if (!inputLogin.value.trim() || !inputPass.value.trim()) {
			alert('Логін або пароль не були введені!!')
			if (!inputLogin.value.trim()) {
				inputLogin.style.borderColor = '#ff0000'
				inputLogin.value = ''
			}

			if (!inputPass.value.trim()) {
				inputPass.style.borderColor = '#ff0000'
				inputPass.value = ''
			}
			return
		}
		for (var i = 0; i < hrefs.length; i++) {
			hrefs[i].href = 'restaurant.html'
		}
		localStorage.setItem('gloDelivery', login)
		buttonAuth.style.display = 'none'
		toggleAuth()
		logInform.removeEventListener('submit', logIn)
		buttonAuth.removeEventListener('click', toggleAuth)
		buttonCloseAuth.removeEventListener('click', toggleAuth)
		cards.removeEventListener('click', openGoods)

		logInform.reset()
		checkOut()
	}
	logInform.addEventListener('submit', logIn)
	buttonAuth.addEventListener('click', toggleAuth)
	buttonCloseAuth.addEventListener('click', toggleAuth)
	modalAuth.addEventListener('click', function (event) {
		if (event.target.classList.contains('active')) {
			toggleAuth()
		}
	})
}
function authorized() {
	console.log('Авторизован')

	function logOut() {
		login = null
		buttonAuth.style.display = ''
		buttonOut.style.display = ''
		userName.style.display = ''
		localStorage.removeItem('gloDelivery')
		buttonOut.removeEventListener('click', logOut)
		checkOut()
	}
	userName.textContent = login
	buttonAuth.style.display = 'none'
	buttonOut.style.display = 'block'
	userName.style.display = 'block'
	buttonOut.addEventListener('click', logOut)
}

// function createCard() {
// 	const card = `
// 					<div class="card">
//              <a ><img src="img/carbonara.jpg" alt="carbonara" class="card-img"></a>
//              <div class="card-text">
//                  <div class="card-heading">
//                      <h3>Карбонара</h3>
//                      <span class="card-tag">1 час</span>
//                  </div>
//                  <div class="card-info">
//                      <div class="raiting"><img src="img/star.svg" alt="star" class="star">4.1</div>
//                      <div class="price">от 120₴</div>
//                      <div class="category">Пицца</div>
//                  </div>
//              </div>
//          </div>
// 		`
// 	cards.insertAdjacentHTML('beforeend', card)
// }
// createCard()
// createCard()
// createCard()
