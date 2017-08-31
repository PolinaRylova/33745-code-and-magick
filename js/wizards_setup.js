'use strict';
(function () {
  var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var setupDialog = document.querySelector('.setup');
  var setupWizard = setupDialog.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    var wizardObject = {
      name: WIZARDS_NAMES[window.util.getRandomIndex(0, WIZARDS_NAMES.length)] + ' ' + WIZARDS_SURNAMES[window.util.getRandomIndex(0, WIZARDS_SURNAMES.length)],
      coatColor: window.colorize(wizardCoat, null),
      eyesColor: window.colorize(wizardEyes, null)
    };
    wizards.push(wizardObject);
  }
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
  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }
  // Заполнение данными из фрагмента и визуализация скрытого окна настроек со списком волшебников
  var similarListElement = setupDialog.querySelector('.setup-similar-list');
  var drawWizardsList = function () {
    similarListElement.appendChild(fragment);
    setupDialog.querySelector('.setup-similar').classList.remove('hidden');
  };
  drawWizardsList();
  // Раскрашиваем магов
  wizardCoat.addEventListener('click', function () {
    window.colorize(wizardCoat, function (color) {
      wizardCoat.style.fill = color;
    });
  });
  wizardEyes.addEventListener('click', function () {
    window.colorize(wizardEyes, function (color) {
      wizardEyes.style.fill = color;
    });
  });
  fireball.addEventListener('click', function () {
    window.colorize(fireball, function (color) {
      fireball.style.background = color;
    });
  });
  // Найдём элемент магазина артефактов
  var shopElement = setupDialog.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  // При перетаскивании запоминаем элемент, который тянем, и сообщаем браузеру доп.инфу о перетаскиваемом объекте
  shopElement.addEventListener('dragstart', function (e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      draggedItem = e.target;
      e.dataTransfer.setData('text/plain', e.target.alt);
    }
  });
  // Находим элемент, в который будем перетаскивать элементы
  var artifactsElement = document.querySelector('.setup-artifacts');
  // Обрабатываем событие dragover и отменяем действие по умолчанию
  artifactsElement.addEventListener('dragover', function (e) {
    e.preventDefault();
    return false;
  });
  // Обрабатываем событие броска
  artifactsElement.addEventListener('drop', function (e) {
    e.target.style.outline = '';
    e.target.appendChild(draggedItem);
    e.preventDefault();
  });
  // Обрабатываем событие движения
  shopElement.addEventListener('mousemove', function (e) {
    // для каждого дочернего элемента в блоке artifactsElement
    // пустым ячейкам для вкладывания задать style.outline = '2px dashed red';
    e.preventDefault();
  });
  // Обрабатываем событие прекращения движения
  shopElement.addEventListener('mouseup', function (e) {
    // для каждого дочернего элемента в блоке artifactsElement
    // пустым ячейкам для вкладывания очистить style.outline = '';
    e.preventDefault();
  });
})();
