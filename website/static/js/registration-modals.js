document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const emailForm = document.querySelector('.registration-page form');
    const usernameModal = document.querySelector('#usernameModal');
    const passwordModal = document.querySelector('#passwordModal');
    const modalOverlay = document.querySelector('#modalOverlay');
    const usernameForm = usernameModal.querySelector('#usernameForm');
    const passwordForm = passwordModal.querySelector('#passwordForm');
    const usernameGoBack = usernameModal.querySelector('.overlap-group-wrapper');
    const passwordGoBack = passwordModal.querySelector('.overlap-group-wrapper');
    const usernameInput = usernameModal.querySelector('input[name="username"]');
    const passwordInput = passwordModal.querySelector('input[name="password"]');
    const confirmPasswordInput = passwordModal.querySelector('input[name="confirm_password"]');
    const nextButton = usernameModal.querySelector('.next-button');

    // Hide modals and overlay initially
    usernameModal.style.display = 'none';
    passwordModal.style.display = 'none';
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
    }

    // Show username modal and overlay on email form submission
    emailForm.addEventListener('submit', function (event) {
        event.preventDefault();
        usernameModal.style.display = 'block';
        if (modalOverlay) {
            modalOverlay.style.display = 'block';
        }
    });

    // Hide username modal and overlay on "Go back" click
    usernameGoBack.addEventListener('click', function () {
        usernameModal.style.display = 'none';
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });

    // Navigate to password modal on arrow click
    nextButton.addEventListener('click', function () {
        usernameModal.style.display = 'none';
        passwordModal.style.display = 'block';
        if (modalOverlay) {
            modalOverlay.style.display = 'block';
        }
    });

    // Handle username form submission via AJAX
    usernameForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (usernameInput.value.trim() === '') {
            alert('Please enter a username.');
            return;
        }

        const formData = new FormData(usernameForm);
        fetch(usernameForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Username submitted:', usernameInput.value);
                alert(data.message);
            } else {
                alert(data.error || 'Failed to set username.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the username.');
        });
    });

    // Hide password modal and overlay on "Go back" click
    passwordGoBack.addEventListener('click', function () {
        passwordModal.style.display = 'none';
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });

    // Handle password form submission to redirect to homepage
    passwordForm.addEventListener('submit', function (event) {
        event.preventDefault();
        window.location.href = '/homepage/';
    });
});