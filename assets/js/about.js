import { activeLink, mobileMenu } from './index.js'

AOS.init({
    delay: 50,
    duration: 500,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
});

window.onload = function() {
    activeLink();
}

mobileMenu();