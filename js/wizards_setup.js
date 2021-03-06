'use strict';
(function () {
  var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupDialog = document.querySelector('.setup');
  var setupWizard = setupDialog.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var coatColor;
  var eyesColor;
  var wizards = [];
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };
  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };
  var loadHandler = function (data) {
    wizards = data;
    updateWizards();
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterBegin', node);
  };
  window.backend.load(loadHandler, errorHandler);
  // Раскрашиваем магов
  var fillElement = function (element, color) {
    if (element === wizardCoat) {
      coatColor = color;
    } else {
      eyesColor = color;
    }
    element.style.fill = color;
    window.debounce(updateWizards);
  };
  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };
  window.colorizeElement(wizardCoat, WIZARDS_COAT_COLOR, fillElement);
  window.colorizeElement(wizardEyes, WIZARDS_EYES_COLOR, fillElement);
  window.colorizeElement(fireball, WIZARDS_FIREBALL_COLOR, changeElementBackground);
  // Найдём элемент магазина артефактов
  var shopElement = setupDialog.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  // При перетаскивании запоминаем элемент, который тянем, и сообщаем браузеру доп.инфу о перетаскиваемом объекте
  shopElement.addEventListener('dragstart', function (e) {
    highlightIfHasChild();
    if (e.target.tagName.toLowerCase() === 'img') {
      draggedItem = e.target;
      e.dataTransfer.setData('text/plain', e.target.alt);
    }
  });
  // Находим родительский элемент, в дочерние ячейки которого будем перетаскивать элементы
  var artifactsElement = document.querySelector('.setup-artifacts');
  // И его ячейки
  var artifactsDropCells = artifactsElement.querySelectorAll('.setup-artifacts-cell');
  // Объявляем функцию, которая будет проходить помассиву artifactsDropCells
  // и подсвечивать ячейки без дочернего элемента
  var highlightIfHasChild = function () {
    for (var ind = 0; ind < artifactsDropCells.length; ind++) {
      var cell = artifactsDropCells[ind];
      if (cell.children.length === 0) {
        cell.style.outline = '2px dashed red';
      } else {
        cell.style.outline = '';
      }
    }
  };
  // Обьявляем функцию которая убирает подсветку у всех ячеек
  var deleteHighlight = function () {
    for (var ind = 0; ind < artifactsDropCells.length; ind++) {
      artifactsDropCells[ind].style.outline = '';
    }
  };
  // Обрабатываем событие dragover и отменяем действие по умолчанию
  artifactsElement.addEventListener('dragover', function (e) {
    e.preventDefault();
    return false;
  });
  // Обрабатываем событие броска
  artifactsElement.addEventListener('drop', function (e) {
    e.target.style.backgroundColor = '';
    deleteHighlight();
    e.target.appendChild(draggedItem);
    e.preventDefault();
  });
  // Обрабатываем событие появления над элементом
  artifactsElement.addEventListener('dragenter', function (e) {
    e.target.style.backgroundColor = 'yellow';
    e.preventDefault();
  });
  // Обрабатываем событие ухода от элемента
  artifactsElement.addEventListener('dragleave', function (e) {
    e.target.style.backgroundColor = '';
    e.preventDefault();
  });
})();
