
//Slider

let imgPhoneVert = document.querySelector('.phone-vert')
let imgPhoneGorizont = document.querySelector('.phone-gorizontal')
imgPhoneVert.addEventListener('click',function (event) {
    event.currentTarget.classList.toggle('.phone-vert-bg');
    event.currentTarget.classList.toggle('phone-vert-img');
})

imgPhoneGorizont.addEventListener('click',function (event) {
    event.currentTarget.classList.toggle('.phone-gorizontal-bg');
    event.currentTarget.classList.toggle('phone-gorizontal-img');
})


let sliderContent = document.querySelector('.slider_content')
for (i=0; i<sliderContent.children.length ;i++){
    if (i === 0 ){sliderContent.children[i].classList.add('display_active')}
    if (i === 0 ){continue}
    sliderContent.children[i].classList.add('display_none')
}

let arrowNext = document.querySelector('.arrow-next')
let arrowPrev = document.querySelector('.arrow-prev')

arrowNext.addEventListener('click',function (event) {
    let active = sliderContent.getElementsByClassName('display_active')[0]
    if(!!active.nextElementSibling){
        active.classList.add('display_none')
        active.classList.remove('display_active')
        active.classList.remove('display_active_animate_prev')
        active.nextElementSibling.classList.add('display_active')
        active.nextElementSibling.classList.add('display_active_animate_next')
        active.nextElementSibling.classList.remove('display_none')
    }else {
        active.classList.add('display_none')
        active.classList.remove('display_active')
        active.classList.remove('display_active_animate_prev')
        sliderContent.firstElementChild.classList.add('display_active')
        sliderContent.firstElementChild.classList.add('display_active_animate_next')
        sliderContent.firstElementChild.classList.remove('display_none')
    }
})

arrowPrev.addEventListener('click',function (event) {
    let active = sliderContent.getElementsByClassName('display_active')[0]
    if(!!active.previousElementSibling){
        active.classList.add('display_none')
        active.classList.remove('display_active')
        active.classList.remove('display_active_animate_next')
        active.classList.remove('display_active_animate_prev')
        active.previousElementSibling.classList.add('display_active')
        active.previousElementSibling.classList.add('display_active_animate_prev')
        active.previousElementSibling.classList.remove('display_none')
    }else {
        active.classList.add('display_none')
        active.classList.remove('display_active_animate_next')
        active.classList.remove('display_active')
        sliderContent.lastElementChild.classList.add('display_active')
        sliderContent.lastElementChild.classList.add('display_active_animate_prev')
        sliderContent.lastElementChild.classList.remove('display_none')
    }
})

//menu_nav

let navigationLinks = document.querySelector('.navigation')

function removeNavActive (elem = null){
    for (i=0; i<navigationLinks.children.length ;i++){
        navigationLinks.children[i].classList.remove('active')
    }
    if (elem){
        elem.classList.add('active')
    }
}

for (i=0; i<navigationLinks.children.length ;i++){
    if (i === 0 ){navigationLinks.children[i].classList.add('active')}
    navigationLinks.children[i].addEventListener('click',function (e) {
        e.preventDefault();
        removeNavActive(e.currentTarget);
        let elem = e.target.textContent.toLowerCase()
        document.querySelector(`#${elem}`).scrollIntoView({behavior: 'smooth' })
        history.pushState('', "", `#${elem}`);
    })
}

//Portfolio

let portfolioBottom = document.querySelector('.category-bottom')

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

for (i=0; i<portfolioBottom.children.length ;i++){
    if (i === 0 ){portfolioBottom.children[i].classList.add('active')}
    portfolioBottom.children[i].addEventListener('click',function (e) {
        for (i=0; i<portfolioBottom.children.length ;i++){
            portfolioBottom.children[i].classList.remove('active')
        }
        e.currentTarget.classList.add('active')
        let galleryCont = document.querySelector('.gallery')

        const divyArray = Array.prototype.slice.call(galleryCont.children)

        let nDivs = document.createDocumentFragment();

        while(divyArray.length){
            let numb = randomInteger(0, divyArray.length-1)
                nDivs.appendChild(divyArray[numb])
                divyArray.splice(numb, 1);

        }
        galleryCont.prepend(nDivs)
    })
}

