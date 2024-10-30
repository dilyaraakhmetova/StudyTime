//Popup button
const popup = document.getElementById('contact-popup');
const openPopupButton = document.getElementById('open-popup');
const closeButton = document.querySelector('.close-btn');

openPopupButton.addEventListener('click', () => {
    popup.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

//Changing the background
const colors = ["#FF6347", "#4682B4", "#32CD32", "#FFD700", "#DDA0DD", "#87CEEB", "#b9d4e9"];
const colorButton = document.getElementById("colorButton");
let colorIndex = 0;

colorButton.addEventListener("click", function() {
    document.body.style.backgroundColor = colors[colorIndex];
    colorIndex++;
    if (colorIndex >= colors.length) {
        colorIndex = 0; 
    }
});

//Display time
function displayDateTime() {
    const dateTimeElement = document.getElementById('dateTimeDisplay');
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    dateTimeElement.innerHTML = `Date: ${formattedDate} <br> Time: ${formattedTime}`;
}

displayDateTime();
setInterval(displayDateTime, 1000);

//Frequently asked questions
const questions = document.querySelectorAll('.question');
questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling; 
        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none'; 
        }
    });
});

// Keyboard navigation for the navigation menu
const navItems = document.querySelectorAll('.navbar-nav .nav-link'); 
let currentIndex = 0; 
navItems[currentIndex].focus();
document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    const isInputElement = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
    if (isInputElement) {
        return; 
    }
    if (event.key === 'ArrowRight') {
        event.preventDefault(); 
        if (currentIndex < navItems.length - 1) {
            currentIndex++; 
        }
        navItems[currentIndex].focus(); 
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault(); 
        if (currentIndex > 0) {
            currentIndex--; 
        }
        navItems[currentIndex].focus(); 
    }
});

//Multi-step form
document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const backBtns = document.querySelectorAll('.back-btn');
    const form = document.getElementById('form');
    const confirmationDiv = document.getElementById('confirmation');
    const notificationSound = new Audio('sound.wav'); 

    let currentStep = 0;

    function showStep(stepIndex) {
        for (let index = 0; index < steps.length; index++) {
            if (index === stepIndex) {
                steps[index].style.display = 'block';
                steps[index].classList.add('slide-in'); 
            } else {
                steps[index].style.display = 'none';
                steps[index].classList.remove('slide-in'); 
            }
        }
        updateConfirmation();
        setFocus();
    }    
    function updateConfirmation() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;

        confirmationDiv.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>City:</strong> ${city}</p>
        `;
    }

    nextBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    backBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        notificationSound.play();
        alert('Form submitted!'); 
    });

    showStep(currentStep);
});
// Function to change greeting
function displayGreeting() {
    const date = new Date();
    const hours = date.getHours();
    let greeting;

    if (hours < 12) {
        greeting = "Good morning! Glad to see you!";
    } else if (hours < 18) {
        greeting = "Good afternoon! Glad to see you!";
    } else {
        greeting = "Good evening! Glad to see you!";
    }

    document.getElementById('greeting').innerText = greeting;
}

window.onload = displayGreeting;

function logout() {
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loginLink = document.getElementById('loginLink');
    const logoutItem = document.getElementById('logoutItem');

    if (isLoggedIn) {
        loginLink.style.display = 'none'; 
        logoutItem.style.display = 'block'; 
    } else {
        loginLink.style.display = 'block'; 
        logoutItem.style.display = 'none'; 
    }
});
