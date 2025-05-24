// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeButton = document.querySelector('.close-button');
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const artistOrDirector = item.getAttribute('data-artist') || item.getAttribute('data-director');
            const description = item.getAttribute('data-description');

            modalTitle.innerText = title;
            modalDescription.innerText = `${artistOrDirector}: ${description}`;
            modal.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = emailInput.value;

        if (validateEmail(email)) {
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
