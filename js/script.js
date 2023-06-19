//раскрыващийся список (аккордеон)
const accordionList = document.querySelectorAll('.accordion_item')
accordionList.forEach(item => {
    item.addEventListener('click', clickToAccordion)
});

function clickToAccordion() {
   
    let heidthInfo = this.querySelector('.accordion__list_info').scrollHeight
    let content = this.querySelector('.accordion__list_info')

    if(content.style.height != 0) {
      this.classList.remove('active_accordion')
      content.style.height = null
    } else {
      this.classList.add('active_accordion')
      content.style.height = `${heidthInfo + 20}px`
    }
    
}

// шапка выпадает
window.addEventListener('scroll', scrollHandler);

function scrollHandler() {
  const header_two = document.getElementById('header_two')
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if(scrollTop > header.scrollHeight) {
    header_two.classList.add('drop_header')
  } else {
    header_two.classList.remove('drop_header')
  }
}

//проверка ввода телефона
const inputBlocks = document.querySelectorAll('.input_phone')

inputBlocks.forEach(item => {
  item.addEventListener('input', mask)
});


function mask(event) {
  let keyCode = event.keyCode;
  let pos = event.target.selectionStart;

  if (pos < 5) event.preventDefault();

  let matrix = "+7 (___)-___-__-__";
  let i = 0;
  let def = matrix.replace(/\D/g, "");
  let val = event.target.value.replace(/\D/g, "");

  if(val.slice(0, 1) !== '7') {
    val = '7' + val;
  }

  let new_value = matrix.replace(/[_\d]/g, function(a) {
    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
  });

  i = new_value.indexOf("_");
  if (i !== -1) {
    i < 5 && (i = 3);
    new_value = new_value.slice(0, i);
  }

  let reg = matrix
    .substr(0, event.target.value.length)
    .replace(/_+/g, function(a) {
      return "\\d{1," + a.length + "}";
    })
    .replace(/[+()]/g, "\\$&");

  reg = new RegExp("^" + reg + "$");
  if (
    !reg.test(event.target.value) ||
    keyCode > 47 && keyCode < 58 ||
    event.type === "blur" &&
    event.target.value.length < 5
  ) {
    event.target.value = new_value;
  }

  if (event.type === "blur" && event.target.value.length === 0) {
    event.target.placeholder = matrix;
  }
}

//появление подсказки 
const promptI = document.querySelector('.circle_i')

promptI.addEventListener('mouseover', mouseOverI)
promptI.addEventListener('mouseout', mouseOutI)

function mouseOverI() {
  let modalPromt = this.nextElementSibling
  this.classList.add('active-i')
  modalPromt.style="display:block"
  setTimeout(()=> {
    modalPromt.classList.add('show_i')
  },100)
}

function mouseOutI() {
  let modalPromt = this.nextElementSibling
  setTimeout(()=> {
    modalPromt.classList.remove('show_i')
    this.classList.remove('active-i')
  },5000)
  setTimeout(()=> {
    modalPromt.style="display:none"
  },5300)
  
}

//слайдер для тура
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  
});

//открытие видео по нажатию на блок 

const arrOtsyvi = document.querySelectorAll('.review')
const popup = document.querySelector('.video__popup')

arrOtsyvi.forEach(item => {
  item.addEventListener('click', clickYouTubeIcon)
});

function clickYouTubeIcon() {
  const blockImage = this.querySelector('.review_image')
  const urlBlock = blockImage.getAttribute("data-url")
  
  document.querySelector('body').classList.add('noscroll')
  popup.style = "display:flex"
  setTimeout(()=> {
    popup.classList.add('active')
  }, 100) 

  const iframeVideo = popup.querySelector('.iframePopup')
  iframeVideo.setAttribute("src", urlBlock)
}

// закрытие popup 

const closePopuper = popup.querySelector('.block__span-frame')
closePopuper.addEventListener('click', closePopup)

function closePopup() {
  popup.classList.remove('active')
  setTimeout(()=> {
    popup.style = "display:none"
  },300)
  document.querySelector('body').classList.remove('noscroll')
}

//прелоадер
window.onload = function () {
  let preloader = document.getElementById('preloader');
  preloader.style.display = 'none'
}

//выезжающая кнопка наверх
const upBtn = document.querySelector('.block__up')

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    upBtn.classList.add('active__block_up');
  } else {
    upBtn.classList.remove('active__block_up');
  }
}

//бургер меню 
const burgerButton = document.querySelectorAll('.block__hamb')
const burgerPopup = document.querySelector('.burger__popup')
const menu = document.querySelector('.menu')

burgerButton.forEach(item => {
  item.addEventListener('click', burderShow)
});

function burderShow() {
  burgerPopup.innerHTML = " "
  burgerPopup.append(menu)
  this.classList.toggle('active_burger')
  burgerPopup.classList.toggle('show_burger')
  document.querySelector('body').classList.toggle('noscroll')
}
