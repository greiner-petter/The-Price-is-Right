"use strict";

document.addEventListener('DOMContentLoaded', async function () {
    overview();
});
async function overview() {
    let counter = 0;
    let grid;
    let products;

    grid = document.getElementById("overview-inner");

    products = await fetchAllProducts();

    loadProducts();

    function createCard(productId, productDescription, productExtended, productName) {
        let card = document.createElement("div");
        card.classList.add("overview-card");
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("overview-card-container");
        if (productExtended.length > 0) {
            cardContainer.classList.add(productExtended);
        } else {
            cardContainer.classList.add(productId);
        }
        let cardText = document.createElement("div");
        cardText.classList.add("overview-card-text");
        let h = document.createElement("h4");
        h.innerText = productDescription;
        let extended = document.createElement("p");
        extended.innerText = "Kategorie: " + productExtended
        let pDiv = document.createElement("div");
        pDiv.classList.add("overview-card-p")

        card.addEventListener("click", function () {
            let wrapper = document.getElementById("infoWrapper");
            wrapper.show();
            wrapper.classList.remove("closed");
            let infoDialog = document.getElementById("infoDialog");
            let infoText = document.createElement("div")
            infoText.id = "infoText";
            let hInfo = document.createElement("h4");
            hInfo.innerText = productDescription;
            let pIdInfo = document.createElement("p");
            pIdInfo.innerText = "ID: " + productId;
            let pName = document.createElement("p");
            pName.innerText = "Name: " + productName;
            let pDescription = document.createElement("p");
            pDescription.innerText = "Description: " + productDescription;
            let extendedInfo = document.createElement("p");
            extendedInfo.innerText = "Kategorie: " + productExtended
            infoText.appendChild(hInfo);
            infoText.appendChild(pName);
            infoText.appendChild(pIdInfo);
            infoText.appendChild(pDescription);
            infoText.appendChild(extendedInfo);
            infoDialog.appendChild(infoText);
        });

        pDiv.appendChild(extended);
        cardText.appendChild(h);
        cardText.appendChild(pDiv);
        cardContainer.appendChild(cardText);
        card.appendChild(cardContainer);

        return card;
    }
    function loadProducts() {
        let lastItem = false;
        for (let i = 0; i < 12; i++) {
            if (products.content[counter] != null && products.content[counter] != undefined) {
                let productId = products.content[counter].id;
                let productDescription = products.content[counter].description;
                let productExtended = products.content[counter].extended;
                let productName = products.content[counter].name;

                grid.appendChild(createCard(productId, productDescription, productExtended, productName));

            } else {
                lastItem = true;
                break;
            }
            counter++;
        }
        if (!lastItem) {
            let button = document.createElement("button");
            button.classList.add("more-cards");
            button.textContent = "More";
            button.onclick = buttonClick;
            grid.appendChild(button);

            function buttonClick() {
                loadProducts();
                button.remove();
            }
        }
    }
    document.getElementById("closeinfoButton").addEventListener("click", (event) => {
        document.getElementById("infoWrapper").classList.add("closed");
        setTimeout(function () {
            document.getElementById("infoWrapper").close();
            document.getElementById("infoText").remove();
        }, 1000);
    });
    document.getElementById("infoBlur").addEventListener("click", (event) => {
        document.getElementById("infoWrapper").classList.add("closed");
        setTimeout(function () {
            document.getElementById("infoWrapper").close();
            document.getElementById("infoText").remove();
        }, 1000);
    });
}