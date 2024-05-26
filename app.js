async function searchSongs() {
    const query = document.getElementById('search').value;
    if (query === '') {
        alert('Please enter a song name.');
        return;
    }

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        alert('Error fetching songs: ' + error.message);
    }
}

function displayResults(songs) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song';
        songDiv.innerHTML = `
            <img src="${song.artworkUrl100}" alt="${song.trackName}">
            <div>
                <p>${song.trackName} by ${song.artistName}</p>
            </div>
        `;
        songDiv.onclick = () => playSong(song.previewUrl);
        resultsDiv.appendChild(songDiv);
    });
}

function playSong(previewUrl) {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    audioSource.src = previewUrl;
    audioPlayer.load();
    audioPlayer.play();
}
