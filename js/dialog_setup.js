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
    setupDialog.style.top = '';
    setupDialog.style.left = '';
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
    if (window.validation.isValid(setupUserName, function (customValidityText) {
      setupUserName.setCustomValidity(customValidityText);
    })) {
      setupUserName.setCustomValidity('');
    }
  });
  setupUserName.addEventListener('input', function (e) {
    var target = e.target;
    if (window.validation.isValid(target, function (customValidityText) {
      target.setCustomValidity(customValidityText);
    })) {
      target.setCustomValidity('');
    }
  });
  // Найдём элемент для вставки аватара
  var userAvatar = setupDialog.querySelector('input[name="avatar"]');
  // Создадим функцию для скрытия элемента вставки аватара
  var hideUserAvatar = function (overEvt) {
    overEvt.preventDefault();
    userAvatar.style.display = 'none';
  };
  // Добавим обработчик события при наведении на элемент вставки аватара
  userAvatar.addEventListener('mouseover', hideUserAvatar);
  // Найдем элемент, за который будем осуществлять перетаскивание окна
  var setupDialogHandle = setupDialog.querySelector('.setup-user-pic');
  // Добавим обработчик события зажатия кнопки мыши на элементе
  setupDialogHandle.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    // Запомним координаты начала перемещения
    var startCoordinates = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };
    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      userAvatar.style.display = '';
      // При перемещении обновляем смещение относительно первоначальной точки
      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };
      // Перезаписываем начальные координаты
      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // Перемещаем окно
      setupDialog.style.top = (setupDialog.offsetTop - shift.y) + 'px';
      setupDialog.style.left = (setupDialog.offsetLeft - shift.x) + 'px';
    };
    // При отпускании кнопки мыши перестаём слушать события движения мыши
    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    // Добавим обработчик события передвижения мыши
    document.addEventListener('mousemove', mouseMoveHandler);
    // Добавим обработчик события отпускания кнопки мыши
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
