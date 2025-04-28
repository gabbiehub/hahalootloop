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

    // Get login form for Enter key handling
    const loginForm = document.getElementById('loginForm');

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

    // Login Modal: Open
    loginButton.addEventListener('click', function () {
        showModal(loginModal);
    });

    // Login Modal: Close
    closeLoginModal.addEventListener('click', function () {
        hideModal(loginModal);
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
        }
    });

    // Auto-focus for Enter Code Modal honeycomb inputs
    const codeInputs = [
        document.querySelector('.enter-code-modal .honeycomb input'),
        document.querySelector('.enter-code-modal .honeycomb-3 input'), // Fixed typo
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

    // Handle Enter key for login form to redirect to homepage
    loginForm.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.location.href = '/homepage/';
        }
    });
});