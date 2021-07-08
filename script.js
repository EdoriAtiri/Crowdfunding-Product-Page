const mobile_menu = document.querySelector('.menu_mobile');
const hamburger_menu = document.querySelector('.hamburger');
const dark_overlay = document.getElementById("dark");
const html_el = document.documentElement;
const links = document.querySelectorAll(".links")
const bookmark = document.querySelector(".bookmark"),
bookmark_div = document.getElementById("bookmark"),
bookmark_img = document.getElementById("bookmark_image");
const pledge_card = document.querySelectorAll('#back_this_project .card_pledge');
const back_this_btn = document.getElementById("back_project_btn"),
back_this_project = document.getElementById("back_this_project");
const close_this_btn = document.querySelector(".close");
const small_circles = document.querySelectorAll('.small_circle')

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
back_this_project.style.display = "none"
}

// Change Bookmark State
function bookmarked () {
bookmark.innerHTML = "Bookmarked";
bookmark_div.style.opacity = 1;
bookmark_div.style.color = "--dark_cyan";
bookmark_img.src = "images/icon-bookmark-cyan.svg";
}

// Open Back This Project Pledge Card
function open_back_this() {
    back_this_project.style.display = "block";
    dark_overlay.style.display = 'block'
}

// Close Back This Project Pledge Card
function close_back_this () {
    back_this_project.style.display = "none";
    dark_overlay.style.display = 'none'
}

// Function to close other detail summaries when one is open
const all_details = document.querySelectorAll(".detail");

all_details.forEach(det => {
    det.addEventListener('toggle', toggleOpenOnly)
})

function toggleOpenOnly (e) {
    if (this.open) {
        all_details.forEach(det => {
            const sm_circle = det.querySelector('.small_circle');

            if (det != this && det.open){
                det.open = false
            } else if (det == this && det.open) {
                small_circles.forEach(sc => {
                    if (sc == sm_circle){
                        sc.style.display = 'block'

                    }
                    else if (sc !== sm_circle) {
                        sc.style.display = 'none'  
                    }
                })
            }
          
        })
    }
}


// Function to add style effects when detail is open



// all_details.forEach(det => {
//     det.addEventListener('toggle', addDetStyle)
//     const eachCircle = det.querySelector('.small_circle');

//     function addDetStyle (e) {
//         if (this.open) {
//            all_details.forEach(det => {
//                if (det == this && det.open) {
//                    if (eachCircle == det.querySelector('.small_circle') ) {
//                        det.querySelector('.small_circle').style.display = 'block';
//                    } else {
//                          det.querySelector('.small_circle').style.display = 'none';
//                    }
//                 }
//            })
//         }
//     }


// })


// pledge_card.forEach(card => {
//     const card_details = card.querySelectorAll('.detail')
//     const sm_circle = card.querySelector('.small_circle');

//     card_details.forEach(card_detail => {

//         card_detail.addEventListener('click', () => {

//             card_details.forEach(detail => {
//                 if (detail === card_detail) {
//                     detail.querySelector('.small_circle').style.display = 'block;'
//                 } else {

//                      detail.removeAttribute("open")
//                     detail.querySelector('.small_circle').style.display = 'none;'
//                 }
//             }) 
//         })
    //     detail.addEventListener('click', () => {
    //     card.style.border = "10px solid black"
    //     sm_circle.style.display ='block'
    // })
    
//     })

// })


// Test
// onclick = () => {
//   console.log(
//     test.hasAttribute("open")
//   )
// }




// Event Listeners
hamburger_menu.addEventListener('click', open_menu)
dark_overlay.addEventListener('click', close_menu)
bookmark_div.addEventListener("click", bookmarked)
links.forEach(link => {
    link.addEventListener('click', close_menu)
}); 
back_this_btn.addEventListener('click', open_back_this);
close_this_btn.addEventListener('click', close_back_this);


