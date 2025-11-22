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


/* ============================
   تقویم شمسی
============================ */
document.addEventListener("DOMContentLoaded", function () {
    if (typeof persianDatepicker === "function") {
        $("#date1").persianDatepicker();
        $("#date2").persianDatepicker();
        $("#extend-date").persianDatepicker();
    }
});
