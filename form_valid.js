document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();
}); 

function validateLoginForm(event) {
    event.preventDefault();

    const firstName = document.forms["loginForm"]["firstName"].value;
    const lastName = document.forms["loginForm"]["lastName"].value;
    const password = document.forms["loginForm"]["password"].value;
    const email = document.forms["loginForm"]["email"].value; 
    const errorSound = new Audio('error.mp3'); 
    
    if (!firstName || !lastName || !password || !email) {
        event.preventDefault();
        errorSound.play() 
        alert("All fields must be filled out for login.");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        event.preventDefault();
        errorSound.play()
        alert("Please enter a valid email address.");
        return false;
    }

    const storedUser = JSON.parse(localStorage.getItem("user_" + email));
    if (!storedUser || storedUser.password !== password) {
        errorSound.play();
        alert("Invalid email or password.");
        return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(storedUser));

    window.location.href = "profile.html";
}

function validateRegistrationForm(event) {
    event.preventDefault(); 

    const firstName = document.forms["registerForm"]["firstName"].value;
    const lastName = document.forms["registerForm"]["lastName"].value;
    const email = document.forms["registerForm"]["email"].value;
    const password = document.forms["registerForm"]["password"].value;
    const errorSound = new Audio('error.mp3'); 

    if (!firstName || !lastName || !email || !password) {
        errorSound.play()
        alert("All fields must be filled out for registration.");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorSound.play()
        alert("Please enter a valid email address.");
        return false;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
        errorSound.play()
        alert("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter and one digit.");
        return false;
    }

    const existingUser = localStorage.getItem("user_" + email);
    if (existingUser) {
        alert("User with this email already exists. Please use a different email.");
        return;
    }

    const registrationDate = new Date().toISOString().split('T')[0]; 

    const userData = { 
        firstName, 
        lastName, 
        email, 
        password, 
        registrationDate 
    };

    localStorage.setItem("user_" + email, JSON.stringify(userData));

    alert("Registration successful! Please log in.");
    window.location.href = "login.html"; 
}

function resetForm() {
    document.querySelectorAll('input').forEach(input => {
        input.value = ''; 
    });
} 

function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === 'night') {
        const body = document.body;
        const regBody = document.getElementById('reg_body');
        const logInBody = document.getElementById('logIn_body');
        const container = document.querySelector('.container');
        const h2 = document.querySelector('h2');
        const buttonReg = document.querySelector('.buttonReg');
        const buttonLog = document.querySelector('.buttonLog');
        const inputFields = document.querySelectorAll('input');
        const buttonReset = document.querySelector('.buttonReset');
        const footerLog = document.getElementById('footer_log');
        const footerReg = document.getElementById('footer_reg');
        const link = document.querySelector('.link');

        body.classList.add('night');
        regBody.classList.add('night');
        logInBody.classList.add('night');
        container.classList.add('night');
        h2.classList.add('night');
        buttonReg.classList.add('night');
        buttonLog.classList.add('night');
        inputFields.forEach(input => input.classList.add('night'));
        buttonReset.classList.add('night');
        footerLog.classList.add('night');
        footerReg.classList.add('night');
        link.classList.add('night');
    }
}

