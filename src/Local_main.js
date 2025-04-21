///
let b = [];
let count = 0;
function checkPassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (hasUpperCase && hasLowerCase && hasNumber) {
    return true;
  }
  return false;
}

function kTraTK(tk) {
  if (tk.length < 7) {
    log_in_dk.forEach((dk) => {
      dk.value = "";
      count++;
    });
    console.log("tai khoan qua ngan");
  }
  for (let i = 0; i < tk.length; i++) {
    let ascii = tk.charCodeAt(i);
    if (
      !(
        (ascii >= 65 && ascii <= 90) ||
        (ascii >= 97 && ascii <= 122) ||
        (ascii >= 48 && ascii <= 57)
      )
    ) {
      log_in_dk.forEach((dk) => {
        dk.value = "";
      });
      count++;
    }
  }
}
function Constructor(fullName, taiKhoan, matKhau, thongTinUser) {
  this.fullName = fullName;
  this.taiKhoan = taiKhoan;
  this.matKhau = matKhau;
  this.thongTinUser = thongTinUser;
}
//dk thong tin
const log_in_dk = Array.from(document.querySelectorAll(".dangki"));
const submitdk = document.querySelector(".sdk");
const gddki = document.querySelector(".gddk");
const gddnhap = document.querySelector(".gddn");
let luuTruThongTin = JSON.parse(localStorage.getItem("user")) || [];
submitdk.addEventListener("click", function (e) {
  e.preventDefault();
  let fullName,
    taiKhoan,
    matKhau,
    thongTinUser = [];

  log_in_dk.forEach((dk, index) => {
    if (index === 0) {
      fullName = dk.value;
    } else if (index === 1) {
      //ktra dk tai khoan
      taiKhoan = dk.value;
      console.log(taiKhoan.length);
      kTraTK(taiKhoan);
    } else {
      //ktra mat khau
      matKhau = dk.value;
      kTraTK(matKhau);
      checkPassword(matKhau);
      if (checkPassword(matKhau) === false) {
        log_in_dk.forEach((dk) => {
          dk.value = "";
        });
        count++;
      }
    }
  });
  //kra tai khoan trong local
  luuTruThongTin.forEach((tt) => {
    if (taiKhoan === tt.taiKhoan || taiKhoan === "") {
      console.log("bị trùng rồi");

      log_in_dk.forEach((dk) => {
        dk.value = "";
      });
      count++;
      return;
    }
  });
  if (count < 1) {
    const thongTin = new Constructor(fullName, taiKhoan, matKhau, thongTinUser);
    console.log(thongTin); //
    luuTruThongTin.unshift(thongTin);
    localStorage.setItem("user", JSON.stringify(luuTruThongTin));
    console.log(luuTruThongTin); //
    gddki.classList.add("hide");
    gddnhap.classList.remove("hide");

    //localStorage.clear()
    //localStorage.removeItem("user")
    log_in_dk.forEach((dk) => {
      dk.value = "";
    });
  }
  count = 0;
});
//ktr đă nhập
export let bool = false;
export let luu_bien = "";
const tk1 = document.querySelector(".tk1");
const user_khach_hang = document.querySelector(".user_khach_hang");
const name_khach_hang = document.querySelector(".name_khach_hang");
const submitdn = document.querySelector(".sdn");
const log_in_dn = Array.from(document.querySelectorAll(".submitdn"));
submitdn.addEventListener("click", function (e) {
  e.preventDefault();

  luuTruThongTin.forEach((duyet) => {
    if (
      log_in_dn[0].value === duyet.taiKhoan &&
      log_in_dn[1].value === duyet.matKhau
    ) {
      luu_bien = duyet;
      bool = true;
      let theo_doi;
      let lichSuTranga;
      let love;
      if (duyet.thongTinUser[0] === undefined) {
        lichSuTranga = [];
      } else {
        lichSuTranga = duyet.thongTinUser[0];
      }
      if (duyet.thongTinUser[2] === undefined) {
        theo_doi = [];
      } else {
        theo_doi = duyet.thongTinUser[2];
      }
      if (duyet.thongTinUser[1] === undefined) {
        love = [];
      } else {
        love = duyet.thongTinUser[1];
      }
      localStorage.setItem("love", JSON.stringify(love));
      localStorage.setItem("theoDoi", JSON.stringify(theo_doi));
      localStorage.setItem("lichSuTrang", JSON.stringify(lichSuTranga));
      localStorage.setItem("nguoiDunga", JSON.stringify(luu_bien));
      localStorage.setItem("dungSai", JSON.stringify(bool));
    }
  });
  if (luu_bien === undefined) {
    console.log("undefined");
    log_in_dn[0].value = "";
    log_in_dn[1].value = "";
  } else {
    name_khach_hang.textContent = "Hi_" + luu_bien.fullName + "!";
    tk1.style.display = "none";
    user_khach_hang.style.display = "flex";
    gddnhap.classList.add("hide");
  }
});
window.addEventListener("load", function () {
  luu_bien = JSON.parse(localStorage.getItem("nguoiDunga")) || "";
  bool = JSON.parse(localStorage.getItem("dungSai")) || false;
  if (luu_bien != "") {
    name_khach_hang.textContent = "Hi_" + luu_bien.fullName + "!";
    tk1.style.display = "none";
    user_khach_hang.style.display = "flex";
    gddnhap.classList.add("hide");
  } else {
    tk1.style.display = "flex";
    user_khach_hang.style.display = "none";
  }
});
window.addEventListener("click", function () {
  console.log(bool);
  console.log(luu_bien);
});
///
const logout = document.createElement("p");
logout.classList.add("logout");
logout.textContent = "Logout";
user_khach_hang.append(logout);
user_khach_hang.addEventListener("click", function () {
  logout.style.display = "flex";
  logout.addEventListener("click", function () {
    luu_bien = "";
    bool = false;
    localStorage.setItem("nguoiDunga", JSON.stringify(luu_bien));
    localStorage.setItem("dungSai", JSON.stringify(bool));
    tk1.style.display = "flex";
    user_khach_hang.style.display = "none";
    logout.style.display = "none";
  });
  document.body.addEventListener("dblclick", function () {
    logout.style.display = "none";
  });
});
const diV = document.querySelector(".canchinh");
const ulImg = document.querySelector(".ulImg");
///
let responseData = [];
const countPage = 24;
let currentPage = 1;
const cache = {};
//
async function fetchData() {
  try {
    const loading = document.createElement("div");
    loading.classList.add("loading");
    loading.textContent = "Loading...";
    diV.append(loading);

    // Lấy tổng số mục từ API và tính số trang
    const response = await axios.get(
      "https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=1"
    );
    console.log(response.data);

    const total = response.data.data.params.pagination.totalItems;
    let pagePromises = [];
    for (let page = 1; page <= 1; page++) {
      pagePromises.push(fetchPageData(page));
    }
    console.log(pagePromises.length);

    const chunkSize = 1;
    for (let i = 0; i < pagePromises.length; i += chunkSize) {
      await Promise.all(pagePromises.slice(i, i + chunkSize));
    }
    diV.removeChild(loading);
    phanTrang(currentPage);
    numberPage(total);
    TheLoaiDeXuat();
    Body();
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
}

async function fetchPageData(page) {
  if (cache[page]) {
    responseData = responseData.concat(cache[page]);
    return;
  }

  try {
    const responsed = await axios.get(
      `https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=${page}`
    );
    const data = responsed.data.data.items;
    cache[page] = data;
    responseData = responseData.concat(data);
  } catch (error) {
    console.error("Có lỗi xảy ra khi tải trang", page, error);
  }
}

// Phân trang
export function phanTrang(page) {
  const startIndex = (page - 1) * countPage;
  const endIndex = countPage * page;
  const arrayChild = responseData.slice(startIndex, endIndex);
  diV.innerHTML = "";

  arrayChild.forEach((item) => {
    console.log(item.thumb_url); //

    const creatDiv = document.createElement("div");
    creatDiv.classList.add("divImg");

    const creatImg = document.createElement("img");
    creatImg.classList.add("img");
    creatImg.src =
      "https://img.otruyenapi.com/uploads/comics/" + item.thumb_url;
    const pCreat = document.createElement("p");
    pCreat.textContent = item.name;
    pCreat.classList.add("pCreat");
    creatDiv.append(creatImg);
    diV.append(creatDiv);
    creatDiv.append(pCreat);
    //
    pCreat.addEventListener("click", function () {
      localStorage.setItem("userdn", JSON.stringify(luu_bien));
      LichSu(item, bool, luu_bien, "lichSuTrang", 0);
      //
      const isFollowing =
        localStorage.getItem("isFollowing_" + item.slug) || false;
      console.log(isFollowing);
      const xoay = document.querySelector(".xoay");
      if (isFollowing === "true") {
        xoay.style.color = "yellow";
      }
    });

    HienThiThongTin(item, creatImg);
    Trangdoctruyen(item, pCreat);
  });
}

export function numberPage(items) {
  const spanImg = document.createElement("span");
  const totalPages = Math.ceil(items / countPage);
  ulImg.innerHTML = "";
  ulImg.append(spanImg);
  for (let i = 0; i < totalPages; i++) {
    const liImg = document.createElement("a");
    const divliImg = document.createElement("div");
    liImg.href = "#idImg";
    liImg.classList.add("liImg");
    liImg.textContent = String(i + 1);
    liImg.style.display = "none";
    divliImg.append(liImg);
    let a = i + 1;

    if (a >= currentPage - 2 && a <= currentPage + 2) {
      liImg.style.display = "flex";
    }

    if (!(a >= currentPage - 2 && a <= currentPage + 2)) {
      liImg.style.display = "none";
    }
    if (a === totalPages) {
      liImg.style.display = "flex";
    }
    if (a === 1) {
      liImg.style.display = "flex";
    }
    spanImg.append(divliImg);

    if (i === currentPage - 1) {
      liImg.classList.add("mauTrang");
    }
    if (i > 0) {
      liImg.addEventListener("click", function () {
        liImg.classList.add("mauTrang");
        currentPage = i + 1;
        const data = "truyen-moi";
        window.location.href = `src/theloai.html?data=${data}&page=${encodeURIComponent(
          currentPage
        )}`;
      });
    } else {
      liImg.addEventListener("click", function () {
        const allPages = ulImg.querySelectorAll(".liImg");
        allPages.forEach((li) => li.classList.remove("mauTrang"));

        liImg.classList.add("mauTrang");
        currentPage = i + 1;
        phanTrang(currentPage);
        numberPage(items);
      });
    }
  }
}
export function Trangdoctruyen(item, pCreat) {
  const content_nameStory = document.querySelector(".content-nameStory");
  const chitiet = document.querySelector(".thongTin");
  const phanChiTiet = document.querySelector(".phanThongTin");
  const overlay = document.querySelector(".overlay");
  const close = document.querySelector(".close-btn");
  const img_info = document.querySelector(".img-info");
  const phanChap = document.querySelector(".phanChap"); //phan chap
  const imgChiTiet = document.createElement("img");
  imgChiTiet.classList.add("imgChiTiet");

  const thongTinTrang = document.querySelector(".thongTinTrang");
  const imgTrang = document.createElement("div");
  imgTrang.classList.add("imgTrang");

  pCreat.addEventListener("click", async function () {
    // Xoá nội dung cũ trước khi hiển thị nội dung mới
    overlay.style.display = "flex";
    phanChiTiet.textContent = "";
    phanChap.textContent = "";
    img_info.textContent = "";
    content_nameStory.textContent = "";
    const nameStory = document.createElement("li");
    nameStory.classList.add("nameStory");
    const ulChapter = document.createElement("ul");
    ulChapter.classList.add("ulChapter");

    try {
      const response = await axios.get(
        "https://otruyenapi.com/v1/api/truyen-tranh/" + item.slug
      );

      imgChiTiet.src =
        "https://img.otruyenapi.com/uploads/comics/" + item.thumb_url;

      const data = response.data.data;
      const tt = data.seoOnPage.seoSchema;
      const tl = data.item.category;
      const chapters = data.item.chapters[0].server_data;

      const divTTP = document.createElement("div");
      divTTP.classList.add("divTTP");

      tl.forEach((tl) => {
        const pTT = document.createElement("p");
        pTT.classList.add("pTT");
        pTT.textContent = tl.name;
        divTTP.append(pTT);
      });

      let chap =
        chapters.length > 0 ? chapters[chapters.length - 1].chapter_name : "";
      let str = data.item.updatedAt.slice(0, 10);
      let name = tt.name;
      if (name.endsWith("- ")) {
        name = name.slice(0, name.length - 2);
      }
      const dataItems = ["Chapter:" + chap, "Tác giả:" + tt.director];
      const content_story = [
        name,
        "Cập nhật lần cuối:" + str,
        "Giới thiệu:" +
          data.item.content.slice(3, data.item.content.length - 4),
      ];

      TruyenDeXuat(item);

      dataItems.forEach((itemData) => {
        let liTT = document.createElement("li");
        liTT.classList.add("liTTa");
        liTT.textContent = itemData;
        nameStory.append(liTT);
      });

      nameStory.append(divTTP);

      content_story.forEach((itemData, index) => {
        let liTT = document.createElement("li");
        if (index === 0) {
          liTT.classList.add("ten-truyen");
        } else if (index === 1) {
          liTT.classList.add("update");
        } else {
          liTT.classList.add("liTTa");
        }
        liTT.textContent = itemData;
        content_nameStory.append(liTT);
      });

      Tim(item, nameStory);

      // Theo dõi

      const divtheodoi = document.createElement("div");
      divtheodoi.classList.add("divtheodoi");

      const theodoi = document.createElement("i");
      theodoi.classList.add("fa-solid", "fa-bookmark", "xoay");
      divtheodoi.append(theodoi);
      nameStory.append(divtheodoi);

      divtheodoi.addEventListener("click", function () {
        theodoi.style.color = "yellow";
        localStorage.setItem("isFollowing_" + item.slug, true);
        localStorage.setItem("userdn", JSON.stringify(luu_bien));
        LichSu(item, bool, luu_bien, "theoDoi", 2);
      });

      // Chọn chapter
      const choice_chap = document.createElement("select");
      choice_chap.classList.add("choice-chap");

      chapters.forEach((chapter, index) => {
        const option_chap = document.createElement("option");
        option_chap.classList.add("option-chap");
        option_chap.textContent = "Chap:" + chapter.chapter_name;
        choice_chap.append(option_chap);

        const divChap = document.createElement("div");
        divChap.classList.add("divChap");
        divChap.append("Chap:", chapter.chapter_name);

        ulChapter.append(divChap);

        divChap.addEventListener("click", function () {
          const chapterUrl = `/trangtruyen/trangtruyen.html?slug=${encodeURIComponent(
            item.slug
          )}&chapter=${encodeURIComponent(
            chapter.chapter_name
          )}&index=${encodeURIComponent(index)}`;
          window.open(chapterUrl, "_blank");
        });

        choice_chap.addEventListener("change", function () {
          const selectedIndex = choice_chap.selectedIndex;
          const selectedChapter = chapters[selectedIndex];
          const chapterUrl = `/trangtruyen/trangtruyen.html?slug=${encodeURIComponent(
            item.slug
          )}&chapter=${encodeURIComponent(
            selectedChapter.chapter_name
          )}&index=${encodeURIComponent(selectedIndex)}`;
          window.open(chapterUrl, "_blank");
        });
      });

      img_info.append(imgChiTiet, nameStory);
      phanChap.append(choice_chap, ulChapter);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  });

  close.addEventListener("click", function () {
    overlay.style.display = "none";
  });
}

//theloai

let string = "src/";
const divtheloai = document.querySelector(".divtheloai");
export async function TheLoai(string, divtheloai) {
  let slug = "";
  try {
    const response = await axios.get("https://otruyenapi.com/v1/api/the-loai");
    response.data.data.items.forEach((items) => {
      const bttheloai = document.createElement("button");
      const ptheloai = document.createElement("p");
      bttheloai.classList.add("atheloai");
      ptheloai.classList.add("ptheloai");
      ptheloai.textContent = items.name;
      bttheloai.append(ptheloai);
      divtheloai.append(bttheloai);
      bttheloai.addEventListener("click", function () {
        slug = items.slug;
        console.log(slug);
        window.location.href = `${string}theloai.html?data=${encodeURIComponent(
          slug
        )}&page=1`;
      });
    });
  } catch {}
}
document.body.addEventListener("click", function () {
  console.log(window.location.href);
});
//tim-kiem
export async function TimKiem(string) {
  const text = document.querySelector(".text");
  const but = document.querySelector(".but");
  but.addEventListener("click", function () {
    if (text.value === "") {
      if (text.style.width === "45vw") {
        const data = "tim-kiem";
        console.log(text.value);
        window.location.href = `${string}theloai.html?data=${data}&page=1&keyword=${encodeURIComponent(
          text.value
        )}`;
      } else {
        text.style.width = "45vw";
      }
    } else {
      const data = "tim-kiem";
      console.log(text.value);
      window.location.href = `${string}theloai.html?data=${data}&page=1&keyword=${encodeURIComponent(
        text.value
      )}`;
    }
  });
  text.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      const data = "tim-kiem";
      console.log(text.value);
      window.location.href = `${string}theloai.html?data=${data}&page=1&keyword=${encodeURIComponent(
        text.value
      )}`;
    }
  });
}
export function HienThiThongTin(item, creatImg) {
  let divTT = document.querySelector(".divTT");
  creatImg.addEventListener("mouseenter", async function () {
    divTT.style.display = "flex";
    try {
      let ulTT = document.createElement("ul");
      let divTTP = document.createElement("div");
      divTTP.classList.add("divTTP");
      divTT.append(ulTT);
      let responseShip = await axios.get(
        "https://otruyenapi.com/v1/api/truyen-tranh/" + item.slug
      );
      let tt = responseShip.data.data.seoOnPage.seoSchema;
      let tl = responseShip.data.data.item.category;
      tl.forEach((tl) => {
        const pTT = document.createElement("p");
        pTT.classList.add("pTT");
        pTT.textContent = tl.name;
        divTTP.append(pTT);
      });
      let chap;
      if (responseShip.data.data.item.chapters.length > 0) {
        chap =
          responseShip.data.data.item.chapters[0].server_data[
            responseShip.data.data.item.chapters[0].server_data.length - 1
          ].chapter_name;
      } else {
        chap = "";
      }
      let str = responseShip.data.data.item.updatedAt.slice(0, 10);
      const dataItems = [
        "Tên truyện:" + tt.name,
        "Chapter:" + chap,

        "Tác giả:" + tt.director,
        "Giới thiệu:" + responseShip.data.data.seoOnPage.descriptionHead,
        "Uppdate:" + str,
      ];

      dataItems.forEach((itemData) => {
        let liTT = document.createElement("li");
        liTT.classList.add("liTT");
        liTT.textContent = itemData; // Gán textContent vào li
        ulTT.append(liTT); // Thêm li vào ul
      });
      ulTT.append(divTTP);
      creatImg.addEventListener("mousemove", function (e) {
        divTT.style.top = -80 + window.scrollY + e.clientY + "px";
        divTT.style.left = 30 + e.clientX + "px";
      });

      document.body.append(divTT);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu: ", error);
    }
  });

  creatImg.addEventListener("mouseleave", function () {
    divTT.textContent = "";
    divTT.style.display = "none";
  });
}
///
export function LichSu(item, bool, luu_bien, menu, number) {
  let lichsu = [],
    yeuthich = [],
    theodoi = [],
    thich = [];
  yeuthich = b;
  luu_bien.thongTinUser = [lichsu, yeuthich, theodoi, thich];
  let luuTru = JSON.parse(localStorage.getItem("user")) || [];
  let luu = JSON.parse(localStorage.getItem(menu)) || [];
  console.log(luu);

  luu_bien.thongTinUser[number] = [...luu];
  if (bool) {
    const exists = luu_bien.thongTinUser[number].includes(item.slug);

    if (!exists) {
      luu_bien.thongTinUser[number].unshift(item.slug);
      localStorage.setItem(menu, JSON.stringify(luu_bien.thongTinUser[number]));
    }
  }
  console.log(luu_bien);
  let a = 0;
  luuTru.forEach((luuTru, index) => {
    if (luuTru.fullName === luu_bien.fullName) {
      a = index;
    }
  });
  luuTru[a] = luu_bien;
  console.log(a);
  localStorage.setItem("user", JSON.stringify(luuTru));
}
const theo_doi_ul = document.querySelector(".theo_doi_ul");
const theo_doi_a = document.querySelector(".theo_doi_a");
const lichsuul = document.querySelector(".lichsuul");
const lichsua = document.querySelector(".lichsua");
const lichsu = document.querySelector(".lichsu");
const theo_doi = document.querySelector(".theo_doi");
export function addTruyen(lichsua, lichsuul, menu, number, lichsu) {
  // Kiểm tra phần tử tồn tại trước khi thêm sự kiện
  if (lichsua && lichsuul) {
    lichsua.addEventListener("mouseover", function () {
      let luu = JSON.parse(localStorage.getItem(menu)) || [];
      luu_bien.thongTinUser[number] = luu;
      console.log(luu_bien.thongTinUser[number]);
    });
    lichsua.addEventListener("click", async function () {
      if (number === 0) {
        lichsuul.innerHTML = `<div class="divadd"><p style="font-weight: bold;">Lịch Sử</p><br></div>`;
      } else if (number === 2) {
        lichsuul.innerHTML = `<div class="divadd"><p style="font-weight: bold;">Đang Theo Dõi</p><br></div>`;
      }

      lichsuul.style.visibility = "visible";
      lichsuul.style.opacity = "1";
      lichsuul.style.transition = "1s";
      await ClickLichSu(luu_bien.thongTinUser[number]); // Đảm bảo đợi cho async function chạy xong
    });

    lichsu.addEventListener("mouseleave", function () {
      lichsuul.style.visibility = "hidden";
      lichsuul.style.opacity = "0";
      lichsuul.textContent = "";
    });
  } else {
    console.log("KO có");
  }

  function ClickLichSu(luu_bien) {
    luu_bien.forEach(async (e) => {
      let imgls = await axios.get(
        "https://otruyenapi.com/v1/api/truyen-tranh/" + e
      );
      let item = imgls.data.data.item;
      const lichsuli = document.createElement("li");
      lichsuli.classList.add("lichsuli");
      const lichsup = document.createElement("p");
      lichsup.classList.add("lichsup");
      const lichsuimg = document.createElement("img");
      lichsuimg.classList.add("lichsuimg");
      lichsuimg.src = imgls.data.data.seoOnPage.seoSchema.image;
      lichsup.textContent = item.name;
      lichsuli.append(lichsuimg, lichsup);
      lichsuul.append(lichsuli);

      Trangdoctruyen(item, lichsup);
    });
  }
}

