// ============================================
// KINARYA — admin.js (dashboard khusus pemilik web)
// Isi: login, daftar Project Agreement, dan Masukan Klien
// ============================================

// ---------- Helper keamanan ----------
// Semua data dari klien WAJIB lewat esc() sebelum masuk innerHTML,
// biar kode iseng (HTML/script) yang diketik klien gak bisa jalan di dashboard.
function esc(s){
  return String(s ?? "").replace(/[&<>"']/g, c => (
    {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]
  ));
}

// Hanya izinkan link http/https. Kalau klien nulis tanpa "https://", otomatis ditambahin.
function safeUrl(u){
  const raw = String(u || "").trim();
  if(!raw) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : "https://" + raw;
  try{
    const url = new URL(withScheme);
    return (url.protocol === "http:" || url.protocol === "https:") ? url.href : null;
  }catch(e){
    return null;
  }
}

function toWaNumber(raw){
  let n = (raw || "").replace(/[^0-9+]/g,"");
  if(n.startsWith("+62")) n = n.slice(1);
  else if(n.startsWith("62")) { /* sudah pas */ }
  else if(n.startsWith("0")) n = "62" + n.slice(1);
  else n = "62" + n;
  return n;
}

function formatDate(ts){
  if(!ts || typeof ts.toDate !== "function") return "";
  return ts.toDate().toLocaleString("id-ID", {
    day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit"
  });
}

// ---------- State data ----------
let allAgreements = [];
let allFeedbacks = [];

// ---------- Auth ----------
const loginScreen = document.getElementById("loginScreen");
const dashboardScreen = document.getElementById("dashboardScreen");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (e)=>{
  e.preventDefault();
  loginError.style.display = "none";
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  try{
    await auth.signInWithEmailAndPassword(email, password);
  }catch(err){
    loginError.textContent = "Email atau password salah. Coba cek lagi ya.";
    loginError.style.display = "block";
  }
});

document.getElementById("logoutBtn").addEventListener("click", ()=> auth.signOut());

let unsubAgreements = null;
let unsubFeedbacks = null;

function stopListeners(){
  if(unsubAgreements){ unsubAgreements(); unsubAgreements = null; }
  if(unsubFeedbacks){ unsubFeedbacks(); unsubFeedbacks = null; }
}

auth.onAuthStateChanged(user=>{
  stopListeners();
  if(user){
    loginScreen.style.display = "none";
    dashboardScreen.style.display = "block";
    listenAgreements();
    listenFeedbacks();
  }else{
    loginScreen.style.display = "flex";
    dashboardScreen.style.display = "none";
    allAgreements = [];
    allFeedbacks = [];
  }
});

// ---------- Tab utama (Agreement / Masukan) ----------
document.getElementById("mainTabs").addEventListener("click", (e)=>{
  const btn = e.target.closest(".tab-btn");
  if(!btn) return;
  document.querySelectorAll("#mainTabs .tab-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  ["panelAgreements","panelFeedbacks"].forEach(id=>{
    document.getElementById(id).classList.toggle("active", id === btn.dataset.panel);
  });
});

// ============================================
// PROJECT AGREEMENT
// ============================================
let currentFilter = "semua";

function listenAgreements(){
  unsubAgreements = db.collection("agreements").orderBy("timestamp","desc")
    .onSnapshot(snap=>{
      allAgreements = snap.docs.map(d=>({ id:d.id, ...d.data() }));
      renderList();
    }, err=>{
      console.error(err);
      document.getElementById("agreementList").innerHTML =
        `<div class="empty-state">Gagal ambil data: ${esc(err.message)}</div>`;
    });
}

