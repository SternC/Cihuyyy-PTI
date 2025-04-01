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