function Tim(item, ulChiTiet) {
  let luuTru = JSON.parse(localStorage.getItem("user")) || [];
  let luu = JSON.parse(localStorage.getItem("love")) || [];
  let a = 0;
  let push = {
    slug: item.slug,
    dungsai: false,
  };

  luuTru.forEach((user, index) => {
    if (user.fullName === luu_bien.fullName) {
      a = index;
    }
  });

  luuTru[a].thongTinUser[1] = [...luu];

  let countlove = localStorage.getItem(`countlove-${item.slug}`)
    ? parseInt(localStorage.getItem(`countlove-${item.slug}`))
    : 0;

  const divyeuthich = document.createElement("div");
  divyeuthich.classList.add("divyeuthich");

  const yeuthich = document.createElement("i");
  yeuthich.classList.add("fa-solid", "fa-heart", "xoay");

  const countDisplay = document.createElement("span");
  countDisplay.textContent = `:${countlove}`;
  let index = -1;
  luuTru[a].thongTinUser[1].forEach((ex, index1) => {
    if (ex.slug === item.slug) {
      index = index1;
    }
  });
  if (index !== -1) {
    if (luuTru[a].thongTinUser[1][index].dungsai) {
      yeuthich.classList.add("liked");
    } else {
      yeuthich.classList.remove("liked");
    }
  } else {
    yeuthich.classList.remove("liked");
  }
  yeuthich.addEventListener("click", function () {
    if (bool) {
      let index = -1;
      luuTru[a].thongTinUser[1].forEach((ex, index1) => {
        if (ex.slug === item.slug) {
          index = index1;
        }
      });

      if (index !== -1) {
        yeuthich.classList.toggle("liked");

        let check = luuTru[a].thongTinUser[1][index].dungsai;

        luuTru[a].thongTinUser[1][index].dungsai = !check;
        if (yeuthich.classList.contains("liked")) {
          countlove++;
        } else {
          countlove--;
        }

        localStorage.setItem("love", JSON.stringify(luuTru[a].thongTinUser[1]));
      } else {
        yeuthich.classList.toggle("liked");
        push.dungsai = yeuthich.classList.contains("liked");

        if (yeuthich.classList.contains("liked")) {
          countlove++;
        } else {
          countlove--;
        }
        luuTru[a].thongTinUser[1].unshift(push);

        localStorage.setItem("love", JSON.stringify(luuTru[a].thongTinUser[1]));
        console.log(luuTru);
      }
      localStorage.setItem("user", JSON.stringify(luuTru));
      b = luuTru[a].thongTinUser[1];
      countDisplay.textContent = `:${countlove}`;
      localStorage.setItem(`countlove-${item.slug}`, countlove);
    }
  });

  divyeuthich.append(yeuthich, countDisplay);
  ulChiTiet.append(divyeuthich);
}

