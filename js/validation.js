'use strict';
(function () {
  window.validation = {
    isValid: function (element) {
      return element.validity.valid;
    }
  };
})();
