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
      let lichSuTranga;
      let love;
      if (duyet.thongTinUser[0] === undefined) {
        lichSuTranga = [];
      } else {
        lichSuTranga = duyet.thongTinUser[0];
      }
      if (duyet.thongTinUser[1] === undefined) {
        love = [];
      } else {
        love = duyet.thongTinUser[1];
      }
      localStorage.setItem("love", JSON.stringify(love));
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
      LichSu(item, bool, luu_bien);
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
  const closed = document.querySelector(".close");
  const chitiet = document.querySelector(".thongTin");
  const phanChiTiet = document.querySelector(".phanThongTin");
  const imgChiTiet = document.createElement("img");
  imgChiTiet.classList.add("imgChiTiet");
  const overlay = document.querySelector(".overlay");
  const close = document.querySelector(".close-btn");

  const phanChap = document.querySelector(".phanChap"); //phan chap
  //const luotThich = document.querySelector(".luotThich");
  // const pageTruyen = document.querySelector(".pageTruyen");
  console.log(item); //
  //trang truyen
  const thongTinTrang = document.querySelector(".thongTinTrang");
  const imgTrang = document.createElement("div");
  imgTrang.classList.add("imgTrang");
  pCreat.addEventListener("click", async function () {
    const ulChapter = document.createElement("ul");

    overlay.style.display = "flex";
    phanChiTiet.textContent = "";
    const ulChiTiet = document.createElement("ul");
    ulChiTiet.classList.add("ulChiTiet");
    const chapterli = document.createElement("li");
    chapterli.classList.add("chapterli");
    const nameStory = document.createElement("li");
    nameStory.classList.add("nameStory");

    const slug = await axios
      .get("https://otruyenapi.com/v1/api/truyen-tranh/" + item.slug)
      .then(function (response) {
        imgChiTiet.src =
          "https://img.otruyenapi.com/uploads/comics/" + item.thumb_url;
        console.log(response.data.data);

        let divTTP = document.createElement("div");
        divTTP.classList.add("divTTP");

        // divTT.append(ulTT);

        let tt = response.data.data.seoOnPage.seoSchema;
        let tl = response.data.data.item.category;
        tl.forEach((tl) => {
          const pTT = document.createElement("p");
          pTT.classList.add("pTT");
          pTT.textContent = tl.name;
          divTTP.append(pTT);
        });
        let chap;
        if (response.data.data.item.chapters.length > 0) {
          chap =
            response.data.data.item.chapters[0].server_data[
              response.data.data.item.chapters[0].server_data.length - 1
            ].chapter_name;
        } else {
          chap = "";
        }
        let str = response.data.data.item.updatedAt.slice(0, 10);
        const dataItems = [
          "Tên truyện:" + tt.name,
          "Chapter:" + chap,

          "Tác giả:" + tt.director,
          "Giới thiệu:" +
            response.data.data.item.content.slice(
              3,
              response.data.data.item.content.length - 4
            ),
          "Uppdate:" + str,
        ];

        dataItems.forEach((itemData) => {
          let liTT = document.createElement("li");
          liTT.classList.add("liTTa");
          liTT.textContent = itemData; // Gán textContent vào li
          nameStory.append(liTT); // Thêm li vào ul
        });
        nameStory.append(divTTP);
        //
        //yêu thích
        //

        Tim(item, ulChiTiet);
        //

        //phan chap
        phanChap.textContent = "";
        ulChapter.classList.add("ulChapter");

        response.data.data.item.chapters[0].server_data.forEach(
          async (chapter) => {
            const divChap = document.createElement("div");
            divChap.classList.add("divChap");

            const nameChap = document.createElement("li");
            nameChap.classList.add("nameChap");
            nameChap.textContent = chapter.chapter_name;
            divChap.append("Chap:", nameChap);

            ulChapter.append(divChap);

            //phần truyện
            divChap.addEventListener("click", async function () {
              imgTrang.textContent = "";
              pageTrang.style.display = "flex";
              const update = await axios
                .get(chapter.chapter_api_data)
                .then(function (response) {
                  response.data.data.item.chapter_image.forEach((img) => {
                    const imgTrangTruyen = document.createElement("img");
                    imgTrangTruyen.classList.add("imgTrangTruyen");
                    imgTrangTruyen.src =
                      response.data.data.domain_cdn +
                      "/" +
                      response.data.data.item.chapter_path +
                      "/" +
                      img.image_file;
                    imgTrang.append(imgTrangTruyen);
                  });
                })
                .catch((error) => {
                  console.error("Có lỗi xảy ra:", error);
                });
              thongTinTrang.append(imgTrang);
            });
            closed.addEventListener("click", function () {
              pageTrang.style.display = "none";
              imgTrang.textContent = "";
            });
            //
          }
        );
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });

    ulChiTiet.append(nameStory);
    phanChiTiet.append(imgChiTiet);
    phanChiTiet.append(ulChiTiet);
    phanChap.append(ulChapter);
    thongTinTrang.append(imgTrang);
    //
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
export function LichSu(item, bool, luu_bien) {
  let lichsu = [],
    yeuthich = [],
    theodoi = [],
    thich = [];
  yeuthich = b;
  luu_bien.thongTinUser = [lichsu, yeuthich, theodoi, thich];
  let luuTru = JSON.parse(localStorage.getItem("user")) || [];
  let luu = JSON.parse(localStorage.getItem("lichSuTrang")) || [];
  console.log(luu);

  luu_bien.thongTinUser[0] = [...luu];
  if (bool) {
    const exists = luu_bien.thongTinUser[0].includes(item.slug);

    if (!exists) {
      luu_bien.thongTinUser[0].unshift(item.slug);
      localStorage.setItem(
        "lichSuTrang",
        JSON.stringify(luu_bien.thongTinUser[0])
      );
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
const lichsuul = document.querySelector(".lichsuul");
const lichsua = document.querySelector(".lichsua");
export function addTruyen(lichsua, lichsuul) {
  // Kiểm tra phần tử tồn tại trước khi thêm sự kiện
  if (lichsua && lichsuul) {
    lichsua.addEventListener("mouseover", function () {
      let luu = JSON.parse(localStorage.getItem("lichSuTrang")) || [];
      luu_bien.thongTinUser[0] = luu;
      console.log(luu_bien.thongTinUser[0]);
    });
    lichsua.addEventListener("click", async function () {
      lichsuul.style.visibility = "visible";
      await ClickLichSu(luu_bien.thongTinUser[0]); // Đảm bảo đợi cho async function chạy xong
    });

    lichsuul.addEventListener("mouseleave", function () {
      lichsuul.style.visibility = "hidden";
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
      const lichsuli = document.createElement("li");
      lichsuli.classList.add("lichsuli");
      const lichsup = document.createElement("p");
      lichsup.classList.add("lichsup");
      const lichsuimg = document.createElement("img");
      lichsuimg.classList.add("lichsuimg");
      lichsuimg.src = imgls.data.data.seoOnPage.seoSchema.image;
      lichsup.textContent = "Đọc Truyện";
      lichsuli.append(lichsuimg, lichsup);
      lichsuul.append(lichsuli);
      let item = imgls.data.data.item;
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
  addTruyen(lichsua, lichsuul);
});
//body

async function Body() {
  let noiDungPhanTrang = ["ngon-tinh", "chuyen-sinh", "manhwa", "thieu-nhi"];
  let theloaiBody = [
    "Tình Yêu Viễn Tưởng",
    "Thế Giới Khác",
    "Truyện Hàn Quốc",
    "Thiếu Nhi 13+",
  ];
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
      '<i class="fas fa-star sparkle-icon"></i> ' + theloaiBody[i];
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
    slider.append(categorySection);
  }
}
function TheLoaiDeXuat() {
  const sliderInner = document.querySelector(".slider-inner");
  const noiDung = [
    {
      title: "",
      name: "",
      theloai: "",
      slug: "",
      img: "anhBia/1.jpg",
      noidung: "",
    },
    {
      title: "",
      name: "",
      theloai: "",
      slug: "",
      img: "anhBia/2.jpg",
      noidung: "",
    },
    {
      title: "",
      name: "",
      theloai: "",
      slug: "",
      img: "anhBia/3.jpg",
      noidung: "",
    },
    {
      title: "",
      name: "",
      theloai: "",
      slug: "",
      img: "anhBia/4.jpg",
      noidung: "",
    },
    {
      title: "",
      name: "",
      theloai: "",
      slug: "",
      img: "anhBia/5.jpg",
      noidung: "",
    },
    {
      title: "",
      name: "",
      theloai: "",
      slug: "",
      img: "anhBia/6.jpg",
      noidung: "",
    },
    {
      title: "",
      name: "",
      theloai: "",
      slug: "",
      img: "anhBia/7.jpg",
      noidung: "",
    },
    {
      title: "",
      name: "",
      theloai: "",
      slug: "",
      img: "anhBia/8.jpg",
      noidung: "",
    },
    {
      title: "",
      name: "",
      theloai: "",
      slug: "",
      img: "anhBia/9.jpg",
      noidung: "",
    },
    {
      title: "",
      name: "",
      theloai: "",
      slug: "",
      img: "anhBia/10.jpg",
      noidung: "",
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
    h3.textContent = ""; // nếu cần thêm tiêu đề chính

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

    return featuredManga;
  }

  for (let i = 0; i < 10; i++) {
    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");

    const prevIndex = i === 0 ? 9 : i - 1;
    const nextIndex = i === 9 ? 0 : i + 1;

    // Truyện trước
    sliderItem.appendChild(createMangaItem(noiDung[prevIndex]));

    // Truyện chính giữa
    sliderItem.appendChild(
      createMangaItem(
        noiDung[i],
        true,
        noiDung[nextIndex].title,
        noiDung[i].noidung
      )
    );

    // Truyện tiếp theo
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
//

TimKiem(string);
TheLoai(string, divtheloai);
fetchData();
