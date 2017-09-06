'use strict';
(function () {
  var SERVER_URL = 'https://1510.dump.academy/code-and-magick';
  var setup = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        errorHandler(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10 секунд
    return xhr;
  };
  window.backend = {
    save: function (data, successHandler, errorHandler) {
      var xhr = setup(successHandler, errorHandler);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (successHandler, errorHandler) {
      var xhr = setup(successHandler, errorHandler);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
