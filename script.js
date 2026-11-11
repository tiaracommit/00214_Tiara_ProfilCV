/* =====================================================
   script.js - Interaksi website (JavaScript Vanilla)
   Isi: 1) Hamburger menu  2) Dark mode  3) FAQ accordion
   ===================================================== */


/* =====================================================
   1. HAMBURGER MENU
   Cara kerja: tombol ☰ menambah/menghapus class "show"
   pada elemen menu. Class "show" membuat menu tampil.
   ===================================================== */

// Ambil elemen dari HTML berdasarkan id
const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("#menu");

// Fungsi untuk membuka atau menutup menu
function toggleMenu() {
  menu.classList.toggle("show");   // ada -> dihapus, tidak ada -> ditambah

  // Cek apakah menu sedang terbuka
  const isOpen = menu.classList.contains("show");

  // Ubah ikon tombol: ✕ saat terbuka, ☰ saat tertutup
  hamburger.textContent = isOpen ? "✕" : "☰";
  hamburger.setAttribute("aria-expanded", isOpen);
}

// Jalankan toggleMenu() setiap tombol hamburger diklik
hamburger.addEventListener("click", toggleMenu);

// Tutup menu otomatis setelah salah satu link di menu diklik
const menuLinks = document.querySelectorAll("#menu a");

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("show");
    hamburger.textContent = "☰";
    hamburger.setAttribute("aria-expanded", "false");
  });
});


/* =====================================================
   2. DARK MODE + localStorage
   Cara kerja: class "dark-mode" ditambah ke <body>.
   CSS lalu mengganti warna lewat variabel.
   Pilihan tema disimpan di localStorage supaya tidak
   hilang saat halaman di-refresh.
   ===================================================== */

const themeButton = document.querySelector("#theme-button");

// Fungsi untuk memasang tema ("dark" atau "light")
function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "☀️ Mode Terang";   // tombol menawarkan tema sebaliknya
  } else {
    document.body.classList.remove("dark-mode");
    themeButton.textContent = "🌙 Mode Gelap";
  }
}

// Saat halaman dibuka: baca tema yang tersimpan.
// Kalau belum pernah disimpan, hasilnya null -> pakai "light".
const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme || "light");

// Saat tombol tema diklik: ganti tema lalu simpan
themeButton.addEventListener("click", function () {
  let newTheme;

  if (document.body.classList.contains("dark-mode")) {
    newTheme = "light";
  } else {
    newTheme = "dark";
  }

  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);   // simpan pilihan
});


/* =====================================================
   3. FAQ ACCORDION
   Cara kerja: klik pertanyaan -> class "active" ditambah
   pada .faq-item. CSS menampilkan jawaban dan mengubah
   tanda + menjadi −. Klik lagi untuk menutup.
   ===================================================== */

// Ambil semua tombol pertanyaan
const faqQuestions = document.querySelectorAll(".faq-question");

// Pasang event klik ke setiap pertanyaan
faqQuestions.forEach(function (question) {
  question.addEventListener("click", function () {
    // parentElement = pembungkus tombol, yaitu .faq-item
    const faqItem = question.parentElement;

    faqItem.classList.toggle("active");

    // Beri tahu screen reader apakah jawaban sedang terbuka
    const isOpen = faqItem.classList.contains("active");
    question.setAttribute("aria-expanded", isOpen);
  });
});