function renderList(){
  const list = document.getElementById("agreementList");
  const empty = document.getElementById("emptyState");

  const baru = allAgreements.filter(a => (a.status || "baru") === "baru").length;
  document.getElementById("countAgreements").textContent = baru > 0 ? `${baru} baru` : allAgreements.length;

  const filtered = currentFilter === "semua"
    ? allAgreements
    : allAgreements.filter(a => (a.status || "baru") === currentFilter);

  if(filtered.length === 0){
    list.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  const statusLabels = {baru:"Baru", diterima:"Diterima", ditolak:"Ditolak", selesai:"Selesai"};

  list.innerHTML = filtered.map(a => {
    const status = statusLabels[a.status] ? a.status : "baru";
    const link = safeUrl(a.linkFile);
    const tanggal = formatDate(a.timestamp);
    return `
    <div class="agreement-card">
      <div class="agreement-top">
        <div>
          <h4>${esc(a.namaStudio) || "(tanpa nama studio)"}</h4>
          <div class="sub">${a.namaCircle ? "Circle: " + esc(a.namaCircle) : ""}${tanggal ? (a.namaCircle ? " · " : "") + esc(tanggal) : ""}</div>
        </div>
        <span class="status-badge status-${status}">${statusLabels[status]}</span>
      </div>

      <div class="agreement-grid">
        <div><span class="k">Jenis Order</span>${esc(a.jenisOrder) || "-"}</div>
        <div><span class="k">No WhatsApp</span>${esc(a.noWhatsapp) || "-"}</div>
        <div><span class="k">Deadline</span>${esc(a.deadline) || "-"}</div>
        <div><span class="k">Total Fee</span>${esc(a.totalFee) || "-"}</div>
        <div><span class="k">Referensi</span>${esc(a.referensi) || "-"}</div>
        <div><span class="k">Link File</span>${
          link ? `<a href="${esc(link)}" target="_blank" rel="noopener noreferrer">Buka link</a>`
               : (a.linkFile ? esc(a.linkFile) : "-")
        }</div>
      </div>
      ${a.notes ? `<div style="margin-bottom:14px;font-size:.86rem;color:var(--muted);"><span class="k">Notes</span>${esc(a.notes)}</div>` : ""}

      <div class="agreement-actions">
        <button class="act-btn act-terima" data-action="terima" data-id="${esc(a.id)}" ${status!=="baru" ? "disabled":""}>✅ Terima</button>
        <button class="act-btn act-tolak" data-action="tolak" data-id="${esc(a.id)}" ${status!=="baru" ? "disabled":""}>❌ Tolak</button>
        <button class="act-btn act-selesai" data-action="selesai" data-id="${esc(a.id)}" ${status!=="diterima" ? "disabled":""}>🏁 Selesai</button>
      </div>
    </div>`;
  }).join("");
}

// Filter status
document.getElementById("filterBar").addEventListener("click", (e)=>{
  const btn = e.target.closest(".tab-btn");
  if(!btn) return;
  document.querySelectorAll("#filterBar .tab-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.status;
  renderList();
});

// Tombol aksi (pakai event delegation, jadi gak ada onclick inline)
document.getElementById("agreementList").addEventListener("click", (e)=>{
  const btn = e.target.closest("button[data-action]");
  if(!btn || btn.disabled) return;
  const a = allAgreements.find(x => x.id === btn.dataset.id);
  if(!a) return;

  const nama = a.namaStudio || "";
  const wa = toWaNumber(a.noWhatsapp);

  if(btn.dataset.action === "terima"){
    const text = `Halo kak ${nama}! Project agreement kamu di Kinarya udah kami terima ya. Yuk lanjut diskusi detail brief & filenya di sini~`;
    updateStatus(a.id, "diterima", `https://wa.me/${wa}?text=${encodeURIComponent(text)}`, btn);
  }else if(btn.dataset.action === "tolak"){
    const text = `Halo kak ${nama}, mohon maaf banget, untuk saat ini Kinarya belum bisa handle project kamu dulu ya. Makasih udah mau booking, semoga next bisa kolab lagi~`;
    updateStatus(a.id, "ditolak", `https://wa.me/${wa}?text=${encodeURIComponent(text)}`, btn);
  }else if(btn.dataset.action === "selesai"){
    updateStatus(a.id, "selesai", null, btn);
  }
});

// Tab WA dibuka dulu (langsung saat klik) biar gak diblokir popup blocker,
// baru status disimpan, lalu tab itu diarahkan ke WhatsApp.
async function updateStatus(id, status, waUrl, btn){
  const win = waUrl ? window.open("", "_blank") : null;
  btn.disabled = true;
  try{
    await db.collection("agreements").doc(id).update({ status });
    if(waUrl){
      if(win) win.location.href = waUrl;
      else window.open(waUrl, "_blank");
    }
  }catch(err){
    console.error(err);
    if(win) win.close();
    btn.disabled = false;
    alert("Gagal update status: " + err.message);
  }
}

// ============================================
// MASUKAN KLIEN
// ============================================
// Urutan & skor rating, sesuai pilihan di form halaman utama
const RATINGS = {
  "Gasuka":        { emoji:"😞", score:1 },
  "Biasa":         { emoji:"😕", score:2 },
  "Suka":          { emoji:"🙂", score:3 },
  "Puas":          { emoji:"😄", score:4 },
  "Seneng Banget": { emoji:"🤩", score:5 }
};

function listenFeedbacks(){
  unsubFeedbacks = db.collection("feedbacks").orderBy("timestamp","desc")
    .onSnapshot(snap=>{
      allFeedbacks = snap.docs.map(d=>({ id:d.id, ...d.data() }));
      renderFeedbacks();
    }, err=>{
      console.error(err);
      document.getElementById("feedbackList").innerHTML =
        `<div class="empty-state">Gagal ambil masukan: ${esc(err.message)}</div>`;
    });
}

function renderFeedbacks(){
  const summary = document.getElementById("feedbackSummary");
  const list = document.getElementById("feedbackList");
  const empty = document.getElementById("feedbackEmpty");

  document.getElementById("countFeedbacks").textContent = allFeedbacks.length;

  if(allFeedbacks.length === 0){
    summary.innerHTML = "";
    list.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  // Ringkasan: rata-rata & jumlah per rating
  const counts = {};
  let totalScore = 0, scored = 0;
  allFeedbacks.forEach(f=>{
    const r = RATINGS[f.rating];
    if(r){
      counts[f.rating] = (counts[f.rating] || 0) + 1;
      totalScore += r.score;
      scored++;
    }
  });
  const avg = scored ? (totalScore / scored).toFixed(1) : "-";

  summary.innerHTML = `
    <div class="fb-summary">
      <div class="fb-avg">${avg}<small>rata-rata dari 5 · ${allFeedbacks.length} masukan</small></div>
      <div class="fb-dist">
        ${Object.entries(RATINGS).map(([name, r]) =>
          `<span>${r.emoji} ${esc(name)} · ${counts[name] || 0}</span>`
        ).join("")}
      </div>
    </div>`;

  list.innerHTML = allFeedbacks.map(f=>{
    const r = RATINGS[f.rating];
    const tanggal = formatDate(f.timestamp);
    return `
    <div class="fb-card">
      <div class="fb-top">
        <div>
          <div class="fb-who">${esc(f.nama) || "Anonim"}</div>
          ${tanggal ? `<div class="fb-date">${esc(tanggal)}</div>` : ""}
        </div>
        <div class="fb-rating">
          <span class="emo">${r ? r.emoji : "❔"}</span>${esc(f.rating) || "Tanpa rating"}
        </div>
      </div>
      ${f.masukan
        ? `<div class="fb-text">${esc(f.masukan)}</div>`
        : `<div class="fb-text empty">Klien tidak menulis masukan, cuma kasih rating.</div>`}
    </div>`;
  }).join("");
}
