import { Trangdoctruyen } from "./src/Local_main.js";
//Du lieu Ct
function getRandomViews() {
  const random = Math.floor(Math.random() * (10000 - 2000) + 2000);
  return (random / 1000).toFixed(1) + "k";
}
let convert = "sap-ra-mat";
let contents = [];
async function ContentUpdate(convert) {
  let content_update = await axios.get(
    "https://otruyenapi.com/v1/api/danh-sach/" + convert + "?page=1"
  );
  for (let i = 0; i < 7; i++) {
    contents[i] = {
      data: content_update.data.data.items[i],
      title: content_update.data.data.items[i].name,
      image:
        "https://img.otruyenapi.com/uploads/comics/" +
        content_update.data.data.items[i].thumb_url,
      views: getRandomViews(),
    };
  }
  Content();
}
//Du lieu CM
const comments = [
  {
    username: "Chân Bé Dù",
    date: "2025-04-05 12:57:21",
    contentTitle: "Người Đàn Ông Được Quý ...",
    text: "v—ò 🐱",
    avatar: "🍏",
  },
  {
    username: "Ghét Học Anh",
    date: "2025-04-05 08:16:12",
    contentTitle: "Người Đàn Ông Được Quý ...",
    text: "X của ông là ý vậy",
    avatar: "🐞",
  },
  {
    username: "Bebei",
    date: "2025-04-05 06:39:08",
    contentTitle: "Nước Mắt Trên Đóa Hoa T...",
    text: "có tiến triển mới ah ah😍",
    avatar: "🕷️",
  },
  {
    username: "Nhí Cuti",
    date: "2025-04-04 23:04:53",
    contentTitle: "Tiểu Thư Nuốt Phù Thủy - C...",
    text: "[Sticker 03]",
    avatar: "🐻",
  },
  {
    username: "Nhí Cuti",
    date: "2025-04-04 23:04:33",
    contentTitle: "Học Sinh Bá Đạo",
    text: "Hóng tiếp nhaaaa",
    avatar: "🌼",
  },
  {
    username: "Lười Code",
    date: "2025-04-04 20:22:10",
    contentTitle: "Boss Là Nữ Phụ?!",
    text: "Tui bị lừa rồi trời ơi :<",
    avatar: "🐧",
  },
  {
    username: "Đẹp Trai Vô Địch",
    date: "2025-04-04 18:45:00",
    contentTitle: "Bí Mật Nhà Họ Vương",
    text: "Đọc 1 lần là dính luôn 😎",
    avatar: "🐯",
  },
  {
    username: "Ngáo Ngơ",
    date: "2025-04-04 16:11:47",
    contentTitle: "Tiệm Bánh Ký Ức",
    text: "Ai đọc rồi cho xin cảm nhận 🥐",
    avatar: "🦉",
  },
  {
    username: "Yêu Gái Xinh",
    date: "2025-04-03 23:59:59",
    contentTitle: "Người Đàn Ông Được Quý ...",
    text: "Main chính đỉnh thực sự 💪",
    avatar: "🦁",
  },
  {
    username: "Quẩy Tới Bến",
    date: "2025-04-03 22:10:10",
    contentTitle: "Thế Giới Phép Thuật",
    text: "Vừa cày vừa nhai snack, perfect 👌",
    avatar: "🍿",
  },
];

//Item
const contentList = document.getElementById("content-list");
function Content() {
  contents.forEach((content) => {
    const contentItem = document.createElement("div");
    contentItem.className = "content-item";
    contentItem.innerHTML = `
            <div class="content-image">
                <img src="${content.image}" alt="${content.title}">
            </div>
            <div class="content-info">
                <h3 class="content-title">${content.title}</h3>
                <div class="view-count">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
                    </svg>
                    ${content.views}
                </div>
            </div>
        `;

    contentList.appendChild(contentItem);
    Trangdoctruyen(content.data, contentItem);
  });
}
//Comment
function Comments() {
  const commentsList = document.getElementById("comments-list");

  comments.forEach((comment) => {
    const commentItem = document.createElement("div");
    commentItem.className = "comment-item";

    commentItem.innerHTML = `
            <div class="avatar">
                ${comment.avatar}
            </div>
            <div class="comment-content">
                <div class="user-info">
                    <span class="username">${comment.username}</span>
                    <span class="timestamp">${comment.date}</span>
                </div>
                <div class="content-ref">
                    Trong <span>${comment.contentTitle}</span>
                </div>
                <div class="comment-text">
                    ${comment.text}
                </div>
            </div>
        `;

    commentsList.appendChild(commentItem);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  ContentUpdate(convert);
  Comments();

  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      contentList.textContent = "";
      tabs.forEach((t) => t.classList.remove("actived"));
      this.classList.add("actived");
      if (index === 0) {
        convert = "hoan-thanh";
      } else {
        convert = "sap-ra-mat";
      }
      ContentUpdate(convert);
    });
  });
});
