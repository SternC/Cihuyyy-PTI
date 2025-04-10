document.addEventListener("DOMContentLoaded", function() {
    // ======================
    // 1. CHARACTER INITIALIZATION
    // ======================
    let charName = localStorage.getItem("characterName") || "Unknown Hero";
    let charImage = localStorage.getItem("selectedCharacter") || "props/char1.webp";
    
    document.getElementById("charName").textContent = charName;
    document.getElementById("charImage").src = charImage;

    // ======================
    // 2. HP SYSTEM
    // ======================
    let hp = 3; // Start with 3 hearts
    const hpHearts = document.querySelectorAll('.hp img');
    let statusDebounce = false; // Prevents multiple HP loss in quick succession

    function updateHPDisplay() {
        hpHearts.forEach((heart, index) => {
            heart.style.visibility = index < hp ? 'visible' : 'hidden';
        });
    }

    function decreaseHP() {
        if (hp > 0 && !statusDebounce) {
            statusDebounce = true;
            hp--;
            updateHPDisplay();
            
            if (hp <= 0) {
                gameOver();
            }
            
            // Reset debounce after 1 second
            setTimeout(() => {
                statusDebounce = false;
            }, 1000);
        }
    }

    function gameOver() {
        alert("Game Over! All your HP has been depleted.");
        window.location.href = "start.html";
    }

    updateHPDisplay();

    // ======================
    // 3. MOVEMENT SYSTEM (WASD)
    // ======================
    const character = document.querySelector(".character-info");
    const map = document.querySelector(".map");
    let position = { top: 50, left: 50 };
    let step = 2;
    let bounceBack = 2;
    
    let playerMoving = false;
    let lastMoveTime = Date.now();
    const idleTime = 1000;

    function handleMovement(event) {
        const mapRect = map.getBoundingClientRect();
        const charRect = character.getBoundingClientRect();

        let newTop = position.top;
        let newLeft = position.left;
        let didMove = false;

        switch (event.key.toLowerCase()) {
            case "w":
                if (charRect.top - step > mapRect.top) {
                    newTop -= step;
                    didMove = true;
                } else {
                    newTop += bounceBack;
                }
                break;
            case "s":
                if (charRect.bottom + step < mapRect.bottom) {
                    newTop += step;
                    didMove = true;
                } else {
                    newTop -= bounceBack;
                }
                break;
            case "a":
                if (charRect.left - step > mapRect.left) {
                    newLeft -= step;
                    didMove = true;
                } else {
                    newLeft += bounceBack;
                }
                break;
            case "d":
                if (charRect.right + step < mapRect.right) {
                    newLeft += step;
                    didMove = true;
                } else {
                    newLeft -= bounceBack;
                }
                break;
            default:
                return;
        }

        character.style.transition = "top 0.05s ease-out, left 0.05s ease-out";
        character.style.top = `${newTop}%`;
        character.style.left = `${newLeft}%`;
        position = { top: newTop, left: newLeft };
        
        if (didMove) {
            playerMoving = true;
            lastMoveTime = Date.now();
            
            document.querySelectorAll('.progressBar').forEach(bar => {
                bar.style.boxShadow = "0 0 10px rgba(255,255,255,0.5)";
            });
        }
    }

    document.addEventListener("keydown", handleMovement);

    setInterval(function() {
        if (playerMoving && (Date.now() - lastMoveTime > idleTime)) {
            playerMoving = false;
            
            document.querySelectorAll('.progressBar').forEach(bar => {
                bar.style.boxShadow = "none";
            });
        }
    }, 100);

    // ======================
    // 4. DIRECTIONAL BUTTONS (WASD)
    // ======================
    let activeDirection = null;
    let movementInterval = null;

    function processMovement() {
        if (!activeDirection) return;
        document.dispatchEvent(new KeyboardEvent('keydown', { key: activeDirection }));
        playerMoving = true;
        lastMoveTime = Date.now();
    }

    function startMovement(direction) {
        activeDirection = direction;
        if (!movementInterval) {
            processMovement();
            movementInterval = setInterval(processMovement, 100);
        }
        playerMoving = true;
        lastMoveTime = Date.now();
    }

    function stopMovement() {
        activeDirection = null;
        clearInterval(movementInterval);
        movementInterval = null;
    }

    document.querySelectorAll('.direction button').forEach(button => {
        button.addEventListener('mousedown', function() {
            const arrow = this.querySelector('img');
            if (!arrow) return;
            
            if (arrow.classList.contains('-rotate-90')) startMovement('w');
            else if (arrow.classList.contains('rotate-180')) startMovement('a');
            else if (arrow.classList.contains('rotate-90')) startMovement('s');
            else startMovement('d');
        });
        
        button.addEventListener('mouseup', stopMovement);
        button.addEventListener('mouseleave', stopMovement);
        
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const arrow = this.querySelector('img');
            if (!arrow) return;
            
            if (arrow.classList.contains('-rotate-90')) startMovement('w');
            else if (arrow.classList.contains('rotate-180')) startMovement('a');
            else if (arrow.classList.contains('rotate-90')) startMovement('s');
            else startMovement('d');
        });
        
        button.addEventListener('touchend', stopMovement);
    });

    // ======================
    // 5. STATUS BARS SYSTEM WITH HP CHECK AND RECOVERY
    // ======================
    const statusBars = {
        meal: { 
            value: 50, 
            element: null, 
            idleDrain: 0.2,
            activeDrain: 1,
            wasZero: false
        },
        sleep: { 
            value: 50, 
            element: null, 
            idleDrain: 0.15, 
            activeDrain: 0.7,
            wasZero: false
        },
        hygiene: { 
            value: 50, 
            element: null, 
            idleDrain: 0.1, 
            activeDrain: 0.5,
            wasZero: false
        },
        happy: { 
            value: 50, 
            element: null, 
            idleDrain: 0.07, 
            activeDrain: 0.3,
            wasZero: false
        }
    };

    function initStatusBars() {
        Object.keys(statusBars).forEach(status => {
            statusBars[status].element = document.querySelector(`.progressBar[data-status="${status}"]`);
            updateStatusBar(status);
        });
    }

    function checkStatusForHP() {
        let anyStatusZero = false;
        
        Object.keys(statusBars).forEach(status => {
            if (statusBars[status].value <= 0) {
                if (!statusBars[status].wasZero) {
                    decreaseHP();
                    statusBars[status].value = 50; // Restore to 50%
                    statusBars[status].wasZero = true;
                    
                    // PERBAIKAN: Reset visual style
                    const element = statusBars[status].element;
                    element.style.opacity = '1'; // Reset opacity
                    element.style.backgroundColor = '#ffa500'; // Force orange color
                    element.style.animation = 'pulse 0.5s';
                    
                    setTimeout(() => {
                        element.style.animation = '';
                    }, 500);
                }
                anyStatusZero = true;
            } else {
                statusBars[status].wasZero = false;
            }
        });
        
        return anyStatusZero;
    }

    setInterval(function() {
        Object.keys(statusBars).forEach(status => {
            let drainAmount = playerMoving ? statusBars[status].activeDrain : statusBars[status].idleDrain;
            statusBars[status].value = Math.max(0, statusBars[status].value - drainAmount);
            updateStatusBar(status);
        });
        
        checkStatusForHP();
    }, 1000);

    function updateStatusBar(status) {
        const bar = statusBars[status];
        const roundedValue = Math.round(bar.value);
        
        bar.element.style.width = `${roundedValue}%`;
        bar.element.setAttribute('data-value', roundedValue);
        
        if(roundedValue <= 0) {
            bar.element.style.opacity = '0.5';
            bar.element.style.backgroundColor = '#ff0000';
        } 
        else if(roundedValue <= 20) {
            bar.element.style.opacity = '1';
            bar.element.style.backgroundColor = '#ff0000';
        } 
        else if(roundedValue <= 50) {
            bar.element.style.backgroundColor = '#ffa500';
        } 
        else {
            bar.element.style.backgroundColor = '#00ff00';
        }
    }

    // ======================
    // 6. GAME TIMELINE
    // ======================
    const greetingElement = document.querySelector('.timeline p:first-child');
    const timeElement = document.querySelector('.timeline p:last-child');
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const loginTime = new Date();
    const timeAcceleration = 20;
    
    function updateTimeline() {
        const now = new Date();
        const elapsedGameMs = (now - loginTime) * timeAcceleration;
        const gameTime = new Date(loginTime.getTime() + elapsedGameMs);
        
        const hours = gameTime.getHours();
        let greeting = "Good night";
        if (hours >= 5 && hours < 12) greeting = "Good morning";
        else if (hours >= 12 && hours < 18) greeting = "Good afternoon";
        else if (hours >= 18 && hours < 22) greeting = "Good evening";
        
        timeElement.textContent = `${days[gameTime.getDay()]}, ${gameTime.getDate()} ${months[gameTime.getMonth()]} ${gameTime.getFullYear()} | ${String(gameTime.getHours()).padStart(2, '0')}.${String(gameTime.getMinutes()).padStart(2, '0')}`;
        greetingElement.textContent = greeting;
    }
    
    // ======================
    // INITIALIZE ALL SYSTEMS
    // ======================
    initStatusBars();
    updateTimeline();
    setInterval(updateTimeline, 1000);
});