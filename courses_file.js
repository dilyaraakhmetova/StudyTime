function goHome() {
    window.location.href = 'index.html'; 
}

document.addEventListener("DOMContentLoaded", () => {
    loadSavedRatings();
    loadSortSettings();
});

function setRating(rating, id) {
    const stars = document.querySelectorAll(`#${id} .star`);
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('selected'); 
        } else {
            star.classList.remove('selected');
        }
    });
    document.getElementById(`${id}-message`).textContent = `Your rating: ${rating}`;
    
    localStorage.setItem(id, rating);
}

function loadSavedRatings() {
    document.querySelectorAll('.course-card').forEach(card => {
        const ratingId = card.querySelector('.rating').id; 
        const savedRating = localStorage.getItem(ratingId); 
        if (savedRating) {
            setRating(parseInt(savedRating), ratingId); 
        }
    });
}

//Theme
function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('footer');
    const courseCards = document.querySelectorAll('.course-card');
    const courseTitlesProgramming = document.querySelectorAll('.course-title-programming');
    const courseTitlesWebdev = document.querySelectorAll('.course-title-webdev');
    const courseTitlesDesign = document.querySelectorAll('.course-title-design');
    const courseDes = document.querySelectorAll('.course-description');
    const homeButton = document.getElementById('home-button');
    const filterButton = document.getElementById('filter-button');

    if (savedTheme === 'night') {
        body.classList.add('night');
        navbar.classList.add('night');
        footer.classList.add('night');
        courseCards.forEach(card => card.classList.add('night'));
        courseTitlesProgramming.forEach(title => title.classList.add('night'));
        courseTitlesWebdev.forEach(title => title.classList.add('night'));
        courseTitlesDesign.forEach(title => title.classList.add('night'));
        courseDes.forEach(des => des.classList.add('night'));
        homeButton.classList.add('night');
        filterButton.classList.add('night');
    } else {
        body.classList.remove('night');
        navbar.classList.remove('night');
        footer.classList.remove('night');
        courseCards.forEach(card => card.classList.remove('night'));
        courseTitlesProgramming.forEach(title => title.classList.remove('night'));
        courseTitlesWebdev.forEach(title => title.classList.remove('night'));
        courseTitlesDesign.forEach(title => title.classList.remove('night'));
        courseDes.forEach(des => des.classList.remove('night'));
        homeButton.classList.remove('night');
        filterButton.classList.remove('night');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();
});


 

//Filtering
function toggleFilterOptions() {
    const filterOptions = document.getElementById("filter-options");
    filterOptions.style.display = filterOptions.style.display === "none" ? "block" : "none";
}

function sortCourses() {
    const filterOptions = document.getElementById("filter-options");
    const courseContainer = document.querySelector(".course-container");
    const courses = Array.from(courseContainer.children);
    const selectedSort = document.querySelector("input[name='sort']:checked")?.value;

    if (selectedSort) {
        localStorage.setItem("selectedSortOption", selectedSort);
    }

    courses.sort((a, b) => {
        let aValue, bValue;

        switch (selectedSort) {
            case "rating-asc":
                aValue = parseInt(localStorage.getItem(a.querySelector(".rating").id)) || 0;
                bValue = parseInt(localStorage.getItem(b.querySelector(".rating").id)) || 0;
                return aValue - bValue;
            case "rating-desc":
                aValue = parseInt(localStorage.getItem(a.querySelector(".rating").id)) || 0;
                bValue = parseInt(localStorage.getItem(b.querySelector(".rating").id)) || 0;
                return bValue - aValue;
            case "duration-asc":
                aValue = getDurationValue(a.querySelector(".course-duration").textContent);
                bValue = getDurationValue(b.querySelector(".course-duration").textContent);
                return aValue - bValue;
            case "duration-desc":
                aValue = getDurationValue(a.querySelector(".course-duration").textContent);
                bValue = getDurationValue(b.querySelector(".course-duration").textContent);
                return bValue - aValue;
            case "title":
                aValue = a.querySelector(".course-title").textContent;
                bValue = b.querySelector(".course-title").textContent;
                return aValue.localeCompare(bValue);
            default:
                return 0;
        }
    });

    courses.forEach(course => courseContainer.appendChild(course));
    filterOptions.style.display = "none";  
}

// Function to convert duration text to a numeric value
function getDurationValue(durationText) {
    const match = durationText.match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
}

function loadSortSettings() {
    const savedSortOption = localStorage.getItem("selectedSortOption");
    if (savedSortOption) {
        document.querySelector(`input[name='sort'][value='${savedSortOption}']`).checked = true;
        sortCourses();
    }
}