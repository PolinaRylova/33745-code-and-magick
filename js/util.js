'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.util = {
    isEscEvent: function (e, action) {
      if (e.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (e, action) {
      if (e.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomIndex: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    errorHandler: errorHandler
  };
})();
