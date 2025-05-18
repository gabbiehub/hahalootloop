document.addEventListener('DOMContentLoaded', function () {
    // Get all modal elements
    const loginButton = document.getElementById('loginButton');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const modalOverlay = document.getElementById('modalOverlay');

    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeForgotModal = document.getElementById('closeForgotModal');
    const returnToLogin = document.getElementById('returnToLogin');
    const sendCodeButton = document.getElementById('sendCodeButton');

    const enterCodeModal = document.getElementById('enterCodeModal');
    const closeEnterCodeModal = document.getElementById('closeEnterCodeModal');
    const returnToLoginFromCode = document.getElementById('returnToLoginFromCode');
    const resetPasswordButton = document.getElementById('resetPasswordButton');

    const resetPasswordModal = document.getElementById('resetPasswordModal');
    const closeResetModal = document.getElementById('closeResetModal');
    const returnToLoginFromReset = document.getElementById('returnToLoginFromReset');

    // Get login form and submit button
    const loginForm = document.getElementById('loginForm');
    const loginSubmitButton = document.querySelector('.sign-up[aria-label="Submit login"]');
    const emailLoginInput = loginForm?.querySelector('input[name="email"]');
    const passwordLoginInput = loginForm?.querySelector('input[name="password"]');

    // Debug: Log login element existence
    console.log('loginForm:', loginForm);
    console.log('loginSubmitButton:', loginSubmitButton);
    console.log('emailLoginInput:', emailLoginInput);
    console.log('passwordLoginInput:', passwordLoginInput);

    // Function to show a modal and overlay
    function showModal(modal) {
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
    }

    // Function to hide a modal and overlay
    function hideModal(modal) {
        modal.style.display = 'none';
        if (
            (!loginModal.style.display || loginModal.style.display === 'none') &&
            (!forgotPasswordModal.style.display || forgotPasswordModal.style.display === 'none') &&
            (!enterCodeModal.style.display || enterCodeModal.style.display === 'none') &&
            (!resetPasswordModal.style.display || resetPasswordModal.style.display === 'none')
        ) {
            modalOverlay.style.display = 'none';
        }
    }

    // Function to hide all modals
    function hideAllModals() {
        hideModal(loginModal);
        hideModal(forgotPasswordModal);
        hideModal(enterCodeModal);
        hideModal(resetPasswordModal);
    }

    // Create or get error message element
    let errorMessage = loginModal.querySelector('.error');
    if (!errorMessage) {
        errorMessage = document.createElement('p');
        errorMessage.className = 'error';
        errorMessage.style.color = 'red';
        errorMessage.style.display = 'none';
        loginForm.prepend(errorMessage);
    }

    // Login Modal: Open
    loginButton.addEventListener('click', function () {
        showModal(loginModal);
        errorMessage.style.display = 'none'; // Clear previous errors
        emailLoginInput?.focus();
    });

    // Login Modal: Close
    closeLoginModal.addEventListener('click', function () {
        hideModal(loginModal);
        errorMessage.style.display = 'none';
    });

    // Forgot Password: Open from Login Modal
    forgotPasswordLink.addEventListener('click', function () {
        hideModal(loginModal);
        showModal(forgotPasswordModal);
    });

    // Forgot Password Modal: Close
    closeForgotModal.addEventListener('click', function () {
        hideModal(forgotPasswordModal);
    });

    // Forgot Password Modal: Return to Login
    returnToLogin.addEventListener('click', function () {
        hideModal(forgotPasswordModal);
        showModal(loginModal);
    });

    // Forgot Password Modal: Proceed to Enter Code (after clicking "Send code")
    sendCodeButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent form submission
        hideModal(forgotPasswordModal);
        showModal(enterCodeModal);
    });

    // Enter Code Modal: Close
    closeEnterCodeModal.addEventListener('click', function () {
        hideModal(enterCodeModal);
    });

    // Enter Code Modal: Return to Login
    returnToLoginFromCode.addEventListener('click', function () {
        hideModal(enterCodeModal);
        showModal(loginModal);
    });

    // Enter Code Modal: Proceed to Reset Password
    resetPasswordButton.addEventListener('click', function () {
        hideModal(enterCodeModal);
        showModal(resetPasswordModal);
    });

    // Reset Password Modal: Close
    closeResetModal.addEventListener('click', function () {
        hideModal(resetPasswordModal);
    });

    // Reset Password Modal: Return to Login
    returnToLoginFromReset.addEventListener('click', function () {
        hideModal(resetPasswordModal);
        showModal(loginModal);
    });

    // Overlay: Clicking the overlay closes any open modal
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            hideAllModals();
            errorMessage.style.display = 'none';
        }
    });

    // Auto-focus for Enter Code Modal honeycomb inputs
    const codeInputs = [
        document.querySelector('.enter-code-modal .honeycomb input'),
        document.querySelector('.enter-code-modal .honeycomb-3 input'),
        document.querySelector('.enter-code-modal .img input'),
        document.querySelector('.enter-code-modal .honeycomb-2 input')
    ];

    codeInputs.forEach((input, index) => {
        if (input) {
            input.addEventListener('input', function () {
                // If a character is entered and it's not the last input
                if (this.value.length === 1 && index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            });

            // Handle backspace to move to previous input
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                    codeInputs[index - 1].focus();
                }
            });
        }
    });

    // Handle login form submission (for both button click and Enter key)
    if (loginForm && loginSubmitButton) {
    const handleLoginSubmit = function (e) {
        e.preventDefault();
        console.log('Login form submitted');

        // Verify input elements
        const emailLoginInput = loginForm?.querySelector('input[name="email"]');
        const passwordLoginInput = loginForm?.querySelector('input[name="password"]');
        console.log('emailLoginInput:', emailLoginInput);
        console.log('passwordLoginInput:', passwordLoginInput);

        // Get input values
        const email = emailLoginInput?.value.trim();
        const password = passwordLoginInput?.value.trim();
        const csrfToken = loginForm.querySelector('input[name="csrfmiddlewaretoken"]')?.value;

        // Debug input values
        console.log('Email value:', email);
        console.log('Password value:', password);
        console.log('CSRF Token:', csrfToken);

        // Client-side validation
        if (!email) {
            console.warn('Empty email input');
            errorMessage.textContent = 'Please enter an email address.';
            errorMessage.style.display = 'block';
            emailLoginInput?.focus();
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            console.warn('Invalid email format');
            errorMessage.textContent = 'Please enter a valid email address.';
            errorMessage.style.display = 'block';
            emailLoginInput?.focus();
            return;
        }
        if (!password) {
            console.warn('Empty password input');
            errorMessage.textContent = 'Please enter a password.';
            errorMessage.style.display = 'block';
            passwordLoginInput?.focus();
            return;
        }

        // Prepare data for AJAX request
        const data = { email, password };
        console.log('Submitting login data (before stringify):', data);
        const jsonData = JSON.stringify(data);
        console.log('Submitting login data (after stringify):', jsonData);

        loginSubmitButton.disabled = true;
        loginSubmitButton.innerHTML = 'Signing in...';

        fetch(loginForm.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: jsonData
        })
        .then(response => {
            console.log('Login response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Login response data:', data);
            if (data.success) {
                console.log('Login successful, redirecting to:', data.redirect);
                errorMessage.style.display = 'none';
                hideModal(loginModal);
                window.location.href = data.redirect || '/homepage/';
            } else {
                console.warn('Login failed:', data.error);
                errorMessage.textContent = data.error || 'Failed to log in.';
                errorMessage.style.display = 'block';
                emailLoginInput?.focus();
            }
        })
        .catch(error => {
            console.error('Login fetch error:', error);
            errorMessage.textContent = `An error occurred: ${error.message}`;
            errorMessage.style.display = 'block';
            emailLoginInput?.focus();
        })
        .finally(() => {
            loginSubmitButton.disabled = false;
            loginSubmitButton.innerHTML = '<div class="overlap-group"><div class="text-wrapper-9">Sign in</div></div>';
        });
    };

    // Attach to button click
    loginSubmitButton.addEventListener('click', handleLoginSubmit);

    // Attach to Enter key on form
    loginForm.addEventListener('submit', handleLoginSubmit);
    } else {
        console.warn('Login form or submit button missing. Login functionality may not work.');
    }
});