// Funzione centrale di traduzione
function applyStoredLanguage(langToApply) {
    const savedLang = langToApply || localStorage.getItem('preferredLang') || 'en';
    
    console.log("Applicazione della lingua:", savedLang);

    if (typeof translations !== 'undefined' && translations[savedLang]) {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[savedLang][key]) {
                el.innerHTML = translations[savedLang][key];
            }
        });

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

document.addEventListener('DOMContentLoaded', () => {
    applyStoredLanguage();
});

document.addEventListener('click', (e) => {
    const langBtn = e.target.closest('.lang-option');
    if (langBtn) {
        e.preventDefault();
        const lang = langBtn.getAttribute('data-lang');
        if (lang) {
            localStorage.setItem('preferredLang', lang);
            applyStoredLanguage(lang);
        }
    }
});