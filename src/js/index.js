
import 'swiper/swiper-bundle.css';
import '../styles/index.scss';
import customSelect from 'custom-select';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);


document.addEventListener('DOMContentLoaded', () => {
	initSelect();
	initInputAmount();
	additionalInputToggle();
});

window.addEventListener('resize', () => {

});

const swiper = new Swiper(".mySwiper", {
	modules: [Navigation],
	spaceBetween: 10,
	slidesPerView: 4.5,
	freeMode: true,
	watchSlidesProgress: true,
	navigation: {
		nextEl: ".swiper-thumbs-button-next",
		prevEl: ".swiper-thumbs-button-prev",
	},
	769: {
		allowTouchMove: false,
		slidesPerView: 5,
	},
});

const gallery = document.getElementById('lg-swipper');
const galleryObject = lightGallery(gallery, {
	selector: '.swiper-slide',
	getCaptionFromTitleOrAlt: false,
	download: false,
	plugins: [lgZoom, lgThumbnail],
	mobileSettings: {
		controls: false,
		showCloseIcon: true,
		rotate: false
	}
});

gallery.addEventListener('lgBeforeSlide', (event) => {
	const { index, prevIndex } = event.detail;
	swiper.slideTo(index);
	swiper2.slideTo(index);
});

const fullscreenButton = document.getElementById("fullscreenButton");

fullscreenButton.addEventListener("click", () => {
	document.querySelectorAll('.mySwiper2 .swiper-slide')[swiper2.activeIndex].click()
});

const slidesCountElement = document.querySelector(".mySwiper2 .slides-count");
const slidesCount = document.querySelectorAll(".mySwiper2 .swiper-slide");

function updateSlidesCount(activeIndex) {
	slidesCountElement.innerHTML = (activeIndex + 1) + '/' + slidesCount.length;
}

const swiper2 = new Swiper(".mySwiper2", {
	modules: [Navigation, Thumbs],
	spaceBetween: 8,
	navigation: {
		nextEl: ".mySwiper2 .swiper-button-next",
		prevEl: ".mySwiper2 .swiper-button-prev",
	},
	thumbs: {
		swiper: swiper,
	},
	on: {
		slideChange: function () {
			updateSlidesCount(this.activeIndex);
		},
		init: function () {
			updateSlidesCount(this.activeIndex);
		}

	}
});




function additionalInputToggle() {
	const checkbox = document.querySelector('[custom-toggle]');
	const input = document.querySelector(`#${checkbox.getAttribute('custom-toggle')}`);
	let state = false;

	checkbox.querySelector('input').addEventListener('click', () => {
		if (!state) {
			input.classList.remove('d-none');
		} else {
			input.classList.add('d-none');
		}
		state = !state;
	});
}

function initSelect() {
	const selectEl = require("custom-select").default;
	customSelect('select');
}

function initInputAmount() {
	const blocks = document.querySelectorAll('[input-amount]');

	blocks.forEach(block => {
		block.querySelector('.input').addEventListener('input', () => {
			if (parseInt(block.querySelector('input').value) == 1 || parseInt(block.querySelector('input').value) < 2) {
				disableButton(block.querySelector('.btn-minus'), true)
			}

			if (parseInt(block.querySelector('input').value) < 1) {
				block.querySelector('.input').value = 1;
			}

			if (parseInt(block.querySelector('input').value) > 1) {
				disableButton(block.querySelector('.btn-minus'), false)
			}
		})

		block.querySelector('.btn-minus').addEventListener('click', () => {
			if (block.querySelector('.input').value > 1) {
				block.querySelector('.input').value = parseInt(block.querySelector('input').value) - 1;
			}

			if (block.querySelector('.input').value < 2) {
				disableButton(block.querySelector('.btn-minus'), true)
			}
		})

		block.querySelector('.btn-plus').addEventListener('click', () => {
			block.querySelector('.input').value = parseInt(block.querySelector('input').value) + 1;

			if (block.querySelector('.input').value > 1) {
				disableButton(block.querySelector('.btn-minus'), false)
			}
		})
	});


	function disableButton(elem, state) {
		elem.disabled = state;
	}
}

