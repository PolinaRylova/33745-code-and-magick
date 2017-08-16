'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden'); // Показываю окно настроек

userDialog.querySelector('.setup-similar').classList.remove('hidden'); // Показываю заголовок "Похожие персонажи"

var similarListElement = userDialog.querySelector('.setup-similar-list'); // Нахожу список, в который буду вставдять персонажей

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content; // Нахожу контент шаблона волшебника

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция для получения рандомного индекса
var getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var wizards = [
  {
    name: WIZARDS_NAMES[getRandomIndex(0, WIZARDS_NAMES.length)] + ' ' + WIZARDS_SURNAMES[getRandomIndex(0, WIZARDS_WIZARDS_SURNAMES.length)],
    coatColor: WIZARDS_COAT_COLOR[getRandomIndex(0, WIZARDS_COAT_COLOR.length)],
    eyesColor: WIZARDS_EYES_COLOR[getRandomIndex(0, WIZARDS_EYES_COLOR.length)]
  },
  {
    name: WIZARDS_NAMES[getRandomIndex(0, WIZARDS_NAMES.length)] + ' ' + WIZARDS_SURNAMES[getRandomIndex(0, WIZARDS_WIZARDS_SURNAMES.length)],
    coatColor: WIZARDS_COAT_COLOR[getRandomIndex(0, WIZARDS_COAT_COLOR.length)],
    eyesColor: WIZARDS_EYES_COLOR[getRandomIndex(0, WIZARDS_EYES_COLOR.length)]
  },
  {
    name: WIZARDS_NAMES[getRandomIndex(0, WIZARDS_NAMES.length)] + ' ' + WIZARDS_SURNAMES[getRandomIndex(0, WIZARDS_SURNAMES.length)],
    coatColor: WIZARDS_COAT_COLOR[getRandomIndex(0, WIZARDS_COAT_COLOR.length)],
    eyesColor: WIZARDS_EYES_COLOR[getRandomIndex(0, WIZARDS_EYES_COLOR.length)]
  },
  {
    name: WIZARDS_NAMES[getRandomIndex(0, WIZARDS_NAMES.length)] + ' ' + WIZARDS_SURNAMES[getRandomIndex(0, WIZARDS_SURNAMES.length)],
    coatColor: WIZARDS_COAT_COLOR[getRandomIndex(0, WIZARDS_COAT_COLOR.length)],
    eyesColor: WIZARDS_EYES_COLOR[getRandomIndex(0, WIZARDS_EYES_COLOR.length)]
  }
];

for (var i = 0; i < WIZARDS_NAMES; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  similarListElement.appendChild(wizardElement);
}

