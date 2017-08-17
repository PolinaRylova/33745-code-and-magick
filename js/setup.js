'use strict';

// Создание массива волшебников
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];
var getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
for (var i = 0; i < 4; i++) {
  var wizardObject = {
    name: WIZARDS_NAMES[getRandomIndex(0, WIZARDS_NAMES.length)] + ' ' + WIZARDS_SURNAMES[getRandomIndex(0, WIZARDS_SURNAMES.length)],
    coatColor: WIZARDS_COAT_COLOR[getRandomIndex(0, WIZARDS_COAT_COLOR.length)],
    eyesColor: WIZARDS_EYES_COLOR[getRandomIndex(0, WIZARDS_EYES_COLOR.length)]
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
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var drawWizardsList = function () {
  similarListElement.appendChild(fragment);
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};
drawWizardsList();