let imgPorfolio = document.querySelector('.gallery').children
Array.prototype.forEach.call(imgPorfolio,(item)=>{
    item.addEventListener('click',function (e) {
        for (let i=0; i<imgPorfolio.length; i++){
            imgPorfolio[i].classList.remove('border-color-img')
        }
        e.currentTarget.classList.add('border-color-img')

    })
})

//form submit

let formSubmitBtn = document.querySelector('.form-submit')

let createMessageItem = (label, message ='') =>{
    let div = document.createElement('p');
    div.innerHTML = `${label}${message}`;
    return div
}

formSubmitBtn.addEventListener('click', function (e) {
    e.preventDefault()
    let message = document.createDocumentFragment();
    let form = e.currentTarget.form
    let elem = form.querySelectorAll('input')
    for(let i=0; i < elem.length; i++){
        elem[i].classList.remove('errors')
        if (elem[i].required && elem[i].value === ""){
            elem[i].classList.add('errors')
        }
    }
    if(!form.querySelector('.errors')){

        message.append(createMessageItem('The letter was sent'))
        for(let i=0; i < elem.length; i++){
            switch(elem[i].name) {
                case 'Subject':  // if (x === 'value1')
                    if (elem[i].value !== ""){
                        message.append(createMessageItem('Subject: ', elem[i].value))
                    }else {
                        message.append(createMessageItem('Without subject'))
                    }
                    break
            }
        }
        let descText = form.querySelector('textarea').value
        if (!!descText){
            message.append(createMessageItem('Description:', descText))
        }else {
            message.append(createMessageItem('Without description'))
        }

        let button = document.createElement('button');
        button.innerHTML = 'Ok'
        button.onclick = closeModal

        message.append(button)


        document.querySelector('.modal-wrapper').classList.remove('display_none')
        document.querySelector('.modal-text').innerHTML = "";
        document.querySelector('.modal-text').append(message)
    }else {
        alert('заполни обязательные поля')
    }
})

function resetForm() {
    let form = document.querySelector('#form')
    form.querySelectorAll('input').forEach(elem=>{
        elem.value = '';
    })
    form.querySelectorAll('textarea').forEach(elem=>{
        elem.value = '';
    })
}


function closeModal(){
    document.querySelector('.modal-wrapper').classList.add('display_none')
    resetForm()
}

//modal
let modalCloseBtn = document.querySelector('.modal-close')
modalCloseBtn.addEventListener('click', function (e) {
    closeModal()
})

//scroll

function getNavItem(val){
    let nav = document.querySelector('.navigation')
    let allLink = nav.querySelectorAll('a')
    for(let a = 0; a < allLink.length; a++){
        if(allLink[a].innerText.toLowerCase() === val){
            return allLink[a].parentNode
        }
    }
}

window.addEventListener('scroll', function() {
    //document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
    //console.log(pageYOffset)

    let home = document.querySelector('#home')
    let services = document.querySelector('#services')
    let portfolio = document.querySelector('#portfolio')
    let about = document.querySelector('#about')
    let contact = document.querySelector('#contact')

    if (pageYOffset <= home.offsetTop + 100 && pageYOffset >= home.offsetTop){
        removeNavActive(getNavItem('home'))
    }

    if (pageYOffset <= services.offsetTop + 100 && pageYOffset >= services.offsetTop - 100){
        removeNavActive(getNavItem('services'))
    }

    if (pageYOffset <= portfolio.offsetTop + 100 && pageYOffset >= portfolio.offsetTop - 100){
        removeNavActive(getNavItem('portfolio'))
    }

    if (pageYOffset <= about.offsetTop + 100 && pageYOffset >= about.offsetTop - 100){
        removeNavActive(getNavItem('about'))
    }

    if (pageYOffset <= contact.offsetTop + 100 && pageYOffset >= contact.offsetTop - 100){
        removeNavActive(getNavItem('contact'))
    }

});

//menu_mobile
let btnMenu = document.querySelector('#burger_menu')
let btnMenuClose = document.querySelector('#burger_menu_close')
let mobileMenu = document.querySelector('.menu_mobile');

let menuMobile = document.querySelector('.menu_mobile')
menuMobile.addEventListener('click', function (event) {
    let target = event.target; // где был клик?
    if (target != menuMobile) return;
    mobileMenu.classList.toggle('display_none')
})

btnMenu.addEventListener('click', function (e) {
    mobileMenu.classList.toggle('display_none')
})

btnMenuClose.addEventListener('click', function (e) {
    mobileMenu.classList.toggle('display_none')
})
