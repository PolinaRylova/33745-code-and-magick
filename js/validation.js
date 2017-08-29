'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var setupUserName = userDialog.querySelector('.setup-user-name');
  var userNameValid = window.validation.isValid(setupUserName);
  setupUserName.addEventListener('invalid', function () {
    if (!userNameValid) {
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
  window.validation = {
    isValid: function (element) {
      return element.validity.valid;
    }
  };
})();
