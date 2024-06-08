document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("../elements/upButton.html")
        const upButton = await response.text();
        document.getElementById("upButtonContainer").innerHTML = upButton;
    } catch (error) {
        console.error("Fehler beim Laden des up Buttons", error);
    }
    
    let button = document.getElementById("upButton");
    let container = document.getElementById("overview");

    container.addEventListener("scroll", function () {
        if (container.scrollTop > 200) {
            button.style.visibility = "visible"
            button.style.opacity = "1";
        } else {
            button.style.opacity = "0";
            button.style.visibility = "hidden"
        }
    });
});