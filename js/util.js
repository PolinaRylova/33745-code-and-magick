'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = '100';
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
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
