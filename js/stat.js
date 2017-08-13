'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.beginPath(); // Рисуем фигуру тени от облака
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'; // Цвет контура тени облака
  ctx.moveTo(190,20);
  ctx.quadraticCurveTo(55,30,105,125);
  ctx.quadraticCurveTo(20,350,325,280);
  ctx.quadraticCurveTo(515,330,460,200);
  ctx.quadraticCurveTo(690, 10,190,20);
  ctx.stroke();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Цвет тени
  ctx.fill();
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(0, 0, 139)'; // Цвет контура облака
  ctx.moveTo(180,10);
  ctx.quadraticCurveTo(45,20,95,115);
  ctx.quadraticCurveTo(10,340,315,270);
  ctx.quadraticCurveTo(505,320,450,190);
  ctx.quadraticCurveTo(680, 0,180,10);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Цвет фигуры облака
  ctx.fill();
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
  // var colorSaturation = [];
  ctx.textBaseline = 'top';
  for (var j = 0; j < times.length; j++) {
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      // colorSaturation[j] = Math.random().toFixed(1);
      ctx.fillStyle = 'rgba(0, 0, 255, Math.random().toFixed(0))';
    }
    ctx.fillRect(initialX + (indent + barWidth) * j, initialY + (histogramHeight - times[j] * step), barWidth, times[j] * step);
    ctx.fillText(names[j], initialX + (indent + barWidth) * j, initialY + histogramHeight ); // Подпись с именем игрока
    ctx.fillText(times[j].toFixed(0), initialX + (indent + barWidth) * j, initialY + (histogramHeight - times[j] * step) - 20); // Подпись с результатом игрока
  }
};
// Починить случайно задаваемую насыщенность колонок (не работает насыщенность и заливает красным не только игрока "Вы")
