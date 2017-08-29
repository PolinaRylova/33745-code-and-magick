'use strict';
(function () {
  var setupDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupDialog.querySelector('.setup-close');
  var setupSubmit = setupDialog.querySelector('.setup-submit');
  var setupUserName = setupDialog.querySelector('.setup-user-name');
  var userNameValid = window.validation(setupUserName);
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
    if (userNameValid) {
      closeSetupBlock();
    }
  });
  setupSubmit.addEventListener('keydown', function (e) {
    if (userNameValid) {
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
})();
