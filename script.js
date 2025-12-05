/* ============================
   منوی همبرگری
============================ */
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

/* ============================
   اسلایدشو
============================ */
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";  
    dots[slideIndex - 1].className += " active";

    setTimeout(showSlides, 3500);
}


// ===================
// فعال‌سازی تقویم شمسی
// ===================
$(document).ready(function () {
    $("#date1").persianDatepicker({
        format: "YYYY/MM/DD"
    });

    $("#date2").persianDatepicker({
        format: "YYYY/MM/DD"
    });
});


// ===================
// ارسال به واتساپ
// ===================
function sendToWhatsApp(event) {
    event.preventDefault();

    let name = document.getElementById("fullname").value;
    let car = document.getElementById("car").value;
    let date1 = document.getElementById("date1").value;
    let date2 = document.getElementById("date2").value;
    let phone = document.getElementById("phone").value;

    let message = 
`رزرو خودرو:
نام: ${name}
خودرو انتخابی: ${car}
تاریخ تحویل: ${date1}
تاریخ بازگشت: ${date2}
شماره تماس مشتری: ${phone}`;

    let url =
        "https://wa.me/989124253122?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}

/* فعال‌سازی تقویم شمسی برای فرم تمدید */
document.addEventListener("DOMContentLoaded", function () {
    $(function() {
        $("#extend-date-old").persianDatepicker({
            format: "YYYY/MM/DD"
        });

        $("#extend-date-new").persianDatepicker({
            format: "YYYY/MM/DD"
        });
    });
});

/* ارسال فرم تمدید به واتساپ */
function sendExtendToWhatsApp(event) {
    event.preventDefault();

    let name = document.getElementById("extend-fullname").value;
    let car = document.getElementById("extend-car").value;
    let oldDate = document.getElementById("extend-date-old").value;
    let newDate = document.getElementById("extend-date-new").value;
    let phone = document.getElementById("extend-phone").value;

    let message =
        "درخواست تمدید قرارداد:%0A" +
        "نام مشتری: " + name + "%0A" +
        "خودرو: " + car + "%0A" +
        "تاریخ پایان قبلی: " + oldDate + "%0A" +
        "تاریخ جدید قرارداد: " + newDate + "%0A" +
        "شماره تماس: " + phone;

    // شماره واتساپ
    let whatsapp = "989124253122";

    let url = "https://wa.me/" + whatsapp + "?text=" + message;

    window.open(url, "_blank");
}

// ----- آدرس جدید وب‌اپ -----
const API_URL = "https://script.google.com/macros/s/AKfycbzg-dl9eMxHmUwi9zj4dVBorMuudE3CTTGtqIbZFzx2bORSt2jtBV6Fuy2y_UODrtXmAg/exec";

// ---------- ارسال نظر ----------
document.getElementById("reviewForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("rv_name").value;
    const phone = document.getElementById("rv_phone").value;
    const rating = document.getElementById("rv_rating").value;
    const review = document.getElementById("rv_review").value;

    const rv_msg = document.getElementById("rv_msg");
    const rv_err = document.getElementById("rv_err");

    rv_msg.style.display = "none";
    rv_err.style.display = "none";

    try {
        let res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                name,
                phone,
                rating,
                review
            })
        });

        rv_msg.style.display = "block";
        document.getElementById("reviewForm").reset();

    } catch (error) {
        rv_err.style.display = "block";
        rv_err.innerText = "❌ مشکلی پیش آمد. دوباره تلاش کنید.";
    }
});



// ---------- نمایش نظرات ----------
async function loadComments() {
    const container = document.getElementById("commentsContainer");
    container.innerHTML = "<p style='text-align:center;color:#777;'>درحال بارگذاری...</p>";

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (!data.comments || data.comments.length === 0) {
            container.innerHTML = "<p style='text-align:center;color:#777;'>فعلاً نظری تأیید نشده.</p>";
            return;
        }

        container.innerHTML = "";

        data.comments.forEach((c) => {
            container.innerHTML += `
                <div class="comment-item">
                    <h4>${c.name || "مهمان"} ⭐${c.rating}</h4>
                    <p>${c.comment}</p>
                    <div class="comment-meta">${c.timestamp}</div>
                </div>
            `;
        });

    } catch (err) {
        container.innerHTML = "<p style='color:red;text-align:center;'>خطا در بارگذاری نظرات.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadComments);
