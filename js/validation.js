'use strict';
(function () {
  window.validation = {
    isValid: function (element, changeCustomValidity) {
      if (element.validity.tooShort || element.value.length < 2) {
        changeCustomValidity('Имя должно состоять минимум из 2-х символов');
      }
      if (element.validity.tooLong) {
        changeCustomValidity('Имя не должно превышать 25-ти символов');
      }
      if (element.validity.valueMissing) {
        changeCustomValidity('Заполните поле');
      }
      return element.validity.valid;
    }
  };
})();
