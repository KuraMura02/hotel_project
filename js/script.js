// скрол и белый фон нав бара

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const scrollContainer = document.getElementById("extraServices");
let scrollAmount = 0;

function autoScroll() {
    if(scrollAmount + scrollContainer.clientWidth >= scrollContainer.scrollWidth){
        scrollAmount = 0; // сброс на начало
    } else {
        scrollAmount += scrollContainer.clientWidth / 3; // прокрутка на 1/3 ширины
    }
    scrollContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// автоскролл каждые 5 секунд
let scrollInterval = setInterval(autoScroll, 5000);

// останавливаем автоскролл, если пользователь зажимает прокрутку
scrollContainer.addEventListener('mousedown', () => {
    clearInterval(scrollInterval);
});
scrollContainer.addEventListener('touchstart', () => {
    clearInterval(scrollInterval);
});








