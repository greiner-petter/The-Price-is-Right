document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch("../elements/nav.html");
        const nav = await response.text();
        document.getElementById("nav-container").innerHTML = nav;
    } catch(error) {
        console.error("Fehler beim Laden der Nav", error);
    }

    let navButton = document.getElementById("navButton");
    let nav = document.getElementById("nav");
    let burger1 = document.getElementById("bm1");
    let burger2 = document.getElementById("bm2");
    let burger3 = document.getElementById("bm3");

    window.addEventListener("load", function() {
        if (this.window.innerWidth <= 600) {
            nav.style.left = "-100%"
        }
        else {
            nav.style.left = "0";
        }
    });

    window.addEventListener("resize", function() {
        if (this.window.innerWidth <= 600) {
            nav.style.left = "-100%"
        }
        else {
            nav.style.left = "0";
        }
    });

    navButton.addEventListener("click", function() {
        if (nav.style.left === "-100%") {
            nav.style.left = "0";
            burger2.style.opacity = "0";
            burger1.style.transform = "rotate(45deg)";
            burger1.style.top = "10px";
            burger3.style.transform = "rotate(-45deg)";
            burger3.style.bottom = "10px";
        }
        else {
            nav.style.left = "-100%";
            burger2.style.opacity = "1";
            burger1.style.transform = "rotate(0deg)";
            burger1.style.top = "0px";
            burger3.style.transform = "rotate(0deg)";
            burger3.style.bottom = "0px";
        }
    });
})