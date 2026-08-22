// --- LOGIC SIDEBAR MOBILE ---
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("sidebar-backdrop");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-sidebar");

function toggleSidebar() {
  sidebar.classList.toggle("-translate-x-full");
  backdrop.classList.toggle("hidden");
}

menuBtn.addEventListener("click", toggleSidebar);
closeBtn.addEventListener("click", toggleSidebar);
backdrop.addEventListener("click", toggleSidebar);

// --- LOGIC JAM ---
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("jam").innerText = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// --- LOGIC NAVIGASI TAB ---
const tabs = [
  { id: "about", navId: "nav-about", sectionId: "section-about", title: "About Me", icon: "bi-asterisk" },
  { id: "experience", navId: "nav-experience", sectionId: "section-experience", title: "Experience", icon: "bi-briefcase-fill" },
  { id: "portfolio", navId: "nav-portfolio", sectionId: "section-portfolio", title: "Portofolio App", icon: "bi-database-fill-gear" },
  { id: "contact", navId: "nav-contact", sectionId: "section-contact", title: "Contact", icon: "bi-envelope-at-fill" },
];

const activeNavClasses = ["bg-blue-50", "text-[#0096c7]", "border", "border-blue-100", "shadow-sm"];
const inactiveNavClasses = ["text-gray-500", "hover:bg-gray-50", "hover:text-gray-800"];

tabs.forEach((tab) => {
  document.getElementById(tab.navId).addEventListener("click", (e) => {
    e.preventDefault();

    // Reset semua tab
    tabs.forEach((t) => {
      document.getElementById(t.sectionId).classList.add("hidden");
      document.getElementById(t.sectionId).classList.remove("block");
      const navEl = document.getElementById(t.navId);
      navEl.classList.remove(...activeNavClasses);
      navEl.classList.add(...inactiveNavClasses);
    });

    // Aktifkan tab yang dipilih
    const activeSection = document.getElementById(tab.sectionId);
    activeSection.classList.remove("hidden");
    activeSection.classList.add("block");

    const activeNav = document.getElementById(tab.navId);
    activeNav.classList.remove(...inactiveNavClasses);
    activeNav.classList.add(...activeNavClasses);

    // Update Header (Sekarang menggunakan warna #0096c7 dan ikon yang sesuai sidebar)
    document.getElementById("header-title").innerText = tab.title;
    document.getElementById("header-icon").className = `bi ${tab.icon} text-[#0096c7] text-xl hidden sm:block`;

    // Tutup sidebar di versi mobile setelah klik
    if (window.innerWidth < 1024 && !sidebar.classList.contains("-translate-x-full")) {
      toggleSidebar();
    }
  });
});

// --- LOGIC TOMBOL LIHAT SELENGKAPNYA (PORTFOLIO) ---
const btnLoadMore = document.getElementById('btn-load-more');
const hiddenProjects = document.querySelectorAll('.project-item-hidden');
let isExpanded = false;

if (btnLoadMore) {
  btnLoadMore.addEventListener('click', () => {
    if (!isExpanded) {
      // Tampilkan semua project tersembunyi
      hiddenProjects.forEach(item => {
        item.classList.remove('hidden');
        // Tambahkan efek fade-in
        item.classList.add('block', 'animation-fade'); 
      });
      // Ubah tombol menjadi 'Sembunyikan' dan balik ikonnya
      btnLoadMore.innerHTML = `<span>Sembunyikan</span> <i class="bi bi-chevron-up text-sm"></i>`;
      isExpanded = true;
    } else {
      // Sembunyikan kembali project
      hiddenProjects.forEach(item => {
        item.classList.add('hidden');
        item.classList.remove('block', 'animation-fade');
      });
      // Kembalikan tombol ke keadaan semula
      btnLoadMore.innerHTML = `<span>Lihat Selengkapnya</span> <i class="bi bi-chevron-down text-sm"></i>`;
      isExpanded = false;
      
      // Gulir sedikit ke atas (opsional agar UX lebih mulus)
      document.getElementById('section-portfolio').scrollIntoView({ behavior: 'smooth' });
    }
  });
}