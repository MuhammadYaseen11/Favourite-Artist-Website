document.addEventListener('DOMContentLoaded', function () {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const favoriteSongsList = document.getElementById('favorite-songs-list');

    favoriteButtons.forEach(button => {
        const songId = button.getAttribute('data-song-id');
        const songTitle = button.getAttribute('data-song-title');
        const iframeHTML = button.previousElementSibling.outerHTML;

        if (localStorage.getItem(songId)) {
            button.querySelector('img').src = '../images/favorite-checked.png';
            button.querySelector('img').alt = 'Remove from Favorites';
        } else {
            button.querySelector('img').src = '../images/favorite-unchecked.png';
            button.querySelector('img').alt = 'Add to Favorites';
        }

        button.addEventListener('click', (e) => {
            e.preventDefault();

            if (localStorage.getItem(songId)) {
                localStorage.removeItem(songId);
                button.querySelector('img').src = '../images/favorite-unchecked.png';
                button.querySelector('img').alt = 'Add to Favorites';
            } else {
                localStorage.setItem(songId, iframeHTML);
                button.querySelector('img').src = '../images/favorite-checked.png';
                button.querySelector('img').alt = 'Remove from Favorites';
            }

            updateFavoritesList();
        });
    });

    function updateFavoritesList() {
        if (favoriteSongsList) {
            favoriteSongsList.innerHTML = '';

            for (let i = 0; i < localStorage.length; i++) {
                const songId = localStorage.key(i);
                const iframeHTML = localStorage.getItem(songId);

                const listItem = document.createElement('li');
                listItem.innerHTML = iframeHTML;
                favoriteSongsList.appendChild(listItem);
            }
        }
    }
    if (favoriteSongsList) {
        updateFavoritesList();
    }
});
