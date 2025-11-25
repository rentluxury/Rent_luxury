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

// لینک Web App جدید Google Apps Script
const API_URL = 'https://script.google.com/macros/s/AKfycbxGal2plnnNwH67d8c7qWrThab_bPHHvW6SZwGM0_XGdUHo62yy77VF3lll-1mAXWcTmw/exec';

// تابع محافظت از کاراکترهای HTML برای جلوگیری از XSS
function escapeHtml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;");
}

// ارسال فرم به Google Sheets
document.getElementById('reviewForm').addEventListener('submit', async function(e){
  e.preventDefault();

  const name = document.getElementById('rv_name').value.trim();
  const phone = document.getElementById('rv_phone').value.trim();
  const rating = document.getElementById('rv_rating').value;
  const review = document.getElementById('rv_review').value.trim();

  const msgEl = document.getElementById('rv_msg');
  const errEl = document.getElementById('rv_err');
  msgEl.style.display = 'none';
  errEl.style.display = 'none';

  if(!review) {
    errEl.textContent = 'لطفاً نظر خود را بنویسید.';
    errEl.style.display = 'block';
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('rating', rating);
  formData.append('comment', review); // دقت کن با نام ستون شیت مطابقت داشته باشد

  try {
    const res = await fetch(API_URL, { method: 'POST', body: formData });
    const data = await res.json();

    if(data.result === 'success') {
      msgEl.textContent = '✅ نظر شما ثبت شد و پس از تأیید نمایش داده خواهد شد.';
      msgEl.style.display = 'block';
      document.getElementById('reviewForm').reset();
      loadComments(); // بروزرسانی نمایش نظرات
    } else {
      errEl.textContent = '❌ مشکلی پیش آمد، لطفاً دوباره تلاش کنید.';
      errEl.style.display = 'block';
    }
  } catch(err) {
    console.error(err);
    errEl.textContent = '❌ خطا در ارسال نظر!';
    errEl.style.display = 'block';
  }
});

// بارگذاری نظرات تایید شده
async function loadComments(){
  const container = document.getElementById('commentsContainer');
  container.innerHTML = '<p style="text-align:center; color:#777; padding:20px 0;">در حال بارگذاری نظرات...</p>';

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if(!data || !Array.isArray(data) || data.length === 0){
      container.innerHTML = '<p style="text-align:center; color:#777; padding:20px 0;">فعلاً نظری تأیید نشده است.</p>';
      return;
    }

    container.innerHTML = '';
    // مرتب‌سازی بر اساس timestamp جدیدترین اول
    const items = data.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

    items.forEach(c => {
      if(c.approved !== 'true') return; // فقط تایید شده‌ها
      const name = escapeHtml(c.name || 'مهمان');
      const text = escapeHtml(c.comment || '');
      const stamp = escapeHtml(String(c.timestamp || ''));
      const rating = escapeHtml(String(c.rating || ''));

      const html = `
        <div class="comment-item">
          <h4>${name} <span style="font-size:13px; color:#d4af37; margin-right:8px;">${rating}</span></h4>
          <p>${text}</p>
          <div class="comment-meta">${stamp}</div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', html);
    });

  } catch(err){
    console.error(err);
    container.innerHTML = '<p style="text-align:center; color:#c00; padding:20px 0;">خطا در بارگذاری نظرات — دوباره تلاش کنید.</p>';
  }
}

// بارگذاری اولیه نظرات پس از لود صفحه
document.addEventListener('DOMContentLoaded', loadComments);
