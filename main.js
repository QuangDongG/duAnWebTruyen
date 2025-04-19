function mainSearch() {
  let xoay = document.querySelector("#i");
  let button = document.querySelector(".text");
  let search = document.querySelector(".but");
  search.addEventListener("mouseover", function (e) {
    e.stopPropagation();
    button.classList.add("fix");
    xoay.classList.add("ii");
  });
  window.addEventListener("click", function (e) {
    if (!button.contains(e.target) && !search.contains(e.target)) {
      button.classList.remove("fix");
      xoay.classList.remove("ii");
    }
  });
  // giao dien dang nhap dang ki
  let taikhoan = document.querySelector(".tk");
  let login = document.querySelector(".login");
  let dn = document.querySelector(".DN");
  let dk = document.querySelector(".DK");
  let gddn = document.querySelector(".gddn");
  let gddk = document.querySelector(".gddk");
  let xoa = document.querySelectorAll(".x");
  taikhoan.addEventListener("mouseover", function () {
    login.classList.remove("hide");
  });
  login.addEventListener("mouseleave", function () {
    login.classList.add("hide");
  });
  dn.addEventListener("click", function () {
    login.classList.add("hide");
    gddn.classList.remove("hide");
  });
  dk.addEventListener("click", function () {
    login.classList.add("hide");
    gddk.classList.remove("hide");
  });
  xoa[0].addEventListener("click", function () {
    gddn.classList.add("hide");
  });
  xoa[1].addEventListener("click", function () {
    gddk.classList.add("hide");
  });
}

mainSearch();
function Decor() {
  document.addEventListener("mousemove", (e) => {
    let particlesContainer = document.querySelector(".particles");
    let particle = document.createElement("div");
    particle.style.left = `${e.pageX - 3}px`;
    particle.style.top = `${e.pageY - 3}px`;

    particlesContainer.appendChild(particle);
    setTimeout(() => {
      particle.remove();
    }, 8000);
  });
}
Decor();

function MP3() {
  const list_music = document.querySelector(".list-music");
  const slug_music = {
    slug: ["mp3/TRTD.mp3", "mp3/TungLa.mp3", "mp3/XLDC.mp3"],
    name: ["Tháp rơi tự do", "Từng Là", "Xin lỗi được chưa"],
  };
  slug_music.name.forEach((name, index) => {
    const option_music = document.createElement("option");
    option_music.textContent = name;
    option_music.value = slug_music.slug[index];
    list_music.append(option_music);
  });
  const mp3_audio = document.querySelector(".mp3-audio");
  const play_music = document.querySelector(".play-music");
  const music = document.querySelector(".bg-music");
  const volume = document.querySelector(".volume");
  const music_dvd = document.querySelector(".music-dvd");
  volume.addEventListener("input", function () {
    music.volume = volume.value;
  });
  let isPlaying = false;
  play_music.addEventListener("click", function () {
    music_dvd.classList.toggle("dvd");
    if (!isPlaying) {
      music.play();
      play_music.textContent = "Stop";
    } else {
      music.pause();
      //music.currentTime = 0;
      play_music.textContent = "Play";
    }
    isPlaying = !isPlaying;
  });
  list_music.addEventListener("input", function () {
    music.src = list_music.value;
    if (isPlaying) {
      music.play();
    }
  });

  volume.addEventListener("input", function () {
    const value = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.background = `linear-gradient(to right, #ffb6c1 0%, #ffb6c1 ${value}%, #fff ${value}%, #fff 100%)`;
  });
}
MP3();
function DarkMode() {
  const change_backGround = document.querySelector(".bg-pro-max");
  const check_input = document.querySelector(".toggle-input");
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  check_input.checked = isDarkMode;
  change_backGround.style.background = isDarkMode ? "#121212" : "white";
  check_input.addEventListener("change", function () {
    if (check_input.checked) {
      change_backGround.style.background = "#121212";
      localStorage.setItem("darkMode", "true");
    } else {
      change_backGround.style.background = "white";
      localStorage.setItem("darkMode", "false");
    }
  });
}

DarkMode();
