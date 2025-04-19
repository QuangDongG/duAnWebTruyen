import { Trangdoctruyen } from "../src/Local_main.js";
async function Random(randomPage) {
  try {
    let slug = await axios.get(
      "https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=" +
        String(randomPage)
    );
    let count = slug.data.data.items.length;
    let randomCount = Math.floor(Math.random() * count);
    let item = slug.data.data.items[randomCount];
    let src = "https://img.otruyenapi.com/uploads/comics/" + item.thumb_url;
    let name_random = item.name;
    console.log(src);
    displayRandomStory(item, src, name_random);
  } catch (error) {
    console.error("Lỗi khi lấy truyện ngẫu nhiên:", error);
  }
}
async function storyRandomNew() {
  try {
    let slug = await axios.get(
      "https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=1"
    );
    console.log(slug.data);

    const randomPage = Math.ceil(
      slug.data.data.params.pagination.totalItems / 24
    );
    let random_slug = Math.ceil(Math.random() * randomPage);
    console.log(random_slug);

    Random(random_slug);
  } catch (error) {
    console.error("Lỗi khi lấy truyện ngẫu nhiên:", error);
  }
}
function displayRandomStory(item, src, name_random) {
  const container = document.getElementById("random-story-container");

  container.innerHTML = `
                  <div class="random-story">
                      <div class="story-wrapper">
                          <div class="story-card-random">
                              <img src="${src}" alt="${src}">
                              <div class="story-info">
                                  <h4>${name_random}</h4>
                                  <p class="read-btn">Đọc Ngay</p>
                              </div>
                          </div>
                          <div class="recommend-label">Đề Xuất</div>
                      </div>
                  </div>
              `;
  const read = document.querySelector(".read-btn");
  Trangdoctruyen(item, read);
}
document.querySelector(".random-btn").addEventListener("click", function () {
  storyRandomNew();
});
