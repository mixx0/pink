'use strict';

  var headerMainBtn = document.querySelector('.header-main__popup-button');
  var mainNav = document.querySelector('.main-nav');
  var logoMain = document.querySelector('.header-main__logo');
  var popupError = document.querySelector('.popup-error');
  var popupDone = document.querySelector('.popup-done');
  var errorBtn = document.querySelector('.popup-error__button');
  var doneBtn = document.querySelector('.popup-done__button');
  var slides = document.querySelectorAll('.slider-reviews__item');
  var labelsBtnRewievs = document.querySelectorAll('.reviews__slider .slider-controls__label');
  var inputsBtnRewievs = document.querySelectorAll('.reviews__slider .slider-controls__input');
  var labelsBtnPrice = document.querySelectorAll('.price__slider .slider-controls__label');
  var inputsBtnPrice = document.querySelectorAll('.price__slider .slider-controls__input');
  var btnLeft = document.querySelector('.slider-reviews__btn-left');
  var btnRight = document.querySelector('.slider-reviews__btn-right');
  var sliderDescriptionBtns = document.querySelector('.slider-reviews__description');
  var sliderPriceTable = document.querySelector('.slider-price__table');
  var currentEl = 0;

  // КАРТА
  // function initMap() {
  //   var uluru = {lat: 59.936143, lng: 30.321058};
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 16,
  //     center: uluru
  //   });
  //   var marker = new google.maps.Marker({
  //     position: uluru,
  //     map: map,
  //     icon: 'img/marker-map.png'
  //   });
  // }

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
    mainNav.classList.add('main-nav--opened');
    headerMainBtn.classList.remove('header-main__popup-button--closed');
    headerMainBtn.classList.add('header-main__popup-button--opened');
    logoMain.style.backgroundColor = '#283645';

    headerMainBtn.removeEventListener('keydown', onEscPressClick);
  }

  function onPopupCloseClick() {
    mainNav.classList.remove('main-nav--opened');
    headerMainBtn.classList.remove('header-main__popup-button--opened');
    headerMainBtn.classList.add('header-main__popup-button--closed');
    logoMain.style.backgroundColor = 'rgba(29, 38, 49, 0.7)';
  }

  headerMainBtn.addEventListener('click', function () {
    mainNav.classList.contains('main-nav--opened') ? onPopupCloseClick() : onPopupOpenClick();
  });

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

  mainNav.classList.remove('main-nav--opened');
  headerMainBtn.classList.remove('header-main__popup-button--none');
  headerMainBtn.classList.remove('header-main__popup-button--opened'); // Не удалять класс header-main__popup-button--opened у кнопки
  logoMain.style.backgroundColor = 'rgba(29, 38, 49, 0.7)';

  // CЛАЙДЕР - ОТЗЫВЫ
  function getSlidesHidden() {
    [].forEach.call(slides, function (it, i) {
      it.data = i;
      it.style.display = 'none';
    });
  }
  getSlidesHidden();


  function getInputsRemoveChecked(el) {
    [].forEach.call(el, function (it, i) {
      it.data = i;
      it.checked = false;
    });
  }

  function getLabelsData() {
    [].forEach.call(labelsBtnRewievs, function (it, i) {
      it.data = i;

      it.addEventListener('click', function (e) {
        getSlidesHidden();
        getInputsRemoveChecked(inputsBtnRewievs);

        slides[e.target.data].style.display = 'block';
      })
    });
  }
  getLabelsData();

  function onBtnArrowClick(e) {
    getSlidesHidden();
    getLabelsData();

    if (e.target === btnRight) {
      currentEl++;
      slides[currentEl].style.display = 'block';

    } else if (e.target === btnLeft) {
      currentEl--;
      slides[currentEl].style.display = 'block';
    }

    sliderDescriptionBtns.removeEventListener('click', onBtnArrowClick);
  }

  if(sliderDescriptionBtns) {
    sliderDescriptionBtns.addEventListener('click', onBtnArrowClick);  // Починить (событие срабатывает только 1 раз).
                                                                        // Плавное переключение слайдов

    slides[0].style.display = 'block';
    inputsBtnRewievs[0].checked = true;
  }

  // CЛАЙДЕР - ТАРИФНЫЙ ПЛАН
  var obj = {
    '0': 'translateX(-14.4%)',
    '1': 'translateX(-42.4%)',
    '2': 'translateX(-70.4%)'
  };

  function getLabelsDataPrice() {
    [].forEach.call(labelsBtnPrice, function (it, i) {
      it.data = i;

      it.addEventListener('click', function (e) {
        getInputsRemoveChecked(inputsBtnPrice);

        sliderPriceTable.style.transform = obj[e.target.data];

        // if (document.querySelector('body').style.minWidth > '659px') {
        //   sliderPriceTable.style.transform = 'translateX(-42.4%)';      // Починить (ставить по умолч.)
        // }
      })
    });
  }
  getLabelsDataPrice();
