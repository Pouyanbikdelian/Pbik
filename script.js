let birdSpeed = 10; // Starting speed for birds (in seconds)
let birdCreationInterval = 2000; // Starting interval for bird creation (in milliseconds)
let birdCount = 0; // Count of birds successfully shot
let gameInterval, birdCreationTimer; // Variables to hold the intervals

// Generate birds in the game area
function createBird() {
    const gameArea = document.getElementById('gameArea');
    const bird = document.createElement('div');
    bird.className = 'bird';
    
    // Set random vertical position
    bird.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    bird.style.right = '-50px'; // Start the bird off-screen
    
    // Apply the initial speed and animation
    bird.style.animation = `fly ${birdSpeed}s linear forwards`;
    
    // Add the bird to the game area
    gameArea.appendChild(bird);

    // Bird click behavior
    bird.onclick = function() {
        birdCount++; // Increase bird count when a bird is clicked
        updateBirdCount();

        // Random behavior: some birds disappear immediately, some fall
        const behaviorType = Math.random() < 0.5 ? 'fall' : 'disappear';

        if (behaviorType === 'disappear') {
            // Bird disappears right away
            this.remove();
        } else {
            // Bird falls down
            this.style.animation = 'none'; // Stop the bird from flying further
            this.style.right = this.offsetLeft + 'px'; // Fix the position

            // Randomize fall animation type for fun
            const fallType = Math.random() < 0.5 ? 'rotateFall' : 'spinFall';

            if (fallType === 'rotateFall') {
                // Apply a rotating fall effect
                this.style.transition = 'top 2s ease-in, transform 2s ease-in';
                this.style.transform = 'rotate(360deg)';
            } else {
                // Apply a spinning fall effect
                this.style.transition = 'top 2s ease-in, transform 2s ease-in';
                this.style.transform = 'rotate(720deg) scale(1.2)';
            }

            // Move the bird to the bottom of the screen (fall)
            this.style.top = (window.innerHeight - this.clientHeight) + 'px';

            // Create explosion effect after fall
            setTimeout(() => {
                if (this.parentNode) {
                    const explosion = document.createElement('div');
                    explosion.className = 'explosion';
                    explosion.style.top = this.style.top;
                    explosion.style.left = this.style.left;
                    gameArea.appendChild(explosion);

                    setTimeout(() => explosion.remove(), 1000); // Remove explosion after 1 second
                    this.remove(); // Remove bird after the fall
                }
            }, 2000); // Fall duration is 2 seconds
        }
    };
}

// Continuously create birds at increasing difficulty
function startGame() {
    birdCount = 0; // Reset bird count at the start of each game
    updateBirdCount();

    birdCreationTimer = setInterval(() => {
        createBird();
        // Increase the speed of the birds every 10 seconds to increase difficulty
        birdSpeed -= 0.5;
        if (birdSpeed < 3) birdSpeed = 3; // Limit minimum speed to prevent birds from becoming too fast
    }, birdCreationInterval);

    // Gradually decrease the bird creation interval for more frequent bird creation
    gameInterval = setInterval(() => {
        birdCreationInterval -= 200;
        if (birdCreationInterval < 1000) birdCreationInterval = 1000; // Limit minimum interval to 1 second
    }, 10000); // Every 10 seconds
}

// Update the displayed bird count
function updateBirdCount() {
    document.getElementById('birdCounter').textContent = "Works done: " + birdCount;
}

// Reset the game every 30 seconds
function restartGame() {
    clearInterval(birdCreationTimer);
    clearInterval(gameInterval);

    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = ''; // Clear all birds from the game area

    birdSpeed = 10; // Reset bird speed
    birdCreationInterval = 2000; // Reset bird creation interval
    startGame(); // Restart the game
}

// Start the game and set the timer to restart it every 30 seconds
startGame();
setInterval(restartGame, 45000); // Restart the game every 30 seconds






