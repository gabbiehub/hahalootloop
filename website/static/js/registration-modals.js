document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded at:', new Date().toISOString());

    // Get elements
    const registrationForm = document.querySelector('#registrationForm');
    const emailModal = document.querySelector('#emailModal');
    const usernameModal = document.querySelector('#usernameModal');
    const passwordModal = document.querySelector('#passwordModal');
    const emailInput = registrationForm?.querySelector('input[name="email"]');
    const usernameInput = registrationForm?.querySelector('input[name="username"]');
    const passwordInput = registrationForm?.querySelector('input[name="password"]');
    const confirmPasswordInput = registrationForm?.querySelector('input[name="confirm_password"]');
    const nextButtons = registrationForm?.querySelectorAll('button[data-next-modal]');
    const backButtons = registrationForm?.querySelectorAll('img[data-prev-modal]');

    // Debug: Log element existence
    console.log('registrationForm:', registrationForm);
    console.log('emailModal:', emailModal);
    console.log('usernameModal:', usernameModal);
    console.log('passwordModal:', passwordModal);
    console.log('emailInput:', emailInput);
    console.log('usernameInput:', usernameInput);
    console.log('passwordInput:', passwordInput);
    console.log('confirmPasswordInput:', confirmPasswordInput);
    console.log('nextButtons:', nextButtons.length, nextButtons);
    console.log('backButtons:', backButtons.length, backButtons);

    // Check for missing elements
    if (!registrationForm || !emailModal || !usernameModal || !passwordModal) {
        console.error('Critical elements missing. Check HTML IDs: registrationForm, emailModal, usernameModal, passwordModal');
        alert('Error: Registration form or modals not found. Please check the page structure.');
        return;
    }
    if (!nextButtons.length) {
        console.warn('No next buttons found. Check buttons with data-next-modal.');
    }
    if (!backButtons.length) {
        console.warn('No back buttons found. Check images with data-prev-modal.');
    }

    // Modal sequence
    const modalSequence = ['emailModal', 'usernameModal', 'passwordModal'];

    // Function to show a specific modal and hide others
    function showModal(modalId) {
        console.log('Showing modal:', modalId);
        const modals = [emailModal, usernameModal, passwordModal];
        modals.forEach(modal => {
            modal.style.display = modal.id === modalId ? 'block' : 'none';
            console.log(`${modal.id}: display=${modal.style.display}`);
        });

        // Focus on input
        if (modalId === 'emailModal' && emailInput) emailInput.focus();
        if (modalId === 'usernameModal' && usernameInput) usernameInput.focus();
        if (modalId === 'passwordModal' && passwordInput) passwordInput.focus();
    }

    // Initialize: Show email modal
    showModal('emailModal');

    // Handle next button clicks
    nextButtons.forEach(button => {
        button.addEventListener('click', function () {
            const nextModalId = button.getAttribute('data-next-modal');
            const currentModalId = modalSequence.find(id => {
                const modal = document.querySelector(`#${id}`);
                return modal.style.display === 'block';
            });

            console.log('Next button clicked. Current:', currentModalId, 'Next:', nextModalId);

            // Validate input before moving
            if (currentModalId === 'emailModal') {
                const email = emailInput?.value.trim();
                if (!email) {
                    console.warn('Empty email input');
                    alert('Please enter an email address.');
                    return;
                }
                if (!/\S+@\S+\.\S+/.test(email)) {
                    console.warn('Invalid email format');
                    alert('Please enter a valid email address.');
                    return;
                }
            } else if (currentModalId === 'usernameModal') {
                const username = usernameInput?.value.trim();
                if (!username) {
                    console.warn('Empty username input');
                    alert('Please enter a username.');
                    return;
                }
            }

            // Transition to next modal
            if (nextModalId && modalSequence.includes(nextModalId)) {
                showModal(nextModalId);
            } else {
                console.error('Invalid next modal ID:', nextModalId);
                alert('Error: Cannot navigate to next step.');
            }
        });
    });

    // Handle back button clicks
    backButtons.forEach(button => {
        button.addEventListener('click', function () {
            const prevModalId = button.getAttribute('data-prev-modal');
            console.log('Back button clicked. Previous:', prevModalId);
            if (prevModalId && modalSequence.includes(prevModalId)) {
                showModal(prevModalId);
            } else {
                console.error('Invalid previous modal ID:', prevModalId);
                alert('Error: Cannot navigate back.');
            }
        });
    });

    // Handle form submission
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Form submitted');

        const email = emailInput?.value.trim();
        const username = usernameInput?.value.trim();
        const password = passwordInput?.value.trim();
        const confirmPassword = confirmPasswordInput?.value.trim();

        // Client-side validation (inspired by Riot's strict checks)
        if (!email) {
            alert('Please enter an email address.');
            showModal('emailModal');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address.');
            showModal('emailModal');
            return;
        }
        if (!username) {
            alert('Please enter a username.');
            showModal('usernameModal');
            return;
        }
        if (!password || !confirmPassword) {
            alert('Please enter and confirm your password.');
            showModal('passwordModal');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            showModal('passwordModal');
            return;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters.');
            showModal('passwordModal');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            alert('Password must include at least one uppercase letter.');
            showModal('passwordModal');
            return;
        }
        if (!/[0-9]/.test(password) || !/[!@#$%^&*-]/.test(password)) {
            alert('Password must include at least one number and one special character (!@#$%^&*-).');
            showModal('passwordModal');
            return;
        }

        const formData = new FormData(registrationForm);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        fetch(registrationForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
            },
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            if (data.success) {
                console.log('Registration successful, redirecting to:', data.redirect);
                window.location.href = data.redirect || '/homepage/';
            } else {
                console.warn('Registration failed:', data.error);
                alert(data.error || 'Failed to register.');
                if (data.error.includes('email')) {
                    showModal('emailModal');
                } else if (data.error.includes('username')) {
                    showModal('usernameModal');
                } else {
                    showModal('passwordModal');
                }
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert(`An error occurred: ${error.message}`);
            showModal('passwordModal');
        });
    });
});