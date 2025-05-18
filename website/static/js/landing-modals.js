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
        errorMessage.style.textAlign = 'center';
        errorMessage.style.position = 'absolute';
        errorMessage.style.top = '7.5vw';
        errorMessage.style.left = '50%';
        errorMessage.style.transform = 'translateX(-50%)';
        errorMessage.style.width = '90%';
        errorMessage.style.zIndex = '20';
        errorMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
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
                if (this.value.length === 1 && index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                    codeInputs[index - 1].focus();
                }
            });
        }
    });

    // Handle login form submission
    if (loginForm && loginSubmitButton) {
        const handleLoginSubmit = function (e) {
            e.preventDefault(); // Explicitly prevent default form submission
            console.log('Login form submitted');

            const emailLoginInput = loginForm.querySelector('input[name="email"]');
            const passwordLoginInput = loginForm.querySelector('input[name="password"]');
            let errorMessage = loginModal.querySelector('.error');
            if (!errorMessage) {
                errorMessage = createErrorElement();
            }

            const email = emailLoginInput.value.trim();
            const password = passwordLoginInput.value.trim();
            const csrfToken = loginForm.querySelector('input[name="csrfmiddlewaretoken"]').value;

            console.log('Email:', email);
            console.log('Password:', password);
            console.log('CSRF Token:', csrfToken);

            errorMessage.style.display = 'none';

            if (!email || !password) {
                errorMessage.textContent = 'Email and password are required.';
                errorMessage.style.display = 'block';
                emailLoginInput.focus();
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                errorMessage.textContent = 'Please enter a valid email address.';
                errorMessage.style.display = 'block';
                emailLoginInput.focus();
                return;
            }

            loginSubmitButton.disabled = true;
            loginSubmitButton.innerHTML = 'Signing in...';

            const formData = new FormData(loginForm); // Use FormData to match Django's request.POST

            fetch(loginForm.action, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken
                },
                body: formData
            })
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Request failed');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
                if (data.success) {
                    window.location.href = data.redirect || '/homepage/';
                } else {
                    errorMessage.textContent = data.error || 'Invalid email or password.';
                    errorMessage.style.display = 'block';
                    loginModal.style.display = 'block'; // Ensure modal stays open
                    modalOverlay.style.display = 'block'; // Ensure overlay stays visible
                    emailLoginInput.focus();
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                errorMessage.textContent = error.message || 'An error occurred.';
                errorMessage.style.display = 'block';
                loginModal.style.display = 'block'; // Ensure modal stays open
                modalOverlay.style.display = 'block'; // Ensure overlay stays visible
                emailLoginInput.focus();
            })
            .finally(() => {
                loginSubmitButton.disabled = false;
                loginSubmitButton.innerHTML = '<div class="overlap-group"><div class="text-wrapper-9">Sign in</div></div>';
            });
        };

        function createErrorElement() {
            const el = document.createElement('p');
            el.className = 'error';
            el.style.color = 'red';
            el.style.display = 'none';
            el.style.textAlign = 'center';
            el.style.position = 'absolute';
            el.style.top = '7.5vw';
            el.style.left = '50%';
            el.style.transform = 'translateX(-50%)';
            el.style.width = '90%';
            el.style.zIndex = '20';
            el.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            loginForm.prepend(el);
            return el;
        }

        // Attach event listeners
        loginSubmitButton.addEventListener('click', handleLoginSubmit);
        loginForm.addEventListener('submit', handleLoginSubmit); // Ensure form submit event is handled

        // Prevent Enter key from submitting the form directly
        loginForm.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleLoginSubmit(e);
            }
        });
    } else {
        console.warn('Login form or submit button missing.');
    }
});