$(document).ready(function(){

    let charImg = ["props/char1.webp", "props/char2.webp", "props/char3.webp", "props/char4.webp"];

    let currentIndex = 0;

    function cycleCharacter(){
        $("#characterImage").fadeOut(200, function() {
            $(this).attr("src", charImg[currentIndex]).fadeIn(200);
        });
    }

    $("#prevBtn").click(function(){
        currentIndex = (currentIndex - 1 + charImg.length) % charImg.length;
        cycleCharacter();
    });

    $("#nextBtn").click(function(){
        currentIndex = (currentIndex + 1) % charImg.length;
        cycleCharacter();
    });

});