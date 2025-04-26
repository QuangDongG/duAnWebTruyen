import { Trangdoctruyen } from "./src/Local_main.js";
const select = document.querySelector(".truyennew");
const name = [
  "Detective Conan",
  "The Beginning After the End",
  "Attack On Titan",
  "Blue Lock",
  "Demon Slayer",
  "Thiếu Niên Bóng Chuyền",
  "Death Note",
  "My Hero Academia",
  "Violet Evergarden",
  "Naruto",
  "Bastard",
  "Solo Leveling",
];
const slug = [
  "tham-tu-conan",
  "",
  "dai-chien-titan-before-the-fall",
  "blue-lock-ngang-raw",
  "thanh-guom-diet-quy",
  "vua-bong-chuyen",
  "cuon-so-tu-than-phu-chuong",
  "truong-hoc-sieu-anh-hung",
  "",
  "naruto-cuu-vi-ho-ly",
  "",
  "solo-leveling-ragnarok",
];
const thumb_url = [
  "tham-tu-conan-thumb.jpg",
  "",
  "dai-chien-titan-before-the-fall-thumb.jpg",
  "blue-lock-ngang-raw-thumb.jpg",
  "thanh-guom-diet-quy-rengoku-kyoujurou-gaiden-thumb.jpg",
  "vua-bong-chuyen-thumb.jpg",
  "cuon-so-tu-than-phu-chuong-thumb.jpg",
  "truong-hoc-sieu-anh-hung-thumb.jpg",
  "",
  "naruto-cuu-vi-ho-ly-thumb.jpg",
  "",
  "solo-leveling-ragnarok-thumb.jpg",
];

async function tt() {
  for (let i = 0; i < name.length; i++) {
    const creatdiv = document.createElement("div");
    creatdiv.style.backgroundImage = `url(/manhwa/${i + 1}.jpg)`;
    creatdiv.classList.add("truyenmoi");

    const infoText = document.createElement("p");
    infoText.classList.add("thongtin", "hide");
    infoText.textContent = name[i];

    const readButton = document.createElement("p");
    const readLabel = document.createElement("p");
    readLabel.textContent = "Đọc";
    readButton.classList.add("doc");
    readButton.append(readLabel);

    creatdiv.append(infoText, readButton);
    select.append(creatdiv);
  }
  const item = {
    slug: "",
    thumb_url: "",
  };
  const pClick = Array.from(document.querySelectorAll(".doc"));

  pClick.forEach((p, index) => {
    p.addEventListener("click", () => {
      item.slug = slug[index];
      item.thumb_url = thumb_url[index];
    });
    Trangdoctruyen(item, p);
  });
}
function StoryDay() {
  const item = {
    slug: "em-co-nghe-thay-toi-noi-khong",
    thumb_url: "em-co-nghe-thay-toi-noi-khong-thumb.jpg",
  };
  const discover_btn = document.querySelector(".discover-btn");
  discover_btn.addEventListener("click", () => {
    item.slug = slug[index];
    item.thumb_url = thumb_url[index];
  });
  Trangdoctruyen(item, discover_btn);
}
StoryDay();
tt();
const p = document.querySelectorAll(".thongtin");
select.addEventListener("mouseover", function () {
  for (let i = 0; i < p.length; i++) {
    p[i].classList.remove("hide");
  }
});
select.addEventListener("mouseout", function () {
  for (let i = 0; i < p.length; i++) {
    p[i].classList.add("hide");
  }
});
const div = Array.from(document.querySelectorAll(".truyenmoi"));
function display() {
  for (let i = 0; i < div.length; i++) {
    if (i > 0) {
      div[i].style.display = "none";
    } else {
      div[i].style.display = "flex";
      div[i].classList.add("fullmh");
    }
  }
}
display();
function a() {
  let fisrtFruit = div.shift();
  div.push(fisrtFruit);
  display();
}
const right = document.querySelector(".right");
const left = document.querySelector(".left");
right.addEventListener("click", a);
left.addEventListener("click", function () {
  let fisrtFruit = div.pop();
  div.unshift(fisrtFruit);
  display();
});

let intervalId;
function startInterval() {
  intervalId = setInterval(a, 3000);
}
let shouldStartInterval = false;

function stopInterval() {
  clearInterval(intervalId);
  shouldStartInterval = true;
}

right.addEventListener("click", function () {
  stopInterval();
});

right.addEventListener("mouseout", function () {
  if (shouldStartInterval) {
    startInterval();
    shouldStartInterval = false;
  }
});
left.addEventListener("click", function () {
  stopInterval();
});

left.addEventListener("mouseout", function () {
  if (shouldStartInterval) {
    startInterval();
    shouldStartInterval = false;
  }
});
startInterval();
//hide arrow
const arrow = document.querySelectorAll(".arow");
select.addEventListener("mouseover", function () {
  arrow[0].style.opacity = "1";
  arrow[1].style.opacity = "1";
  arrow[0].classList.remove("hide");
  arrow[1].classList.remove("hide");
});
select.addEventListener("mouseout", function () {
  arrow[0].classList.add("hide");
  arrow[1].classList.add("hide");
});
arrow[0].addEventListener("mouseover", function () {
  arrow[0].classList.remove("hide");
  arrow[1].classList.remove("hide");
});
arrow[0].addEventListener("mouseout", function () {
  arrow[0].classList.add("hide");
  arrow[1].classList.add("hide");
});
arrow[1].addEventListener("mouseover", function () {
  arrow[0].classList.remove("hide");
  arrow[1].classList.remove("hide");
});
arrow[1].addEventListener("mouseout", function () {
  arrow[0].classList.add("hide");
  arrow[1].classList.add("hide");
});
//phanloaihide
export function hideTL() {
  const theLoai = document.querySelector(".theLoaiover");
  const theloai2 = document.querySelector(".theloai2");
  theLoai.addEventListener("mouseover", function () {
    theloai2.style.pointerEvents = "auto";
    theloai2.style.visibility = "visible";
    theloai2.style.opacity = "1";
    theloai2.style.transform = "translate(0)";
    theloai2.style.transition = "0.5s";
  });
  theLoai.addEventListener("mouseout", function () {
    theloai2.style.pointerEvents = "none";
    theloai2.style.visibility = "hidden";
    theloai2.style.opacity = "0";
    theloai2.style.transform = "translate(-50vw)";
  });
}
hideTL();
