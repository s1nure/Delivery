import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

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
const buttonToBackList = document.querySelector('#button-back-to-all-list')
const sectionHeading = document.querySelector('.section-heading')
const swiper0 = document.querySelector('.swiper')
const cardsGood = document.querySelector('.cards-goods')

// const blockMenu = document.querySelector('.card-text')

buttonToBackList.addEventListener('click', () => {
	sectionHeading.classList.remove('hide')
	cards.classList.remove('hide')

	swiper0.classList.remove('hide')
	swiper0.classList.add('swiper')
	buttonToBackList.classList.add('hide')

	cardsGood.innerHTML = ''
})
const getData = async function (url) {
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url},
статус ошибка ${response.status}`)
	}
	return response.json()
}

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

function openGoods(event) {
	const target = event.target
	const login = localStorage.getItem('gloDelivery')
	console.log(login)

	if (login) {
		const restaurant = target.closest('.card')
		console.log(restaurant)
		if (restaurant) {
			sectionHeading.classList.add('hide')
			cards.classList.add('hide')

			swiper0.classList.add('hide')
			swiper0.classList.remove('swiper')
			buttonToBackList.classList.remove('hide')
			getData(`./db/${restaurant.dataset.products}`).then(data => {
				console.log(data)
				data.forEach(element => {
					createCardGood(element)
				})
			})
		}
	} else {
		toggleAuth()
	}
}

function notAuthorized() {
	console.log('Не авторизован')
	cards.addEventListener('click', openGoods)
	for (var i = 0; i < hrefs.length; i++) {
		hrefs[i].removeAttribute('href')
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
		// cards.removeEventListener('click', openGoods)

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
	cards.addEventListener('click', openGoods)

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

function createCardGood(element) {
	const { image, name, price, description } = element

	const card = `
			<div class="card wow fadeInUp" data-wow-delay="0.2s">
        <img src="${image}" alt="carbonara" class="card-img">
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <div class="card-info">
                <div class="ingrediets">${description}</div>
            </div>
            <div class="card-buttons">
                <button class="button button-primary button-card-shoping">
                    <span class="button-card-text">В корзину</span>
                    <img src="img/shopping-cart-white.svg" alt="shoping_card" class="button-card-image">
                </button>
                <strong class="card-price-bold">${price}₴</strong>
            </div>
        </div>
    </div>
		`
	cardsGood.insertAdjacentHTML('beforeend', card)
}

function createCard(restaurant) {
	const {
		image,
		kitchen,
		name,
		price,
		stars,
		products,
		time_of_delivery: timeOfDelivery,
	} = restaurant
	const card = `
					<div class="card" data-products="${products}">
             <a ><img src="${image}" alt="carbonara" class="card-img"></a>
             <div class="card-text">
                 <div class="card-heading">
                     <h3>${name}</h3>
                     <span class="card-tag">${timeOfDelivery} минут</span>
                 </div>
                 <div class="card-info">
                     <div class="raiting"><img src="img/star.svg" alt="star" class="star">${stars}</div>
                     <div class="price">от ${price}</div>
                     <div class="category">${kitchen}</div>
                 </div>
             </div>
         </div>
		`
	cards.insertAdjacentHTML('beforeend', card)
}
getData('../db/partners.json').then(data => {
	data.forEach(element => {
		createCard(element)
	})
})

const swiper = new Swiper('.swiper', {
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: true,
	grabCursor: true,
})
