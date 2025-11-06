// Основные скрипты для всего сайта
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
            <a href="index.html">Главная</a>
            <a href="about.html">О нас</a>
            <a href="rooms.html">Номера</a>
            <a href="booking.html">Бронирование</a>
            <a href="contact.html">Контакты</a>
        </nav>
        <div class="mobile-language-switcher">
            <button>KZ</button>
            <button class="active">RU</button>
            <button>EN</button>
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
            
            // Здесь можно добавить логику смены языка
        });
    });
});

/*отзыв прокрут*/

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

