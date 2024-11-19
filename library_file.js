const API_KEY = 'AIzaSyCUwgOQJhlnyNmf7T5YmyHT7bPUZwfX5XU';

const form = document.getElementById('bookSearchForm');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const query = document.getElementById('query').value;

    resultsDiv.innerHTML = '';

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`);
        if (!response.ok) throw new Error('Error connecting to API.');
        
        const data = await response.json();

        console.log(data); 

        if (data.totalItems === 0) {
            resultsDiv.innerHTML = '<p>Nothing was found.</p>';
            return;
        }

        data.items.forEach(item => {
            const book = item.volumeInfo;

            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            if (document.body.classList.contains('night')) {
                bookDiv.classList.add('night');
            }

            const img = document.createElement('img');
            img.src = book.imageLinks?.thumbnail || 'https://via.placeholder.com/100';
            img.alt = book.title;

            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author(s):</strong> ${book.authors?.join(', ') || 'Неизвестно'}</p>
                <p><strong>Description:</strong> ${book.description?.substring(0, 200) || 'Нет описания'}...</p>
            `;

            bookDiv.appendChild(img);
            bookDiv.appendChild(infoDiv);
            resultsDiv.appendChild(bookDiv);
        });
    } catch (error) {
        console.error('Error occured:', error);
        resultsDiv.innerHTML = '<p>An error occurred while loading data.</p>';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();
});

function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    const header = document.querySelector("header");
    const form = document.querySelector("form");
    const footer = document.querySelector("footer");
    const instructions = document.querySelector(".instructions");
    const homeButton = document.getElementById("home-button");
    const books = document.querySelectorAll('.book'); 

    if (savedTheme === "night") {
        document.body.classList.add("night");
        header?.classList.add("night");
        form?.classList.add("night");
        footer?.classList.add("night");
        instructions?.classList.add("night");
        homeButton?.classList.add("night");

        books.forEach(book => book.classList.add('night'));
    } else {
        document.body.classList.remove("night");
        header?.classList.remove("night");
        form?.classList.remove("night");
        footer?.classList.remove("night");
        instructions?.classList.remove("night");
        homeButton?.classList.remove("night");

        books.forEach(book => book.classList.remove('night'));
    }
}


function goHome() {
    window.location.href = "index.html"; 
}