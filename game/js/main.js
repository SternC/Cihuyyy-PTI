document.addEventListener("DOMContentLoaded", function() {
    const eventSystem = {
        triggerAreas: [
            { 
                x: 0.76, y: 0.28,
                width: 0.1, height: 0.1,
                content: `
                    <p class="text-xl font-bold">HOUSE</p>
                    <button class="w-full event-btn" data-tooltip="Eat! Eat! Eat! Gain 10 points of hunger">Eat<br>Meal+</button>
                    <button class="w-full event-btn" data-tooltip="Gain 15 sleep points but lose 4 points of hunger">Sleep<br>Rest+ | Meal-</button>
                    <button class="w-full event-btn" data-tooltip="Take a shower! Gain 15 hygiene points">Shower<br>Hygiene+</button>
                    <button class="w-full event-btn" data-tooltip="Relax a bit~  Gain 7 mood points">Have Fun<br>Mood+</button>
                `,
                actions: [
                    () => updateStatusBar('meal', 10),
                    () => {
                        updateStatusBar('sleep', 15);
                        updateStatusBar('meal', -4);
                    },
                    () => updateStatusBar('hygiene', 15),
                    () => updateStatusBar('happy', 7)
                ],
                cooldowns: [10000, 10000, 10000, 10000]
            },
            { 
                x: 0.15, y: 0.20,
                width: 0.1, height: 0.1,
                content: `
                    <p class="text-xl font-bold">KUTA BEACH</p>
                    <button class="w-full event-btn" data-tooltip="Sunbathe to tan your skin~ Gain 4 points of sleep, 8 points of mood, -5 hygiene">Sunbathe<br>Rest+ | Mood+ | Hygiene-</button>
                    <button class="w-full event-btn" data-tooltip="Swim for a while~ Gain 15 points of mood, lose 6 sleep, 7 hygiene, 5 hunger">Swimming<br>Rest- | Meal- | Hygiene- | Mood+</button>
                    <button class="w-full event-btn" data-tooltip="Cooldown a bit~ Needs 150 coins, gain 7 points of hunger" data-cost="150">Buy A Fresh Drink<br>Meal+ (150 coins)</button>
                    <button class="w-full event-btn" data-tooltip="Let's go SAILING! Needs 300 coins, gain 15 points of mood" data-cost="300">Sail Boat<br>Mood+ (300 coins)</button>
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
                    () => {
                        const cost = 150;
                        if (canAfford(cost)) {
                            deductMoney(cost);
                            updateStatusBar('meal', 7);
                        }
                    },
                    () => {
                        const cost = 300;
                        if (canAfford(cost)) {
                            deductMoney(cost);
                            updateStatusBar('happy', 15);
                        }
                    }
                ],
                cooldowns: [10000, 10000, 10000, 10000]
            },
            
            { 
                x: 0.06, y: 0.4,
                width: 0.1, height: 0.1,
                content: `
                    <p class="text-xl font-bold">PRAMBANAN TEMPLE</p>
                    <button class="w-full event-btn" data-tooltip="Pray at the temple for spiritual fulfillment | Gain 5 mood">Worship<br>Mood+</button>
                    <button class="w-full event-btn" data-tooltip="Purchase a lucky charm to boost your spirits | Needs 200 coins, gain 3 mood" data-cost="200">Buy Talisman<br>Mood+ (200 coins)</button>
                    <button class="w-full event-btn" data-tooltip="Explore the ancient temple - tiring but fascinating | Gain 8 mood, lose 7 sleep and 10 hygiene">Explore the Temple<br>Rest- | Mood+ | Hygiene-</button>
                    <button class="w-full event-btn" data-tooltip="Watch the traditional dance performance - tiring but culturally enriching | Gain 6 mood points, lose 5 sleep points">Watching the Ramayana Ballet<br>Rest- | Mood+</button>
                `,
                actions: [
                    () => updateStatusBar('happy', 5),
                    () => {
                        const cost = 200;
                        if (canAfford(cost)) {
                            deductMoney(cost);
                            updateStatusBar('happy', 3);
                        }
                    },
                    () => {
                        updateStatusBar('happy', 8);
                        updateStatusBar('sleep', -7);
                        updateStatusBar('hygiene', -10);
                    },
                    () => {
                        updateStatusBar('happy', 6);
                        updateStatusBar('sleep', -5);
                    }
                ],
                cooldowns: [10000, 10000, 30000, 10000]
            },
            
            { 
                x: 0.36, y: 0.27,
                width: 0.1, height: 0.1,
                content: `
                    <p class="text-xl font-bold">SEMERU MOUNTAIN</p>
                    <button class="w-full event-btn" data-tooltip="Hike up the mountain - exhausting but rewarding | Gain 3 points of mood, lose 5 sleep, 7 hygiene and hunger">Go Uphill<br>Rest- | Meal- | Hygiene- | Mood+</button>
                    <button class="w-full event-btn" data-tooltip="Capture the beautiful scenery | ">Take A Photo<br>Mood+</button>
                    <button class="w-full event-btn" data-tooltip="Set up camp to rest and clean up, but you'll need snacks">Camping<br>Rest+ | Meal- | Hygiene+</button>
                    <button class="w-full event-btn" data-tooltip="Have some snacks to regain energy">Have A Snack<br>Meal+</button>
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
                    () => updateStatusBar('meal', 7)
                ],
                cooldowns: [10000, 10000, 10000, 10000]
            },
            { 
                x: 0.52, y: 0.75,
                width: 0.1, height: 0.1,
                content: `
                    <p class="text-xl font-bold">PINDUL CAVE</p>
                    <button class="w-full event-btn" data-tooltip="Explore the cave system - somewhat restful but you'll need food | GAin 3 points of mood, 4 points of sleep, lose 4 points of hunger">Explore the Cave<br>Rest+ | Meal- | Mood+</button>
                    <button class="w-full event-btn" data-tooltip="Take pictures of the unique cave formations | Gain 3 points of mood">Take A Photo<br>Mood+</button>
                    <button class="w-full event-btn" data-tooltip="Float through the cave on a tube - dirty but fun | Gain 11 points of mood, lose 6 points of hygiene">Cave Tubing<br>Hygiene- | Mood+Hygiene+</button>
                    <button class="w-full event-btn" data-tooltip="Swim in the cave waters - refreshing but tiring | Lose 7 points of hunger, lose 3 points of sleep">Swimming<br>Rest- | Meal-</button>
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
                ],
                cooldowns: [10000, 10000, 10000, 10000]
            }
        ],
        
        currentArea: null,
        activeCooldowns: new Map(),
        cooldownIntervals: new Map(),
        
        init() {
            this.eventContainer = document.querySelector('.event');
            this.clearEvent();
            this.setupTooltips();
        },
        
        setupTooltips() {
            const tooltip = document.createElement('div');
            tooltip.id = 'event-tooltip';
            tooltip.className = 'hidden absolute z-50 p-2 bg-gray-800 text-white text-sm rounded pointer-events-none';
            document.body.appendChild(tooltip);
    
            document.addEventListener('mouseover', (e) => {
                if (e.target.classList.contains('event-btn') && e.target.dataset.tooltip) {
                    const btn = e.target;
                    const tooltipText = btn.dataset.tooltip;
                    
                    tooltip.textContent = tooltipText;
                    tooltip.classList.remove('hidden');
                    
                    const btnRect = btn.getBoundingClientRect();
                    tooltip.style.left = `${btnRect.left + window.scrollX}px`;
                    tooltip.style.top = `${btnRect.top + window.scrollY - tooltip.offsetHeight - 5}px`;
                }
            });
    
            document.addEventListener('mouseout', (e) => {
                if (e.target.classList.contains('event-btn')) {
                    tooltip.classList.add('hidden');
                }
            });
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
                
                const buttons = this.eventContainer.querySelectorAll('.event-btn');
                buttons.forEach((btn, index) => {
                    const cooldownKey = `${this.currentArea.x}-${this.currentArea.y}-${index}`;
                    
                    if (this.activeCooldowns.has(cooldownKey)) {
                        const remaining = this.activeCooldowns.get(cooldownKey) - Date.now();
                        if (remaining > 0) {
                            this.applyCooldown(btn, remaining, this.currentArea.cooldowns[index]);
                            return;
                        } else {
                            this.activeCooldowns.delete(cooldownKey);
                        }
                    }
                    
                    btn.addEventListener('click', () => {
                        const cost = parseInt(btn.dataset.cost) || 0;
                        if (cost > 0 && !canAfford(cost)) {
                            return;
                        }
                        
                        this.currentArea.actions[index]();
                        
                        Object.keys(statusBars).forEach(status => {
                            updateStatusBar(status);
                        });
                        
                        this.startCooldown(btn, index, cooldownKey);
                    });
                });
            }
        },
        
        startCooldown(button, index, cooldownKey) {
            const cooldownDuration = this.currentArea.cooldowns[index];
            const endTime = Date.now() + cooldownDuration;
            
            button.disabled = true;
            button.classList.add('cooldown-active');
            
            this.activeCooldowns.set(cooldownKey, endTime);
            
            const originalHTML = button.innerHTML;
            const updateInterval = setInterval(() => {
                const remaining = Math.max(0, endTime - Date.now());
                
                if (remaining <= 0) {
                    clearInterval(updateInterval);
                    this.endCooldown(button, originalHTML, cooldownKey);
                } else {
                    const seconds = Math.ceil(remaining / 1000);
                    button.innerHTML = `${originalHTML.split('<br>')[0]}<br>(${seconds}s)`;
                }
            }, 100);
            
            this.cooldownIntervals.set(cooldownKey, updateInterval);
        },
        
        endCooldown(button, originalHTML, cooldownKey) {
            button.disabled = false;
            button.classList.remove('cooldown-active');
            button.innerHTML = originalHTML;
            this.activeCooldowns.delete(cooldownKey);
            this.cooldownIntervals.delete(cooldownKey);
        },
        
        applyCooldown(button, remaining, cooldownDuration) {
            const originalHTML = button.innerHTML.split('<br>')[0];
            const seconds = Math.ceil(remaining / 1000);
            
            button.disabled = true;
            button.classList.add('cooldown-active');
            button.innerHTML = `${originalHTML}<br>(${seconds}s)`;
        },
        
        clearEvent() {
            this.cooldownIntervals.forEach(interval => clearInterval(interval));
            this.cooldownIntervals.clear();
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
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
        }
    
        const mapRect = map.getBoundingClientRect();
        const charRect = character.getBoundingClientRect();
    
        let newTop = position.top;
        let newLeft = position.left;
        let didMove = false;
    
        switch (event.key.toLowerCase()) {
            case "w":
            case "arrowup":
                if (charRect.top - step > mapRect.top) {
                    newTop -= step;
                    didMove = true;
                } else {
                    newTop += bounceBack;
                }
                break;
            case "s":
            case "arrowdown":
                if (charRect.bottom + step < mapRect.bottom) {
                    newTop += step;
                    didMove = true;
                } else {
                    newTop -= bounceBack;
                }
                break;
            case "a":
            case "arrowleft":
                if (charRect.left - step > mapRect.left) {
                    newLeft -= step;
                    didMove = true;
                } else {
                    newLeft += bounceBack;
                }
                break;
            case "d":
            case "arrowright":
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
        
        const event = new KeyboardEvent('keydown', { 
            key: activeDirection,
            bubbles: true,
            cancelable: true
        });
        
        document.dispatchEvent(event);
        playerMoving = true;
        lastMoveTime = Date.now();
    }

    function startMovement(direction) {
        let key;
        switch(direction) {
            case 'up': key = 'ArrowUp'; break;
            case 'left': key = 'ArrowLeft'; break;
            case 'down': key = 'ArrowDown'; break;
            case 'right': key = 'ArrowRight'; break;
            default: key = direction;
        }
        
        activeDirection = key;
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
            
            if (arrow.classList.contains('-rotate-90')) startMovement('up');
            else if (arrow.classList.contains('rotate-180')) startMovement('left');
            else if (arrow.classList.contains('rotate-90')) startMovement('down');
            else startMovement('right');
        });
        
        button.addEventListener('mouseup', stopMovement);
        button.addEventListener('mouseleave', stopMovement);
        
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const arrow = this.querySelector('img');
            if (!arrow) return;
            
            if (arrow.classList.contains('-rotate-90')) startMovement('up');
            else if (arrow.classList.contains('rotate-180')) startMovement('left');
            else if (arrow.classList.contains('rotate-90')) startMovement('down');
            else startMovement('right');
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



        let money = 5000;
        localStorage.setItem('gameMoney', money);
        
        updateMoneyDisplay(money);

        function canAfford(amount) {
            const currentMoney = parseInt(localStorage.getItem('gameMoney')) || 0;
            if (currentMoney >= amount) {
                return true;
            }
            alert(`Not enough coins! You need ${amount} coins for this action.`);
            return false;
        }
        
        function deductMoney(amount) {
            const currentMoney = parseInt(localStorage.getItem('gameMoney')) || 0;
            const newAmount = currentMoney - amount;
            localStorage.setItem('gameMoney', newAmount);
            updateMoneyDisplay(newAmount);
        }
        
        let lastUpdate = localStorage.getItem('lastMoneyUpdate');
        let timer;
        
        if (lastUpdate) {
            const now = new Date().getTime();
            const diff = now - parseInt(lastUpdate);
            const threeMinutes = 3 * 60 * 1000;
            
            if (diff >= threeMinutes) {
                const increments = Math.floor(diff / threeMinutes);
                money += increments * 100;
                localStorage.setItem('gameMoney', money);
                localStorage.setItem('lastMoneyUpdate', now.toString());
                updateMoneyDisplay(money);
            }
            
            const timeUntilNext = threeMinutes - (diff % threeMinutes);
            timer = setTimeout(startMoneyTimer, timeUntilNext);
        } else {
            localStorage.setItem('lastMoneyUpdate', new Date().getTime().toString());
            timer = setTimeout(startMoneyTimer, 3 * 60 * 1000);
        }
        
        function startMoneyTimer() {
            money += 100;
            localStorage.setItem('gameMoney', money);
            updateMoneyDisplay(money);
            
            localStorage.setItem('lastMoneyUpdate', new Date().getTime().toString());
            
            timer = setTimeout(startMoneyTimer, 3 * 60 * 1000);
        }
        
        function updateMoneyDisplay(amount) {
            document.querySelector('.money .jumlah').textContent = amount;
            localStorage.setItem('gameMoney', amount);
        }
});

