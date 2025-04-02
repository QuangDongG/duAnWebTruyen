function mainSearch() {
  let xoay = document.querySelector("#i");
  let button = document.querySelector(".text");
  let search = document.querySelector(".but");
  search.addEventListener("mouseover", function () {
    button.classList.add("fix");
    xoay.classList.add("ii");
  });
  button.addEventListener("mouseout", function () {
    button.classList.remove("fix");
    xoay.classList.remove("ii");
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
