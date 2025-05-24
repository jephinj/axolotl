document.addEventListener('DOMContentLoaded', function() {
    const otpForm = document.getElementById('otp-form');
    const otpCodeInput = document.getElementById('otp-code');
    const otpError = document.getElementById('otp-error');

    otpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const enteredOtp = otpCodeInput.value.trim();
        const storedOtp = localStorage.getItem('otp_code');
        const storedEmail = localStorage.getItem('otp_email');
        const storedPassword = localStorage.getItem('temp_password');

        if (enteredOtp === storedOtp) {
            // Get the existing users
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            // Add the new user
            existingUsers.push({ email: storedEmail, password: storedPassword });

            // Save the updated user list
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

            // Clear temporary storage
            localStorage.removeItem('otp_code');
            localStorage.removeItem('otp_email');
            localStorage.removeItem('temp_password');

            // Redirect to success page
            window.location.href = 'home.html';
        } else {
            otpError.textContent = 'Invalid OTP. Please try again.';
        }
    });
});
