'use strict';

var TIMER_DELAY = 3000;

var headerMainBtn = document.querySelector('.header-main__popup-button');
var headerMain = document.querySelector('.header-main__nav');
var logoMain = document.querySelector('.header-main__logo');
var popupError = document.querySelector('.popup-error');
var popupDone = document.querySelector('.popup-done');
var errorBtn = document.querySelector('.popup-error__button');
var doneBtn = document.querySelector('.popup-done__button');
var slidesReview = document.querySelectorAll('.slider-reviews__item');
var labelsBtnReviews = document.querySelectorAll('.reviews__slider .slider-controls__label');
var inputsBtnReviews = document.querySelectorAll('.reviews__slider .slider-controls__input');
var labelsBtnPrice = document.querySelectorAll('.price__slider .slider-controls__label');
var inputsBtnPrice = document.querySelectorAll('.price__slider .slider-controls__input');
var btnLeftAll = document.querySelector('.slider-reviews__btn-left');
var btnRightAll = document.querySelector('.slider-reviews__btn-right');
var sliderDescriptionBtns = document.querySelector('.slider-reviews__description');
var sliderPriceTable = document.querySelector('.slider-price__table');
var mediaQueryList960 = window.matchMedia("(min-width: 960px)");
var mediaQueryList660 = window.matchMedia("(min-width: 660px) and (max-width: 959px)");
var mediaQueryList320 = window.matchMedia("(min-width: 320px) and (max-width: 659px)");
var currentEl = 0;
var targetLabel = 0;
var timerId = null;

// БРЕЙКПОИНТЫ
// function isWidthChange320(mql) {
//   if(mql.matches) {
//     currentEl = 0;
//     targetLabel = 0;
//
//     getInputsRemoveChecked(inputsBtnPrice);
//     getSlidesHidden();
//
//     if(sliderPriceTable) {
//       sliderPriceTable.style.transform = 'translateX(-42.4%)';
//     }
//
//     if(inputsBtnPrice[1]) {
//       inputsBtnPrice[1].checked = true;
//     }
//
//     if(inputsBtnReviews[0]) {
//       inputsBtnReviews[0].checked = true;
//     }
//
//     if(slidesReview[0]) {
//       slidesReview[0].style.order = '-1';
//       slidesReview[0].style.transform = 'translateX(0)';
//     }
//   }
// }
// mediaQueryList320.addListener(isWidthChange320);
// isWidthChange320(mediaQueryList320);
//
// function isWidthChange660(mql) {
//   if(mql.matches) {
//     currentEl = 0;
//     targetLabel = 0;
//
//     getInputsRemoveChecked(inputsBtnReviews);
//     getSlidesHidden();
//
//     if(sliderPriceTable) {
//       sliderPriceTable.style.transform = 'translateX(0)';
//     }
//
//     if(inputsBtnReviews[0]) {
//       inputsBtnReviews[0].checked = true;
//     }
//
//     if(slidesReview[0]) {
//       slidesReview[0].style.order = '-1';
//       slidesReview[0].style.transform = 'translateX(0)';
//     }
//   }
// }
// mediaQueryList660.addListener(isWidthChange660);
// isWidthChange660(mediaQueryList660);
//
// function isWidthChange960(mql) {
//   if(mql.matches) {
//     currentEl = 0;
//     targetLabel = 0;
//
//     getInputsRemoveChecked(inputsBtnReviews);
//     getSlidesHidden();
//
//     if(sliderPriceTable) {
//       sliderPriceTable.style.transform = 'translateX(0)';
//     }
//
//     if(inputsBtnReviews[0]) {
//       inputsBtnReviews[0].checked = true;
//     }
//
//     if(slidesReview[0]) {
//       slidesReview[0].style.order = '-1';
//       slidesReview[0].style.transform = 'translateX(0)';
//     }
//   }
// }
// mediaQueryList960.addListener(isWidthChange960);
// isWidthChange960(mediaQueryList960);

// КАРТА
function initMap() {
  var uluru = {lat: 59.936143, lng: 30.321058};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: 'img/marker-map.png'
  });
}

function isEscPressEvent(e, action) {
  if(e.keyCode === 27) {
    action();
  }
}

function onEscPressClick(e) {
  isEscPressEvent(e, onPopupCloseClick)
}
document.addEventListener('keydown', onEscPressClick);

// ПОПАП МЕНЮ
function onPopupOpenClick() {
  headerMain.classList.add('main-nav--opened');
  headerMainBtn.classList.remove('header-main__popup-button--closed');
  headerMainBtn.classList.add('header-main__popup-button--opened');
  logoMain.classList.add('header-main__logo--change-color');
  headerMainBtn.removeEventListener('keydown', onEscPressClick);
}

function onPopupCloseClick() {
  headerMain.classList.remove('main-nav--opened');
  headerMainBtn.classList.remove('header-main__popup-button--opened');
  headerMainBtn.classList.add('header-main__popup-button--closed');
  logoMain.classList.remove('header-main__logo--change-color');
}

