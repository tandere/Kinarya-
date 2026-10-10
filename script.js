// ============================================
// DATA PORTOFOLIO
// Setiap ID diambil dari link Google Drive di brief.
// Video ditampilkan langsung via Google Drive preview embed (bukan redirect).
// ============================================
const ADMIN_WA = "6289542969"+"0690"; // nomor admin Kinarya, format 62xxxxxxxxxx

function driveEmbedUrl(fileId){
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
function driveEmbedUrl(fileId){
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
function driveThumbUrl(fileId){
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w640`;
}

const PORTFOLIO = {
  rigging: [
    { group: "VTuber Pet", ids: [
      "111uVDqWP7Aj5dlhMolQApn3W2S9mjaWb",
      "11uem3vBv5dXdG2i3DPg7Y0_Fj4lkNulm",
      "1usAU1-OgSLpCoa_9pYgSiTdaSE_siTSX",
      "1zozqECrVaYLKb3BL8P4Y_JrBxBK9hCOt"
    ]},
    { group: "VTuber Model", ids: [
      "1DQp3_isutAwzptNrcZW1q-Rg20pyAe0o",
      "1q8Jdz1AsdZir4LT282zhpsqkHwtI9Go4",
      "1B_BtUSIxT2HMdl0_uLXyPVe47kv8bPEx",
      "1EYceLS6DVXEm-TlHYwLmALa5R4kC5g37",
      "1BZHj77Fr-AukQDyrMhpcv1kPeftXTw_c"
    ]},
    { group: "Animasi Overlays", ids: [
      "17N9k8f9gCmNDJK-QUCgQGwCVlZ3Y_nro","18Xx5jYR-R7ll6oDrYK4XqPYLo5gSqdk2",
      "12WfSdgpD7eS8C89xsKYznMdXTtOtHHXr","1ELUBNlQygOyWFhQremV38TvQ6UxDYTVc",
      "1UeR6uGwqfkj_2JqNpVlVZCxwN0qxtjOX","1vyvrkjYTTboTyZ3n5VH_JPi1EQAfwmfI",
      "1yhxZLQBKQ2W0SwZ0hORJ1UwfZ2982QAi","1LZx71xxdCegf6P3jf94m36Am3Lc4jebJ",
      "1AYrQ7ZUgfgVIGTwRNLnjGBHto2FF4M-d","1ZUkeXcuwDSkBmI1ECpQw_uWI8Wdy0xi8",
      "1iO29ZgdLdRlIh_pL2Odu2VGxJv-P1gaP","1YT2Ip7RnaEy1hHCdCyAh-z6TFEQ264UH"
    ]},
    { group: "Animasi Logo", ids: [
      "1V4NTCabxTjG4YE5wHgSx0zzCaPNxc4Fq","15QpOw8UM0wi9G9C3pe4IwW0ZjY3OSUpF",
      "17dfUF2EM1aHhy6kcvjer5zjYMY3CyzLk"
    ]},
    { group: "Animasi Emote", ids: [
      "1gbqWqjKox0vdWj8byh--sySdWqE5qjux","18pr7FrgtKNvja6hkDnBRCMROaMHGAqDR",
      "1AL5nZmd2R7pVLeS0yqSAS3oprVNHYwb9","1TWvyPbp8TCvJ2bRSaWVTYVZHHRMndtNQ",
      "1imTG79VZC3XJWDWGegAhAdHaC5eUCaE-","1BQgReGQbVVzR686767h5p01L4aXzzQgq",
      "1EKJS_1jbkROmWVUmNEpqM2TyrmXhldMm","1ICxbldVf7t98lXIplkJSE5U6wu_VZy4J",
      "1TxrEegRxeatDxNVS_UoqXh_OKTdvNmiV","1N_AvBFqxDa2u7eb_gUpbWlNIMqWZyXQ5",
      "1qDLeRtKg1Ab6Tt6xKizjNF8_QFxrY1hh","16Tcime2xw2i-bjeK8lmC3X27EA23lV5d",
      "1LnygUtwcjrMF69t5GhUWqvdrRCdwMMoK","1ES4m6zIH53k2lEeABgP1qarRtpJC77yZ",
      "1qQ6VPWQHBFsmw_8ygTdONVWjP3RGQSb_","1w6W4aOob2z-HHhDSI7aKNAaRhl4Y_dxP",
      "1MpLe_UxRGs7mmrdwMs9F9eQ2oX3fLNA4","1Tqxi3SQ3QJ-J5BSvPR_BuEHKngoJ9NxZ",
      "1al_KY2MZSNBQlgQbEdudfIKHN4zckvBL"
    ]},
    { group: "Animasi Banner", ids: [
      "169kJNAbCIqd-5V2cCiF9LI_8B_vQwebT","1dfRKvHzhkXIGXr0-0KW2bxTb-8Cf-GDy",
      "1Nko7LCEYPRPux8H1kXXZ39zJ4uaSRcfh","1UNcT2rUJLAbmWTdVC2BTCwMOxGdFwMnh",
      "1uGMOapRycQC9DhMRMF_Xkk3Wx5RmKBCJ","19E_YkNds6BMV2FmEY0jBBR9gJgmW6zES",
      "1XanpOSOpJ_WFWjXhQ2CSh7TJjsfZAAc-"
    ]},
    { group: "Animasi Illustration", ids: [
      "1RqWI8FLUr2m-J7ET1kt4SaYYRZGrCMHA","19v-_p0hI7QtTF2F6x9qtHAlFOhSJNNqJ",
      "1RU3CN3aNIWa-g7Q5fAETbMdTcgEp40xL","1ebxH_mKvnXgUumgU9i9p-i2w6uKrOEuE",
      "1HsMSKHIkUtmkfYIztYjaQPgjwyhmnJlL"
    ]}
  ],
  vroid: [
    { group: "VRoid Model", ids: [
      "1W-MgO5ONcl65s0Ouk-qPZw4EAvVxBYS_",
      "1qQxn0nnT57lBUXDKWmY-VdKgCtTQB_aJ",
      "1t0uISgBCSG0HD88ascqzmHFVLUBc4KfA"
    ]}
  ]
};

function renderPortfolio(){
  Object.entries(PORTFOLIO).forEach(([tab, groups])=>{
    const container = document.getElementById(`karya-${tab}`);
    if(!container) return;
    container.innerHTML = groups.map(g => `
      <div class="karya-group">
        <h3>${g.group} <span style="color:var(--muted);font-weight:400;font-size:.85rem;">· ${g.ids.length} karya</span></h3>
        <div class="karya-grid">
        ${g.ids.map((id,i)=>`
  <div class="karya-card" data-id="${id}">
    <img class="karya-thumb" src="${driveThumbUrl(id)}" alt="${g.group} ${i+1}" loading="lazy"
         onerror="this.style.display='none'">
    <div class="play-overlay"><div class="play-icon">▶</div></div>
    <div class="karya-label">${g.group} ${i+1}</div>
  </div>
`).join("")}
        </div>
      </div>
    `).join("");
  });

  document.querySelectorAll(".karya-card").forEach(card=>{
    card.addEventListener("click", ()=> openVideoModal(card.dataset.id));
  });
}

function openVideoModal(fileId){
  const overlay = document.getElementById("videoModal");
  const box = document.getElementById("videoModalBox");
  box.innerHTML = `<iframe src="${driveEmbedUrl(fileId)}" allow="autoplay" allowfullscreen></iframe>`;
  overlay.classList.add("open");
}
function closeVideoModal(){
  document.getElementById("videoModal").classList.remove("open");
  document.getElementById("videoModalBox").innerHTML = "";
}

// ---------- Tabs (generic, works for karya & flow) ----------
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

// ---------- Phone helper ----------
function toWaNumber(raw){
  let n = (raw || "").replace(/[^0-9+]/g,"");
  if(n.startsWith("+62")) n = n.slice(1);
  else if(n.startsWith("62")) { /* sudah pas */ }
  else if(n.startsWith("0")) n = "62" + n.slice(1);
  else n = "62" + n;
  return n;
}

// ---------- Project Agreement form ----------
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

function sendAgreementToWA(){
  if(!lastAgreement) return;
  const d = lastAgreement;
  const text = `Halo kak Kinarya! Aku mau booking project ya~%0A%0A`+
    `*Nama Studio:* ${d.namaStudio}%0A`+
    `*Nama Circle:* ${d.namaCircle}%0A`+
    `*Jenis Order:* ${d.jenisOrder}%0A`+
    `*Deadline:* ${d.deadline}%0A`+
    `*Total Fee:* ${d.totalFee}%0A`+
    `*Referensi:* ${d.referensi}%0A`+
    `*Link File:* ${d.linkFile}%0A`+
    `*Notes:* ${d.notes}%0A%0A`+
    `No WA aku: ${d.noWhatsapp}`;
  window.open(`https://wa.me/${ADMIN_WA}?text=${text}`, "_blank");
}

function resetAgreementForm(){
  agreementForm.reset();
  agreementForm.style.display = "block";
  document.getElementById("agreementConfirm").classList.remove("show");
  lastAgreement = null;
}

function exportAgreementPNG(){
  const node = document.getElementById("agreementConfirm");
  if(window.html2canvas){
    html2canvas(node, {backgroundColor:"#131317"}).then(canvas=>{
      const link = document.createElement("a");
      link.download = "kinarya-project-agreement.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }
}

// ---------- Feedback form ----------
let selectedRating = null;
document.querySelectorAll(".emoji-opt").forEach(opt=>{
  opt.addEventListener("click", ()=>{
    document.querySelectorAll(".emoji-opt").forEach(o=>o.classList.remove("selected"));
    opt.classList.add("selected");
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
    try{
      await db.collection("feedbacks").add(data);
      feedbackForm.style.display = "none";
      document.getElementById("feedbackConfirm").classList.add("show");
    }catch(err){
      console.error(err);
      alert("Gagal kirim masukan, coba lagi ya.");
    }
  });
}

function sendFeedbackToWA(){
  const nama = document.getElementById("fb-nama").value.trim() || "Klien";
  const masukan = document.getElementById("fb-masukan").value.trim();
  const text = `Halo kak Kinarya! Mau kasih masukan nih dari ${nama}:%0A${masukan}`;
  window.open(`https://wa.me/${ADMIN_WA}?text=${text}`, "_blank");
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", ()=>{
  renderPortfolio();
  setupTabs(".tabs");
  document.getElementById("videoModalClose")?.addEventListener("click", closeVideoModal);
  document.getElementById("videoModal")?.addEventListener("click", (e)=>{
    if(e.target.id === "videoModal") closeVideoModal();
  });
});
