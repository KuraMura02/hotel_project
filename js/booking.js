// Скрипты для страницы бронирования
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const roomTypeSelect = document.getElementById('roomType');
    const roomCountSelect = document.getElementById('roomCount');
    const adultsSelect = document.getElementById('adults');
    const childrenSelect = document.getElementById('children');
    
    // Установка минимальной даты (сегодня)
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;
    
    // Обновление минимальной даты выезда при выборе даты заезда
    checkInInput.addEventListener('change', function() {
        if (this.value) {
            const nextDay = new Date(this.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkOutInput.min = nextDay.toISOString().split('T')[0];
            
            // Если дата выезда раньше новой минимальной - сбросить
            if (checkOutInput.value && new Date(checkOutInput.value) < nextDay) {
                checkOutInput.value = '';
            }
        }
    });
    
    // Обновление сводки бронирования
    function updateBookingSummary() {
        const checkIn = checkInInput.value ? new Date(checkInInput.value) : null;
        const checkOut = checkOutInput.value ? new Date(checkOutInput.value) : null;
        
        // Даты
        if (checkIn && checkOut) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('summaryDates').textContent = 
                `${checkIn.toLocaleDateString('ru-RU', options)} - ${checkOut.toLocaleDateString('ru-RU', options)}`;
            
            // Количество ночей
            const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
            document.getElementById('summaryNights').textContent = nights;
        } else {
            document.getElementById('summaryDates').textContent = 'Не выбрано';
            document.getElementById('summaryNights').textContent = '0';
        }
        
        // Номер
        if (roomTypeSelect.value) {
            const roomTypeText = roomTypeSelect.options[roomTypeSelect.selectedIndex].text;
            document.getElementById('summaryRoom').textContent = roomTypeText.split(' - ')[0];
        } else {
            document.getElementById('summaryRoom').textContent = 'Не выбран';
        }
        
        // Количество номеров
        document.getElementById('summaryRoomCount').textContent = roomCountSelect.value;
        
        // Гости
        document.getElementById('summaryGuests').textContent = 
            `${adultsSelect.value} взрослых, ${childrenSelect.value} детей`;
        
        // Дополнительные услуги
        const extrasList = document.getElementById('summaryExtras');
        extrasList.innerHTML = '';
        
        const checkedExtras = bookingForm.querySelectorAll('input[type="checkbox"]:checked');
        if (checkedExtras.length > 0) {
            checkedExtras.forEach(checkbox => {
                const li = document.createElement('li');
                li.textContent = checkbox.parentElement.textContent.trim();
                extrasList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'Не выбрано';
            extrasList.appendChild(li);
        }
        
        // Расчет стоимости (упрощенный)
        if (checkIn && checkOut && roomTypeSelect.value) {
            const nights = Math.ceil((new Date(checkOutInput.value) - new Date(checkInInput.value)) / (1000 * 60 * 60 * 24));
            let roomPrice = 0;
            
            switch (roomTypeSelect.value) {
                case 'standard':
                    roomPrice = 15000;
                    break;
                case 'comfort':
                    roomPrice = 25000;
                    break;
                case 'lux':
                    roomPrice = 45000;
                    break;
            }
            
            // Доп. услуги
            let extrasPrice = 0;
            checkedExtras.forEach(checkbox => {
                if (checkbox.name === 'breakfast') {
                    extrasPrice += 3000 * parseInt(adultsSelect.value) + 3000 * parseInt(childrenSelect.value);
                } else if (checkbox.name === 'parking') {
                    extrasPrice += 2000 * nights;
                } else if (checkbox.name === 'transfer') {
                    extrasPrice += 5000;
                }
            });
            
            const totalPrice = (roomPrice * nights * parseInt(roomCountSelect.value)) + extrasPrice;
            document.getElementById('summaryTotal').textContent = totalPrice.toLocaleString('ru-RU') + ' ₸';
        } else {
            document.getElementById('summaryTotal').textContent = '0 ₸';
        }
    }
    
    // Слушатели событий для обновления сводки
    [checkInInput, checkOutInput, roomTypeSelect, roomCountSelect, adultsSelect, childrenSelect].forEach(element => {
        element.addEventListener('change', updateBookingSummary);
    });
    
    bookingForm.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateBookingSummary);
    });
    
    // Обработка отправки формы
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!checkInInput.value || !checkOutInput.value || !roomTypeSelect.value) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Здесь можно добавить отправку данных на сервер
        alert('Ваше бронирование успешно отправлено! Мы свяжемся с вами для подтверждения.');
        this.reset();
        updateBookingSummary();
    });
    
    // Инициализация сводки
    updateBookingSummary();
});

/*booking date*/
