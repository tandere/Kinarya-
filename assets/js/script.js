// ============================================
// KINARYA — script.js (halaman utama)
//
// Isi: konfigurasi · portofolio · tab & menu · form Project Agreement ·
//      form Masukan · inisialisasi.
// Daftar karya ada di portfolio-data.js (tempat nambah karya baru).
// ============================================

// Nomor admin Kinarya (format 62xxxxxxxxxx, tanpa + dan spasi).
// Sesuai brief: +62 895 4296 90690
// Semua tombol/link wa.me di halaman otomatis ikut nomor ini (lihat initWaLinks).
const ADMIN_WA = "62895429690690";


// ============================================
// PORTOFOLIO
// ============================================
function driveEmbedUrl(fileId){
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
function driveThumbUrl(fileId){
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w640`;
}

function renderPortfolio(){
  Object.entries(PORTFOLIO).forEach(([tab, groups])=>{
    const container = document.getElementById(`karya-${tab}`);
    if(!container) return;
    container.innerHTML = groups.map(g => `
      <div class="karya-group">
        <div class="karya-head">
          <h3>${g.group} <span class="karya-count">· ${g.ids.length} karya</span></h3>
          <div class="slider-nav" hidden>
            <button type="button" class="slider-btn" data-dir="-1" aria-label="Geser ke kiri">‹</button>
            <button type="button" class="slider-btn" data-dir="1" aria-label="Geser ke kanan">›</button>
          </div>
        </div>
        <div class="karya-grid">
          ${g.ids.map((id,i)=>`
            <button type="button" class="karya-card" data-id="${id}" aria-label="Putar video: ${g.group} ${i+1}">
              <img class="karya-thumb" src="${driveThumbUrl(id)}" alt="" loading="lazy"
                   onerror="this.style.display='none'">
              <span class="play-overlay"><span class="play-icon" aria-hidden="true">▶</span></span>
              <span class="karya-label">${g.group} ${i+1}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `).join("");
  });
}

// ---------- Slider: panah muncul hanya kalau karyanya melebihi lebar layar ----------
function setupSliders(){
  document.querySelectorAll(".karya-group").forEach(group=>{
    const track = group.querySelector(".karya-grid");
    const nav = group.querySelector(".slider-nav");
    if(!track || !nav) return;
    const [prev, next] = nav.querySelectorAll(".slider-btn");

    const update = ()=>{
      const max = track.scrollWidth - track.clientWidth;
      nav.hidden = max <= 2;                       // belum kebuka (tab tersembunyi) atau muat semua
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
    };
    track.addEventListener("scroll", update, {passive:true});
    // ResizeObserver juga jalan saat tab yang tadinya tersembunyi dibuka
    new ResizeObserver(update).observe(track);
    update();
  });
}

function slideKarya(btn){
  const track = btn.closest(".karya-group").querySelector(".karya-grid");
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  track.scrollBy({ left: Number(btn.dataset.dir) * track.clientWidth * 0.85, behavior: smooth ? "smooth" : "auto" });
}

// ---------- Pemutar video ----------
let lastFocusedCard = null;

function openVideoModal(fileId, trigger){
  const overlay = document.getElementById("videoModal");
  const box = document.getElementById("videoModalBox");
  lastFocusedCard = trigger || null;
  box.innerHTML = `<iframe src="${driveEmbedUrl(fileId)}" title="Video karya Kinarya" allow="autoplay" allowfullscreen></iframe>`;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  document.getElementById("videoModalClose").focus();
}

function closeVideoModal(){
  const overlay = document.getElementById("videoModal");
  if(!overlay.classList.contains("open")) return;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  document.getElementById("videoModalBox").innerHTML = "";
  if(lastFocusedCard) lastFocusedCard.focus();
}


// ============================================
// TAB & MENU
// ============================================

// Tab dipakai buat Karya & Alur Kerja
function setupTabs(groupSelector){
  document.querySelectorAll(groupSelector).forEach(group=>{
    const buttons = group.querySelectorAll(".tab-btn");
    buttons.forEach(btn=>{
      btn.addEventListener("click", ()=>{
        buttons.forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        const target = btn.dataset.target;
        group.parentElement.querySelectorAll(".tab-panel").forEach(p=>p.classList.remove("active"));
        document.getElementById(target).classList.add("active");
      });
    });
  });
}