document.addEventListener("DOMContentLoaded", function () {
  addTruyen(lichsua, lichsuul, "lichSuTrang", 0, lichsu);
  addTruyen(theo_doi_a, theo_doi_ul, "theoDoi", 2, theo_doi);
});
//body

async function Body() {
  let sothich = JSON.parse(localStorage.getItem("dulieu")) || ["harem"];

  const random = Math.floor(Math.random() * sothich.length);
  let noiDungPhanTrang = [
    "ngon-tinh",
    "chuyen-sinh",
    "manhwa",
    "thieu-nhi",
    "adult",
    "comedy",
    "co-dai",
    "doujinshi",
    "drama",
    "shoujo-ai",
    "trinh-tham",
    sothich[random],
  ];
  let theloaiBody = [
    "Tình Yêu Viễn Tưởng",
    "Thế Giới Khác",
    "Truyện Tranh Hàn Quốc",
    "Ước Mơ Tuổi Thơ",
    "Thế giới người lớn",
    "Cười thả ga",
    "Về miền ký ức",
    "Sáng tạo không giới hạn",
    "Kịch tính nghẹt thở",
    "Tình yêu thiếu nữ",
    "Lật mở vụ án",
    "Đề xuất theo sở thích của bạn",
  ];
  let font = [
    '<i class="fa-solid fa-heart" style="color: #ffadce;"></i>',
    '<i class="fa-brands fa-studiovinari" style="color: #FFD43B;"></i>',
    '<i class="fas fa-star sparkle-icon"></i> ',
    '<i class="fa-brands fa-odysee" style="color: #B197FC;"></i>',
    '<i class="fa-brands fa-bluesky"></i>',
    '<i class="fa-brands fa-themeisle"></i>',
    '<i class="fa-brands fa-fly" style="color: #B197FC;"></i>',
    '<i class="fas fa-pen-nib"  style="color: #7089b2;"></i>',
    '<i class="fas fa-theater-masks" style="color: #ef9b4e;"></i>',
    '<i class="fas fa-venus-double" style="color: #f59999;"></i>',
    '<i class="fas fa-user-secret" style="color: #935806;"></i>',
    "",
  ];
  let sliderFoot = document.querySelector(".sliderFoot");
  let sliderFootTour = document.querySelector(".sliderFootTour");
  let slider = document.querySelector(".slider");
  for (let i = 0; i < noiDungPhanTrang.length; i++) {
    let categorySection = document.createElement("div");
    categorySection.classList.add("category-section");
    let sectionTitle = document.createElement("h2");
    sectionTitle.classList.add("section-title");
    let mangaGrid = document.createElement("div");

    mangaGrid.classList.add("manga-grid");
    let item = await axios.get(
      "https://otruyenapi.com/v1/api/the-loai/" +
        noiDungPhanTrang[i] +
        "?page=1"
    );
    sectionTitle.innerHTML =
      font[i] + theloaiBody[i] + '<p class="xemthem">Xem thêm</p>';
    if (i === 0) {
      categorySection.classList.add("trangTri");
    }
    for (let index = 0; index < item.data.data.items.length; index++) {
      if (index === 7) break;

      const items = item.data.data.items[index];

      const creatDiv = document.createElement("div");
      creatDiv.classList.add("manga-card");

      const creatImg = document.createElement("img");

      creatImg.src =
        "https://img.otruyenapi.com/uploads/comics/" + items.thumb_url;

      const pCreat = document.createElement("div");
      pCreat.textContent = items.name;
      pCreat.classList.add("manga-card-title");

      creatDiv.append(creatImg, pCreat);
      mangaGrid.append(creatDiv);
      Trangdoctruyen(items, pCreat);
    }

    categorySection.append(sectionTitle, mangaGrid);
    if (i < 4) {
      slider.append(categorySection);
    } else if (i >= 4 && i < 7) {
      sliderFoot.append(categorySection);
    } else {
      sliderFootTour.append(categorySection);
    }
    const xemThem = Array.from(document.querySelectorAll(".xemthem"));
    xemThem[i].addEventListener("click", function () {
      window.location.href = `/src/theloai.html?data=${encodeURIComponent(
        noiDungPhanTrang[i]
      )}&page=1`;
    });
  }
}
async function TheLoaiDeXuat() {
  const sliderInner = document.querySelector(".slider-inner");
  const noiDung = [
    {
      title: "Tiểu thuyết/truyện lãng mạn",
      name: "Dưới Tán Lá Rơi",
      theloai: "Ngôn Tình",
      slug: "ngon-tinh",
      img: "anhBia/1.jpg",
      noidung:
        " Tiểu thuyết hoặc truyện lãng mạn, thường có yếu tố kịch tính và tập trung vào mối quan hệ tình cảm.",
    },
    {
      title: "Võ thuật, chiến đấu",
      name: "Chiến Tranh Fantasy",
      theloai: "Martial Arts",
      slug: "martial-arts",
      img: "anhBia/2.jpg",
      noidung:
        "Tập trung vào các môn võ thuật, kỹ năng chiến đấu, và triết lý võ đạo",
    },
    {
      title: "Thế giới phép thuật, sinh vật huyền bí",
      name: " Noragami",
      theloai: "Thế Giới Huyền Ảo",
      slug: "fantasy",
      img: "anhBia/3.jpg",
      noidung:
        "Thế giới giả tưởng với phép thuật, quái vật, các chủng tộc hư cấu, và thường có những cuộc chiến giữa thiện và ác.",
    },
    {
      title: "Siêu nhiên, ma quỷ",
      name: " Công chúa Mononoke",
      theloai: "Supernatural",
      slug: "supernatural",
      img: "anhBia/4.jpg",
      noidung: "Chứa các yếu tố siêu nhiên như ma quỷ, thần thánh, phép thuật",
    },
    {
      title: "Dành cho trẻ em",
      name: "okohama Kaidashi Kikou",
      theloai: "Thiếu Nhi",
      slug: "thieu-nhi",
      img: "anhBia/5.jpg",
      noidung: "Nội dung dành cho trẻ em,tuổi thơ của vô số trẻ em",
    },
    {
      title: "Phiêu lưu, khám phá, thử thách",
      name: "Sword Art Online",
      theloai: "Adventure",
      slug: "adventure",
      img: "anhBia/6.jpg",
      noidung:
        "Kể về những cuộc phiêu lưu, hành trình khám phá những vùng đất mới, tìm kiếm kho báu, hoặc đối mặt với những thử thách nguy hiểm",
    },
    {
      title: "Cảm xúc, xung đột, mối quan hệ phức tạp",
      name: "Mèo và Góc Phố Xanh",
      theloai: "Drama",
      slug: "drama",
      img: "anhBia/7.jpg",
      noidung:
        "Tập trung vào các mối quan hệ phức tạp, cảm xúc sâu sắc, và những xung đột trong cuộc sống của nhân vật.",
    },
    {
      title: "Bối cảnh lịch sử có thật",
      name: "Attack On Titan",
      theloai: "Chính Trị,Lịch Sử",
      slug: "historical",
      img: "anhBia/8.jpg",
      noidung:
        "Lấy bối cảnh dựa trên các sự kiện, nhân vật hoặc thời kỳ lịch sử có thật.",
    },
    {
      title: "Điều tra tội phạm, phá án",
      name: "A Haunting in Venice",
      theloai: "Trinh-Thám",
      slug: "trinh-tham",
      img: "anhBia/9.jpg",
      noidung:
        "Tập trung vào việc điều tra tội phạm và tìm ra hung thủ,thường không có các yếu tối tình cảm",
    },
    {
      title: "Một nam chính, nhiều nữ thích,và ngược lại",
      name: "Ánh Sao Định Mệnh và Ba Chàng Hoàng Tử",
      theloai: "Harem",
      slug: "harem",
      img: "anhBia/10.jpg",
      noidung:
        "Một nhân vật nam chính được nhiều nhân vật nữ yêu thích và vây quanh",
    },
  ];

  // Hàm tạo 1 thẻ manga
  function createMangaItem(
    data,
    isCenter = false,
    nextTitle = "",
    includeDesc = ""
  ) {
    const featuredManga = document.createElement("div");
    featuredManga.classList.add("featured-manga");
    if (isCenter) featuredManga.classList.add("center-manga");

    const imgManga = document.createElement("img");
    imgManga.src = data.img;
    imgManga.alt = "Error";

    const mangaStatus = document.createElement("div");
    mangaStatus.classList.add("manga-status");
    mangaStatus.textContent = data.name;

    const mangaTitle = document.createElement("div");
    mangaTitle.classList.add("manga-title");

    const h3 = document.createElement("h3");
    h3.textContent = data.theloai;

    const p = document.createElement("p");
    p.textContent = nextTitle || data.title;

    mangaTitle.append(h3, p);

    featuredManga.append(imgManga, mangaStatus, mangaTitle);

    if (isCenter && includeDesc) {
      const mangaDesc = document.createElement("div");
      mangaDesc.classList.add("manga-desc");
      mangaDesc.textContent = includeDesc;
      featuredManga.appendChild(mangaDesc);
    }
    imgManga.addEventListener("click", function () {
      console.log(data.slug);
      window.location.href = `/src/theloai.html?data=${encodeURIComponent(
        data.slug
      )}&page=1`;
    });
    return featuredManga;
  }

  for (let i = 0; i < 10; i++) {
    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");

    const prevIndex = i === 0 ? 9 : i - 1;
    const nextIndex = i === 9 ? 0 : i + 1;

    sliderItem.appendChild(createMangaItem(noiDung[prevIndex]));
    sliderItem.appendChild(
      createMangaItem(noiDung[i], true, noiDung[i].title, noiDung[i].noidung)
    );
    sliderItem.appendChild(createMangaItem(noiDung[nextIndex]));

    sliderInner.appendChild(sliderItem);
  }

  chucNang();
}
//
function chucNang() {
  const sliderInner = document.querySelector(".slider-inner");
  const slides = document.querySelectorAll(".slider-item");
  const dots = document.querySelectorAll(".slider-pagination .dot");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  let currentIndex = 0;
  const totalSlides = slides.length;

  let autoSlideInterval;

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      const newIndex = (currentIndex + 1) % totalSlides;
      goToSlide(newIndex);
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function goToSlide(index) {
    sliderInner.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(index);
      startAutoSlide();
    });
  });
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stopAutoSlide();
      const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      goToSlide(newIndex);
      startAutoSlide();
    });
  }

  // Sự kiện click nút next
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopAutoSlide();
      const newIndex = (currentIndex + 1) % totalSlides;
      goToSlide(newIndex);
      startAutoSlide();
    });
  }

  // Khởi tạo vị trí ban đầu và bắt đầu auto slide
  goToSlide(0);
  startAutoSlide();

  // Dừng auto slide khi tab không được focus
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });
}
async function TruyenDeXuat(item) {
  let recommended_stories = document.querySelector(".recommended-stories");
  recommended_stories.textContent = "";
  let slug_tl = item.category;
  let random = Math.floor(Math.random() * slug_tl.length);
  let tl = await axios.get(
    "https://otruyenapi.com/v1/api/the-loai/" + slug_tl[random].slug + "?page=1"
  );
  let items = tl.data.data.items;
  items.forEach((item) => {
    const creatDiv = document.createElement("div");
    creatDiv.classList.add("divImg");

    const creatImg = document.createElement("img");
    creatImg.classList.add("img");
    creatImg.src =
      "https://img.otruyenapi.com/uploads/comics/" + item.thumb_url;
    const pCreat = document.createElement("p");
    pCreat.textContent = item.name;
    pCreat.classList.add("pCreat");
    creatDiv.append(creatImg, pCreat);
    recommended_stories.append(creatDiv);
    Trangdoctruyen(item, pCreat);
  });
}

//
TimKiem(string);
TheLoai(string, divtheloai);
fetchData();
