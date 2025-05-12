document.addEventListener('DOMContentLoaded', () => {
  console.log('homepage-modals.js loaded successfully');

  const chatButton = document.getElementById('chatButton');
  const messageModal = document.getElementById('messageModal');
  const closeMessageModal = document.getElementById('closeMessageModal');
  const modalOverlay = document.getElementById('modalOverlay');

  // Debugging: Check if elements exist
  if (!chatButton) console.error('Error: #chatButton not found in DOM');
  if (!messageModal) console.error('Error: #messageModal not found in DOM');
  if (!closeMessageModal) console.error('Error: #closeMessageModal not found in DOM');
  if (!modalOverlay) console.error('Error: #modalOverlay not found in DOM');

  // Open modal on chat button click
  if (chatButton) {
    chatButton.addEventListener('click', () => {
      console.log('Chat button clicked');
      if (messageModal && modalOverlay) {
        messageModal.classList.add('active');
        modalOverlay.classList.add('active');
        console.log('Modal and overlay should now be visible');
      } else {
        console.error('Cannot open modal: messageModal or modalOverlay missing');
      }
    });
  }

  // Close modal on close button click
  if (closeMessageModal) {
    closeMessageModal.addEventListener('click', () => {
      console.log('Close button clicked');
      if (messageModal && modalOverlay) {
        messageModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        console.log('Modal and overlay should now be hidden');
      } else {
        console.error('Cannot close modal: messageModal or modalOverlay missing');
      }
    });
  }

  // Close modal on overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
      console.log('Overlay clicked');
      if (messageModal && modalOverlay) {
        messageModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        console.log('Modal and overlay should now be hidden');
      } else {
        console.error('Cannot close modal: messageModal or modalOverlay missing');
      }
    });
  }
});