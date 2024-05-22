const dayNightSwitch = document.getElementById('day-night-switch');
const appContent = document.querySelector('.app-content');
const playPauseBtn = document.querySelector('.play-pause-btn');
const volumeSlider = document.querySelector('.volume-slider');
const waterReminderBtn = document.querySelector('.set-reminder-btn');
const waterIntakeDisplay = document.querySelector('.water-intake-display');
const focusTimerDisplay = document.querySelector('.timer-display');
const focusStartStopBtn = document.querySelector('.start-stop-btn');
const alertMessageInput = document.querySelector('.alert-message-input');
const setAlertBtn = document.querySelector('.set-alert-btn');

const musicIcon = document.getElementById('music-icon');
const musicPlayerContainer = document.getElementById('music-player-container');
const waterIcon = document.getElementById('water-icon');
const waterReminderContainer = document.getElementById('water-reminder-container');
const focusIcon = document.getElementById('focus-icon');
const focusAssistContainer = document.getElementById('focus-assist-container');
const alertIcon = document.getElementById('alert-icon');
const alertsContainer = document.getElementById('alerts-container');
const userIcon = document.getElementById('user-icon');
const socialLinksContainer = document.getElementById('social-links-container');

const minimizeBtns = document.querySelectorAll('.minimize-btn');

const svgRec = document.getElementById('svg-rec');
const iconsContainer = document.querySelector('.icons-container');

const appHeader = document.getElementById('app-header');

let audioPlayer;
let isPlaying = false;
let intervalId;
let focusTimerRunning = false;
let waterIntakeGoal = 64; // 64 oz per day
let waterIntakeCurrent = 0;
let backgroundSoundVolume = 0.5;
let alertMessage = '';
let hideHeaderTimeout;
let hideSvgTimeout;

// Function to hide the header
function hideHeader() {
    appHeader.classList.add('hidden');
}

// Function to show the header
function showHeader() {
    appHeader.classList.remove('hidden');
    clearTimeout(hideHeaderTimeout);
    hideHeaderTimeout = setTimeout(hideHeader, 10000); // Hide header after 10 seconds of inactivity
}

// Event listeners for user activity
document.addEventListener('mousemove', showHeader);
document.addEventListener('keydown', showHeader);
document.addEventListener('click', showHeader);
document.addEventListener('scroll', showHeader);

// Hide header initially after 10 seconds of inactivity
hideHeaderTimeout = setTimeout(hideHeader, 10000);

// Function to hide the SVG rectangle and icons
function hideSvg() {
    svgRec.classList.add('hidden');
    iconsContainer.classList.add('hidden');
}

// Function to show the SVG rectangle and icons
function showSvg() {
    svgRec.classList.remove('hidden');
    iconsContainer.classList.remove('hidden');
    clearTimeout(hideSvgTimeout);
    hideSvgTimeout = setTimeout(hideSvg, 10000); // Hide SVG rectangle and icons after 10 seconds of inactivity
}

// Event listeners for user activity
document.addEventListener('mousemove', showSvg);
document.addEventListener('keydown', showSvg);
document.addEventListener('click', showSvg);
document.addEventListener('scroll', showSvg);

// Hide SVG rectangle and icons initially after 10 seconds of inactivity
hideSvgTimeout = setTimeout(hideSvg, 10000);

// Event listeners for icon clicks
musicIcon.addEventListener('click', () => {
    hideAllContainers();
    musicPlayerContainer.classList.toggle('show');
    showHeader();
    showSvg();
});

waterIcon.addEventListener('click', () => {
    hideAllContainers();
    waterReminderContainer.classList.toggle('show');
    showHeader();
    showSvg();
});

focusIcon.addEventListener('click', () => {
    hideAllContainers();
    focusAssistContainer.classList.toggle('show');
    showHeader();
    showSvg();
});

alertIcon.addEventListener('click', () => {
    hideAllContainers();
    alertsContainer.classList.toggle('show');
    showHeader();
    showSvg();
});

userIcon.addEventListener('click', () => {
    hideAllContainers();
    socialLinksContainer.classList.toggle('show');
    showHeader();
    showSvg();
});

// Event listeners for minimize buttons
minimizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const container = btn.closest('.music-player-container, .water-reminder-container, .focus-assist-container, .alerts-container, .social-links-container');
        container.classList.remove('show');
        showHeader();
        showSvg();
    });
});

// Function to hide all pop-up containers
function hideAllContainers() {
    musicPlayerContainer.classList.remove('show');
    waterReminderContainer.classList.remove('show');
    focusAssistContainer.classList.remove('show');
    alertsContainer.classList.remove('show');
    socialLinksContainer.classList.remove('show');
}

// Day/Night Mode Toggle
dayNightSwitch.addEventListener('change', () => {
    if (dayNightSwitch.checked) {
        appContent.style.backgroundColor = 'var(--night-bg-color)';
        appContent.style.color = 'var(--text-color-night)';
    } else {
        appContent.style.backgroundColor = 'var(--day-bg-color)';
        appContent.style.color = 'var(--text-color-day)';
    }
});

// Music Player
function initializeAudioPlayer() {
    audioPlayer = new Audio();
    audioPlayer.src = 'lofi-1.mp3';
    audioPlayer.loop = true;
    audioPlayer.volume = 0.5; // Set the initial volume to 50%
}

// Toggle the music player
function toggleMusicPlayer() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

// Add event listeners
playPauseBtn.addEventListener('click', toggleMusicPlayer);

// Volume slider functionality
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

// Initialize the audio player
initializeAudioPlayer();

// Water Reminder
waterReminderBtn.addEventListener('click', () => {
    waterIntakeCurrent += 8; // 8 oz per glass
    waterIntakeDisplay.textContent = `${waterIntakeCurrent} oz`;

    if (waterIntakeCurrent >= waterIntakeGoal) {
        alert('You have reached your daily water intake goal!');
        waterIntakeCurrent = 0;
    }
});

// Focus Assist
function startFocusTimer() {
    let timeLeft = 25 * 60; // 25 minutes
    focusTimerDisplay.textContent = formatTime(timeLeft);

    intervalId = setInterval(() => {
        timeLeft--;
        focusTimerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft === 0) {
        clearInterval(intervalId);
        alert('Time for a break!');
        }
    }, 1000);
}

function stopFocusTimer() {
    clearInterval(intervalId);
    focusTimerDisplay.textContent = '25:00';
}

// Background Sounds
let backgroundAudio;

soundDropdown.addEventListener('change', () => {
    if (backgroundAudio) {
        backgroundAudio.pause();
    }
    backgroundAudio = new Audio(`${soundDropdown.value}.mp3`);
    backgroundAudio.loop = true;
    backgroundAudio.volume = backgroundSoundVolume;
    backgroundAudio.play();
});

soundVolumeSlider.addEventListener('input', () => {
    backgroundSoundVolume = soundVolumeSlider.value;
    if (backgroundAudio) {
        backgroundAudio.volume = backgroundSoundVolume;
    }
});

// Alerts
setAlertBtn.addEventListener('click', () => {
    alertMessage = alertMessageInput.value;
    if (alertMessage) {
        alert(alertMessage);
        alertMessageInput.value = '';
    }
});

// Add-ons
installAddonBtn.addEventListener('click', () => {
    alert('Installing add-on...');
    // Add your custom add-on installation logic here
});
