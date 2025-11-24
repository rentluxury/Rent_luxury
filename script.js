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
