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
  // Найдем элемент, за который будем осуществлять перетаскивание окна
  var setupDialogHandle = setupDialog.querySelector('.upload');
  // Добавим обработчик события зажатия кнопки мыши на элементе
  setupDialogHandle.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    // Запомним координаты начала перемещения
    var startCoordinates = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };
    // Запоминаем в переменную, быо перетаскивание или нет
    var dragged = false;
    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      // При перемещении устанавливаем новое значение для переменной dragged
      // и обновляем смещение относительно первоначальной точки
      dragged = true;
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
      // Если было перемещение, навешиваем обработчик события клика, который отменит действие по умолчанию
      if (dragged) {
        var mouseClickPreventDefault = function (e) {
          // Отменяем открытие формы для загрузки картинки
          e.preventDefault();
          // Отписываемся от обработчика события клика
          setupDialogHandle.removeEventListener('click', mouseClickPreventDefault);
        };
        setupDialogHandle.addEventListener('click', mouseClickPreventDefault);
      }
    };
    // Добавим обработчик события передвижения мыши
    document.addEventListener('mousemove', mouseMoveHandler);
    // Добавим обработчик события отпускания кнопки мыши
    document.addEventListener('mouseup', mouseUpHandler);
  });
  // Отправка данных формы на сервер с помощью XMLHttpRequest
  var form = setupDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setupDialog.classList.add('hidden');
    }, window.util.errorHandler);
    evt.preventDefault();
  });
})();
