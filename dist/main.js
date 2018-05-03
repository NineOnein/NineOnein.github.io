'use strict';

var svg_container = document.getElementById("svg_container");
var s = Snap(svg_container);

var morph = function morph(sourceElementId, targetElementId) {
	for (var i = 0; i <= 7; i++) {
		var st1 = Snap.select('#' + sourceElementId + '_st' + i + ' > path');
		var st2 = Snap.select('#' + targetElementId + '_st' + i + '  > path');
		var st1Points = st1.node.getAttribute('d');
		var st2Points = st2.node.getAttribute('d');
		st1.animate({ d: st2Points }, 2000, mina.easeinout);
	}
};
document.addEventListener('DOMContentLoaded', function () {

	var main_container = document.querySelector('#main_container');

	var navContent = document.querySelector('.nav_content');
	var sidebar = document.querySelector('.nav_sidebar');
	var sidebarContent = document.querySelector('.nav_sidebar_content');
	var navOverlay = document.querySelector('#nav_overlay');

	sidebarContent.innerHTML = navContent.innerHTML;

	var button = document.querySelector('#nav_button');

	button.addEventListener('click', function (e) {
		e.preventDefault();

		sidebar.classList.remove('nav_sidebar_hidden');
		sidebar.classList.add('nav_sidebar_active');

		navOverlay.classList.remove('nav_overlay_hidden');
		navOverlay.classList.add('nav_overlay_active');
	});

	navOverlay.addEventListener('click', function (e) {
		e.preventDefault();

		sidebar.classList.add('nav_sidebar_hidden');
		sidebar.classList.remove('nav_sidebar_active');

		navOverlay.classList.add('nav_overlay_hidden');
		navOverlay.classList.remove('nav_overlay_active');
	});

	sidebar.addEventListener('click', function (e) {
		e.preventDefault();

		sidebar.classList.add('nav_sidebar_hidden');
		sidebar.classList.remove('nav_sidebar_active');

		navOverlay.classList.add('nav_overlay_hidden');
		navOverlay.classList.remove('nav_overlay_active');
	});
});
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */

window.smoothScrollTo = function (targetId, duration) {

	var target = document.getElementById(targetId);
	var endX = target.offsetLeft;
	var endY = target.offsetTop;

	var startX = window.scrollX || window.pageXOffset,
	    startY = window.scrollY || window.pageYOffset,
	    distanceX = endX - startX,
	    distanceY = endY - startY,
	    startTime = new Date().getTime();

	duration = typeof duration !== 'undefined' ? duration : 400;

	// Easing function
	var easeInOutQuart = function easeInOutQuart(time, from, distance, duration) {
		if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
		return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
	};

	var timer = window.setInterval(function () {
		var time = new Date().getTime() - startTime,
		    newX = easeInOutQuart(time, startX, distanceX, duration),
		    newY = easeInOutQuart(time, startY, distanceY, duration);
		if (time >= duration) {
			window.clearInterval(timer);
		}
		window.scrollTo(newX, newY);
	}, 1000 / 60); // 60 fps
};
var lastScrollTop = 0;
var scrollDirection = undefined;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
document.addEventListener("scroll", function () {
	// or window.addEventListener("scroll"....
	var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
	if (st > lastScrollTop) {
		scrollDirection = 'down';
	} else {
		scrollDirection = 'up';
	}
	lastScrollTop = st;
}, false);
window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function () {

	var scope = {};
	var trigger = new ScrollTrigger();
	trigger.callScope = scope;

	svg_container = document.getElementById('svg_container');

	morph('empty', 'earth');

	scope.morph = function (morphTarget) {
		//console.log('Visible element: '+this.id);

		morph('empty', morphTarget);
	};

	scope.morphPrev = function (morphTarget) {
		//console.log(scrollDirection);
		if (scrollDirection == 'up') {
			morph('empty', morphTarget);
		}
	};

	function dimOpacity() {
		svg_container.style.opacity = 0.2;
	}

	function incOpacity() {
		svg_container.style.opacity = 'initial';
	}
});