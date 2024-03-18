var ul = document.querySelector("#wrap ul");
var lis = document.querySelectorAll("#wrap li");
var closeBtns = document.querySelectorAll("#wrap .close");
var last = null; //上一个选中的

// 定时器: 使图片上移
var timer = setTimeout(function () {
  ul.className = "";
}, 200);

lis.forEach(function (li, index) {
  li.onclick = function () {
    // 如果last是 true，则会进行下一则语句
    last && (last.className = "");
    this.className = "active";
    last = this;

    ul.setAttribute("id", "activeWrap");
    // ul.id = 'activeWrap';
  };

  closeBtns[index].onclick = function (ev) {
    lis[index].className = "";
    last = null;

    ul.removeAttribute("id", "activeWrap");

    ev.stopPropagation(); //阻止事件冒泡
  };
});
