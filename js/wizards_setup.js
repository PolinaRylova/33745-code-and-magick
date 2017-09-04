'use strict';
(function () {
  var WIZARDS_COUNT = 4;
  var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupDialog = document.querySelector('.setup');
  var setupWizard = setupDialog.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  // Инициализируем пустой массив волшебников
  var wizards = [];
  // Инициализируем функцию по заполнению массива волшебников
  var fillWizardsArr = function (count) {
    for (var i = 0; i < count; i++) {
      wizards.push({
        name: WIZARDS_NAMES[window.util.getRandomIndex(0, WIZARDS_NAMES.length)] + ' ' + WIZARDS_SURNAMES[window.util.getRandomIndex(0, WIZARDS_SURNAMES.length)],
        coatColor: WIZARDS_COAT_COLOR[window.util.getRandomIndex(0, WIZARDS_COAT_COLOR.length)],
        eyesColor: WIZARDS_EYES_COLOR[window.util.getRandomIndex(0, WIZARDS_EYES_COLOR.length)]
      });
    }
  };
  // Вызываем фукцию, чтобы создать четырёх волшебников
  fillWizardsArr(WIZARDS_COUNT);
  // Клонирование шаблона волшебника и заполнение данными из массива волшебников
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };
  // Запись данных в фрагмент
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  // Заполнение данными из фрагмента и визуализация скрытого окна настроек со списком волшебников
  var similarListElement = setupDialog.querySelector('.setup-similar-list');
  var drawWizardsList = function () {
    similarListElement.appendChild(fragment);
    setupDialog.querySelector('.setup-similar').classList.remove('hidden');
  };
  drawWizardsList();
  // Раскрашиваем магов
  var fillElement = function (element, color) {
    element.style.fill = color;
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
