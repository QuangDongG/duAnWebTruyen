const diV = document.querySelector(".canchinh");
const ulImg = document.querySelector(".ulImg");

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
    const total = response.data.data.params.pagination.totalItems;
    const totalPages = Math.ceil(total / 24);

    let pagePromises = [];
    for (let page = 1; page <= totalPages; page++) {
      pagePromises.push(fetchPageData(page));
    }

    // Giới hạn số lượng Promise đồng thời (Chạy tối đa 5 Promise đồng thời)
    const chunkSize = 5; // Điều chỉnh số lượng Promise đồng thời
    for (let i = 0; i < pagePromises.length; i += chunkSize) {
      await Promise.all(pagePromises.slice(i, i + chunkSize)); // Chạy theo từng nhóm
    }
    diV.removeChild(loading);
    phanTrang(currentPage);
    numberPage(total);
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
}

// Hàm tải dữ liệu cho từng trang
async function fetchPageData(page) {
  // Kiểm tra xem dữ liệu đã được lưu trong cache chưa
  if (cache[page]) {
    responseData = responseData.concat(cache[page]); // Dữ liệu đã lưu, không cần tải lại
    return;
  }

  try {
    const responsed = await axios.get(
      `https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=${page}`
    );
    const data = responsed.data.data.items;
    cache[page] = data; // Lưu vào cache để sử dụng lại sau
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
    ulImg.append(liImg);

    if (i === currentPage - 1) {
      liImg.classList.add("mauTrang");
    }

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
export function Trangdoctruyen(item, pCreat) {
  const pageTrang = document.querySelector(".pageTrang");
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
  console.log(item.slug); //
  //trang truyen
  const thongTinTrang = document.querySelector(".thongTinTrang");
  const imgTrang = document.createElement("div");
  imgTrang.classList.add("imgTrang");
  pCreat.addEventListener("click", async function () {
    const ulChapter = document.createElement("ul");
    const h3 = document.createElement("h3");
    h3.classList.add("h3");
    h3.textContent = "Thể loại :";
    overlay.style.display = "flex";
    phanChiTiet.textContent = "";
    const ulChiTiet = document.createElement("ul");
    ulChiTiet.classList.add("ulChiTiet");
    //const chapter = document.createElement("div");
    const nameStory = document.createElement("li");
    nameStory.classList.add("nameStory");
    nameStory.append(h3);
    const slug = await axios
      .get("https://otruyenapi.com/v1/api/truyen-tranh/" + item.slug)
      .then(function (response) {
        imgChiTiet.src =
          "https://img.otruyenapi.com/uploads/comics/" + item.thumb_url;

        response.data.data.breadCrumb.forEach((tl, index) => {
          if (index === response.data.data.breadCrumb.length - 1) {
            const h31 = document.createElement("h3");
            h31.classList.add("h3");
            h31.textContent = "Tên truyện :";
            const nameT = document.createElement("li");
            nameT.classList.add("nameStory");
            nameT.append(h31);
            nameT.append(tl.name);
            ulChiTiet.append(nameT);
          } else if (index === response.data.data.breadCrumb.length - 2) {
            nameStory.append(tl.name);
          } else {
            nameStory.append(tl.name, ",");
          }
        });
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
export let slug = "";
let string = "src/";
export async function TheLoai(string) {
  try {
    const divtheloai = document.querySelector(".divtheloai");
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

TheLoai(string);
fetchData();