headerMainBtn.addEventListener('click', function () {
  headerMain.classList.contains('main-nav--opened') ? onPopupCloseClick() : onPopupOpenClick();
});

headerMain.classList.remove('main-nav--opened');
headerMainBtn.classList.remove('header-main__popup-button--none');
headerMainBtn.classList.remove('header-main__popup-button--opened'); // Не удалять класс header-main__popup-button--opened у кнопки
logoMain.classList.remove('header-main__logo--change-color');

// ПОПАП В ФОРМЕ
function modalMessage(btn, cls, modal) {
  btn.addEventListener('click', function () {
    if (btn.classList.contains(cls + '__button')) {
      modal.classList.remove(cls + '--closed')
    }
  });
}

if (doneBtn) {
  modalMessage(doneBtn, 'popup-done', popupDone);
}

if (errorBtn) {
  modalMessage(errorBtn, 'popup-error', popupError);
}

// CЛАЙДЕР - ОТЗЫВЫ

// // Скрывает слайды
// function getSlidesHidden() {
//   [].forEach.call(slidesReview, function (it, i) {
//     it.data = i;
//
//     if(targetLabel === 0) {
//       it.style.transform = 'translateX(10000px)';
//
//     } else {
//       it.style.transform = 'translateX(-10000px)';
//     }
//   });
// }
//
// // На всех инпутах удаляет checked
// function getInputsRemoveChecked(el) {
//   [].forEach.call(el, function (it, i) {
//     it.data = i;
//     it.checked = false;
//   });
// }
//
// // Меняет порядковый номер слайда с последнего на первый
// function getEndSlides() {
//   if (currentEl === slidesReview.length - 1) {
//     currentEl = 0;
//     labelsBtnReviews[currentEl].click();
//   }
// }
//
// // Обновляет таймер
// function refreshTimer(cb, ms) {
//   if (timerId) {
//     clearTimeout(timerId);
//   }
//
//   timerId = setTimeout(function () {
//     cb();
//     }, ms);
// }
//
// // Обработчик клика по лэйблу
// function onLabelClick(e) {
//   if(targetLabel > e.target.data) {
//     targetLabel = e.target.data;
//     slidesReview[targetLabel].style.transform = 'translateX(-10000px)';
//
//     for (var i = e.target.data; i < slidesReview.length; i++) {
//       slidesReview[i].style.order = '1';
//       slidesReview[i].style.transform = 'translateX(10000px)';}
//
//   } else {
//     targetLabel = e.target.data;
//     slidesReview[targetLabel].style.transform = 'translateX(10000px)';
//
//     for (var j = 0; j < e.target.data; j++) {
//       slidesReview[j].style.order = '1';
//       slidesReview[j].style.transform = 'translateX(-10000px)';
//     }
//   }
//   slidesReview[e.target.data].style.order = '-1';
//   slidesReview[e.target.data].style.transform = 'translateX(0)';
//   currentEl = e.target.data;
// }
//
// // Добавляет обработчики по клику на лэйбл
// function getLabelsData() {
//   [].forEach.call(labelsBtnReviews, function (it, i) {
//     it.data = i;
//
//     it.addEventListener('click', function (e) {
//       onLabelClick(e);
//
//       refreshTimer(autoChangeSlides, TIMER_DELAY);
//     });
//   });
// }
// getLabelsData();
//
// // Нажатие на правую стрелку
// function onBtnArrowRightClick() {
//   if(btnRightAll[slidesReview.length - 1]) {
//     btnRightAll[slidesReview.length - 1].style.display = 'none';
//   }
//
//   [].forEach.call(btnRightAll, function (it) {
//     it.addEventListener('click', function () {
//       getEndSlides();
//
//       slidesReview[currentEl].style.order = '1';
//       slidesReview[currentEl].style.transform = 'translateX(-10000px)';
//       currentEl = currentEl + 1;
//       slidesReview[currentEl].style.transform = 'translateX(0)';
//       slidesReview[currentEl].style.order = '-1';
//     })
//   })
// }
// onBtnArrowRightClick();
//
// // Нажатие на левую стрелку
// function onBtnArrowLeftClick() {
//   if(btnLeftAll[0]) {
//     btnLeftAll[0].style.display = 'none';
//   }
//
//   [].forEach.call(btnLeftAll, function (it) {
//     it.addEventListener('click', function () {
//       slidesReview[currentEl].style.order = '1';
//       slidesReview[currentEl].style.transform = 'translateX(10000px)';
//       currentEl = currentEl - 1;
//       slidesReview[currentEl].style.transform = 'translateX(0)';
//       slidesReview[currentEl].style.order = '-1';
//     })
//   });
// }
// onBtnArrowLeftClick();
//
// // Обработчик автопереключения слайдов
// function autoChangeSlides() {
//   getEndSlides();
//
//   setTimeout(function () {
//     if (btnRightAll[currentEl] || labelsBtnReviews[currentEl]) {
//       btnRightAll[currentEl].click();
//       labelsBtnReviews[currentEl].click();
//     }
//   }, TIMER_DELAY / 2);
//
//   setTimeout(function () {
//     autoChangeSlides();
//   }, TIMER_DELAY)
// }
//
// // Первоначально запускает таймер
// timerId = setTimeout(autoChangeSlides, TIMER_DELAY);
//
// // Значения по умолчанию
// if(sliderDescriptionBtns) {
//   slidesReview[0].style.transform = 'translateX(0)';
//   inputsBtnReviews[0].checked = true;
// }

