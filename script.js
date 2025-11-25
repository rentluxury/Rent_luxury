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

const scriptURL = 'https://script.google.com/macros/s/AKfycby4NihTM-lMYHJCyKVgz5a7pN3s-YyS8uk5kDXyUCbzEiA15sLbhlKkw1GAQJp2ZN65Vw/exec';

// ارسال نظر به گوگل شیت
document.getElementById("reviewForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let formData = new FormData(this);

    fetch(scriptURL, { method: "POST", body: formData })
        .then(res => res.text())
        .then(() => {
            document.getElementById("reviewMessage").innerHTML =
                "✔ نظر شما با موفقیت ارسال شد. پس از تایید نمایش داده می‌شود ❤️";
            this.reset();
        })
        .catch(err => {
            document.getElementById("reviewMessage").innerHTML =
                "❌ خطا در ارسال نظر! لطفا دوباره تلاش کنید.";
        });
});

// دریافت و نمایش نظرات تایید شده
function loadApprovedReviews() {
    fetch(scriptURL)
        .then(res => res.json())
        .then(data => {
            let container = document.getElementById("approvedReviews");
            container.innerHTML = "";

            data.forEach(item => {
                if (item.approved === "true") {
                    container.innerHTML += `
                        <div style="
                            background:#fff;
                            padding:15px;
                            margin-bottom:15px;
                            border-radius:10px;
                            box-shadow:0 0 8px rgba(0,0,0,0.1);
                        ">
                            <strong>${item.name}</strong>
                            <span style="color:gold; font-size:20px;">${"★".repeat(item.rating)}</span>
                            <p>${item.comment}</p>
                        </div>
                    `;
                }
            });
        });
}

// هنگام لود صفحه نظرات تایید شده نمایش داده شود
loadApprovedReviews();
