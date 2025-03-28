$(document).ready(function () {
    let charImg = ["props/char1.webp", "props/char2.webp", "props/char3.webp", "props/char4.webp"];
    let currentIndex = 0;

    function playSound() {
        let clickSFX = new Audio("props/SFX/clicksfx.mp3");
        clickSFX.volume = 1.0;
        clickSFX.play();
    }

    let bgMusic = new Audio("props/SFX/bgmusic.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.45;
    bgMusic.play();

    function cycleCharacter() {
        $("#characterImage").fadeOut(200, function () {
            $(this).attr("src", charImg[currentIndex]).fadeIn(200);
        });
    }

    $("#prevBtn").click(function () {
        playSound();
        currentIndex = (currentIndex - 1 + charImg.length) % charImg.length;
        cycleCharacter();
    });

    $("#nextBtn").click(function () {
        playSound();
        currentIndex = (currentIndex + 1) % charImg.length;
        cycleCharacter();
    });

    $(".playBtn").click(function (event) {
        let charName = $("#characterName").val().trim();

        if (charName === "") {
            alert("Please enter a character name before playing!");
            event.preventDefault();
        } else {
            localStorage.setItem("characterName", charName);
            localStorage.setItem("selectedCharacter", charImg[currentIndex]);

            window.location.href = "main.html";
        }
    });
});