// Menu ☰ di HP
function setupNavMenu(){
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if(!toggle || !links) return;

  const setOpen = (open)=>{
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    toggle.textContent = open ? "✕" : "☰";
  };

  toggle.addEventListener("click", ()=> setOpen(!links.classList.contains("open")));
  links.addEventListener("click", (e)=>{ if(e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") setOpen(false); });
  window.matchMedia("(min-width:761px)").addEventListener("change", (e)=>{ if(e.matches) setOpen(false); });
}

// ============================================
// ANIMASI TEKS
// - Judul hero dipecah per huruf (animasinya diatur di style.css)
// - Judul section dipecah per kata, lalu muncul saat section masuk layar
// Teks aslinya tetap dibacakan utuh oleh screen reader lewat aria-label.
// ============================================
function setupTextAnimations(){
  document.documentElement.classList.add("js");

  const h1 = document.querySelector(".hero h1");
  if(h1 && !h1.classList.contains("is-split")){
    const text = h1.textContent;
    h1.setAttribute("aria-label", text);
    h1.textContent = "";
    [...text].forEach((ch, i)=>{
      const s = document.createElement("span");
      s.className = "char";
      s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--i", i);
      s.textContent = ch;
      h1.appendChild(s);
    });
    h1.classList.add("is-split");
  }

  document.querySelectorAll(".section-head h2").forEach(h2=>{
    const text = h2.textContent.trim();
    h2.setAttribute("aria-label", text);
    h2.textContent = "";
    text.split(/\s+/).forEach((w, i, all)=>{
      const wrap = document.createElement("span");
      wrap.className = "word";
      wrap.setAttribute("aria-hidden", "true");
      wrap.style.setProperty("--w", i);
      const inner = document.createElement("span");
      inner.className = "word-in";
      inner.style.setProperty("--w", i);
      inner.textContent = w;
      wrap.appendChild(inner);
      h2.appendChild(wrap);
      if(i < all.length - 1) h2.appendChild(document.createTextNode(" "));
    });
  });

  const heads = document.querySelectorAll(".section-head");
  if(!("IntersectionObserver" in window)){
    heads.forEach(h => h.classList.add("in"));   // browser lama: langsung tampil
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold:.3, rootMargin:"0px 0px -6% 0px" });
  heads.forEach(h => io.observe(h));
}
// Script ini dimuat di akhir <body>, jadi judulnya sudah ada. Dijalankan langsung
// (bukan menunggu DOMContentLoaded) supaya judul gak sempat tampil utuh dulu sebelum dipecah.
setupTextAnimations();

// Semua link wa.me ikut nomor ADMIN_WA (teks pesan di link, kalau ada, tetap dipertahankan)
function initWaLinks(){
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a=>{
    a.href = a.getAttribute("href").replace(/^https:\/\/wa\.me\/\d+/, `https://wa.me/${ADMIN_WA}`);
  });
}


// ============================================
// PROJECT AGREEMENT
// ============================================
const agreementForm = document.getElementById("agreementForm");
let lastAgreement = null;

if(agreementForm){
  agreementForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const data = {
      namaStudio: document.getElementById("f-studio").value.trim(),
      namaCircle: document.getElementById("f-circle").value.trim(),
      jenisOrder: document.getElementById("f-jenis").value,
      noWhatsapp: document.getElementById("f-wa").value.trim(),
      deadline: document.getElementById("f-deadline").value,
      totalFee: document.getElementById("f-fee").value.trim(),
      referensi: document.getElementById("f-referensi").value.trim(),
      linkFile: document.getElementById("f-link").value.trim(),
      notes: document.getElementById("f-notes").value.trim(),
      status: "baru",
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    const submitBtn = agreementForm.querySelector(".submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim...";

    try{
      await db.collection("agreements").add(data);
      lastAgreement = data;
      agreementForm.style.display = "none";
      document.getElementById("agreementConfirm").classList.add("show");
    }catch(err){
      console.error(err);
      alert("Waduh, gagal simpan data. Coba cek koneksi kamu terus coba lagi ya.");
    }finally{
      submitBtn.disabled = false;
      submitBtn.textContent = "✨ Kirim & Simpan Konfirmasi";
    }
  });
}

// Susun pesan WA per baris, lalu di-encode biar karakter kayak & # % gak bikin pesan kepotong
function sendAgreementToWA(){
  if(!lastAgreement) return;
  const d = lastAgreement;
  const lines = [
    "Halo kak Kinarya! Aku mau booking project ya~",
    "",
    `*Nama Studio:* ${d.namaStudio || "-"}`,
    `*Nama Circle:* ${d.namaCircle || "-"}`,
    `*Jenis Order:* ${d.jenisOrder || "-"}`,
    `*Deadline:* ${d.deadline || "-"}`,
    `*Total Fee:* ${d.totalFee || "-"}`,
    `*Referensi:* ${d.referensi || "-"}`,
    `*Link File:* ${d.linkFile || "-"}`,
    `*Notes:* ${d.notes || "-"}`,
    "",
    `No WA aku: ${d.noWhatsapp || "-"}`
  ];
  window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
}

function resetAgreementForm(){
  agreementForm.reset();
  agreementForm.style.display = "block";
  document.getElementById("agreementConfirm").classList.remove("show");
  lastAgreement = null;
}

// Export PNG: bikin kartu rangkuman agreement (lengkap), bukan cuma kotak "terkonfirmasi"
function exportAgreementPNG(){
  if(!lastAgreement || !window.html2canvas) return;
  const d = lastAgreement;
  const BG = "#1c0f12", GOLD = "#F5B93D", WHITE = "#F5F5F2", MUTED = "#EFD9D1";

  const card = document.createElement("div");
  card.style.cssText = "position:fixed;left:-9999px;top:0;width:520px;padding:28px;" +
    `background:${BG};color:${WHITE};font-family:Poppins,sans-serif;border:1px solid ${GOLD};border-radius:14px;`;

  const title = document.createElement("div");
  title.textContent = "✨ Kinarya · Project Agreement";
  title.style.cssText = `font-size:18px;font-weight:700;color:${GOLD};margin-bottom:16px;`;
  card.appendChild(title);

  [
    ["Nama Studio", d.namaStudio], ["Nama Circle", d.namaCircle],
    ["Jenis Order", d.jenisOrder], ["No WhatsApp", d.noWhatsapp],
    ["Deadline", d.deadline], ["Total Fee", d.totalFee],
    ["Referensi", d.referensi], ["Link File", d.linkFile], ["Notes", d.notes]
  ].forEach(([k,v])=>{
    const row = document.createElement("div");
    row.style.cssText = "margin-bottom:10px;font-size:13px;word-break:break-word;";
    const key = document.createElement("div");
    key.textContent = k;
    key.style.cssText = `color:${MUTED};opacity:.75;font-size:11px;`;
    const val = document.createElement("div");
    val.textContent = v || "-";
    row.appendChild(key); row.appendChild(val);
    card.appendChild(row);
  });

  document.body.appendChild(card);
  html2canvas(card, {backgroundColor:BG}).then(canvas=>{
    const link = document.createElement("a");
    link.download = "kinarya-project-agreement.png";
    link.href = canvas.toDataURL();
    link.click();
  }).finally(()=> card.remove());
}


// ============================================
// MASUKAN (FEEDBACK)
// ============================================
let selectedRating = null;
document.querySelectorAll(".emoji-opt").forEach(opt=>{
  opt.addEventListener("click", ()=>{
    document.querySelectorAll(".emoji-opt").forEach(o=>{
      o.classList.remove("selected");
      o.setAttribute("aria-pressed", "false");
    });
    opt.classList.add("selected");
    opt.setAttribute("aria-pressed", "true");
    selectedRating = opt.dataset.value;
  });
});

const feedbackForm = document.getElementById("feedbackForm");
if(feedbackForm){
  feedbackForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    if(!selectedRating){
      alert("Pilih dulu rating kepuasannya ya~");
      return;
    }
    const data = {
      rating: selectedRating,
      nama: document.getElementById("fb-nama").value.trim(),
      masukan: document.getElementById("fb-masukan").value.trim(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    const submitBtn = feedbackForm.querySelector(".submit-btn");
    submitBtn.disabled = true;

    try{
      await db.collection("feedbacks").add(data);
      feedbackForm.style.display = "none";
      document.getElementById("feedbackConfirm").classList.add("show");
    }catch(err){
      console.error(err);
      alert("Gagal kirim masukan, coba lagi ya.");
    }finally{
      submitBtn.disabled = false;
    }
  });
}

function sendFeedbackToWA(){
  const nama = document.getElementById("fb-nama").value.trim() || "Klien";
  const masukan = document.getElementById("fb-masukan").value.trim();
  const rating = selectedRating ? `Rating: ${selectedRating}\n` : "";
  const text = `Halo kak Kinarya! Mau kasih masukan nih dari ${nama}:\n${rating}${masukan}`;
  window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}


// ============================================
// INISIALISASI
// ============================================
document.addEventListener("DOMContentLoaded", ()=>{
  initWaLinks();
  renderPortfolio();
  setupSliders();
  setupTabs(".tabs");
  setupNavMenu();

  // Kartu & panah karya dibuat lewat JS, jadi kliknya dipasang di pembungkus section
  document.getElementById("karya")?.addEventListener("click", (e)=>{
    const arrow = e.target.closest(".slider-btn");
    if(arrow){ slideKarya(arrow); return; }
    const card = e.target.closest(".karya-card");
    if(card) openVideoModal(card.dataset.id, card);
  });

  document.getElementById("videoModalClose")?.addEventListener("click", closeVideoModal);
  document.getElementById("videoModal")?.addEventListener("click", (e)=>{
    if(e.target.id === "videoModal") closeVideoModal();
  });
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") closeVideoModal();
  });
});
