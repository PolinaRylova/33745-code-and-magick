'use strict';
// константы для клавиш
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
// константы для массива волшебников
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
var setup = document.querySelector('.setup');
var similarListElement = setup.querySelector('.setup-similar-list');
var drawWizardsList = function () {
  similarListElement.appendChild(fragment);
  // setup.classList.remove('hidden');
  setup.querySelector('.setup-similar').classList.remove('hidden');
};
drawWizardsList();
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');
var setupUserName = setup.querySelector('.setup-user-name');
var openSetupBlock = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', escCloseSetupBlock);
};
var closeSetupBlock = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', escCloseSetupBlock);
};
var escCloseSetupBlock = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetupBlock();
  }
};
setupOpen.addEventListener('click', function () {
  openSetupBlock();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupBlock();
  }
});
setupUserName.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    setupClose.focus();
  }
});
setupClose.addEventListener('click', function () {
  closeSetupBlock();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupBlock();
  }
});
setupSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeSetupBlock();
});
setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    closeSetupBlock();
  }
});
