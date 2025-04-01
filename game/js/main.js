document.addEventListener("DOMContentLoaded", function () {
    let charName = localStorage.getItem("characterName") || "Unknown Hero";
    let charImage = localStorage.getItem("selectedCharacter") || "props/char1.webp";

    document.getElementById("charName").textContent = charName;
    document.getElementById("charImage").src = charImage;

    const character = document.querySelector(".character-info");
    const map = document.querySelector(".map");

    let position = { top: 50, left: 50 };
    let step = 2;
    let bounceBack = 2;

    document.addEventListener("keydown", function (event) {
        const mapRect = map.getBoundingClientRect();
        const charRect = character.getBoundingClientRect();

        const charHalfWidth = charRect.width / 2;
        const charHalfHeight = charRect.height / 2;

        let newTop = position.top;
        let newLeft = position.left;

        switch (event.key) {
            case "ArrowUp":
            case "w":
                if (charRect.top - step > mapRect.top) {
                    newTop -= step;
                } else {
                    newTop += bounceBack;
                }
                break;
            case "ArrowDown":
            case "s":
                if (charRect.bottom + step < mapRect.bottom) {
                    newTop += step;
                } else {
                    newTop -= bounceBack;
                }
                break;
            case "ArrowLeft":
            case "a":
                if (charRect.left - step > mapRect.left) {
                    newLeft -= step;
                } else {
                    newLeft += bounceBack;
                }
                break;
            case "ArrowRight":
            case "d":
                if (charRect.right + step < mapRect.right) {
                    newLeft += step;
                } else {
                    newLeft -= bounceBack;
                }
                break;
        }

        character.style.transition = "top 0.05s ease-out, left 0.05s ease-out";
        character.style.top = `${newTop}%`;
        character.style.left = `${newLeft}%`;

        position.top = newTop;
        position.left = newLeft;
    });
});

let activeDirection = null;
let movementInterval = null;

function processMovement() {
    if (!activeDirection) return;
    
    const event = new KeyboardEvent('keydown', { key: activeDirection });
    document.dispatchEvent(event);
}

function startMovement(direction) {
    activeDirection = direction;
    if (!movementInterval) {
        processMovement();
        movementInterval = setInterval(processMovement, 100);
    }
}

function stopMovement() {
    activeDirection = null;
    if (movementInterval) {
        clearInterval(movementInterval);
        movementInterval = null;
    }
}

document.querySelectorAll('.direction button').forEach(button => {
    button.addEventListener('mousedown', function() {
        const arrow = this.querySelector('img');
        if (!arrow) return;
        
        if (arrow.classList.contains('-rotate-90')) {  
            startMovement('ArrowUp');
        } 
        else if (arrow.classList.contains('rotate-180')) {  
            startMovement('ArrowLeft');
        }
        else if (arrow.classList.contains('rotate-90')) {  
            startMovement('ArrowDown');
        }
        else { 
            startMovement('ArrowRight');
        }
    });
    
    button.addEventListener('mouseup', stopMovement);
    button.addEventListener('mouseleave', stopMovement);
    
    button.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const arrow = this.querySelector('img');
        if (!arrow) return;
        
        if (arrow.classList.contains('-rotate-90')) {  
            startMovement('ArrowUp');
        } 
        else if (arrow.classList.contains('rotate-180')) {  
            startMovement('ArrowLeft');
        }
        else if (arrow.classList.contains('rotate-90')) {  
            startMovement('ArrowDown');
        }
        else { 
            startMovement('ArrowRight');
        }
    });
    
    button.addEventListener('touchend', stopMovement);
});

let statusBars = {
    meal: { value: 50, element: null, drainRate: 0.1 },
    sleep: { value: 50, element: null, drainRate: 0.07 },
    hygiene: { value: 50, element: null, drainRate: 0.05 },
    happy: { value: 50, element: null, drainRate: 0.03 }
};

function initStatusBars() {
    Object.keys(statusBars).forEach(status => {
        statusBars[status].element = document.querySelector(`.progressBar[data-status="${status}"]`);
        updateStatusBar(status);
    });
    
    setInterval(drainStatusBars, 1000); 
}

function drainStatusBars() {
    Object.keys(statusBars).forEach(status => {
        if(statusBars[status].value > 0) {
            statusBars[status].value -= statusBars[status].drainRate;
            if(statusBars[status].value < 0) statusBars[status].value = 0;
            updateStatusBar(status);
        }
    });
}

function updateStatusBar(status) {
    const bar = statusBars[status];
    const roundedValue = Math.round(bar.value); 
    
    // Update width
    bar.element.style.width = `${roundedValue}%`;
    bar.element.setAttribute('data-value', roundedValue); 
    
    // Update warna berdasarkan nilai
    if(roundedValue === 0) {
        bar.element.style.opacity = '0'; 
    } 
    else if(roundedValue <= 1) {
        bar.element.style.backgroundColor = '#ffcccc'; 
        bar.element.style.opacity = '1';
    }
    else if(roundedValue <= 20) {
        bar.element.style.backgroundColor = '#ff0000'; 
    } 
    else if(roundedValue <= 50) {
        bar.element.style.backgroundColor = '#ffa500'; 
    } 
    else {
        bar.element.style.backgroundColor = '#00ff00'; 
    }
}

document.addEventListener("DOMContentLoaded", initStatusBars);

document.addEventListener("DOMContentLoaded", function() {
    const greetingElement = document.querySelector('.timeline p:first-child');
    const timeElement = document.querySelector('.timeline p:last-child');
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    function updateTimeline() {
        const now = new Date();
        
        const hours = now.getHours();
        let greeting;
        
        if (hours >= 5 && hours < 12) {
            greeting = "Good morning";    
        } else if (hours >= 12 && hours < 18) {
            greeting = "Good afternoon";  
        } else if (hours >= 18 && hours < 24) {
            greeting = "Good evening";   
        } else {
            greeting = "Good night";     
        }
        
        const dayName = days[now.getDay()];
        const date = now.getDate();
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();
        const hoursFormatted = String(now.getHours()).padStart(2, '0');
        const minutesFormatted = String(now.getMinutes()).padStart(2, '0');
        
        const formattedDateTime = `${dayName}, ${date} ${monthName} ${year} | ${hoursFormatted}.${minutesFormatted}`;
        
        greetingElement.textContent = greeting;
        timeElement.textContent = formattedDateTime;
    }
    
    updateTimeline();
    
    setInterval(updateTimeline, 60000);
});