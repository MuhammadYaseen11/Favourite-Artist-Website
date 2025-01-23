document.addEventListener('DOMContentLoaded', function () {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const favoriteSongsList = document.getElementById('favorite-songs-list');

    // Initialize favorite buttons on the Videos page
    favoriteButtons.forEach(button => {
        const songId = button.getAttribute('data-song-id');
        const iframeHTML = button.previousElementSibling.outerHTML;

        // Set initial state of the button based on localStorage
        updateButtonState(button, localStorage.getItem(songId));

        // Add event listener to the favorite button
        button.addEventListener('click', (e) => {
            e.preventDefault();

            if (localStorage.getItem(songId)) {
                // Remove from favorites
                localStorage.removeItem(songId);
            } else {
                // Add to favorites
                localStorage.setItem(songId, iframeHTML);
            }

            updateButtonState(button, localStorage.getItem(songId));
            updateFavoritesList();
        });
    });

    // Update the Favorites List
    function updateFavoritesList() {
        if (favoriteSongsList) {
            favoriteSongsList.innerHTML = ''; // Clear the list

            // Iterate through localStorage to populate the favorites list
            for (let i = 0; i < localStorage.length; i++) {
                const songId = localStorage.key(i);
                const iframeHTML = localStorage.getItem(songId);

                if (iframeHTML) {
                    const listItem = document.createElement('li');
                    listItem.style.display = 'grid';
                    listItem.style.gridTemplateColumns = '1fr auto';
                    listItem.style.marginBottom = '15px';
                    listItem.style.alignItems = 'center';

                    const videoContainer = document.createElement('div');
                    videoContainer.innerHTML = iframeHTML;

                    // Add "Remove from Favorites" button
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'Remove from Favorites';
                    removeButton.classList.add('remove-btn');
                    removeButton.style.backgroundColor = 'red';
                    removeButton.style.color = 'white';
                    removeButton.style.border = 'none';
                    removeButton.style.cursor = 'pointer';
                    removeButton.style.padding = '10px 15px';
                    removeButton.style.borderRadius = '5px';
                    removeButton.style.fontSize = '14px';
                    removeButton.style.fontWeight = 'bold';
                    removeButton.style.marginLeft = '20px';
                    removeButton.addEventListener('click', () => {
                        localStorage.removeItem(songId);
                        updateFavoritesList();
                    });

                    listItem.appendChild(videoContainer);
                    listItem.appendChild(removeButton);
                    favoriteSongsList.appendChild(listItem);
                }
            }
        }
    }

    // Update the state of a favorite button (checked/unchecked)
    function updateButtonState(button, isFavorite) {
        const img = button.querySelector('img');
        if (isFavorite) {
            img.src = '../images/favorite-checked.png';
            img.alt = 'Remove from Favorites';
        } else {
            img.src = '../images/favorite-unchecked.png';
            img.alt = 'Add to Favorites';
        }
    }

    // Initial update for the Favorites page
    if (favoriteSongsList) {
        updateFavoritesList();
    }
});
