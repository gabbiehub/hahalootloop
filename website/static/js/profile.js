document.addEventListener('DOMContentLoaded', () => {
    // Chat modal toggle
    const chatButton = document.getElementById('chatButton');
    const messageModal = document.getElementById('messageModal');
    const closeMessageModal = document.getElementById('closeMessageModal');

    if (chatButton && messageModal) {
        chatButton.addEventListener('click', () => {
            messageModal.style.display = 'flex';
        });
    }

    if (closeMessageModal && messageModal) {
        closeMessageModal.addEventListener('click', () => {
            messageModal.style.display = 'none';
        });
    }

    // Bio modal toggle
    const bioText = document.getElementById('bioText');
    const bioModal = document.getElementById('bioModal');
    const bioInput = document.getElementById('bioInput');
    const saveBioButton = document.getElementById('saveBioButton');
    const cancelBioButton = document.getElementById('cancelBioButton');
    const closeBioModal = document.getElementById('closeBioModal');

    if (bioText && bioModal && bioInput) {
        bioText.addEventListener('click', () => {
            // Set current bio in textarea
            bioInput.value = bioText.textContent.trim();
            bioModal.style.display = 'flex';
        });
    }

    if (cancelBioButton && bioModal) {
        cancelBioButton.addEventListener('click', () => {
            bioModal.style.display = 'none';
            bioInput.value = '';
        });
    }

    if (closeBioModal && bioModal) {
        closeBioModal.addEventListener('click', () => {
            bioModal.style.display = 'none';
            bioInput.value = '';
        });
    }

    if (saveBioButton && bioModal) {
        saveBioButton.addEventListener('click', async () => {
            const bio = bioInput.value.trim();
            try {
                const response = await fetch(window.UPDATE_BIO_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': window.CSRF_TOKEN,
                    },
                    body: new URLSearchParams({ 'bio': bio }),
                });
                const result = await response.json();
                if (result.status === 'success') {
                    bioText.textContent = bio || 'Add a bio to tell others about yourself!';
                    bioModal.style.display = 'none';
                    bioInput.value = '';
                    alert('Bio updated successfully!');
                } else {
                    alert('Error: ' + result.message);
                }
            } catch (error) {
                console.error('Bio update error:', error);
                alert('An error occurred while updating the bio.');
            }
        });
    }

    // Tab navigation
    const navItems = document.querySelectorAll('.nav > div');
    const homeFrame = document.querySelector('.frame');
    const wishlistFrame = document.getElementById('wishlistFrame');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            if (item.textContent === 'Home') {
                if (homeFrame) homeFrame.style.display = 'block';
                if (wishlistFrame) wishlistFrame.style.display = 'none';
            } else if (item.textContent === 'Wishlist') {
                if (homeFrame) homeFrame.style.display = 'none';
                if (wishlistFrame) wishlistFrame.style.display = 'block';
            } else {
                if (homeFrame) homeFrame.style.display = 'block';
                if (wishlistFrame) wishlistFrame.style.display = 'none';
            }
        });
    });

    // Set Home as active by default
    const homeNav = document.querySelector('.nav .text-wrapper');
    if (homeNav) homeNav.classList.add('active');
});