'use strict';
(function () {
  var OFFSET = 10; // px
  var popup = document.createElement('div');
  popup.classList.add('popup');
  popup.style.display = 'none';
  document.body.appendChild(popup);
  var mouseMoveHandler = function (evt) {
    popup.style.top = evt.pageY + OFFSET + 'px';
    popup.style.left = evt.pageX + OFFSET + 'px';
  };
  window.popup = function (target, callback) {
    var mouseOutHandler = function () {
      popup.style.display = 'none';
      target.removeEventListener('mousemove', mouseMoveHandler);
      target.removeEventListener('mouseleave', mouseOutHandler);
    };
    target.addEventListener('mouseenter', function () {
      popup.innerHTML = callback();
      popup.style.display = 'block';
      target.addEventListener('mousemove', mouseMoveHandler);
      target.addEventListener('mouseleave', mouseOutHandler);
    });
  };
})();
