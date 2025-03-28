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
