import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import {
	getDatabase,
	ref,
	get,
	push,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'

const firebaseConfig = {
	apiKey: 'AIzaSyDJ_CH4qF7d-fqAtbd9NukxqMrzzChDp-o',
	authDomain: 'delivery-4b405.firebaseapp.com',
	projectId: 'delivery-4b405',
	storageBucket: 'delivery-4b405.appspot.com',
	messagingSenderId: '59064033419',
	appId: '1:59064033419:web:e9bcef9ca506f0dd91f48e',
	measurementId: 'G-MN52VHVF05',
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const shopingButton = document.querySelector('#shoping-button')
const modal = document.querySelector('.modal')
const modalDialog = document.querySelector('.modal-dialog')
const closeButton = document.querySelector('.button-close')
const modalBody = document.querySelector('.modal-body')
const clearCart = document.querySelector('.button-clear-cart')
const PushOrderButton = document.querySelector('.pushOrderButton')

shopingButton.addEventListener('click', function (event) {
	console.log(localStorage.getItem('cart'))
	const storedCartString = localStorage.getItem('cart')
	if (!storedCartString) return
	const storedCart = JSON.parse(storedCartString)
	cart.length = 0
	storedCart.forEach(item => {
		cart.push(item)
	})
	renderCart()
	window.disableScroll()

	modal.classList.add('active')

	
})

closeButton.addEventListener('click', function (event) {
	modal.classList.remove('active')
	window.enableScroll()
})

new WOW().init()
modalBody.addEventListener('click', changeCount)
clearCart.addEventListener('click', () => {
	cart.length = 0
	renderCart()
})
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
const headerRestaurant = document.querySelector('#header-restaurant')
const titleMenu = document.querySelector('#Title-menu')
// const blockMenu = document.querySelector('.card-text')
const inputSearch = document.querySelector('.input-search')

const cart = []

const foodPrice = document.querySelector('.footer-price')

buttonToBackList.addEventListener('click', () => {
	sectionHeading.classList.remove('hide')
	cards.classList.remove('hide')

	swiper0.classList.remove('hide')
	swiper0.classList.add('swiper')
	buttonToBackList.classList.add('hide')

	cardsGood.innerHTML = ''
	headerRestaurant.innerHTML = ''
})
const getData = async function (url) {
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url}, статус ошибка ${response.status}`)
	}
	return response.json()
}

inputSearch.addEventListener('keypress', event => {
	if (event.code == 'Enter') {
		console.log('enter')
		const value = event.target.value
		if (!value) {
			cards.classList.remove('hide')
			titleMenu.textContent = 'Рестораны'
			cardsGood.innerHTML = ''
			return
		}

		cardsGood.innerHTML = ''
		cards.classList.add('hide')
		titleMenu.textContent = 'Результаты поиска'
		getData('./db/partners.json')
			.then(data => {
				return data.map(products => {
					return products
				})
			})
			.then(linkProducts => {
				console.log(linkProducts)

				linkProducts.forEach(link => {
					getData(`./db/${link.products}`).then(data => {
						console.log(data)

						const filteredData = data.filter(item =>
							item.name.toUpperCase().includes(value.toUpperCase())
						)
						filteredData.forEach(element => {
							createCardGood(element)
						})
					})
				})
			})
	}
})
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
function addToCard(event) {
	const target = event.target
	const buttonAddToCard = target.closest('.button-card-shoping')
	if (!buttonAddToCard) return

	const card = target.closest('.card')
	const title = card.querySelector('.card-title').textContent
	const price = card.querySelector('.card-price-bold').textContent
	const id = buttonAddToCard.id

	const food = cart.find(item => {
		return item.id === id
	})

	if (food) {
		food.count += 1
	} else {
		cart.push({
			id,
			title,
			price,
			count: 1,
		})
	}

	console.log(cart)
	const cartString = JSON.stringify(cart)
	localStorage.setItem('cart', cartString)
}
function renderCart() {
	const cartString = JSON.stringify(cart)
	localStorage.setItem('cart', cartString)
	modalBody.textContent = ''

	cart.forEach(item => {
		const itemCart = `
					<div class="food-row">
						<span class="food-name">${item.title}</span>
						<strong class="food-price">${item.price}</strong>
						<div class="food-counter">
							<button class="button-counter-minus" data-id="${item.id}">-</button>
							<span class="counter">${item.count}</span>
							<button class="button-counter-plus" data-id="${item.id}">+</button>
						</div>
					</div>
		`
		modalBody.insertAdjacentHTML('afterbegin', itemCart)
	})
	const totalPrice = cart.reduce((result, item) => {
		return (result += parseFloat(item.price) * item.count)
	}, 0)
	console.log(totalPrice)
	foodPrice.textContent = totalPrice + '₴'
	cart['fullPrice'] = totalPrice + '₴'
	
}
	PushOrderButton.addEventListener('click', () => {
		console.log(cart)
		console.log('1')
		const DeliveryDataRef = ref(database, 'DeliveryOrder')
		push(DeliveryDataRef, cart)
			.then(() => {
				console.log('Данные успешно сохранены в базе данных.')
			})
			.catch(error => {
				console.error('Ошибка при сохранении данных в базе данных:', error)
			})
	})
function changeCount(event) {
	const target = event.target
	console.log(target, target.classList.contains('button-counter-plus'))
	if (target.classList.contains('button-counter-plus')) {
		console.log(target)

		const food = cart.find(item => {
			return item.id === target.dataset.id
		})
		if (food) food.count++

		renderCart()
	}
	if (target.classList.contains('button-counter-minus')) {
		console.log(target)

		const food = cart.find(item => {
			return item.id === target.dataset.id
		})
		if (food) food.count--
		if (food.count === 0) {
			cart.splice(cart.indexOf(food), 1)
		}
		renderCart()
	}
}
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
			const url = restaurant.dataset.products
			getData(`./db/${url}`).then(data => {
				console.log(data)
				if (!data) return

				getData(`./db/partners.json`).then(res => {
					res.forEach(partner => {
						if (partner.id === data[0].p_id) {
							const headRes = `
							<div class="section-heading">
                    <h2 class="section-title">
                        ${partner.name}
                    </h2>
                    <div class="card-info">
                        <div class="raiting"><img src="img/star.svg" alt="star" class="star">${partner.stars}</div>
                        <div class="price">от ${partner.price}₴</div>
                        <div class="category">${partner.kitchen}</div>
                    </div>
                </div>
								`
							headerRestaurant.insertAdjacentHTML('beforeend', headRes)
						}
					})
				})

				data.forEach(element => {
					createCardGood(element)
				})
			})
			cardsGood.addEventListener('click', addToCard)
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
	localStorage.removeItem('cart')
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
		// for (var i = 0; i < hrefs.length; i++) {
		// 	hrefs[i].href = 'restaurant.html'
		// }
		shopingButton.style.display = 'flex'

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
	shopingButton.style.display = 'none'
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
	const { image, name, price, description, id } = element

	// card.id = id
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
                <button class="button button-primary button-card-shoping" id="${id}">
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
	console.log(restaurant)
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
                     <div class="price">от ${price}₴</div>
                     <div class="category">${kitchen}</div>
                 </div>
             </div>
         </div>
		`
	cards.insertAdjacentHTML('beforeend', card)
}
getData('./db/partners.json').then(data => {
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
