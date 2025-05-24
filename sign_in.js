document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form');
    const emailInput = document.getElementById('signin-email');
    const passwordInput = document.getElementById('signin-password');
    const rememberMeCheckbox = document.getElementById('remember-me');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const forgotPasswordLink = document.getElementById('forgot-password-link');

    const notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);

    signinForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!termsCheckbox.checked) {
            showNotification('You must agree to the Terms of Service.', 'error');
            return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = registeredUsers.find(user => user.email === email && user.password === password);

        if (user) {
            if (rememberMeCheckbox && rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            showNotification('Sign-in successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        } else {
            showNotification('Invalid email or password. Please try again.', 'error');
        }
    });

    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        // Handle forgot password logic here
    });

    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = 'notification ' + type;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
});


