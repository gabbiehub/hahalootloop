const chatModal = document.getElementById('messageModal');
            const openChatButton = document.querySelector('.chat-icon');
            const closeChatButton = chatModal?.querySelector('.close-window');
            const sendButton = chatModal?.querySelector('.send-icon');
            const chatInput = chatModal?.querySelector('.chat-input input');
            const chatMessages = chatModal?.querySelector('.chat-messages');

            if (openChatButton && chatModal && closeChatButton) {
                openChatButton.style.cursor = 'pointer';
                openChatButton.addEventListener('click', () => {
                    chatModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    chatInput?.focus();
                });

                closeChatButton.style.cursor = 'pointer';
                closeChatButton.addEventListener('click', () => {
                    chatModal.style.display = 'none';
                    document.body.style.overflow = '';
                });

                chatModal.addEventListener('click', (e) => {
                    if (e.target === chatModal) {
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
            }

            // Get DOM elements for upload modals
            const uploadButton = document.querySelector('.header-button');
            const basicInfoModal = document.getElementById('basicInfoModal');
            const detailedInfoModal = document.getElementById('detailedInfoModal');
            const previewModal = document.getElementById('previewModal');
            const closeBasicInfoModal = document.getElementById('closeBasicInfoModal');
            const closeDetailedInfoModal = document.getElementById('closeDetailedInfoModal');
            const closePreviewModal = document.getElementById('closePreviewModal');
            const dropZone = document.getElementById('dropZone');
            const fileInput = document.getElementById('fileInput');
            const itemTypeDropdown = document.getElementById('itemTypeDropdown');
            const shelfDropdown = document.getElementById('shelfDropdown');
            const tradabilityToggle = document.getElementById('tradabilityToggle');
            const conditionDropdown = document.getElementById('conditionDropdown');
            let tradability = 'Enabled';
            let currentItemId = null;
            let itemData = {};

            // Function to get CSRF token
            function getCsrfToken() {
                const tokenElement = document.querySelector('input[name="csrfmiddlewaretoken"]');
                if (!tokenElement) {
                    console.error('CSRF token element not found.');
                    return '';
                }
                return tokenElement.value;
            }

            // Open basic info modal
            if (uploadButton && basicInfoModal) {
                uploadButton.style.cursor = 'pointer';
                uploadButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    basicInfoModal.style.display = 'flex';
                    const itemName = document.getElementById('itemName');
                    if (itemName) itemName.focus();
                });
            }

            // Close modals
            [closeBasicInfoModal, closeDetailedInfoModal, closePreviewModal].forEach((closeButton) => {
                if (closeButton) {
                    closeButton.style.cursor = 'pointer';
                    closeButton.addEventListener('click', () => {
                        if (basicInfoModal) basicInfoModal.style.display = 'none';
                        if (detailedInfoModal) detailedInfoModal.style.display = 'none';
                        if (previewModal) previewModal.style.display = 'none';
                        resetForm();
                    });
                }
            });

            window.addEventListener('click', (event) => {
                if (event.target === basicInfoModal || event.target === detailedInfoModal || event.target === previewModal) {
                    if (basicInfoModal) basicInfoModal.style.display = 'none';
                    if (detailedInfoModal) detailedInfoModal.style.display = 'none';
                    if (previewModal) previewModal.style.display = 'none';
                    resetForm();
                }
            });

            // Drag and drop file upload
            if (dropZone && fileInput) {
                dropZone.addEventListener('dragover', (event) => {
                    event.preventDefault();
                    dropZone.style.borderColor = '#003566';
                });

                dropZone.addEventListener('dragleave', (event) => {
                    event.preventDefault();
                    dropZone.style.borderColor = '#003566';
                });

                dropZone.addEventListener('drop', (event) => {
                    event.preventDefault();
                    dropZone.style.borderColor = '#003566';
                    const files = event.dataTransfer.files;
                    if (files.length > 0) {
                        fileInput.files = files;
                        handleFileUpload(files[0], dropZone);
                    }
                });

                fileInput.addEventListener('change', (event) => {
                    const files = event.target.files;
                    if (files.length > 0) {
                        handleFileUpload(files[0], dropZone);
                    }
                });
            }

            function handleFileUpload(file, dropZoneElement) {
                const validTypes = ['image/jpeg', 'image/png'];
                if (!validTypes.includes(file.type)) {
                    alert('Please upload a JPG or PNG file.');
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    dropZoneElement.style.backgroundImage = `url(${e.target.result})`;
                    dropZoneElement.style.backgroundSize = 'cover';
                    dropZoneElement.style.backgroundPosition = 'center';
                    const pfp = dropZoneElement.querySelector('.pfp');
                    const div = dropZoneElement.querySelector('.div');
                    const textWrapper3 = dropZoneElement.querySelector('.text-wrapper-3');
                    const divWrapper = dropZoneElement.querySelector('.div-wrapper');
                    if (pfp) pfp.style.display = 'none';
                    if (div) div.style.display = 'none';
                    if (textWrapper3) textWrapper3.style.display = 'none';
                    if (divWrapper) divWrapper.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }

            // Dropdown functionality
            const dropdowns = [itemTypeDropdown, shelfDropdown, conditionDropdown].filter((d) => d);
            dropdowns.forEach((dropdown) => {
                dropdown.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const options = dropdown.querySelector('.dropdown-options');
                    if (options) {
                        options.style.display = options.style.display === 'block' ? 'none' : 'block';
                    }
                });

                const options = dropdown.querySelectorAll('.dropdown-options .option');
                options.forEach((option) => {
                    option.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const textWrapper = dropdown.querySelector('.text-wrapper-13');
                        if (textWrapper) {
                            textWrapper.textContent = e.target.textContent;
                            textWrapper.dataset.value = e.target.dataset.value;
                        }
                        const optionsContainer = e.target.closest('.dropdown-options');
                        if (optionsContainer) {
                            optionsContainer.style.display = 'none';
                        }
                    });
                });
            });

            window.addEventListener('click', () => {
                document.querySelectorAll('.dropdown-options').forEach((options) => {
                    options.style.display = 'none';
                });
            });

            // Tradability toggle
            if (tradabilityToggle) {
                tradabilityToggle.style.cursor = 'pointer';
                tradabilityToggle.addEventListener('click', () => {
                    const overlap2 = tradabilityToggle.querySelector('.overlap-2');
                    const overlap3 = tradabilityToggle.querySelector('.overlap-3');
                    const text14 = overlap2?.querySelector('.text-wrapper-14');
                    const text15 = overlap3?.querySelector('.text-wrapper-15');

                    if (tradability === 'Enabled') {
                        if (overlap2) overlap2.style.backgroundColor = '#ffffff';
                        if (overlap3) overlap3.style.backgroundColor = '#ffd60a';
                        if (text14) text14.style.color = '#b9b9b9';
                        if (text15) text15.style.color = '#003566';
                        tradability = 'Disabled';
                    } else {
                        if (overlap2) overlap2.style.backgroundColor = '#ffd60a';
                        if (overlap3) overlap3.style.backgroundColor = '#ffffff';
                        if (text14) text14.style.color = '#003566';
                        if (text15) text15.style.color = '#b9b9b9';
                        tradability = 'Enabled';
                    }
                });
            }

            // Basic Info submission
            const basicNextButton = document.querySelector('#basicInfoModal .overlap');
            if (basicNextButton) {
                basicNextButton.style.cursor = 'pointer';
                basicNextButton.addEventListener('click', async (event) => {
                    event.preventDefault();

                    const itemName = document.getElementById('itemName');
                    const itemDescription = document.getElementById('itemDescription');
                    const itemTypeText = itemTypeDropdown?.querySelector('.text-wrapper-13');
                    const itemType = itemTypeText?.dataset.value || itemTypeText?.textContent || 'Select type';
                    const shelfText = shelfDropdown?.querySelector('.text-wrapper-13');
                    const shelf = shelfText?.dataset.value || shelfText?.textContent || 'Select type';

                    if (!itemName?.value.trim()) {
                        alert('Please enter the item name.');
                        return;
                    }
                    if (!itemDescription?.value.trim()) {
                        alert('Please enter the item description.');
                        return;
                    }
                    if (itemType === 'Select type' || !['Antiques', 'Figurines', 'Books', 'Jewelry', 'Furniture', 'Cars', 'Currency', 'Toys'].includes(itemType)) {
                        alert('Please select a valid item type.');
                        return;
                    }
                    if (shelf === 'Select type') {
                        alert('Please select a shelf.');
                        return;
                    }
                    if (!fileInput?.files[0]) {
                        alert('Please upload an item image.');
                        return;
                    }

                    itemData = {
                        name: itemName.value.trim(),
                        description: itemDescription.value.trim(),
                        itemType,
                        shelf,
                        tradability,
                        file: fileInput.files[0],
                    };

                    const formData = new FormData();
                    formData.append('name', itemData.name);
                    formData.append('description', itemData.description);
                    formData.append('itemType', itemData.itemType);
                    formData.append('shelf', itemData.shelf);
                    formData.append('tradability', itemData.tradability);
                    formData.append('file', itemData.file);

                    try {
                        const response = await fetch('/upload_item/', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'X-CSRFToken': getCsrfToken(),
                            },
                        });
                        const result = await response.json();
                        if (result.status === 'success') {
                            currentItemId = result.item_id;
                            if (basicInfoModal) basicInfoModal.style.display = 'none';
                            if (detailedInfoModal) detailedInfoModal.style.display = 'flex';
                            const dateAcquired = document.getElementById('dateAcquired');
                            if (dateAcquired) dateAcquired.focus();

                            if (itemData.file) {
                                const detailedImage = document.getElementById('detailedImage');
                                if (detailedImage) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        detailedImage.src = e.target.result;
                                    };
                                    reader.readAsDataURL(itemData.file);
                                }
                            }
                        } else {
                            alert('Error: ' + result.message);
                        }
                    } catch (error) {
                        console.error('Error uploading item:', error);
                        alert('An error occurred while uploading the item.');
                    }
                });
            }

            // Detailed Info submission
            const detailedNextButton = document.querySelector('#detailedInfoModal .overlap');
            if (detailedNextButton) {
                detailedNextButton.style.cursor = 'pointer';
                detailedNextButton.addEventListener('click', async (event) => {
                    event.preventDefault();

                    const dateAcquired = document.getElementById('dateAcquired');
                    const otherNotes = document.getElementById('otherNotes');
                    const dimensions = document.getElementById('dimensions');
                    const weight = document.getElementById('weight');
                    const conditionText = conditionDropdown?.querySelector('.text-wrapper-13');
                    const condition = conditionText?.textContent || 'Select type';

                    itemData = {
                        ...itemData,
                        dateAcquired: dateAcquired?.value || '',
                        otherNotes: otherNotes?.value || '',
                        dimensions: dimensions?.value || '',
                        weight: weight?.value || '',
                        condition,
                    };

                    const formData = new FormData();
                    formData.append('item_id', currentItemId);
                    formData.append('dateAcquired', itemData.dateAcquired);
                    formData.append('otherNotes', itemData.otherNotes);
                    formData.append('dimensions', itemData.dimensions);
                    formData.append('weight', itemData.weight);
                    formData.append('condition', itemData.condition);

                    try {
                        const response = await fetch('/upload_item/', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'X-CSRFToken': getCsrfToken(),
                            },
                        });
                        const result = await response.json();
                        if (result.status === 'success') {
                            if (detailedInfoModal) detailedInfoModal.style.display = 'none';
                            if (previewModal) previewModal.style.display = 'flex';

                            const previewName = document.getElementById('previewName');
                            const previewDescription = document.getElementById('previewDescription');
                            const previewNotes = document.getElementById('previewNotes');
                            const previewTradability = document.getElementById('previewTradability');
                            const previewYear = document.getElementById('previewYear');
                            const previewDimensions = document.getElementById('previewDimensions');
                            const previewWeight = document.getElementById('previewWeight');
                            const previewCondition = document.getElementById('previewCondition');
                            const previewAuthor = document.getElementById('previewAuthor');
                            const previewRating = document.getElementById('previewRating');
                            const commentCount = document.getElementById('commentCount');

                            if (previewName) previewName.textContent = itemData.name;
                            if (previewDescription) previewDescription.textContent = itemData.description || 'No description provided';
                            if (previewNotes) previewNotes.textContent = itemData.otherNotes || 'No additional notes';
                            if (previewTradability) previewTradability.textContent = itemData.tradability === 'Enabled' ? 'Available for trade' : 'Not available for trade';
                            if (previewYear) previewYear.textContent = itemData.dateAcquired || 'Not specified';
                            if (previewDimensions) previewDimensions.textContent = itemData.dimensions || 'Not specified';
                            if (previewWeight) previewWeight.textContent = itemData.weight || 'Not specified';
                            if (previewCondition) previewCondition.textContent = itemData.condition !== 'Select type' ? itemData.condition : 'Not specified';
                            if (previewAuthor) previewAuthor.textContent = '{{ user.username }}';
                            if (previewRating) previewRating.textContent = 'Not rated';
                            if (commentCount) commentCount.textContent = '0';

                            if (itemData.file) {
                                const previewImage = document.getElementById('previewImage');
                                if (previewImage) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        previewImage.src = e.target.result;
                                    };
                                    reader.readAsDataURL(itemData.file);
                                }
                            }
                        } else {
                            alert('Error: ' + result.message);
                        }
                    } catch (error) {
                        console.error('Error updating item details:', error);
                        alert('An error occurred while updating the item details.');
                    }
                });
            }

            // Comment submission
            const submitCommentButton = document.querySelector('#previewModal .submit-comment');
            if (submitCommentButton) {
                submitCommentButton.style.cursor = 'pointer';
                submitCommentButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    const commentInput = document.getElementById('commentInput');
                    const comment = commentInput?.value.trim();
                    if (comment) {
                        commentInput.value = '';
                        const commentCount = document.getElementById('commentCount');
                        if (commentCount) {
                            commentCount.textContent = parseInt(commentCount.textContent) + 1;
                        }
                        alert('Comment submitted! (Placeholder)');
                    } else {
                        alert('Please enter a comment.');
                    }
                });
            }

            // Back buttons
            const detailedBackButton = document.querySelector('#detailedInfoModal .overlap-group');
            if (detailedBackButton) {
                detailedBackButton.style.cursor = 'pointer';
                detailedBackButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (detailedInfoModal) detailedInfoModal.style.display = 'none';
                    if (basicInfoModal) basicInfoModal.style.display = 'flex';
                    const itemName = document.getElementById('itemName');
                    if (itemName) itemName.focus();

                    if (itemData.file) {
                        const detailedImage = document.getElementById('detailedImage');
                        if (detailedImage) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                detailedImage.src = e.target.result;
                            };
                            reader.readAsDataURL(itemData.file);
                        }
                    }
                });
            }

            const previewBackButton = document.querySelector('#previewModal .overlap-group');
            if (previewBackButton) {
                previewBackButton.style.cursor = 'pointer';
                previewBackButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (previewModal) previewModal.style.display = 'none';
                    if (detailedInfoModal) detailedInfoModal.style.display = 'flex';
                    const dateAcquired = document.getElementById('dateAcquired');
                    if (dateAcquired) dateAcquired.focus();

                    if (itemData.file) {
                        const detailedImage = document.getElementById('detailedImage');
                        if (detailedImage) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                detailedImage.src = e.target.result;
                            };
                            reader.readAsDataURL(itemData.file);
                        }
                    }
                });
            }

            // Final upload
            const previewNextButton = document.querySelector('#previewModal .overlap');
            if (previewNextButton) {
                previewNextButton.style.cursor = 'pointer';
                previewNextButton.addEventListener('click', async (event) => {
                    event.preventDefault();

                    const formData = new FormData();
                    formData.append('item_id', currentItemId);
                    formData.append('final_submit', 'true');

                    try {
                        const response = await fetch('/upload_item/', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'X-CSRFToken': getCsrfToken(),
                            },
                        });
                        const result = await response.json();
                        if (result.status === 'success') {
                            alert('Item successfully uploaded!');
                            if (previewModal) previewModal.style.display = 'none';
                            resetForm();
                            window.location.reload();
                        } else {
                            alert('Error: ' + result.message);
                        }
                    } catch (error) {
                        console.error('Error finalizing upload:', error);
                        alert('An error occurred while finalizing the upload.');
                    }
                });
            }

            // Reset form
            function resetForm() {
                const itemName = document.getElementById('itemName');
                const itemDescription = document.getElementById('itemDescription');
                const dateAcquired = document.getElementById('dateAcquired');
                const otherNotes = document.getElementById('otherNotes');
                const dimensions = document.getElementById('dimensions');
                const weight = document.getElementById('weight');

                if (itemName) itemName.value = '';
                if (itemDescription) itemDescription.value = '';
                if (itemTypeDropdown) {
                    const itemTypeText = itemTypeDropdown.querySelector('.text-wrapper-13');
                    if (itemTypeText) {
                        itemTypeText.textContent = 'Select type';
                        itemTypeText.dataset.value = '';
                    }
                }
                if (shelfDropdown) {
                    const shelfText = shelfDropdown.querySelector('.text-wrapper-13');
                    if (shelfText) {
                        shelfText.textContent = 'Select type';
                        shelfText.dataset.value = '';
                    }
                }
                if (dropZone) {
                    dropZone.style.backgroundImage = 'none';
                    const pfp = dropZone.querySelector('.pfp');
                    const div = dropZone.querySelector('.div');
                    const textWrapper3 = dropZone.querySelector('.text-wrapper-3');
                    const divWrapper = dropZone.querySelector('.div-wrapper');
                    if (pfp) pfp.style.display = 'block';
                    if (div) div.style.display = 'block';
                    if (textWrapper3) textWrapper3.style.display = 'block';
                    if (divWrapper) divWrapper.style.display = 'block';
                }
                tradability = 'Enabled';
                if (tradabilityToggle) {
                    const overlap2 = tradabilityToggle.querySelector('.overlap-2');
                    const overlap3 = tradabilityToggle.querySelector('.overlap-3');
                    const text14 = overlap2?.querySelector('.text-wrapper-14');
                    const text15 = overlap3?.querySelector('.text-wrapper-15');
                    if (overlap2) overlap2.style.backgroundColor = '#ffd60a';
                    if (overlap3) overlap3.style.backgroundColor = '#ffffff';
                    if (text14) text14.style.color = '#003566';
                    if (text15) text15.style.color = '#b9b9b9';
                }
                if (dateAcquired) dateAcquired.value = '';
                if (otherNotes) otherNotes.value = '';
                if (dimensions) dimensions.value = '';
                if (weight) weight.value = '';
                if (conditionDropdown) {
                    const conditionText = conditionDropdown.querySelector('.text-wrapper-13');
                    if (conditionText) conditionText.textContent = 'Select type';
                }
                currentItemId = null;
                itemData = {};
                const detailedImage = document.getElementById('detailedImage');
                const previewImage = document.getElementById('previewImage');
                if (detailedImage) detailedImage.src = '{% static "img/item-image-area.png" %}';
                if (previewImage) previewImage.src = '{% static "img/item-image-area.png" %}';
                if (fileInput) fileInput.value = '';
            }

            // Redirect to item details page on post click (Placeholder)
            const postClasses = [
                'recommended-4',
                'favorite-1',
                'trade-request-1',
                'trade-request-2',
                'trade-request-3',
                'trade-request-4',
                'showcase-1',
                'showcase-2',
                'showcase-3',
                'showcase-4',
            ];

            postClasses.forEach((className) => {
                const posts = document.querySelectorAll(`.${className}`);
                posts.forEach((post) => {
                    post.style.cursor = 'pointer';
                    post.addEventListener('click', (event) => {
                        event.preventDefault();
                        window.location.href = '{% url 'item_details' item.name %}'; // Replace with dynamic item ID
                    });
                });
            });