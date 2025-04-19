async function ChoiceTL() {
  try {
    let list = [];
    const response = await axios.get("https://otruyenapi.com/v1/api/the-loai");
    response.data.data.items.forEach((items) => {
      const bttheloai = document.createElement("button");
      const ptheloai = document.createElement("p");
      bttheloai.classList.add("atheloai");
      ptheloai.classList.add("ptheloai");
      ptheloai.textContent = items.name;
      bttheloai.append(ptheloai);
      document.body.append(bttheloai);
      bttheloai.addEventListener("click", function () {
        bttheloai.classList.toggle("bttheloai");
        if (bttheloai.classList.contains("bttheloai")) {
          list.push(items.slug);
          console.log(list);
        } else {
          list = list.filter((item) => item !== items.slug);
        }
      });
    });
    const br = document.createElement("br");
    const submit = document.createElement("button");
    submit.textContent = "Xác nhận";
    document.body.append(br, submit);
    submit.addEventListener("click", function () {
      localStorage.setItem("dulieu", JSON.stringify(list));
      window.location.replace("/index.html");
    });
  } catch (error) {
    document.body.textContent = "Error";
  }
}
const urlSP = new URLSearchParams(window.location.search);
const data = urlSP.get("data");
const duLieu = {
  title: [
    "Về chúng tôi",
    "Liên lạc với chúng tôi",
    "Chính sách Cookie",
    "Chính sách Quyền riêng tư",
    "Chính sách bản quyền",
    "Thỏa thuận",
    "BXH cảm ơn",
  ],
  noi_dung: [
    `Chào mừng bạn đến với Sunrise.net – thế giới truyện tranh và tiểu thuyết online không giới hạn!<br>Chúng tôi là một đội ngũ những người yêu thích truyện, với sứ mệnh xây dựng một nền tảng đọc truyện đa dạng, dễ sử dụng và hoàn toàn miễn phí cho tất cả mọi người.<br>Với hàng ngàn đầu truyện được cập nhật mỗi ngày, từ truyện tranh đến tiểu thuyết, từ ngôn tình nhẹ nhàng đến hành động kịch tính, bạn sẽ luôn tìm thấy một câu chuyện phù hợp với tâm trạng của mình.<br>Đặc biệt, chúng tôi luôn khuyến khích cộng đồng đóng góp, cùng nhau phát triển nội dung sạch – chất – hay. Mọi đóng góp từ bạn đều là động lực to lớn để chúng tôi phát triển hơn nữa.`,

    `Chúng tôi luôn lắng nghe và trân trọng mọi ý kiến đóng góp từ người dùng. Nếu bạn gặp sự cố khi sử dụng trang web, phát hiện nội dung vi phạm hoặc có mong muốn hợp tác, vui lòng liên hệ:<br><b>Email hỗ trợ:</b> abcxyz@gmail.com<br><b>Hotline:</b>0123 456 789<br><b>Fanpage chính thức:</b>`,

    `Trang web sử dụng cookie nhằm mục đích cải thiện trải nghiệm người dùng và phân tích lưu lượng truy cập. Cookie giúp:<br>
    • Ghi nhớ lựa chọn và sở thích của bạn (như chế độ xem, thể loại yêu thích).<br>
    • Đề xuất nội dung phù hợp hơn.<br>
    • Hỗ trợ thống kê và cải tiến hiệu năng website.<br>
    Bạn có thể tùy chỉnh quyền sử dụng cookie bất cứ lúc nào thông qua trình duyệt hoặc phần cài đặt tài khoản. Việc tiếp tục sử dụng website nghĩa là bạn đã đồng ý với chính sách này.`,

    `Chúng tôi cam kết bảo vệ tuyệt đối thông tin cá nhân của bạn.<br>
    Khi bạn sử dụng website hoặc đăng ký tài khoản, chúng tôi có thể thu thập một số thông tin như: địa chỉ email, tên đăng nhập, lịch sử đọc truyện,… Tuy nhiên, những dữ liệu này sẽ không bao giờ được chia sẻ hoặc bán cho bên thứ ba nếu không có sự đồng ý của bạn.<br>
    Mọi thông tin thu thập được chỉ nhằm mục đích cá nhân hóa trải nghiệm, nâng cao chất lượng dịch vụ và gửi thông báo liên quan.<br>
    Chúng tôi luôn tuân thủ đầy đủ các quy định về bảo mật và quyền riêng tư theo pháp luật Việt Nam.`,

    `Sunrise.net luôn tôn trọng và bảo vệ quyền sở hữu trí tuệ của tác giả, nhóm dịch và nhà xuất bản.<br>
    Các truyện được đăng tải chỉ mang tính chất phi lợi nhuận, nhằm phục vụ nhu cầu đọc truyện miễn phí của cộng đồng.<br>
    Nếu bạn là chủ sở hữu bản quyền và không đồng ý cho phép sử dụng, vui lòng gửi yêu cầu về địa chỉ email: banquyen@doctruyenweb.vn. Chúng tôi sẽ kiểm tra và xử lý trong thời gian sớm nhất (tối đa 3 ngày làm việc).<br>
    Xin chân thành cảm ơn sự thấu hiểu và hợp tác từ phía các bên liên quan.`,

    `Khi truy cập và sử dụng website, bạn đồng ý với các điều khoản sau đây:<br>
    • Không sử dụng nội dung trang web cho mục đích thương mại trái phép.<br>
    • Không sao chép, chỉnh sửa hay phát tán nội dung mà không có sự cho phép của người sở hữu bản quyền.<br>
    • Không đăng tải nội dung phản cảm, vi phạm thuần phong mỹ tục hoặc pháp luật.<br>
    Chúng tôi có quyền từ chối phục vụ hoặc xóa tài khoản nếu phát hiện hành vi vi phạm.<br>
    Những điều khoản có thể được thay đổi theo thời gian để phù hợp với thực tế và pháp luật. Việc tiếp tục sử dụng website đồng nghĩa với việc bạn đồng ý với các điều khoản mới nhất.`,

    `Bảng xếp hạng cảm ơn là nơi vinh danh những độc giả, nhóm dịch và nhà tài trợ đã góp phần xây dựng cộng đồng đọc truyện lớn mạnh.<br>
    Chúng tôi xin gửi lời tri ân sâu sắc đến:<br>
    • Những bạn đọc tích cực like, bình luận và chia sẻ truyện.<br>
    • Các nhóm dịch đã ngày đêm mang đến những chương truyện chất lượng.<br>
    • Các bạn đã quyên góp, ủng hộ để duy trì website và ứng dụng.<br>
    Mỗi sự đóng góp của bạn – dù nhỏ nhất – đều giúp cộng đồng truyện trở nên phong phú và bền vững hơn.`,
  ],
  data: [
    "ve-chung-toi",
    "lien-lac-voi-chung-toi",
    "chinh-sach-cookie",
    "chinh-sach-quyen-rieng-tu",
    "chinh-sach-ban-quyen",
    "thoa-thuan",
    "bxh-cam-on",
  ],
};
duLieu.data.forEach((e, index) => {
  const body = document.querySelector("body");
  if (e === data) {
    const title = document.createElement("h1");
    title.innerHTML = duLieu.title[index];
    const content = document.createElement("p");
    content.innerHTML = duLieu.noi_dung[index];
    body.append(title, content);
  }
});
if (data === "the-loai") {
  ChoiceTL();
}
