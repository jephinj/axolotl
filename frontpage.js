document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeButton = document.querySelector('.close-button');
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    const modalVideo = document.getElementById('modal-video');
    const modalVideoSource = document.getElementById('modal-video-source');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const artistOrDirector = item.getAttribute('data-artist') || item.getAttribute('data-director');
            const description = item.getAttribute('data-description');

            modalTitle.textContent = title;
            modalDescription.textContent = `${artistOrDirector}: ${description}`;
            modal.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        modalVideo.pause();
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalVideo.pause();
        }
    });

    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = emailInput.value;
        if (validateEmail(email)) {
            alert(`Thank you for subscribing with ${email}`);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Add event listeners for play buttons
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const videoSrc = button.getAttribute('data-video');
            modalVideoSource.src = videoSrc;
            modalVideo.load();
            modalVideo.play();
            modal.style.display = 'block';
            event.stopPropagation();
        });
    });
});
