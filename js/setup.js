'use strict';
// константы для клавиш
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
// константы для массива волшебников
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
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
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};
drawWizardsList();
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupSubmit = userDialog.querySelector('.setup-submit');
var setupUserName = userDialog.querySelector('.setup-user-name');
var userNameValid = setupUserName.validity.valid;
var openSetupBlock = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', escCloseSetupBlock);
};
var closeSetupBlock = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', escCloseSetupBlock);
};
var escCloseSetupBlock = function (e) {
  if (e.keyCode === ESC_KEYCODE) {
    closeSetupBlock();
  }
};
setupOpen.addEventListener('click', function () {
  openSetupBlock();
});
setupOpen.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    openSetupBlock();
  }
});
setupSubmit.addEventListener('click', function () {
  if (userNameValid) {
    closeSetupBlock();
  }
});
setupSubmit.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE && userNameValid) {
    closeSetupBlock();
  }
});
setupUserName.addEventListener('keydown', function (e) {
  e.stopPropagation();
}, true);
setupUserName.addEventListener('invalid', function () {
  if (!userNameValid) {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    }
    if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
    }
    if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity('Заполните поле');
    }
  } else {
    setupUserName.setCustomValidity('');
  }
});
setupUserName.addEventListener('input', function (e) {
  var target = e.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});
setupClose.addEventListener('click', function () {
  closeSetupBlock();
});
setupClose.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    closeSetupBlock();
  }
});
var setupWizard = userDialog.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = document.querySelector('.setup-fireball-wrap');
var changeColor = function (e) {
  var currentStyle = e.currentTarget.style;
  if (e.currentTarget === setupWizardCoat) {
    currentStyle.fill = WIZARDS_COAT_COLOR[getRandomIndex(0, WIZARDS_COAT_COLOR.length)];
  } else if (e.currentTarget === setupWizardEyes) {
    currentStyle.fill = WIZARDS_EYES_COLOR[getRandomIndex(0, WIZARDS_EYES_COLOR.length)];
  } else if (e.currentTarget === setupFireball) {
    currentStyle.background = WIZARDS_FIREBALL_COLOR[getRandomIndex(0, WIZARDS_FIREBALL_COLOR.length)];
  }
};
setupWizardCoat.addEventListener('click', changeColor);
setupWizardEyes.addEventListener('click', changeColor);
setupFireball.addEventListener('click', changeColor);
