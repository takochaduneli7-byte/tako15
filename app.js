const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const paginationDots = document.querySelectorAll('.pagination-btns button');
const sliderWrapper = document.querySelector('.slider-wrapper'); 

let currentIndex = 0;
const totalSlides = slides.length;

function updateSlider(index) {
    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    paginationDots.forEach((dot) => {
        dot.classList.remove('active');
    });
    slides[currentIndex].classList.add('active');
    if (paginationDots[currentIndex]) {
        paginationDots[currentIndex].classList.add('active');
    }
}

nextBtn.addEventListener('click', () => {
    updateSlider(currentIndex + 1);
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    updateSlider(currentIndex - 1);
    resetAutoSlide();
});

paginationDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.getAttribute('data-slide-number'), 10) - 1;
        updateSlider(slideIndex);
        resetAutoSlide();
    });
});

updateSlider(0);

let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        updateSlider(currentIndex + 1);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

sliderWrapper.addEventListener('mouseenter', () => {
    stopAutoSlide();
});

sliderWrapper.addEventListener('mouseleave', () => {
    startAutoSlide();
});

startAutoSlide();

function startLiveClock() {
    const hoursEl = document.getElementById('h');
    const minutesEl = document.getElementById('m');
    const secondsEl = document.getElementById('s');
    const ampmEl = document.getElementById('ap');

    if (!hoursEl || !minutesEl || !secondsEl || !ampmEl) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    ampmEl.textContent = ampm;
}

setInterval(startLiveClock, 1000);
startLiveClock();

function updateCountdown() {
    // ლექციის ზუსტი დრო
    const targetDate = new Date("August 14, 2026 20:00:00").getTime();
    const now = new Date().getTime();
    
    const timeDifference = targetDate - now;

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    
    if (timeDifference <= 0) {
        const countdownBox = document.getElementById('countdown');
        if (countdownBox) countdownBox.innerHTML = "ლექცია დაწყებულია!";
        return;
    }

    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown();