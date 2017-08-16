'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden'); // Показываю окно настроек

userDialog.querySelector('.setup-similar').classList.remove('hidden'); // Показываю заголовок "Похожие персонажи"

var similarListElement = userDialog.querySelector('.setup-similar-list'); // Нахожу список, в который буду вставдять персонажей

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content; // Нахожу контент шаблона волшебника

var WIZARDS_NAMES = ['Ами', 'Рэй', 'Макото', 'Минако'];

var WIZARDS_SURNAME = ['Мицуно', 'Хино', 'Кино', 'Аино'];

for (var i = 0; i < 4; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  similarListElement.appendChild(wizardElement);
}

