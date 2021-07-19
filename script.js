const mobile_menu = document.querySelector('.menu_mobile')
const hamburger_menu = document.querySelector('.hamburger')
const dark_overlay = document.getElementById("dark_overlay")
const html_el = document.documentElement
const links = document.querySelectorAll(".links")
const bookmark = document.querySelector(".bookmark"),
bookmark_div = document.getElementById("bookmark"),
bookmark_img = document.getElementById("bookmark_image")
const all_details = document.querySelectorAll(".detail")
const pledge_card = document.querySelectorAll('.reward_pledge')
const back_this_btn = document.getElementById("back_project_btn"),
back_this_project = document.getElementById("back_this_project")
const close_this_btn = document.querySelector(".close")
const small_circles = document.querySelectorAll('.small_circle')
const thanks = document.getElementById("thanks")


const amount_contributed = document.getElementById("current_total"),
no_of_backers = document.getElementById("no_of_backers"),
days_left = document.getElementById("days_left"),
current_progress = document.getElementById("live_progress")

const input = document.querySelectorAll('.pledged_amount')
const pledge_div = document.querySelectorAll('.enter_pledge')
const submit_btn = document.querySelectorAll('submit')
const about_card = document.querySelectorAll('#about .card')
let pledges_left = document.querySelectorAll('#about .card .pledges_left')
let pledges_left2 = document.querySelectorAll(".reward_pledge .pledges_left");


// Currency formatter
const currency_formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

// global variables
let total_amount = 89914
let backers = 5007
let progress = Math.floor(total_amount / 100000 * 100)
amount_contributed.innerHTML = currency_formatter.format(total_amount)
no_of_backers.innerHTML = backers.toLocaleString("en-US")
current_progress.value = progress  
pledges_left[0].innerHTML = pledges_left2[0].innerHTML 
pledges_left[1].innerHTML = pledges_left2[1].innerHTML


// Open Mobile Menu
function open_menu () {
mobile_menu.style.visibility = 'visible'
mobile_menu.style.opacity = 1
dark_overlay.style.display = 'block'
html_el.style.overflowY = "hidden"
}

// Close Mobile Menu
function close_menu () {
mobile_menu.style.visibility = 'hidden'
mobile_menu.style.opacity = 0
dark_overlay.style.display = 'none'
html_el.style.overflowY = "auto"
back_this_project.style.visibility = "hidden"
back_this_project.style.opacity = "0"
thanks.style.visibility = "hidden"
thanks.style.opacity = "0"
}

// Change Bookmark State
function bookmarked () {
bookmark.innerHTML = "Bookmarked"
bookmark_div.style.opacity = 1
bookmark_div.style.color = "--dark_cyan"
bookmark_img.src = "images/icon-bookmark-cyan.svg"
}

// Open Back This Project Pledge Card
function open_back_this() {
    back_this_project.style.visibility = "visible"
    back_this_project.style.opacity = "1"
    dark_overlay.style.display = 'block'
}

// Close Back This Project Pledge Card
function close_back_this () {
    back_this_project.style.visibility = "hidden"
    back_this_project.style.opacity = "0"
    dark_overlay.style.display = 'none'
}

// Function to close other detail summaries when one is open and add cyan radio button to opened card

all_details.forEach(det => {
    det.addEventListener('toggle', toggleOpenOnly)
})

function toggleOpenOnly (e) {
    if (this.open) {
        all_details.forEach(det => {
          
            // To Close other tabs when one is open
            if (det != this && det.open){
                det.open = false
            }
        })
    }
}



// Function to get input value and append it to amount and backers
pledge_div.forEach(pledge => {
    const pledge_input = pledge.querySelector('.pledged_amount')
    const pledge_submit = pledge.querySelector('.submit')

    //On click of submit button
    pledge_submit.addEventListener('click', submit_value
    )
    // On enter keydown
    pledge_input.addEventListener('keydown', function(event) {
        if(event.key === "Enter") {
            submit_value()
                }
    })

    
    function submit_value () {
        if (pledge_input.value !== "" || pledge_input.value != 0) {
        total_amount += parseInt(pledge_input.value)
        backers++
        progress = Math.floor((total_amount / 100000 * 100)
        )
         total_backer_update()
         show_thanks()
        } else if(!pledge_input.min && pledge_input.value == "" ) {
            alert("Please enter a value")
        }
    }

})


// Show thanks for support modal
    function show_thanks() {
        thanks.style.visibility = "visible"
        thanks.style.opacity = "1"
        dark_overlay.style.display = 'block'
        back_this_project.style.visibility = "hidden"
        back_this_project.style.opacity = "0"
    }
// Close modal with got it button
    thanks.querySelector('.btn').addEventListener('click', () => {
        thanks.style.visibility = "hidden"
        thanks.style.opacity = "0"
        dark_overlay.style.display = 'none'
    })


// Update total amount and backers in dom
function total_backer_update() {
    // Update amount_contributed and no_of_backers
    amount_contributed.innerHTML = currency_formatter.format(total_amount)
    no_of_backers.innerHTML = backers.toLocaleString("en-US")
    current_progress.value = progress
    // Clear input after delay of 1s
    input.forEach(input => {
        setTimeout(() => {
            input.value = ""
        }, 15000);
    })
}

// Reduces pledges left after every submit and success card pops up and when pledges remain 0 disable card
pledge_card.forEach(card => { 
     const pledged_amount = card.querySelector('.pledged_amount')
     const input = card.querySelector('.currency input')
    card.querySelector('.submit').addEventListener('click', reduce_pledge)
    input.addEventListener('keydown', function(event) {
        if(event.key === "Enter") {
            reduce_pledge()
                }
    })

    function reduce_pledge() {
        let  remaining_pledges = card.querySelector('.pledges_left')
      
        if (remaining_pledges.innerHTML != 0 && pledged_amount.value >= input.min){
           remaining_pledges.innerHTML--
            pledges_left[0].innerHTML = pledges_left2[0].innerHTML 
            pledges_left[1].innerHTML = pledges_left2[1].innerHTML
        } else if (pledged_amount.value < input.min) {
            alert(`Please enter a value equal to or  greater than $${input.min}`)
        }
        
        // Grey out pledge card and about card if there are no pledges left 
        grey_out(card.querySelector('.pledges_left'), card)
        about_card.forEach(card => {
            grey_out(card.querySelector('.pledges_left'), card)
        })
    }
})


// Grey out
function grey_out (item1, item2) {
    if (item1.innerHTML == 0) {
                item2.classList.add('grey_out_disable')
            }
}


// Event Listeners
hamburger_menu.addEventListener('click', open_menu)
dark_overlay.addEventListener('click', close_menu)
bookmark_div.addEventListener("click", bookmarked)
links.forEach(link => {
    link.addEventListener('click', close_menu)
}) 
back_this_btn.addEventListener('click', open_back_this)
close_this_btn.addEventListener('click', close_back_this)




