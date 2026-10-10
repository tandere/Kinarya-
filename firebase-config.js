// ============================================
// GANTI SEMUA NILAI DI BAWAH DENGAN CONFIG FIREBASE PROJECT KAMU SENDIRI
// Cara ambil: Firebase Console > (pilih project) > ⚙️ Project Settings
//             > scroll ke "Your apps" > pilih Web app (</>) > copy config-nya ke sini
// ============================================
const firebaseConfig = {
  apiKey:  "AIzaSyAb426sG2LCqPBGIXkA2gRcfaR6-gFpeII",
  authDomain:  "new-22ce4.firebaseapp.com",
  projectId:  "new-22ce4",
  storageBucket: "new-22ce4.firebasestorage.app",
  messagingSenderId: "517541012941",
  appId:"1:517541012941:web:dbf659c2d50936765f1084",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
