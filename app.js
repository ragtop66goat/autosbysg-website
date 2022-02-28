const imgs = document.getElementById("images");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

//node list for images
const img = imgs.querySelectorAll("#images img");

let idx = 0;

const intervalTimer = 3000;

const run = () => {
  idx++;
  changeImage();
};

const changeImage = () => {
  if (idx > img.length - 1) {
    idx = 0;
  } else if (idx < 0) {
    idx = img.length - 1;
  }
  imgs.style.transform = `translateX(${-idx * 400}px)`;
};

const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(run, intervalTimer);
};

rightBtn.addEventListener("click", () => {
  idx++;
  changeImage();
  resetInterval();
});

leftBtn.addEventListener("click", () => {
  idx--;
  changeImage();
  resetInterval();
});

let interval = setInterval(run, intervalTimer);
