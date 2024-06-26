const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

// 获取当前视图的宽度和高度
let aw = document.documentElement.clientWidth || document.body.clientWidth;
let ah = document.documentElement.clientHeight || document.body.clientHeight;
// 赋值给canvas
canvas.width = aw;
canvas.height = ah;

// 屏幕变动时也要监听实时宽高
window.onresize = function () {
  aw = document.documentElement.clientWidth || document.body.clientWidth;
  ah = document.documentElement.clientHeight || document.body.clientHeight;
  // 赋值给canvas
  canvas.width = aw;
  canvas.height = ah;
};

// 本游戏无论是实心，还是线条，色调都是白色
ctx.fillStyle = "#ffffff";
ctx.strokeStyle = "#ffffff";

function Star(x, y, r) {
  // x，y是坐标，r是半径
  this.x = x;
  this.y = y;
  this.r = r;
  // speed参数，在  -3 ~ 3 之间取值
  this.speedX = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()));
  this.speedY = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()));
}

Star.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};

Star.prototype.move = function () {
  this.x -= this.speedX;
  this.y -= this.speedY;
  // 碰到边界时，反弹，只需要把speed取反就行
  if (this.x < 0 || this.x > aw) this.speedX *= -1;
  if (this.y < 0 || this.y > ah) this.speedY *= -1;
};

function drawLine(startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.closePath();
}

const stars = [];
for (let i = 0; i < 100; i++) {
  // 随机在canvas范围内找一个坐标画星星
  stars.push(new Star(Math.random() * aw, Math.random() * ah, 3));
}

const mouseStar = new Star(0, 0, 3);

canvas.onmousemove = function (e) {
  mouseStar.x = e.clientX;
  mouseStar.y = e.clientY;
};
window.onclick = function (e) {
  for (let i = 0; i < 5; i++) {
    stars.push(new Star(e.clientX, e.clientY, 3));
  }
};

// 星星的移动
setInterval(() => {
  ctx.clearRect(0, 0, aw, ah);
  // 鼠标星星渲染
  mouseStar.draw();
  // 遍历移动渲染
  stars.forEach((star) => {
    star.move();
    star.draw();
  });
  stars.forEach((star, index) => {
    // 类似于冒泡排序那样，去比较，确保所有星星两两之间都比较到
    for (let i = index + 1; i < stars.length; i++) {
      if (
        Math.abs(star.x - stars[i].x) < 50 &&
        Math.abs(star.y - stars[i].y) < 50
      ) {
        drawLine(star.x, star.y, stars[i].x, stars[i].y);
      }
    }

    if (
      Math.abs(mouseStar.x - star.x) < 50 &&
      Math.abs(mouseStar.y - star.y) < 50
    ) {
      drawLine(mouseStar.x, mouseStar.y, star.x, star.y);
    }
  });
}, 50);
