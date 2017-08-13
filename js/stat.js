'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Цвет тени
  ctx.fillRect(110, 20, 420, 270); // Фигура тени
  ctx.strokeStyle = 'rgb(135, 206, 235)'; // Цвет контура облака
  ctx.strokeRect(100, 10, 420, 270); // Фигура контура облака
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Цвет фигуры облака
  ctx.fillRect(100, 10, 420, 270); // Фигура облака
  ctx.fillStyle = '#dc143c'; // Цвет заголовка
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', 120, 40);
  ctx.fillStyle = '#000080'; // Цвет подзаголовка
  ctx.fillText('Список результатов:', 120, 65);
  // Определяем худшее время прохождения игры
  var maxTime = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > maxTime) {
      maxTime = time;
    }
  }
  // Рисуем гистограмму статистики
  var histogramHeight = 150;
  var step = histogramHeight / (maxTime - 0);
  var barWidth = 40;
  var indent = 50;
  var initialX = 120;
  var initialY = 100;
  ctx.textBaseline = 'top';
  for (var j = 0; j < times.length; j++) {
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, Math.random())';
    }
    ctx.fillRect(initialX + (indent + barWidth) * j, initialY + (histogramHeight - times[j] * step), barWidth, times[j] * step);
    ctx.fillText(names[j], initialX + (indent + barWidth) * j, initialY + histogramHeight ); // Подпись с именем игрока
    ctx.fillText(times[j].toFixed(0), initialX + (indent + barWidth) * j, initialY + (histogramHeight - times[j] * step) - 20); // Подпись с результатом игрока
  }
};
// Перерисовать прямоугольник в облако
// Починить случайно задаваемую насыщенность колонок (пока не работает и баг заливки - проверить дебаггером условие заливки (синие заливаются красным)
