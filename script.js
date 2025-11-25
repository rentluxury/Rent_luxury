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

// لینک وب‌اپ Google Script
const scriptURL =https://script.google.com/macros/s/AKfycbxGaI2pInnNwH67d8c7qWrThab_bPHHvW6SZwGM0_XGdUHo62yy77VF3IIl-1mAXWcTmw/exec

// -------------------------
// ارسال نظر به گوگل شیت
// -------------------------
const form = document.getElementById("review-form");
const messageDiv = document.getElementById("form-message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(scriptURL, { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => {
            messageDiv.style.display = "block";
            messageDiv.style.color = "green";
            messageDiv.textContent = "نظر شما با موفقیت ثبت شد؛ پس از تأیید نمایش داده می‌شود 🌟";
            form.reset();
        })
        .catch(err => {
            messageDiv.style.display = "block";
            messageDiv.style.color = "red";
            messageDiv.textContent = "خطا در ثبت نظر، لطفاً دوباره امتحان کنید.";
        });
});

// -------------------------
// لود نظرات تأیید شده
// -------------------------
function loadApprovedReviews() {
    fetch(scriptURL)
        .then(response => response.json())
        .then(reviews => {
            const container = document.getElementById("approved-reviews");
            container.innerHTML = "";

            reviews.forEach(r => {
                // فقط نظرات تایید شده
                if (r.approved === "true") {
                    const div = document.createElement("div");
                    div.style.padding = "18px";
                    div.style.border = "1px solid #ddd";
                    div.style.borderRadius = "8px";
                    div.style.background = "#fafafa";

                    div.innerHTML = `
                        <strong>${r.name}</strong> - ⭐ ${r.rating}<br>
                        <p style="margin-top:8px;">${r.comment}</p>
                        <small style="color:#888;">${r.timestamp}</small>
                    `;

                    container.appendChild(div);
                }
            });
        });
}

document.addEventListener("DOMContentLoaded", loadApprovedReviews);
