const btn = document.querySelector('.mobile-menu-button');
const navbar = document.querySelector('.navbar');

if (btn && navbar) {   // проверяем, что элементы существуют
  btn.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
} else {
  console.error('Не найден элемент кнопки или navbar');
}
