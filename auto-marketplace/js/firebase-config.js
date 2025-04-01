// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

console.log("Firebase imports carregados com sucesso");

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDNYQauTdDmnb_yvupaCi_W6RhwtMR-X2A",
    authDomain: "webcars-b316f.firebaseapp.com",
    projectId: "webcars-b316f",
    storageBucket: "webcars-b316f.firebasestorage.app",
    messagingSenderId: "229149363655",
    appId: "1:229149363655:web:952f209aa2411a4d48dde2"
};

// Inicializar Firebase
console.log("Inicializando Firebase...");

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);
console.log("Firebase App inicializado");

// Inicializar Firebase Auth
const auth = getAuth(app);
console.log("Firebase Auth inicializado");

// Inicializar Firebase Firestore
const db = getFirestore(app);
console.log("Firebase Firestore inicializado");

// Exportar instâncias do Firebase
export { app, auth, db }; 