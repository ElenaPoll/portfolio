// Funzione centrale di traduzione
function applyStoredLanguage(langToApply) {
    // Se viene passata una lingua la usa, altrimenti legge il localStorage o mette 'en'
    const savedLang = langToApply || localStorage.getItem('preferredLang') || 'en';
    
    console.log("Applicazione della lingua:", savedLang); // Utile per debug in console (F12)

    // Controlla se l'oggetto translations esiste ed è definito
    if (typeof translations !== 'undefined' && translations[savedLang]) {
        // Traduce tutti gli elementi con l'attributo data-translate
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[savedLang][key]) {
                el.innerHTML = translations[savedLang][key];
            }
        });

        // Aggiorna lo stato attivo dei pulsanti della lingua
        document.querySelectorAll('.lang-option').forEach(opt => {
            if (opt.getAttribute('data-lang') === savedLang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    } else {
        console.warn("Attenzione: l'oggetto 'translations' non è stato trovato o la lingua non esiste.");
    }
}

// 1. Appena il DOM è pronto, applica la lingua salvata
document.addEventListener('DOMContentLoaded', () => {
    applyStoredLanguage();
});

// 2. Intercetta in modo sicuro i click sui pulsanti della lingua
document.addEventListener('click', (e) => {
    const langBtn = e.target.closest('.lang-option');
    if (langBtn) {
        e.preventDefault();
        const lang = langBtn.getAttribute('data-lang');
        if (lang) {
            localStorage.setItem('preferredLang', lang); // Salva la scelta
            applyStoredLanguage(lang); // Applica subito la lingua passandola direttamente
        }
    }
});