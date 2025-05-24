document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const usernameInput = document.getElementById('signup-username');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    // Initialize EmailJS
    emailjs.init("1PXkMh838LPcRom5h");

    // Check for existing users in local storage
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    usernameInput.addEventListener('blur', function() {
        const username = usernameInput.value.trim();
        if (username.length < 4) {
            usernameError.textContent = 'Username must be at least 4 characters';
        } else {
            usernameError.textContent = '';
        }
    });

    emailInput.addEventListener('blur', function() {
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            emailError.textContent = 'Invalid email format';
        } else if (existingUsers.some(user => user.email === email)) {
            emailError.textContent = 'Email is already registered. Please log in.';
            setTimeout(() => {
                window.location.href = 'sign_in.html';
            }, 2000);
        } else {
            emailError.textContent = '';
        }
    });

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!validatePassword(password)) {
            passwordError.textContent = 'Password must be at least 8 characters long and contain at least one capital letter, one small letter, one number, and one symbol.';
        } else if (password !== confirmPassword) {
            passwordError.textContent = 'Passwords do not match';
        } else {
            passwordError.textContent = '';

            // Generate OTP
            const otp_code = Math.floor(1000 + Math.random() * 9000);

            // EmailJS template parameters
            const templateParams = {
                to_email: emailInput.value.trim(),
                otp_code: otp_code
            };

            // Send OTP email
            emailjs.send('service_tgk5q4r', 'template_767fxow', templateParams)
                .then(response => {
                    console.log('Email send response:', response);

                    // Store OTP and email in localStorage
                    localStorage.setItem('otp_code', otp_code);
                    localStorage.setItem('otp_email', emailInput.value.trim());
                    localStorage.setItem('temp_password', password);

                    // Alert and redirect to OTP verification page
                    alert("Axolotl Entertainment says: OTP sent to your email: " + emailInput.value.trim());
                    window.location.href = 'verification.html';
                })
                .catch(error => {
                    console.error('Email send error:', error);
                    alert("Axolotl Entertainment says: An error occurred: " + error.text);
                });
        }
    });

    function validateEmail(email) {
        // Simple email validation using regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validatePassword(password) {
        // Password validation using regex
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    }
});

