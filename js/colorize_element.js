'use strict';
// Модуль обработки событий по нажатию на элемент одежды персонажа (получение нового цвета)
(function () {
  window.colorizeElement = function (element, colorArr, changeColor) {
    element.addEventListener('click', function () {
      var currentColor = colorArr[window.util.getRandomIndex(0, colorArr.length)];
      changeColor(element, currentColor);
    });
  };
})();
