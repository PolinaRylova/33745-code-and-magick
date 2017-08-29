(function () {
  var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var getRandomColor = function (arr) {
    return arr[window.util.getRandomIndex(0, arr.length)];
  };
  window.colorize = function (element, changeColor) {
    element.addEventListener('click', function () {
      var arr;
      switch (element) {
        case 'wizardCoat': arr = WIZARDS_COAT_COLOR;
          break;
        case 'wizardEyes': arr = WIZARDS_EYES_COLOR;
          break;
        case 'fireball': arr = WIZARDS_FIREBALL_COLOR;
          break;
      }
      var color = getRandomColor(arr);
      changeColor(color);
    });
  };
})();
