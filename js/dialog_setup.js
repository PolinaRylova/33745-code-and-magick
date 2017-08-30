'use strict';
(function () {
  var setupDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupDialog.querySelector('.setup-close');
  var setupSubmit = setupDialog.querySelector('.setup-submit');
  var setupUserName = setupDialog.querySelector('.setup-user-name');
  var openSetupBlock = function () {
    setupDialog.classList.remove('hidden');
    document.addEventListener('keydown', escCloseSetupBlock);
  };
  var closeSetupBlock = function () {
    setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', escCloseSetupBlock);
  };
  var escCloseSetupBlock = function (e) {
    window.util.isEscEvent(e, closeSetupBlock);
  };
  setupOpen.addEventListener('click', function () {
    openSetupBlock();
  });
  setupOpen.addEventListener('keydown', function (e) {
    window.util.isEnterEvent(e, openSetupBlock);
  });
  setupSubmit.addEventListener('click', function () {
    if (window.validation.isValid(setupUserName)) {
      closeSetupBlock();
    }
  });
  setupSubmit.addEventListener('keydown', function (e) {
    if (window.validation.isValid(setupUserName)) {
      window.util.isEnterEvent(e, closeSetupBlock);
    }
  });
  setupUserName.addEventListener('keydown', function (e) {
    e.stopPropagation();
  }, true);

  setupClose.addEventListener('click', function () {
    closeSetupBlock();
  });
  setupClose.addEventListener('keydown', function (e) {
    window.util.isEnterEvent(e, closeSetupBlock);
  });
  setupUserName.addEventListener('invalid', function () {
    if (!window.validation.isValid(setupUserName)) {
      if (setupUserName.validity.tooShort) {
        setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      }
      if (setupUserName.validity.tooLong) {
        setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
      }
      if (setupUserName.validity.valueMissing) {
        setupUserName.setCustomValidity('Заполните поле');
      }
    } else {
      setupUserName.setCustomValidity('');
    }
  });
  setupUserName.addEventListener('input', function (e) {
    var target = e.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });
})();
