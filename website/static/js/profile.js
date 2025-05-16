document.addEventListener('DOMContentLoaded', () => {
  console.log('Script loaded'); // Debug: Confirm script execution

  // Edit profile button click
  const editProfileBtn = document.querySelector('.text-wrapper-6');
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      console.log('Edit profile clicked');
      window.location.href = '{% url "edit_profile" %}';
    });
  }

  // Sign out button click
  const signOutBtn = document.querySelector('.text-wrapper-7');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      console.log('Sign out clicked');
      if (confirm('Are you sure you want to sign out?')) {
        window.location.href = '{% url "logout" %}';
      }
    });
  }

  // Navigation buttons
  const homeBtn = document.querySelector('.text-wrapper');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      console.log('Home button clicked');
      window.location.href = '{% url "homepage" %}';
    });
  }

  const wishlistBtn = document.querySelector('.div');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      console.log('Wishlist button clicked');
      window.location.href = '{% url "wishlist" %}';
    });
  }

  const historyBtn = document.querySelector('.text-wrapper-2');
  if (historyBtn) {
    historyBtn.addEventListener('click', () => {
      console.log('History button clicked');
      window.location.href = '{% url "history" %}';
    });
  }

  const collectionsBtn = document.querySelector('.text-wrapper-3');
  if (collectionsBtn) {
    collectionsBtn.addEventListener('click', () => {
      console.log('Collections button clicked');
      window.location.href = '{% url "collections" %}';
    });
  }

  // Message Modal Functionality (with enhanced debugging)
  const chatModal = document.querySelector('.modal');
  const openChatButton = document.querySelector('.chat-button');
  const closeChatButton = chatModal?.querySelector('.close-window');
  const sendButton = chatModal?.querySelector('.send-icon');
  const chatInput = chatModal?.querySelector('.text-wrapper-14');
  const chatMessages = chatModal?.querySelector('.message-opssen');

  console.log('Chat Button:', openChatButton); // Debug: Check if button is found
  console.log('Chat Modal:', chatModal); // Debug: Check if modal is found
  console.log('Close Button:', closeChatButton); // Debug: Check if close button is found

  if (openChatButton && chatModal && closeChatButton) {
    openChatButton.style.cursor = 'pointer';
    openChatButton.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent any parent link behavior
      e.stopPropagation(); // Stop event bubbling
      console.log('Chat button clicked'); // Debug: Confirm click event fires
      chatModal.style.display = 'flex';
      console.log('Modal display set to flex:', chatModal.style.display); // Debug: Confirm style change
      document.body.style.overflow = 'hidden';
      if (chatInput) chatInput.focus();
    });

    // Fallback: Use event delegation on the document to catch clicks on .chat-button
    document.addEventListener('click', (e) => {
      if (e.target.closest('.chat-button')) {
        console.log('Chat button clicked (via delegation)');
        chatModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (chatInput) chatInput.focus();
      }
    });

    closeChatButton.style.cursor = 'pointer';
    closeChatButton.addEventListener('click', () => {
      console.log('Close button clicked');
      chatModal.style.display = 'none';
      document.body.style.overflow = '';
    });

    chatModal.addEventListener('click', (e) => {
      if (e.target === chatModal) {
        console.log('Clicked outside modal');
        chatModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    if (sendButton && chatInput && chatMessages) {
      sendButton.style.cursor = 'pointer';
      sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
          const messageDiv = document.createElement('div');
          messageDiv.classList.add('chat-bubble', 'current-user');
          messageDiv.innerHTML = `<p>${message}</p><span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
          chatMessages.appendChild(messageDiv);
          chatInput.value = '';
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });

      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendButton.click();
        }
      });
    }
  } else {
    console.error('Required modal elements not found:', {
      openChatButton: !!openChatButton,
      chatModal: !!chatModal,
      closeChatButton: !!closeChatButton
    });
  }

  // Add this after the existing navigation buttons
    const wishlistNavBtn = document.querySelector('.div'); // Matches the "Wishlist" text in nav
    const contentContainer = document.querySelector('.content-container');
    const profileFrame = document.querySelector('#profileFrame');
    const wishlistFrame = document.querySelector('#wishlistFrame');

    if (wishlistNavBtn && contentContainer && profileFrame && wishlistFrame) {
    wishlistNavBtn.addEventListener('click', () => {
        console.log('Wishlist button clicked'); // Debug
        profileFrame.classList.remove('active');
        wishlistFrame.style.display = 'block';
        wishlistFrame.classList.add('active');
        // Optional: Scroll to top of wishes
        wishlistFrame.scrollTop = 0;
    });

    // Restore profile frame when clicking other nav items (e.g., Home)
    const homeBtn = document.querySelector('.text-wrapper');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
        console.log('Home button clicked');
        wishlistFrame.classList.remove('active');
        wishlistFrame.style.display = 'none';
        profileFrame.classList.add('active');
        });
    }
    }
});