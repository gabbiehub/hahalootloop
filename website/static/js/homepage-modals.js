document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');

  // Get DOM elements with logging
  const chatButton = document.getElementById('chatButton');
  const chatModal = document.getElementById('chatModal');
  const closeChatModal = document.getElementById('closeChatModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const chatsContainer = document.querySelector('.chats');
  const messageContainer = document.querySelector('.message-opssen');
  const openUploadModal = document.getElementById('openUploadModal');
  const uploadModal = document.getElementById('uploadModal');
  const closeUploadModal = document.getElementById('closeUploadModal');
  const uploadModalOverlay = document.getElementById('uploadModalOverlay');

  // Log all elements to verify they exist
  console.log('Chat button:', chatButton);
  console.log('Chat modal:', chatModal);
  console.log('Close button:', closeChatModal);
  console.log('Modal overlay:', modalOverlay);
  console.log('Chats container:', chatsContainer);
  console.log('Message container:', messageContainer);
  console.log('Open upload modal:', openUploadModal);
  console.log('Upload modal:', uploadModal);
  console.log('Close upload modal:', closeUploadModal);
  console.log('Upload modal overlay:', uploadModalOverlay);

  // Check if all elements are found
  if (!chatButton || !chatModal || !closeChatModal || !modalOverlay || !chatsContainer || !messageContainer || !openUploadModal || !uploadModal || !closeUploadModal || !uploadModalOverlay) {
    console.error('One or more modal elements are missing:', {
      chatButton: !!chatButton,
      chatModal: !!chatModal,
      closeChatModal: !!closeChatModal,
      modalOverlay: !!modalOverlay,
      chatsContainer: !!chatsContainer,
      messageContainer: !!messageContainer,
      openUploadModal: !!openUploadModal,
      uploadModal: !!uploadModal,
      closeUploadModal: !!closeUploadModal,
      uploadModalOverlay: !!uploadModalOverlay
    });
    return;
  }

  // Sample data for "Last chats"
  const lastChats = [
    { username: 'KatsuraDa', preview: 'Yes, nabili ko sila dun mismo sa...', time: '8:57 pm', img: '/static/img/homepage/pfp 1.png' },
    { username: 'GujuSinsi', preview: 'You: hoy hahah di naman fake y...', time: '5:00 pm', img: '/static/img/homepage/pfp 2.png' },
    { username: 'FindingDory', preview: 'Bakit di mo ko pinapansin?', time: '1:17 pm', img: '/static/img/homepage/pfp 3.png' },
    { username: 'CollectorCat', preview: 'siamese yung pinakauna kong n...', time: '1:10 pm', img: '/static/img/homepage/pfp 4.png' },
    { username: 'HaikyuuLover', preview: 'Hello? uso po mag-reply?! asan...', time: '12:00 pm', img: '/static/img/homepage/pfp 5.png' },
    { username: 'Coraline', preview: 'You: nakakainggit gusto ko rin...', time: '8:00 am', img: '/static/img/homepage/pfp 6.png' },
    { username: 'akosiblueeyy', preview: 'ngl its pink iykyk', time: 'Feb, 14', img: '/static/img/homepage/pfp 7.png' },
    { username: 'gagagagaga', preview: 'siamese yung pinakauna kong n...', time: '1:10 pm', img: '/static/img/homepage/pfp 8.png' }
  ];

  // Sample chat messages
  const messages = [
    { type: 'outgoing', text: 'Hey! I saw your collection. Ganda ng figurines mo ah. Matagal ka na nagko-collect?', img: '/static/img/homepage/profile.png' },
    { type: 'incoming', text: 'Hi! Yes, medyo matagal na rin. Since 2020 pa ako nagko-collect ng mga figurines ng Jujutsu Kaisen characters', img: '/static/img/homepage/pfp 1.png' },
    { type: 'outgoing', text: 'Si gojo ba favorite mo? dami mong gojo eh', img: '/static/img/homepage/profile.png' },
    { type: 'incoming', text: 'Oo, halata na nga eh HAHA', img: '/static/img/homepage/pfp 1.png' },
    { type: 'outgoing', text: 'si gojo rin favorite ko', img: '/static/img/homepage/profile.png' },
    { type: 'outgoing', text: 'madalas ka ba bumibili online?', img: '/static/img/homepage/profile.png' },
    { type: 'incoming', text: 'Ahh talaga ba? Nice', img: '/static/img/homepage/pfp 1.png' },
    { type: 'incoming', text: 'Minsan sa online, pero minsan sa mga malls din kung meron', img: '/static/img/homepage/pfp 1.png' },
    { type: 'outgoing', text: 'kita ko nga meron ka rin mga sanrio characters. galing ba yon dun sa mga blind boxes?', img: '/static/img/homepage/profile.png' }
  ];

  // Populate "Last chats" when modal opens
  function populateChats() {
    chatsContainer.innerHTML = '';
    lastChats.forEach(chat => {
      const chatDiv = document.createElement('div');
      chatDiv.classList.add('chat-user');
      chatDiv.innerHTML = `
        <img src="${chat.img}" alt="${chat.username} profile picture">
        <div class="user-info">
          <div class="username">${chat.username}</div>
          <div class="preview">${chat.preview}</div>
        </div>
        <div class="time">${chat.time}</div>
      `;
      chatsContainer.appendChild(chatDiv);
    });
  }

  // Populate chat messages when modal opens
  function populateMessages() {
    messageContainer.innerHTML = '';
    messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', message.type);
      messageDiv.innerHTML = `
        ${message.type === 'incoming' ? `<img src="${message.img}" alt="Profile picture">` : ''}
        <div class="text">${message.text}</div>
        ${message.type === 'outgoing' ? `<img src="${message.img}" alt="Profile picture">` : ''}
      `;
      messageContainer.appendChild(messageDiv);
    });
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  // Show chat modal function
  function showChatModal() {
    console.log('Showing chat modal');
    chatModal.style.display = 'block';
    modalOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    populateChats();
    populateMessages();
    console.log('Modal display:', chatModal.style.display);
    console.log('Overlay display:', modalOverlay.style.display);
    console.log('Body overflow:', document.body.style.overflow);
  }

  // Hide chat modal function
  function hideChatModal() {
    console.log('Hiding chat modal');
    chatModal.style.display = 'none';
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    console.log('Modal display:', chatModal.style.display);
    console.log('Overlay display:', modalOverlay.style.display);
    console.log('Body overflow:', document.body.style.overflow);
  }

  // Show upload modal function
  function showUploadModal() {
    console.log('Showing upload modal');
    uploadModal.style.display = 'block';
    uploadModalOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    console.log('Upload modal display:', uploadModal.style.display);
    console.log('Upload overlay display:', uploadModalOverlay.style.display);
    console.log('Body overflow:', document.body.style.overflow);
  }

  // Hide upload modal function
  function hideUploadModal() {
    console.log('Hiding upload modal');
    uploadModal.style.display = 'none';
    uploadModalOverlay.style.display = 'none';
    console.log('Upload modal display:', uploadModal.style.display);
    console.log('Upload overlay display:', uploadModalOverlay.style.display);
  }

  // Add event listener for chat button
  chatButton.addEventListener('click', function (e) {
    console.log('Chat button clicked');
    e.preventDefault();
    showChatModal();
  });

  // Add event listener for close chat button
  closeChatModal.addEventListener('click', function (e) {
    console.log('Close button clicked');
    e.preventDefault();
    hideChatModal();
  });

  // Add event listener for chat overlay (click outside to close)
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      console.log('Overlay clicked - closing chat modal');
      hideChatModal();
    }
  });

  // Add event listener for open upload modal button
  openUploadModal.addEventListener('click', function (e) {
    console.log('Attach button clicked - opening upload modal');
    e.preventDefault();
    showUploadModal();
  });

  // Add event listener for close upload button
  closeUploadModal.addEventListener('click', function (e) {
    console.log('Close upload button clicked');
    e.preventDefault();
    hideUploadModal();
  });

  // Add event listener for upload overlay (click outside to close)
  uploadModalOverlay.addEventListener('click', function (e) {
    if (e.target === uploadModalOverlay) {
      console.log('Upload overlay clicked - closing upload modal');
      hideUploadModal();
    }
  });

  // Expose debugging functions globally
  window.debugModal = {
    showChat: showChatModal,
    hideChat: hideChatModal,
    showUpload: showUploadModal,
    hideUpload: hideUploadModal,
    elements: {
      chatButton: chatButton,
      chatModal: chatModal,
      closeChat: closeChatModal,
      chatOverlay: modalOverlay,
      openUpload: openUploadModal,
      uploadModal: uploadModal,
      closeUpload: closeUploadModal,
      uploadOverlay: uploadModalOverlay
    }
  };
  console.log('Debugging tools available - use window.debugModal.showChat() or window.debugModal.showUpload() to test');
});