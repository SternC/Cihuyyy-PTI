document.addEventListener("DOMContentLoaded", function() {
    const eventSystem = {
        triggerAreas: [
            { 
                x: 0.76, y: 0.28,
                width: 0.1, height: 0.1,
                content: `
                    <p class="text-xl font-bold">HOUSE</p>
                    <button class="w-full">Eat<br>Meal+</button>
                    <button class="w-full">Sleep<br>Rest+ | Meal-</button>
                    <button class="w-full">Shower<br>Hygiene+</button>
                    <button class="w-full">Have Fun<br>Mood+</button>
                `,
                actions: [
                    () => updateStatusBar('meal', 10),
                    () => {
                        updateStatusBar('sleep', 15);
                        updateStatusBar('meal', -4);
                    },
                    () => updateStatusBar('hygiene', 15),
                    () => updateStatusBar('happy', 7)
                ]
            },

            { 
                x: 0.15, y: 0.20,
                width: 0.1, height: 0.1,
                content: `
                    <p class="text-xl font-bold">KUTA BEACH</p>
                    <button class="w-full">Sunbathe<br>Rest+ | Mood+ | Hygiene-</button>
                    <button class="w-full">Swimming<br>Rest- | Meal- | Hygiene- | Mood+</button>
                    <button class="w-full">Buy A Fresh Drink<br>Meal+</button>
                    <button class="w-full">Sail Boat<br>Mood+</button>
                `,
                actions: [
                    () => {
                        updateStatusBar('sleep', 4);
                        updateStatusBar('happy', 8);
                        updateStatusBar('hygiene', -5);

                    },
                    () => {
                        updateStatusBar('sleep', -6);
                        updateStatusBar('happy', 15);
                        updateStatusBar('hygiene', -7);
                        updateStatusBar('meal', -5);

                    },
                    () => updateStatusBar('meal', 7),
                    () => updateStatusBar('happy', 15)
                        
                ]
            },

            { 
                x: 0.06, y: 0.4,
                width: 0.1, height: 0.1,
                content: `
                    <p class="text-xl font-bold">PRAMBANAN TEMPLE</p>
                    <button class="w-full">Worship<br>Mood+</button>
                    <button class="w-full">Buy Talisman<br>Mood+</button>
                    <button class="w-full">Explore the Temple<br>Rest- | Mood+ | Hygiene-</button>
                    <button class="w-full">Watching the Ramayana Ballet<br>Rest- | Mood+</button>
                `,
                actions: [
                    () => updateStatusBar('happy', 5),
                    () => updateStatusBar('happy', 3),
                    () => {
                        updateStatusBar('happy', 8);
                        updateStatusBar('sleep', -7);
                        updateStatusBar('hygiene', -10);

                    },
                    () => {
                        updateStatusBar('happy', 6);
                        updateStatusBar('sleep', -5);
                    },
                ]
            },

            { 
                x: 0.36, y: 0.27,
                width: 0.1, height: 0.1,
                content: `
                    <p class="text-xl font-bold">SEMERU MOUNTAIN</p>
                    <button class="w-full">Go Uphill<br>Rest- | Meal- | Hygiene- | Mood+</button>
                    <button class="w-full">Take A Photo<br>Mood+</button>
                    <button class="w-full">Camping<br>Rest+ | Meal- | Hygiene+</button>
                    <button class="w-full">Have A Snack<br>Meal+</button>
                `,
                actions: [
                    () => {
                        updateStatusBar('happy', 3);
                        updateStatusBar('sleep', -5);
                        updateStatusBar('hygiene', -7);
                        updateStatusBar('meal', -7);
                    },
                    () => updateStatusBar('happy', 4),
                    () => {
                        updateStatusBar('sleep', 11);
                        updateStatusBar('meal', -3);
                        updateStatusBar('hygiene', 7);

                    },
                    () => updateStatusBar('meal', 7),
                ]
            },

            { 
                x: 0.52, y: 0.75,
                width: 0.1, height: 0.1,
                content: `
                    <p class="text-xl font-bold">PINDUL CAVE</p>
                    <button class="w-full">Explore the Cave<br>Rest+ | Meal- | Mood+</button>
                    <button class="w-full">Take A Photo<br>Mood+</button>
                    <button class="w-full">Cave Tubing<br>Hygiene- | Mood+Hygiene+</button>
                    <button class="w-full">Swimming<br>Rest- | Meal-</button>
                `,
                actions: [
                    () => {
                        updateStatusBar('happy', 3);
                        updateStatusBar('sleep', 4);
                        updateStatusBar('meal', -4);
                    },
                    () => updateStatusBar('happy', 3),
                    () => {
                        updateStatusBar('happy', 11);
                        updateStatusBar('hygiene', -6);
                    },
                    () => {
                        updateStatusBar('meal', -7);
                        updateStatusBar('sleep', -3);
                    }
                ]
            }
        ],
        
        currentArea: null,
        
        init() {
            this.eventContainer = document.querySelector('.event');
            this.clearEvent();
        },
        
        checkPosition(playerX, playerY) {
            let foundArea = null;
            
            this.triggerAreas.forEach(area => {
                if (playerX >= area.x && 
                    playerX <= area.x + area.width &&
                    playerY >= area.y && 
                    playerY <= area.y + area.height) {
                    foundArea = area;
                }
            });
            
            if (foundArea !== this.currentArea) {
                this.currentArea = foundArea;
                this.updateEventDisplay();
            }
        },
        
    updateEventDisplay() {
        this.clearEvent();
        
        if (this.currentArea) {
            this.eventContainer.innerHTML = this.currentArea.content;
            
            const buttons = this.eventContainer.querySelectorAll('button');
            buttons.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    this.currentArea.actions[index]();

                    Object.keys(statusBars).forEach(status => {
                        updateStatusBar(status);
                    });
                });
            });
        }
    },
        
        clearEvent() {
            this.eventContainer.innerHTML = '';
        }
    };

    eventSystem.init();

    function checkEventTrigger() {
        const mapRect = map.getBoundingClientRect();
        const charRect = character.getBoundingClientRect();
        
        const playerX = (charRect.left + charRect.width/2 - mapRect.left) / mapRect.width;
        const playerY = (charRect.top + charRect.height/2 - mapRect.top) / mapRect.height;
        
        eventSystem.checkPosition(playerX, playerY);
    }

    setInterval(checkEventTrigger, 500);

    let charName = localStorage.getItem("characterName") || "Unknown Hero";
    let charImage = localStorage.getItem("selectedCharacter") || "props/char1.webp";
    
    document.getElementById("charName").textContent = charName;
    document.getElementById("charImage").src = charImage;

    let hp = 3;
    const hpHearts = document.querySelectorAll('.hp img');
    let statusDebounce = false; 

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
                    statusBars[status].value = 50;
                    statusBars[status].wasZero = true;
                    
                    // PERBAIKAN: Reset visual style
                    const element = statusBars[status].element;
                    element.style.opacity = '1'; 
                    element.style.backgroundColor = '#ffa500';
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

function updateStatusBar(status, value = null) {
    if (value !== null) {
        statusBars[status].value = Math.max(0, Math.min(100, statusBars[status].value + value));
    }

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
    
    initStatusBars();
    updateTimeline();
    setInterval(updateTimeline, 1000);
});