// === Передача данных с главной страницы на booking.html ===
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, есть ли форма на главной странице
  const bookingForm = document.querySelector('.booking_form');
  if (bookingForm) {
    const button = bookingForm.querySelector('button');
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const dates = document.getElementById('dates')?.value || '';
      const rooms = document.getElementById('rooms')?.value || '';
      const adults = document.getElementById('adults')?.value || '';
      const children = document.getElementById('children')?.value || '';

      const query = new URLSearchParams({ dates, rooms, adults, children }).toString();
      window.location.href = 'booking.html?' + query;
    });
  }

  // === Автоматическое заполнение на booking.html ===
  const params = new URLSearchParams(window.location.search);

  const dates = params.get('dates');
  const rooms = params.get('rooms');
  const adults = params.get('adults');
  const children = params.get('children');

  if (dates && document.getElementById('checkIn') && document.getElementById('checkOut')) {
    if (dates.includes(' - ')) {
      const [checkIn, checkOut] = dates.split(' - ');
      document.getElementById('checkIn').value = checkIn.split('.').reverse().join('-');
      document.getElementById('checkOut').value = checkOut.split('.').reverse().join('-');
    }
  }

  if (rooms && document.getElementById('roomCount')) {
    document.getElementById('roomCount').value = rooms;
  }

  if (adults && document.getElementById('adults')) {
    document.getElementById('adults').value = adults;
  }

  if (children && document.getElementById('children')) {
    document.getElementById('children').value = children;
  }
});
