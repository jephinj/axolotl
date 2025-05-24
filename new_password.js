document.addEventListener('DOMContentLoaded', function() {
    const newPasswordForm = document.getElementById('new-password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const criteria = {
        length: document.getElementById('length'),
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        number: document.getElementById('number'),
        special: document.getElementById('special')
    };

    function validatePassword(password) {
        const lengthValid = password.length >= 8;
        const uppercaseValid = /[A-Z]/.test(password);
        const lowercaseValid = /[a-z]/.test(password);
        const numberValid = /\d/.test(password);
        const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        criteria.length.classList.toggle('invalid', !lengthValid);
        criteria.length.classList.toggle('valid', lengthValid);

        criteria.uppercase.classList.toggle('invalid', !uppercaseValid);
        criteria.uppercase.classList.toggle('valid', uppercaseValid);

        criteria.lowercase.classList.toggle('invalid', !lowercaseValid);
        criteria.lowercase.classList.toggle('valid', lowercaseValid);

        criteria.number.classList.toggle('invalid', !numberValid);
        criteria.number.classList.toggle('valid', numberValid);

        criteria.special.classList.toggle('invalid', !specialValid);
        criteria.special.classList.toggle('valid', specialValid);

        return lengthValid && uppercaseValid && lowercaseValid && numberValid && specialValid;
    }

    newPasswordInput.addEventListener('input', function() {
        validatePassword(newPasswordInput.value);
    });

    newPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!validatePassword(newPassword)) {
            alert('Password does not meet the criteria. Please try again.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Save the new password in local storage
        localStorage.setItem('userPassword', newPassword);
        alert('Password has been reset successfully.');

        // Redirect to login page or any other appropriate action
        window.location.href = 'sign_in.html'; // Adjust this as needed
    });
});
