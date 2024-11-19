//Popup button
const popup = document.getElementById('contact-popup');
const openPopupButton = document.getElementById('open-popup');
const closeButton = document.querySelector('.close-btn');
const form_popup = document.getElementById('contact-form'); 
const errorSound = new Audio('error.mp3'); 
const notificationSound = new Audio('sound.wav'); 

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

form_popup.addEventListener('submit', (event) => {
    try {
        event.preventDefault(); 

        console.log('Form submission triggered');
        const email = document.getElementById('email_popup').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        if (!email || !phone || !message) {
            alert("All fields are required.");
            errorSound.play() 
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("Invalid email format.");
            errorSound.play() 
            return false;
        }

        const phoneRegex = /^\+7\s?\d{3}\s?\d{7}$/;
        if (!phoneRegex.test(phone)) {
            alert("Invalid phone number format.");
            errorSound.play() 
            return false;
        }

        if (message.length > 500) {
            alert("Message cannot exceed 500 characters.");
            errorSound.play() 
            return false;
        }

        alert("Form submitted successfully!");
        notificationSound.play();
        form_popup.reset();
        popup.style.display = 'none';
    } catch (error) {
        console.error('Error in form submission:', error);
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
    const form = document.getElementById('multi-form');
    const notificationSound = new Audio('sound.wav'); 

    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.style.display = 'block';
                step.classList.add('slide-in');
            } else {
                step.style.display = 'none';
                step.classList.remove('slide-in');
            }
        });
        setFocus();
    }

    function isEmailValid(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    function isStepValid(stepIndex) {
        const currentStepElement = steps[stepIndex];
        const inputs = currentStepElement.querySelectorAll('input, select, textarea');
        for (let input of inputs) {
            if (input.required && !input.value) {
                return false;
            }
        }
        return true;
    }

    nextBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (!isStepValid(currentStep)) {
                alert('Please fill all required fields before proceeding.');
                errorSound.play() 
                return;
            }

            if (currentStep === 0) {
                const email = document.getElementById('email').value;
                if (!isEmailValid(email)) {
                    alert('Please enter a valid email address.');
                    errorSound.play();
                    return;
                }
            }

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
        if (!isStepValid(currentStep)) {
            alert('Please fill all required fields before submitting.');
            errorSound.play() 
            return;
        }

        const email = document.getElementById('email').value;
        if (!isEmailValid(email)) {
            alert('Please enter a valid email address.');
            errorSound.play() 
            return;
        }

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
 
function toggleTheme() {
    document.body.classList.toggle('night-mode');
    document.querySelector('header').classList.toggle('night-mode');
    document.querySelector('footer').classList.toggle('night-mode');
    document.querySelectorAll('nav a').forEach(link => link.classList.toggle('night-mode'));
    document.querySelector('main').classList.toggle('night-mode');
    document.querySelectorAll('h2').forEach(h => h.classList.toggle('night-mode'));
    document.querySelector('#reviews').classList.toggle('night-mode');
    document.querySelectorAll('.review-card').forEach(card => card.classList.toggle('night-mode'));
    document.querySelectorAll('.review-img').forEach(img => img.classList.toggle('night-mode'));
    document.querySelector('.popup-content').classList.toggle('night-mode');
    document.querySelector('#themeToggleButton').classList.toggle('night-mode');
    document.querySelectorAll('a').forEach(a => a.classList.toggle('night-mode'));
    document.querySelector('#dateTimeDisplay').classList.toggle('night-mode');
     
    if (document.body.classList.contains('night-mode')) {
        localStorage.setItem('theme', 'night');
        const img = document.getElementById('main-img');
        img.src = 'menu-night.jpg';
    } else {
        localStorage.setItem('theme', 'day');
        const img = document.getElementById('main-img');
        img.src = 'Menu.jpg';
    }
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'night') {
        document.body.classList.add('night-mode');
        document.querySelector('header').classList.add('night-mode');
        document.querySelector('footer').classList.add('night-mode');
        document.querySelectorAll('nav a').forEach(link => link.classList.add('night-mode'));
        document.querySelector('main').classList.add('night-mode');
        document.querySelectorAll('h2').forEach(h => h.classList.add('night-mode'));
        document.querySelector('#reviews').classList.add('night-mode');
        document.querySelectorAll('.review-card').forEach(card => card.classList.add('night-mode'));
        document.querySelectorAll('.review-img').forEach(img => img.classList.add('night-mode'));
        document.querySelector('.popup-content').classList.add('night-mode');
        document.querySelector('#themeToggleButton').classList.add('night-mode');
        document.querySelectorAll('a').forEach(a => a.classList.add('night-mode'));
        document.querySelector('#dateTimeDisplay').classList.add('night-mode');
        const img = document.getElementById('main-img');
        img.src = 'menu-night.jpg';
    }else{
        const img = document.getElementById('main-img');
        img.src = 'Menu.jpg';
    }
}

document.querySelector('#themeToggleButton').addEventListener('click', toggleTheme);
window.addEventListener('load', applySavedTheme);
