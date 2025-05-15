document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded at:', new Date().toISOString());

    // Get elements
    const emailForm = document.querySelector('#emailForm');
    const usernameModal = document.querySelector('#usernameModal');
    const usernameForm = document.querySelector('#usernameForm');
    const passwordModal = document.querySelector('#passwordModal');
    const passwordForm = document.querySelector('#passwordForm');
    const modalOverlay = document.querySelector('#modalOverlay');
    const usernameGoBack = usernameModal?.querySelector('.overlap-group-wrapper');
    const passwordGoBack = passwordModal?.querySelector('.overlap-group-wrapper');
    const usernameInput = usernameForm?.querySelector('input[name="username"]');
    const passwordInput = passwordForm?.querySelector('input[name="password"]');
    const emailSubmitButton = emailForm?.querySelector('.arrow-wrapper button');

    // Debug: Log element existence
    console.log('emailForm:', emailForm);
    console.log('usernameModal:', usernameModal);
    console.log('usernameForm:', usernameForm);
    console.log('passwordModal:', passwordModal);
    console.log('emailSubmitButton:', emailSubmitButton);

    // Initialize modal states
    if (usernameModal) usernameModal.style.display = 'none';
    if (passwordModal) passwordModal.style.display = 'none';
    if (modalOverlay) modalOverlay.style.display = 'none';

    // Show username modal on email form submission
    if (emailForm) {
        emailForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Email form submit event triggered');
            const emailInput = emailForm.querySelector('input[name="email"]');
            if (!emailInput) {
                console.error('Email input not found');
                alert('Email input not found.');
                return;
            }
            const email = emailInput.value.trim();
            if (email === '') {
                console.warn('Empty email input');
                alert('Please enter an email address.');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                console.warn('Invalid email format');
                alert('Please enter a valid email address.');
                return;
            }
            if (usernameModal) {
                console.log('Showing username modal');
                usernameModal.style.display = 'block';
                usernameModal.setAttribute('aria-hidden', 'false');
                emailForm.style.display = 'none';
                if (usernameInput) usernameInput.focus();
                console.log('Username modal displayed');
            } else {
                console.error('Username modal not found');
                alert('Error: Username modal not found.');
            }
        });

        // Fallback: Handle button click explicitly
        if (emailSubmitButton) {
            emailSubmitButton.addEventListener('click', function (event) {
                console.log('Email submit button(clicked');
                emailForm.dispatchEvent(new Event('submit', { cancelable: true }));
            });
        }
    } else {
        console.error('Email form not found');
    }

    // Revert to email form on username modal "Go back"
    if (usernameGoBack) {
        usernameGoBack.addEventListener('click', function () {
            if (usernameModal) {
                usernameModal.style.display = 'none';
                usernameModal.setAttribute('aria-hidden', 'true');
            }
            if (emailForm) {
                emailForm.style.display = 'block';
                const emailInput = emailForm.querySelector('input[name="email"]');
                if (emailInput) emailInput.focus();
            }
            console.log('Reverted to email form from username modal');
        });
    }

    // Handle username form submission (direct to password modal)
    if (usernameForm) {
        usernameForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Username form submitted');
            if (!usernameInput) {
                console.error('Username input not found');
                alert('Username input not found.');
                return;
            }
            const username = usernameInput.value.trim();
            if (username === '') {
                console.warn('Empty username input');
                alert('Please enter a username.');
                return;
            }
            if (usernameModal) {
                console.log('Hiding username modal');
                usernameModal.style.display = 'none';
                usernameModal.setAttribute('aria-hidden', 'true');
            }
            if (passwordModal) {
                console.log('Showing password modal');
                passwordModal.style.display = 'block';
                passwordModal.setAttribute('aria-hidden', 'false');
                if (passwordInput) passwordInput.focus();
                console.log('Password modal displayed');
            } else {
                console.error('Password modal not found');
                alert('Error: Password modal not found.');
            }
        });
    }

    // Revert to username modal on password modal "Go back"
    if (passwordGoBack) {
        passwordGoBack.addEventListener('click', function () {
            if (passwordModal) {
                passwordModal.style.display = 'none';
                passwordModal.setAttribute('aria-hidden', 'true');
            }
            if (usernameModal) {
                usernameModal.style.display = 'block';
                usernameModal.setAttribute('aria-hidden', 'false');
                if (usernameInput) usernameInput.focus();
            }
            console.log('Reverted to username modal from password modal');
        });
    }

    // Handle password form submission
    if (passwordForm) {
        passwordForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Password form submitted');
            if (!passwordInput) {
                console.error('Password input not found');
                alert('Password input not found.');
                return;
            }
            const password = passwordInput.value.trim();
            const confirmPassword = passwordForm.querySelector('input[name="confirm_password"]').value.trim();
            if (password === '' || confirmPassword === '') {
                console.warn('Empty password inputs');
                alert('Please enter and confirm your password.');
                return;
            }
            if (password !== confirmPassword) {
                console.warn('Passwords do not match');
                alert('Passwords do not match.');
                return;
            }
            const formData = new FormData(passwordForm);
            fetch(passwordForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
                },
            })
            .then(response => {
                console.log('Password submission response:', response);
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    console.log('Password submitted, redirecting to:', data.redirect);
                    window.location.href = data.redirect || '/homepage/';
                } else {
                    console.warn('Password submission failed:', data.error);
                    alert(data.error || 'Failed to set password.');
                }
            })
            .catch(error => {
                console.error('Password submission error:', error);
                alert('An error occurred while submitting the password.');
            });
        });
    }
});