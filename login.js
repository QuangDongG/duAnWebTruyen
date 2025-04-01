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
let luu_bien;
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
  console.log(luu_bien);
});
