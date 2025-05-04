document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');

  // Get DOM elements with logging
  const chatButton = document.getElementById('chatButton');
  const chatModal = document.getElementById('chatModal');
  const closeChatModal = document.getElementById('closeChatModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const chatsContainer = document.querySelector('.chats');
  const messageContainer = document.querySelector('.message-opssen');

  // Log all elements to verify they exist
  console.log('Chat button:', chatButton);
  console.log('Chat modal:', chatModal);
  console.log('Close button:', closeChatModal);
  console.log('Modal overlay:', modalOverlay);
  console.log('Chats container:', chatsContainer);
  console.log('Message container:', messageContainer);

  // Check if all elements are found
  if (!chatButton || !chatModal || !closeChatModal || !modalOverlay || !chatsContainer || !messageContainer) {
    console.error('One or more modal elements are missing:', {
      chatButton: !!chatButton,
      chatModal: !!chatModal,
      closeChatModal: !!closeChatModal,
      modalOverlay: !!modalOverlay,
      chatsContainer: !!chatsContainer,
      messageContainer: !!messageContainer
    });
    return;
  }

  // Sample data for "Last chats"
  const lastChats = [
    { username: 'KatsuraDa', preview: 'Yes, nabili ko sila dun mismo sa...', time: '8:57 pm', img: '/static/img/pfp-2.png' },
    { username: 'GujuSinsi', preview: 'You: hoy hahah di naman fake y...', time: '5:00 pm', img: '/static/img/pfp-3.png' },
    { username: 'FindingDory', preview: 'Bakit di mo ko pinapansin?', time: '1:17 pm', img: '/static/img/pfp-4.png' },
    { username: 'CollectorCat', preview: 'siamese yung pinakauna kong n...', time: '1:10 pm', img: '/static/img/pfp-5.png' },
    { username: 'HaikyuuLover', preview: 'Hello? uso po mag-reply?! asan...', time: '12:00 pm', img: '/static/img/pfp-6.png' },
    { username: 'Coraline', preview: 'You: nakakainggit gusto ko rin...', time: '8:00 am', img: '/static/img/pfp-7.png' },
    { username: 'akosiblueeyy', preview: 'ngl its pink iykyk', time: 'Feb, 14', img: '/static/img/pfp-2.png' },
    { username: 'gagagagaga', preview: 'siamese yung pinakauna kong n...', time: '1:10 pm', img: '/static/img/pfp-3.png' }
  ];

  // Sample chat messages
  const messages = [
    { type: 'outgoing', text: 'Hey! I saw your collection. Ganda ng figurines mo ah. Matagal ka na nagko-collect?', img: '/static/img/pfp-7.png' },
    { type: 'incoming', text: 'Hi! Yes, medyo matagal na rin. Since 2020 pa ako nagko-collect ng mga figurines ng Jujutsu Kaisen characters', img: '/static/img/pfp-2.png' },
    { type: 'outgoing', text: 'Si gojo ba favorite mo? dami mong gojo eh', img: '/static/img/pfp-7.png' },
    { type: 'incoming', text: 'Oo, halata na nga eh HAHA', img: '/static/img/pfp-2.png' },
    { type: 'outgoing', text: 'si gojo rin favorite ko', img: '/static/img/pfp-7.png' },
    { type: 'outgoing', text: 'madalas ka ba bumibili online?', img: '/static/img/pfp-7.png' },
    { type: 'incoming', text: 'Ahh talaga ba? Nice', img: '/static/img/pfp-2.png' },
    { type: 'incoming', text: 'Minsan sa online, pero minsan sa mga malls din kung meron', img: '/static/img/pfp-2.png' },
    { type: 'outgoing', text: 'kita ko nga meron ka rin mga sanrio characters. galing ba yon dun sa mga blind boxes?', img: '/static/img/pfp-7.png' }
  ];

  // Populate "Last chats"
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

  // Populate chat messages
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

  // Show modal function
  function showChatModal() {
    console.log('Showing chat modal');
    chatModal.style.display = 'block';
    modalOverlay.style.display = 'block';
    console.log('Modal display:', chatModal.style.display);
    console.log('Overlay display:', modalOverlay.style.display);
  }

  // Hide modal function
  function hideChatModal() {
    console.log('Hiding chat modal');
    chatModal.style.display = 'none';
    modalOverlay.style.display = 'none';
    console.log('Modal display:', chatModal.style.display);
    console.log('Overlay display:', modalOverlay.style.display);
  }

  // Add event listener for chat button
  chatButton.addEventListener('click', function (e) {
    console.log('Chat button clicked');
    e.preventDefault();
    showChatModal();
  });

  // Add event listener for close button
  closeChatModal.addEventListener('click', function (e) {
    console.log('Close button clicked');
    e.preventDefault();
    hideChatModal();
  });

  // Add event listener for overlay (click outside to close)
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      console.log('Overlay clicked - closing modal');
      hideChatModal();
    }
  });

  // Expose debugging functions globally
  window.debugModal = {
    showChat: showChatModal,
    hideChat: hideChatModal,
    elements: {
      button: chatButton,
      modal: chatModal,
      close: closeChatModal,
      overlay: modalOverlay
    }
  };
  console.log('Debugging tools available - use window.debugModal.showChat() to test');
});