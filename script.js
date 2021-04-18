const mobile_menu = document.querySelector('.menu_mobile');
const hamburger_menu = document.querySelector('.hamburger');
const dark_overlay = document.getElementById("dark");
const html_el = document.documentElement;
const links = document.querySelectorAll(".links")
const bookmark = document.querySelector(".bookmark"),
bookmark_div = document.getElementById("bookmark"),
bookmark_img = document.getElementById("bookmark_image");

// Open Mobile Menu
function open_menu () {
mobile_menu.style.display = 'flex';
mobile_menu.style.opacity = 1;
;
dark_overlay.style.display = 'block';
html_el.style.overflowY = "hidden";
}

// Close Mobile Menu
function close_menu () {
mobile_menu.style.display = 'none';
mobile_menu.style.opacity = 0;
dark_overlay.style.display = 'none';
html_el.style.overflowY = "auto";
}

// Change Bookmark State
function bookmarked () {
bookmark.innerHTML = "Bookmarked";
bookmark.style.backgroundColor = "var(--light_gray)";
bookmark_img.src = "images/icon-bookmark-cyan.svg"
}

// Event Listeners
hamburger_menu.addEventListener('click', open_menu)
dark_overlay.addEventListener('click', close_menu)
bookmark_div.addEventListener("click", bookmarked)
links.forEach(link => {
    link.addEventListener('click', close_menu)
}); 
