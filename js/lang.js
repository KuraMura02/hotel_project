document.addEventListener('DOMContentLoaded', () => { 
  const langButtons = document.querySelectorAll('.language-switcher button');
  const translatable = document.querySelectorAll('[data-translate]');

  // Скрываем элементы до перевода, чтобы не мелькал русский
  translatable.forEach(el => el.style.visibility = 'hidden');

  // Восстанавливаем сохранённый язык
  const savedLang = localStorage.getItem('language') || 'ru';
  setActiveButton(savedLang);
  changeLanguage(savedLang);

  // При клике меняем язык
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('language', lang);
      setActiveButton(lang);
      changeLanguage(lang);
    });
  });

  function setActiveButton(lang) {
    langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  }

  function changeLanguage(lang) {
    fetch(`lang/${lang}.json`)
      .then(res => {
        if (!res.ok) throw new Error('Не найден файл перевода');
        return res.json();
      })
      .then(dict => {
        translatable.forEach(el => {
          const key = el.getAttribute('data-translate');
          if (!key) return;

          if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && dict[key]) {
            el.placeholder = dict[key];
          } else if (dict[key]) {
            el.textContent = dict[key];
          }

          // Показываем элементы после перевода
          el.style.visibility = 'visible';
        });
        document.title = dict.title || document.title;
      })
      .catch(err => console.error('Ошибка перевода:', err));
  }
  // --- Подключаем мобильные кнопки ---
  const mobileLangBtns = document.querySelectorAll('.mobile-language-switcher button');

  mobileLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('language', lang);

      // обновляем обычные кнопки
      setActiveButton(lang);

      // активируем мобильные кнопки
      mobileLangBtns.forEach(b =>
        b.classList.toggle('active', b.dataset.lang === lang)
      );

      changeLanguage(lang);
    });
  });

  // при загрузке — активируем мобильные кнопки тоже
  mobileLangBtns.forEach(b =>
    b.classList.toggle('active', b.dataset.lang === savedLang)
  );
  
});


