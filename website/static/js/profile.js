document.addEventListener('DOMContentLoaded', () => {
          // Edit profile button click
          const editProfileBtn = document.querySelector('.text-wrapper-6'); // Updated to match "Edit profile" class
          if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
              // Redirect to edit profile page or show edit form (customize as needed)
              window.location.href = '{% url "edit_profile" %}'; // Adjust URL as per your Django setup
            });
          }

          // Sign out button click
          const signOutBtn = document.querySelector('.text-wrapper-7'); // Updated to match "Sign out" class
          if (signOutBtn) {
            signOutBtn.addEventListener('click', () => {
              // Perform sign-out action (e.g., clear session, redirect)
              if (confirm('Are you sure you want to sign out?')) {
                window.location.href = '{% url "logout" %}'; // Adjust URL as per your Django setup
              }
            });
          }
        });

        document.addEventListener('DOMContentLoaded', () => {
        // Home button click (overlap-group)
        const homeBtn = document.querySelector('.text-wrapper');
        if (homeBtn) {
          homeBtn.addEventListener('click', () => {
            window.location.href = '{% url "home" %}'; // Adjust URL as per your Django setup
          });
        }

        // Wishlist button click
        const wishlistBtn = document.querySelector('.div');
        if (wishlistBtn) {
          wishlistBtn.addEventListener('click', () => {
            window.location.href = '{% url "wishlist" %}'; // Adjust URL as per your Django setup
          });
        }

        // History button click
        const historyBtn = document.querySelector('.text-wrapper-2');
        if (historyBtn) {
          historyBtn.addEventListener('click', () => {
            window.location.href = '{% url "history" %}'; // Adjust URL as per your Django setup
          });
        }

        // Collections button click
        const collectionsBtn = document.querySelector('.text-wrapper-3');
        if (collectionsBtn) {
          collectionsBtn.addEventListener('click', () => {
            window.location.href = '{% url "collections" %}'; // Adjust URL as per your Django setup
          });
        }
      });