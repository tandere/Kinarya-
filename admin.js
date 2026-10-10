const ADMIN_WA = "6289542969690"; // dipakai kalau perlu, bukan nomor klien

function toWaNumber(raw){
  let n = (raw || "").replace(/[^0-9+]/g,"");
  if(n.startsWith("+62")) n = n.slice(1);
  else if(n.startsWith("62")) { /* sudah pas */ }
  else if(n.startsWith("0")) n = "62" + n.slice(1);
  else n = "62" + n;
  return n;
}

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

auth.onAuthStateChanged(user=>{
  if(user){
    loginScreen.style.display = "none";
    dashboardScreen.style.display = "block";
    listenAgreements();
  }else{
    loginScreen.style.display = "flex";
    dashboardScreen.style.display = "none";
  }
});

// ---------- Data ----------
let allAgreements = [];
let currentFilter = "semua";

function listenAgreements(){
  db.collection("agreements").orderBy("timestamp","desc")
    .onSnapshot(snap=>{
      allAgreements = snap.docs.map(d=>({ id:d.id, ...d.data() }));
      renderList();
    }, err=>{
      console.error(err);
      document.getElementById("agreementList").innerHTML =
        `<div class="empty-state">Gagal ambil data: ${err.message}</div>`;
    });
}

function renderList(){
  const list = document.getElementById("agreementList");
  const empty = document.getElementById("emptyState");
  const filtered = currentFilter === "semua"
    ? allAgreements
    : allAgreements.filter(a => (a.status || "baru") === currentFilter);

  if(filtered.length === 0){
    list.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  list.innerHTML = filtered.map(a => {
    const status = a.status || "baru";
    const statusLabel = {baru:"Baru", diterima:"Diterima", ditolak:"Ditolak", selesai:"Selesai"}[status] || status;
    const waNumber = toWaNumber(a.noWhatsapp);
    return `
    <div class="agreement-card">
      <div class="agreement-top">
        <div>
          <h4>${a.namaStudio || "(tanpa nama studio)"}</h4>
          <div class="sub">${a.namaCircle ? "Circle: "+a.namaCircle : ""}</div>
        </div>
        <span class="status-badge status-${status}">${statusLabel}</span>
      </div>

      <div class="agreement-grid">
        <div><span class="k">Jenis Order</span>${a.jenisOrder || "-"}</div>
        <div><span class="k">No WhatsApp</span>${a.noWhatsapp || "-"}</div>
        <div><span class="k">Deadline</span>${a.deadline || "-"}</div>
        <div><span class="k">Total Fee</span>${a.totalFee || "-"}</div>
        <div><span class="k">Referensi</span>${a.referensi || "-"}</div>
        <div><span class="k">Link File</span>${a.linkFile ? `<a href="${a.linkFile}" target="_blank">Buka link</a>` : "-"}</div>
      </div>
      ${a.notes ? `<div style="margin-bottom:14px;font-size:.86rem;color:var(--muted);"><span class="k">Notes</span>${a.notes}</div>` : ""}

      <div class="agreement-actions">
        <button class="act-btn act-terima" ${status!=="baru" ? "disabled":""} onclick="terimaProject('${a.id}','${waNumber}','${(a.namaStudio||"").replace(/'/g,"")}')">✅ Terima</button>
        <button class="act-btn act-tolak" ${status!=="baru" ? "disabled":""} onclick="tolakProject('${a.id}','${waNumber}','${(a.namaStudio||"").replace(/'/g,"")}')">❌ Tolak</button>
        <button class="act-btn act-selesai" ${status!=="diterima" ? "disabled":""} onclick="selesaiProject('${a.id}')">🏁 Selesai</button>
      </div>
    </div>
  `;
  }).join("");
}

document.getElementById("filterBar").addEventListener("click", (e)=>{
  const btn = e.target.closest(".tab-btn");
  if(!btn) return;
  document.querySelectorAll("#filterBar .tab-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.status;
  renderList();
});

// ---------- Actions ----------
async function terimaProject(id, waNumber, nama){
  await db.collection("agreements").doc(id).update({ status:"diterima" });
  const text = `Halo kak ${nama}! Project agreement kamu di Kinarya udah kami terima ya. Yuk lanjut diskusi detail brief & filenya di sini~`;
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank");
}

async function tolakProject(id, waNumber, nama){
  await db.collection("agreements").doc(id).update({ status:"ditolak" });
  const text = `Halo kak ${nama}, mohon maaf banget, untuk saat ini Kinarya belum bisa handle project kamu dulu ya. Makasih udah mau booking, semoga next bisa kolab lagi~`;
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank");
}

async function selesaiProject(id){
  await db.collection("agreements").doc(id).update({ status:"selesai" });
}
