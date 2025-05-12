document.addEventListener('DOMContentLoaded', () => {
    // Chat Modal
    const chatButton = document.getElementById('chatButton');
    const messageModal = document.getElementById('messageModal');
    const closeModal = document.getElementById('closeModal');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.querySelector('.send-button');
  
    if (!chatButton || !messageModal || !closeModal || !messageInput || !sendButton) {
      console.error('Modal elements not found');
      return;
    }
  
    chatButton.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('Opening chat modal');
      messageModal.style.display = 'flex';
      messageInput.focus();
    });
  
    closeModal.addEventListener('click', () => {
      console.log('Closing chat modal');
      messageModal.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === messageModal) {
        messageModal.style.display = 'none';
      }
    });
  
    sendButton.addEventListener('click', () => {
      const message = messageInput.value.trim();
      if (message) {
        console.log('Message sent:', message);
        messageInput.value = '';
      }
    });
  
    messageInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendButton.click();
      }
    });
  
    // Profile Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        console.log('Selected tab:', item.dataset.tab);
      });
    });
  });