document.addEventListener('DOMContentLoaded', function() {

    // Плавная прокрутка якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Шапка при прокрутке
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

    // Карусель отзывов №1
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');

    if (reviewCards.length > 0 && dots.length > 0) {
        let currentReview = 0;

        function showReview(index) {
            reviewCards.forEach((card, i) => card.classList.toggle('active', i === index));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentReview = i;
                showReview(currentReview);
            });
        });

        setInterval(() => {
            currentReview = (currentReview + 1) % reviewCards.length;
            showReview(currentReview);
        }, 5000);
    }

    // Бургер-меню
    const burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';

        mobileMenu.innerHTML = `
            <nav class="mobile-navbar">
                <a href="index.html" data-translate="nav_home">Главная</a>
                <a href="rooms.html" data-translate="nav_rooms">Номера</a>
                <a href="restaurant.html" data-translate="nav_restaurant">Ресторан</a>
                <a href="spa.html" data-translate="nav_spa">SPA</a>
                <a href="booking.html" data-translate="nav_booking">Бронирование</a>
                <a href="contact.html" data-translate="nav_contact">Контакты</a>
            </nav>
            <div class="mobile-language-switcher">
                <button class="lang" data-lang="kz">KZ</button>
                <button class="lang" data-lang="ru">RU</button>
                <button class="lang" data-lang="en">EN</button>
            </div>
        `;

        document.body.appendChild(mobileMenu);

        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            const spans = this.querySelectorAll('span');
            if (spans.length === 3) {
                if (this.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });

        // Закрытие меню при выборе
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                const spans = burgerMenu.querySelectorAll('span');
                if (spans.length === 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });

        // Языки
        mobileMenu.querySelectorAll('.mobile-language-switcher button').forEach(button => {
            button.addEventListener('click', function() {
                const activeBtn = mobileMenu.querySelector('.mobile-language-switcher button.active');
                if (activeBtn) activeBtn.classList.remove('active');

                this.classList.add('active');

                localStorage.setItem('language', this.dataset.lang);
                applyLanguage(this.dataset.lang);
            });
        });
    }

    // Слайдер отзывов №2
    const track = document.querySelector('.reviews-track');
    const dotList = document.querySelectorAll('.dot');
    const totalSlides = document.querySelectorAll('.review-card').length;

    if (track && dotList.length > 0 && totalSlides > 0) {
        let currentIndex = 0;

        function showSlide(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            dotList.forEach((d, i) => d.classList.toggle('active', i === index));
        }

        dotList.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
            });
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }, 5000);
    }

});
/*// Основные скрипты для всего сайта
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Показать/скрыть меню при прокрутке
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Инициализация карусели отзывов
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    let currentReview = 0;
    
    function showReview(index) {
        reviewCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentReview = i;
            showReview(currentReview);
        });
    });
    
    // Автопрокрутка отзывов
    setInterval(() => {
        currentReview = (currentReview + 1) % reviewCards.length;
        showReview(currentReview);
    }, 5000);
    
    // Инициализация бургер-меню
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Создаем содержимое мобильного меню
    mobileMenu.innerHTML = `
        
        <nav class="mobile-navbar">
            <a href="index.html" data-translate="nav_home">Главная</a>
            <a href="about.html" data-translate="nav_about">О нас</a>
            <a href="rooms.html" data-translate="nav_rooms">Номера</a>
            <a href="restaurant.html" data-translate="nav_restaurant">Ресторан</a>
            <a href="spa.html" data-translate="nav_spa">SPA</a>
            <a href="booking.html" data-translate="nav_booking">Бронирование</a>
            <a href="contact.html" data-translate="nav_contact">Контакты</a>
        </nav>
        <div class="mobile-language-switcher">
            <button class="lang" data-lang="kz">KZ</button>
            <button class="lang" data-lang="ru">RU</button>
            <button class="lang" data-lang="en">EN</button>
        </div>
    `;
    
    document.body.appendChild(mobileMenu);
    
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Скрыть/показать шапку при открытии меню
        
        
        // Анимация бургер-меню в крестик
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Закрытие меню при клике на ссылку
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            const spans = burgerMenu.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Переключение языков в мобильном меню
    mobileMenu.querySelectorAll('.mobile-language-switcher button').forEach(button => {
        button.addEventListener('click', function() {
            mobileMenu.querySelector('.mobile-language-switcher button.active').classList.remove('active');
            this.classList.add('active');

            const selectedLang = this.dataset.lang;
            localStorage.setItem('language', selectedLang);
            applyLanguage(selectedLang);
        });
    });

});


  const track = document.querySelector('.reviews-track');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = document.querySelectorAll('.review-card').length;
  let currentIndex = 0;

  function showSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // Автопрокрутка каждые 5 секунд
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }, 5000);

*/ 
