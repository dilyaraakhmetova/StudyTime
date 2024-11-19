document.addEventListener("DOMContentLoaded", () => {
    loadUserData();
    applySavedTheme();
});

function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    const navbar = document.querySelector(".navbar");
    const profileContainer = document.querySelector(".profile-container");
    const footer = document.querySelector("footer");
    const navbarButtons = document.querySelectorAll(".navbar button"); 
    const courseCards = document.querySelectorAll('.course-card');
    const courseTitle = document.querySelectorAll('.course-title');
    const courseDes = document.querySelectorAll('.course-description');

    if (savedTheme === "night") {
        document.body.classList.add("night");
        navbar.classList.add("night");
        profileContainer.classList.add("night");
        footer.classList.add("night");
        courseCards.forEach(card => card.classList.add('night'));
        courseTitle.forEach(title => title.classList.add('night'));
        courseDes.forEach(des => des.classList.add('night'));

        navbarButtons.forEach(button => {
            button.classList.add('night');
        });
    } else {
        document.body.classList.remove("night");
        navbar.classList.remove("night");
        profileContainer.classList.remove("night");
        footer.classList.remove("night");
        courseCards.forEach(card => card.classList.remove('night'));
        courseTitle.forEach(title => title.classList.remove('night'));
        courseDes.forEach(des => des.classList.remove('night'));

        navbarButtons.forEach(button => {
            button.classList.remove('night');
        });
    }
}


function loadUserData() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        document.getElementById("userName").textContent = `${storedUser.firstName} ${storedUser.lastName}`;
        document.getElementById("userEmail").textContent = storedUser.email;
        document.getElementById("userJoinDate").textContent = storedUser.registrationDate || 'N/A';
    } else {
        // Redirect to login page if user data is missing
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

function goHome() {
    window.location.href = 'index.html'; 
}