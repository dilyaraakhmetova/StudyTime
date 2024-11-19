// Ваш API-ключ
const API_KEY = 'AIzaSyCUwgOQJhlnyNmf7T5YmyHT7bPUZwfX5XU';

// Форма поиска
const form = document.getElementById('bookSearchForm');
// Поле для отображения результатов
const resultsDiv = document.getElementById('results');

// Обработчик отправки формы
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Отключаем стандартное поведение формы

    // Получаем значение из поля ввода
    const query = document.getElementById('query').value;

    // Очищаем предыдущие результаты
    resultsDiv.innerHTML = '';

    // Выполняем запрос к Google Books API
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`);
        if (!response.ok) throw new Error('Ошибка при запросе к API');
        
        const data = await response.json();

        // Проверяем, есть ли книги в ответе
        if (data.totalItems === 0) {
            resultsDiv.innerHTML = '<p>Ничего не найдено.</p>';
            return;
        }

        // Отображаем результаты
        data.items.forEach(item => {
            const book = item.volumeInfo;

            // Создаем элементы для книги
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            const img = document.createElement('img');
            img.src = book.imageLinks?.thumbnail || 'https://via.placeholder.com/100';
            img.alt = book.title;

            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Автор(ы):</strong> ${book.authors?.join(', ') || 'Неизвестно'}</p>
                <p><strong>Описание:</strong> ${book.description?.substring(0, 200) || 'Нет описания'}...</p>
            `;

            // Собираем элементы
            bookDiv.appendChild(img);
            bookDiv.appendChild(infoDiv);
            resultsDiv.appendChild(bookDiv);
        });
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = '<p>Произошла ошибка при загрузке данных.</p>';
    }
});
