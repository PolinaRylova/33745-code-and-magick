// Модуль для отрисовки одного похожего мага
'use strict';
(function () {
  var WIZARDS_COUNT = 4;
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var renderWizardArtifacts = function (wizard) {
    return wizard.artifacts.map(function (it) {
      return it.name;
    }).join('<br>');
  };
  var renderWizard = function (wizard) {
    var element = similarWizardTemplate.cloneNode(true);
    var wizardElement = element.querySelector('.wizard');
    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    window.popup(wizardElement, function () {
      return renderWizardArtifacts(wizard);
    });
    return element;
  };
  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');
  window.render = function (data) {
    var takeNumber = data.length > WIZARDS_COUNT ? WIZARDS_COUNT : data.length;
    similarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderWizard(data[i]));
    }
    similar.classList.remove('hidden');
  };
})();
