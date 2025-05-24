document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init('1PXkMh838LPcRom5h'); // Replace 'YOUR_USER_ID' with your actual user ID from EmailJS

    console.log('EmailJS initialized.');

    const recoveryForm = document.getElementById('recovery-form');
    const otpSection = document.getElementById('otp-section');
    const recoveryEmailInput = document.getElementById('recovery-email');
    const otpInput = document.getElementById('otp');
    const verifyOtpButton = document.getElementById('verify-otp');

    let generatedOtp = '';

    // Initially set OTP input field as not required
    otpInput.required = false;

    function generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    function sendOtp(email, otp) {
        const templateParams = {
            to_email: email,
            otp: otp
        };

        emailjs.send('service_r58i58f', 'template_r7cyutf', templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response.status, response.text);
                alert('Email sent successfully!');
            }, function(error) {
                console.error('Failed to send email...', error);
                alert('Failed to send email. Please check the console for more details.');
            });
    }

    function showOtpSection() {
        otpSection.style.display = 'block';
        otpInput.required = true; // Set OTP input field as required when displayed
    }

    recoveryForm.addEventListener('submit', function(event) {
        event.preventDefault();

        console.log('Form submitted.');

        const email = recoveryEmailInput.value;
        generatedOtp = generateOtp();

        console.log('Generated OTP:', generatedOtp);
        console.log('Sending OTP to:', email);

        sendOtp(email, generatedOtp);
        showOtpSection();
    });

    verifyOtpButton.addEventListener('click', function() {
        const enteredOtp = otpInput.value;

        console.log('Entered OTP:', enteredOtp);
        console.log('Generated OTP:', generatedOtp);

        if (enteredOtp === generatedOtp) {
            alert('OTP verified successfully. You can now reset your password.');
            window.location.href = 'new_password.html';  // Redirect to the new password creation page
        } else {
            alert('Incorrect OTP. Please try again.');
        }
    });
});
