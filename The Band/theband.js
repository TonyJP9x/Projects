const ticketButton = document.querySelectorAll('.buy-ticket-box')
for (button of ticketButton){
    button.addEventListener('click', function(e){
        e.preventDefault();
        const ticketModal = document.querySelector('.ticket-modal')
        ticketModal.classList.remove('showModal')
    })
}

const crossIcon = document.querySelector('.cross-icon')
crossIcon.addEventListener('click', (e)=>{
    e.preventDefault();
    const ticketModal = document.querySelector('.ticket-modal')
        ticketModal.classList.add('showModal')
})

const close = document.querySelector('.close-btn')
close.addEventListener('click', (e)=>{
    e.preventDefault();
    const ticketModal = document.querySelector('.ticket-modal')
        ticketModal.classList.add('showModal')
})

const barsIcon = document.querySelector('.bars-icon')
let header = document.querySelector('.header')
barsIcon.addEventListener('click',(e) => {
    e.preventDefault();
    if(header.clientHeight === 46){
        header.style.height = 'auto';
    } else{
        header.style.height = '46px';
    }
})
const menuItems = document.querySelectorAll('.navBtn a[href*="#"]')
for (menuItem of menuItems){
    menuItem.onclick = function(){
        header.style.height = '46px';
    }
}
