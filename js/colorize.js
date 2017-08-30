'use strict';
(function () {
  var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var getRandomColor = function (arr) {
    return arr[window.util.getRandomIndex(0, arr.length)];
  };
  var hasClass = function hasClass(element, cls) {
    return element.classList.contains(cls);
  };
  window.colorize = function (element, changeColor) {
    var arr = [];
    if (hasClass(element, 'wizard-coat')) {
      arr = WIZARDS_COAT_COLOR;
    } else if (hasClass(element, 'wizard-eyes')) {
      arr = WIZARDS_EYES_COLOR;
    } else if (hasClass(element, 'setup-fireball-wrap')) {
      arr = WIZARDS_FIREBALL_COLOR;
    }
    var color = getRandomColor(arr);
    if (changeColor !== null) {
      changeColor(color);
    }
    return color;
  };
})();
