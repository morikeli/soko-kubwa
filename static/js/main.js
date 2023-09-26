(function() {
	"use strict";

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim()
		if (all) {
		return [...document.querySelectorAll(el)]
		} else {
		return document.querySelector(el)
		}
	}

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		if (all) {
		select(el, all).forEach(e => e.addEventListener(type, listener))
		} else {
		select(el, all).addEventListener(type, listener)
		}
	}

	/**
	 * Easy on scroll event listener 
	 */
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener)
	}

	/**
	 * Sidebar toggle
	 */
	if (select('.toggle-sidebar-btn')) {
		on('click', '.toggle-sidebar-btn', function(e) {
		select('body').classList.toggle('toggle-sidebar')
		})
	}

	/**
	 * Search bar toggle
	 */
	if (select('.search-bar-toggle')) {
		on('click', '.search-bar-toggle', function(e) {
		select('.search-bar').classList.toggle('search-bar-show')
		})
	}

	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = select('#navbar .scrollto', true)
	const navbarlinksActive = () => {
		let position = window.scrollY + 200
		navbarlinks.forEach(navbarlink => {
		if (!navbarlink.hash) return
		let section = select(navbarlink.hash)
		if (!section) return
		if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
			navbarlink.classList.add('active')
		} else {
			navbarlink.classList.remove('active')
		}
		})
	}
	window.addEventListener('load', navbarlinksActive)
	onscroll(document, navbarlinksActive)

	/**
	 * Toggle .header-scrolled class to #header when page is scrolled
	 */
	let selectHeader = select('#header')
	if (selectHeader) {
		const headerScrolled = () => {
		if (window.scrollY > 100) {
			selectHeader.classList.add('header-scrolled')
		} else {
			selectHeader.classList.remove('header-scrolled')
		}
		}
		window.addEventListener('load', headerScrolled)
		onscroll(document, headerScrolled)
	}

	/**
	 * Back to top button
	 */
	let backtotop = select('.back-to-top')
	if (backtotop) {
		const toggleBacktotop = () => {
		if (window.scrollY > 100) {
			backtotop.classList.add('active')
		} else {
			backtotop.classList.remove('active')
		}
		}
		window.addEventListener('load', toggleBacktotop)
		onscroll(document, toggleBacktotop)
	}

	 /**
     * Intro type effect
     */
	const typed = select('.typed')
	if (typed) {
		let typed_strings = typed.getAttribute('data-typed-items')
		typed_strings = typed_strings.split(',')
		new Typed('.typed', {
			strings: typed_strings,
			loop: true,
			typeSpeed: 100,
			backSpeed: 50,
			backDelay: 2000
		});
	}

	/**
	 * Initiate tooltips
	 */
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})

	/**
	 * Autoresize echart charts
	 */
	const mainContainer = select('#main');
	if (mainContainer) {
		setTimeout(() => {
		new ResizeObserver(function() {
			select('.echart', true).forEach(getEchart => {
			echarts.getInstanceByDom(getEchart).resize();
			})
		}).observe(mainContainer);
		}, 200);
	}

	// Preloader
	let preloader = select('#preloader');
	if (preloader) {
			window.addEventListener('load', () => {
			preloader.remove()
		});
	}

})();