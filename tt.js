const select = document.querySelector(".truyennew");
function tt() {
  for (let i = 0; i < 12; i++) {
    let a = String(i + 1);
    const creatdiv = document.createElement("div");
    creatdiv.style.backgroundImage = "url(/manhwa/" + a + ".jpg)";

    creatdiv.classList.add("truyenmoi");
    const creatp = document.createElement("p");
    creatp.classList.add("thongtin");
    creatp.classList.add("hide");
    if (i === 0) {
      creatp.textContent = "Detective Conan";
    } else if (i === 1) {
      creatp.textContent = "The Beginning After the End";
    } else if (i === 2) {
      creatp.textContent = "Attack On Titan";
    } else if (i === 3) {
      creatp.textContent = "Blue Lock";
    } else if (i === 4) {
      creatp.textContent = "Demon Slayer";
    } else if (i === 5) {
      creatp.textContent = "Thiếu Niên Bóng Chuyền";
    } else if (i === 6) {
      creatp.textContent = "Death Note";
    } else if (i === 7) {
      creatp.textContent = "My Hero Academia";
    } else if (i === 8) {
      creatp.textContent = "One Punch Man";
    } else if (i === 9) {
      creatp.textContent = "Naruto";
    } else if (i === 10) {
      creatp.textContent = "Bastard";
    } else {
      creatp.textContent = "Solo Leveling";
    }
    const creata = document.createElement("a");
    const creatp1 = document.createElement("p");
    creatp1.textContent = "Đọc";
    creata.classList.add("doc");
    creata.setAttribute("href", "#");
    creata.append(creatp1);
    creatdiv.append(creatp, creata);
    select.append(creatdiv);
  }
}

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
    theloai2.style.visibility = "visible";
    theloai2.style.opacity = "1";
    theloai2.style.transform = "translate(0)";
    theloai2.style.transition = "0.5s";
  });
  theLoai.addEventListener("mouseout", function () {
    theloai2.style.visibility = "hidden";
    theloai2.style.opacity = "0";
    theloai2.style.transform = "translate(10vw)";
  });
}
hideTL();
