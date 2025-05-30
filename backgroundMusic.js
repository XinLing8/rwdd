class BackgroundMusic {
    constructor() {
        try {
            this.audio = new Audio('Bubble Bath - The Green Orbs.mp3');
            
            // Log the full path to help debug
            console.log('Full audio path:', new URL(this.audio.src, window.location.href).href);
            
            this.audio.loop = true;
            this.isPlaying = false;
            this.volume = 0.5; // Default volume at 50%
            
            // Add error handling for audio loading
            this.audio.onerror = (e) => {
                console.error('Audio error:', e);
                // Try alternative path if first attempt fails
                if (!this.audio.src.includes('?')) {
                    this.audio.src = 'Bubble Bath - The Green Orbs?type=.mp3';
                }
            };
            
            // Load saved state
            const savedVolume = localStorage.getItem('backgroundMusicVolume');
            const savedMuted = localStorage.getItem('backgroundMusicMuted');
            
            if (savedVolume) {
                this.audio.volume = parseFloat(savedVolume);
            }
            
            if (savedMuted === 'true') {
                this.audio.muted = true;
            }
            
            // Create audio controls
            this.createAudioControls();
        } catch (error) {
            console.error('Constructor error:', error);
        }
    }

    createAudioControls() {
        const controls = document.createElement('div');
        controls.className = 'audio-controls';
        controls.innerHTML = `
            <div class="audio-control-panel">
                <button class="toggle-play">
                    <i class="fas fa-play"></i>
                </button>
                <div class="volume-control">
                    <button class="toggle-mute">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="${this.audio.volume}">
                </div>
            </div>
        `;

        document.body.appendChild(controls);

        // Add event listeners
        const playButton = controls.querySelector('.toggle-play');
        const muteButton = controls.querySelector('.toggle-mute');
        const volumeSlider = controls.querySelector('.volume-slider');

        playButton.addEventListener('click', () => this.togglePlay());
        muteButton.addEventListener('click', () => this.toggleMute());
        volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    }

    togglePlay() {
        try {
            const playButton = document.querySelector('.toggle-play i');
            if (this.isPlaying) {
                this.audio.pause();
                playButton.className = 'fas fa-play';
            } else {
                // Add a promise to handle play
                const playPromise = this.audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Audio started playing');
                        playButton.className = 'fas fa-pause';
                    }).catch(error => {
                        console.error('Play error:', error);
                    });
                }
            }
            this.isPlaying = !this.isPlaying;
        } catch (error) {
            console.error('Toggle play error:', error);
        }
    }

    toggleMute() {
        const muteButton = document.querySelector('.toggle-mute i');
        this.audio.muted = !this.audio.muted;
        muteButton.className = this.audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        localStorage.setItem('backgroundMusicMuted', this.audio.muted);
    }

    setVolume(value) {
        this.audio.volume = value;
        localStorage.setItem('backgroundMusicVolume', value);
    }
} 
