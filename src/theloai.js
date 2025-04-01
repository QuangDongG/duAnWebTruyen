import { Trangdoctruyen } from "./Local_main.js";
//import { hideTL } from "../tt.js";
const diV = document.querySelector(".divTL");

const urlParams = new URLSearchParams(window.location.search);
const countPage = 24;
let currentPage = 1;
let dataPage = [];
const data = decodeURIComponent(urlParams.get("data")); // Lấy giá trị của 'data'
const page = decodeURIComponent(urlParams.get("page"));
console.log(page);
console.log(data);

console.log(data);
const ulImg = document.querySelector(".ulImg");
async function theLoaiCapNhat() {
  try {
    let theloai = await axios.get(
      "https://otruyenapi.com/v1/api/the-loai/" + data + "?page=" + page
    );

    console.log(theloai);

    const total = theloai.data.data.params.pagination.totalItems;
    dataPage = theloai.data.data.items;
    console.log(dataPage);

    phanTrang(currentPage);
    numberPage(total);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
}
export function phanTrang(page) {
  const startIndex = (page - 1) * countPage;
  const endIndex = countPage * page;
  const arrayChild = dataPage.slice(startIndex, endIndex);
  diV.innerHTML = "";

  arrayChild.forEach((item) => {
    console.log(item.thumb_url); //

    const creatDiv = document.createElement("div");
    creatDiv.classList.add("divImg");

    const creatImg = document.createElement("img");
    creatImg.classList.add("imgtl");

    creatImg.src =
      "https://img.otruyenapi.com/uploads/comics/" + item.thumb_url;
    const pCreat = document.createElement("p");
    pCreat.textContent = "Đọc Truyện";
    pCreat.classList.add("pCreat");
    creatDiv.append(creatImg);
    diV.append(creatDiv);
    creatDiv.append(pCreat);
    //
    Trangdoctruyen(item, pCreat);
  });
}
export function numberPage(items) {
  const totalPages = Math.ceil(items / countPage);
  ulImg.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    const liImg = document.createElement("a");
    liImg.href = "#idImg";
    liImg.classList.add("liImg");
    liImg.textContent = String(i + 1);
    liImg.style.display = "none";

    let a = i + 1;

    if (a >= Number(page) - 2 && a <= Number(page) + 2) {
      liImg.style.display = "flex";
    }

    if (!(a >= Number(page) - 2 && a <= Number(page) + 2)) {
      liImg.style.display = "none";
    }
    if (a === totalPages) {
      liImg.style.display = "flex";
    }
    if (a === 1) {
      liImg.style.display = "flex";
    }
    ulImg.append(liImg);

    if (i === Number(page) - 1) {
      liImg.classList.add("mauTrang");
    }

    liImg.addEventListener("click", function () {
      const allPages = ulImg.querySelectorAll(".liImg");
      allPages.forEach((li) => li.classList.remove("mauTrang"));

      liImg.classList.add("mauTrang");
      currentPage = i + 1;
      window.location.href = `theloai.html?data=${data}&page=${encodeURIComponent(
        currentPage
      )}`;
      numberPage(items);
    });
  }
}
//tloai

theLoaiCapNhat();