function Slider(slides, arrowLeftAll, arrowRightAll, dots) {
  this.timerDelay = 6000;
  this.current = 0;
  this.last = 0;
  this.allSlides = Array.from(slides);
  this.lengthSlides = Array.from(slides).length - 1;
  this.prevBtn = arrowLeftAll;
  this.nextBtn = arrowRightAll;
  this.dots = dots;
  this.timerId = null;

  Object.defineProperties(this, {
    next: {
      get: function () {
        var next = this.current + 1;

        if (next > this.lengthSlides) {
          next = 0
        }

        return next;
      }
    },

    prev: {
      get: function () {
        var prev = this.current - 1;

        if (prev < 0) {
          prev = this.lengthSlides;
        }

        return prev;
      }
    }
  })
}

Slider.prototype.init = function () {
  var self = this;

  this.prevBtn.addEventListener('click', this.prevSlide.bind(this));
  this.nextBtn.addEventListener('click', this.nextSlide.bind(this));

  this.allSlides.forEach(function (it) {
    it.style.order = '1';
    it.style.transform = 'translateX(10000px)';
  });

  [].forEach.call(this.dots, function (it, i) {
    it.addEventListener('click', function () {
      self.changeSlide(i);
    })
  });

  this.changeSlide(0);
  this.timer();
};

Slider.prototype.nextSlide = function () {
  this.changeSlide(this.next);
  this.timer();
};

Slider.prototype.prevSlide = function () {
  this.changeSlide(this.prev);
  this.timer();
};

Slider.prototype.setSlide = function (num) {
  if (this.current === num) {
    return;
  }

  this.last = this.current;
  this.current = num;
};

Slider.prototype.changeSlide = function (num) {
  this.setSlide(num);
  this.hideSlide(this.last);
  this.changeDots(num);
  this.showSlide(num);
};

Slider.prototype.hideSlide = function (num) {
  if (this.current > this.last) {
    for (var j = 0; j < this.current; j++) {
      num = j;
      this.allSlides[num].style.order = '1';
      this.allSlides[num].style.transform = 'translateX(-10000px)';
    }

  } else {
    for (var i = this.current; i <= this.lengthSlides; i++) {
      num = i;
      this.allSlides[num].style.order = '1';
      this.allSlides[num].style.transform = 'translateX(10000px)';
    }
  }
};

Slider.prototype.showSlide = function (num) {
  this.allSlides[num].style.transform = 'translateX(0)';
  this.allSlides[num].style.order = '-1';
};

Slider.prototype.changeDots = function (num) {
  this.dots[this.last].checked = false;
  this.dots[num].checked = true;
  this.timer();
};

Slider.prototype.timer = function () {
  var self = this;

  if (this.timerId) {
    clearTimeout(this.timerId);
  }

  this.timerId = setTimeout(function () {
    self.nextSlide();
  }, this.timerDelay);
};

var reviewSlider = new Slider(slidesReview, btnLeftAll, btnRightAll, inputsBtnReviews);
reviewSlider.init();

// CЛАЙДЕР - ТАРИФНЫЙ ПЛАН
var obj = {
  '0': 'translateX(-14.4%)',
  '1': 'translateX(-42.4%)',
  '2': 'translateX(-70.4%)'
};

// Применяет трансформацию
function getLabelsDataPrice() {
  [].forEach.call(labelsBtnPrice, function (it, i) {
    it.data = i;

    it.addEventListener('click', function (e) {
      getInputsRemoveChecked(inputsBtnPrice);

      sliderPriceTable.style.transform = obj[e.target.data];
    })
  });
}
getLabelsDataPrice();

// UPLOAD CIRCLE
var uploadCircle = document.querySelectorAll('.upload__circle');
var uploadLine = document.querySelector('.upload__line');

// Реализовывает перемещение пина слайдера редактирования фото
[].forEach.call(uploadCircle, function (it) {
  it.style.left = '0px';

  it.addEventListener('mousedown', function (e) {
    e.preventDefault();

    var startCoords = {
      x: e.clientX
    };

    function onMouseMove(moveE) {
      moveE.preventDefault();

      var shift = {
        x: startCoords.x - moveE.clientX
      };

      startCoords = {
        x: moveE.clientX
      };

      it.offsetLeft < 0 ? it.style.left = '0px' : it.offsetLeft;
      it.offsetLeft > parseInt(getComputedStyle(uploadLine).width, 10) ? it.style.left = (parseInt(getComputedStyle(uploadLine).width, 10) - (parseInt(getComputedStyle(it).width, 10) / 2)) + 'px' : it.offsetLeft;
      it.style.left = (it.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upE) {
      upE.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});
