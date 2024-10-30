function goHome() {
    window.location.href = 'StudyTime.html'; 
}

document.addEventListener("DOMContentLoaded", () => {
    loadSavedRatings();
    loadFilterSettings();
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
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.querySelectorAll('.course-card').forEach(card => card.classList.toggle('night', savedTheme === 'dark'));
        document.querySelectorAll('.course-title').forEach(title => title.classList.toggle('night', savedTheme === 'dark'));

        document.body.classList.toggle('night', savedTheme === 'dark');
        document.querySelector('.navbar').classList.toggle('night', savedTheme === 'dark');
        document.querySelector('footer').classList.toggle('night', savedTheme === 'dark');
        
        document.getElementById('theme-toggle').textContent = savedTheme === 'dark' ? "Day Mode" : "Night Mode";
    }
});

function toggleTheme() {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const themeButton = document.getElementById('theme-toggle');
    const courseCards = document.querySelectorAll('.course-card');
    const courseTitles = document.querySelectorAll('.course-title');
    const footer = document.querySelector('footer');

    body.classList.toggle('night');
    navbar.classList.toggle('night');
    footer.classList.toggle('night');

    courseCards.forEach(card => card.classList.toggle('night'));
    courseTitles.forEach(title => title.classList.toggle('night'));

    if (body.classList.contains('night')) {
        themeButton.textContent = "Day Mode";
        localStorage.setItem("theme", "dark"); 
    } else {
        themeButton.textContent = "Night Mode";
        localStorage.setItem("theme", "light");
    }
}

//Filtering
function toggleFilterOptions() {
    const filterOptions = document.getElementById("filter-options");
    filterOptions.style.display = filterOptions.style.display === "none" ? "block" : "none";

    localStorage.setItem("filterVisibility", filterOptions.style.display);
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

function loadFilterSettings() {
    const filterOptions = document.getElementById("filter-options");
    const savedVisibility = localStorage.getItem("filterVisibility");
    filterOptions.style.display = savedVisibility === "block" ? "block" : "none";
}

function loadSortSettings() {
    const savedSortOption = localStorage.getItem("selectedSortOption");
    if (savedSortOption) {
        document.querySelector(`input[name='sort'][value='${savedSortOption}']`).checked = true;
        sortCourses();
    }
}