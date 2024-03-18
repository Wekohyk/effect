let boxBg = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#564545",
  "#607d8b",
  "#405d6b",
  "#9e9e9e",
  "#70737d",
  "#389fa0",
  "#38a05e",
  "#b3c981",
  "#76a803",
  "#fecf43",
  "#e2785f",
]; //box背景色
let bodyBg = [
  "#F7E8ED",
  "#F2D9E6",
  "#ECC6DE",
  "#E0ECF5",
  "#DDF4DE",
  "#F0F1D5",
  "#EEDECD",
  "#B8E6B3",
  "#ABE3D8",
  "#E0E1F5",
  "#F7E8ED",
  "#F2D9E6",
  "#E0ECF5",
  "#DDF4DE",
  "#F0F1D5",
  "#EEDECD",
  "#B8E6B3",
  "#ABE3D8",
  "#DFD1F0",
  "#6161616",
]; //body背景色

// 动态创建内嵌样式
let str = "";
// 拼接所需要的所有背景图
for (let i = 0; i < boxBg.length; i++) {
  str += `.box:nth-child(${i + 1}) div{
        background: ${boxBg[i]} url(./images/${i + 1}.png) no-repeat center;
    }`;
}
let style = document.createElement("style");
style.innerHTML = str;
document.head.appendChild(style);
']'
// Math.atan2(y轴的差值, x轴的差值) 返回两点之间的线与x轴正方向之间的角度值(弧度值); 官方文档: 返回从原点(0,0)到(x,y)点的线段与x轴正方向之间的平面角度(弧度值)，也就是Math.atan2(y,x)

let boxes = document.querySelectorAll(".box"); // 获取全部(.box)元素
let rot = [
  "rotateX(-180deg)",
  "rotateY(-180deg)",
  "rotateX(180deg)",
  "rotateY(180deg)",
]; // rpt = 进入的方向; 0: 上面进去; 1: 右边进入; 2: 下边进入; 3: 左边进去;
boxes.forEach(function (box) {
  box.onmouseenter = function (ev) {
    // onmouseenter: 鼠标移到盒子身上的触发事件
    let dir = getDir(ev, this);
    // console.log(dir);
    this.style.transform = "translateZ(150px)" + rot[dir];
    document.body.style.background =
      bodyBg[Math.floor(Math.random() * (bodyBg.length - 1))];
  };
  box.onmouseleave = function (ev) {
    // onmouseleave: 鼠标离开盒子的触发事件
    this.style.transform = "";
  };
});
// 获取鼠标进入方块的方向

function getDir(e, box) {
  // e: 鼠标碰到盒子的坐标点; box: 盒子的中心点
  /* getBoundingClientRect(); 返回元素的盒模型信息返回的是一个对象
        {   
            width: 0,
            height: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0;
        }
    */
  let l = box.getBoundingClientRect().left; // l: 是盒子距离可视区左边的距离
  let t = box.getBoundingClientRect().top; // t: 盒子距离可视区上边的距离

  let w = box.offsetWidth; // w: 盒子的宽度
  let h = box.offsetHeight; // h: 盒子的高度
  // clientX: 返回触点相对于可见视区(visual viewport)上边沿的的X坐标.
  // clientY: 返回触点相对于可见视区(visual viewport)上边沿的的Y坐标.
  let x = e.clientX - l - w / 2; // x: x轴的差值
  let y = e.clientY - t - h / 2; // y: y轴的差值
  let deg = Math.atan2(y, x) / (Math.PI / 180); // 计算角度
  let d = (Math.round((deg + 180) / 90) + 3) % 4; // 0 1 2 3
  return d;
}

let content = document.querySelector("#content");
document.onmousemove = function (ev) {
  /*
        1. 鼠标往右移动的时候，旋转Y轴正值; 鼠标往左移动的时候，旋转Y轴负值;
        2. 鼠标往上移动的时候，旋转X轴正值; 鼠标往下移动的时候，旋转X轴负值;
        3. 旋转是以可视区的中心位基本点，左右上下都是对应的。

        X轴上的数值
             0   1  2  3 4 5 6 7 8  : 鼠标实际值
            -4  -3 -2 -1 0 1 2 3 4  : 我们想要的值
        Y轴上的数值
             0 1 2 3 4  5  6  7  8  : 鼠标实际值
             4 3 2 1 0 -1 -2 -3 -4 : 我们想要的值
    */

  // 上下转(围绕X轴转)，取Y的值运算
  let x = (0.5 - ev.clientY / window.innerHeight) * 30; // ev.clientY: 当前在Y轴移动的距离; window.innerHeight: 总距离; ev.clientY / window.innerHeight: 当前鼠标在Y轴移动的比例
  // 左右转(围绕Y轴转)，取X的值运算
  let y = (ev.clientX / window.innerWidth - 0.5) * 30; // ev.clientX: 当前在X轴移动的距离; window.innerWidth: 总距离; ev.clientX / window.innerWidth: 当前鼠标在X轴移动的比例

  content.style.transform =
    "perspective(1000px) rotateX(" + x + "deg) rotateY(" + y + "deg)";
};
