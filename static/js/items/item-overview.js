"use strict";

document.addEventListener('DOMContentLoaded', async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Only create the initial overview if there is no serach input through URL
    // Because in that case we want to add content through searching! 
    if (!urlParams.has('search')) {
        overview();
    }
});
async function overview() {
    let counter = 0;
    let grid;
    let items;
    let expendedArray = [];

    grid = document.getElementById("overview-inner");

    items = await fetchAllItems();
    products = await fetchAllProducts();

    let data = items.content;

    function findProduct(data) {
        for (let f of data) {
            for (let p of products.content) {
                if (p.id === f.product) {

                    expendedArray.push(p.extended)
                    break;
                }
            }
        }
    }
    findProduct(data);
    loadItems();

    function createCard(itemName, itemGtin, itemProduct, itemProducer, itemImage, value, unit, itemDescription, expended) {
        let card = document.createElement("div");
        card.classList.add("overview-card");
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("overview-card-container");
        cardContainer.classList.add(expended);
        cardContainer.classList.add(itemProduct);
        let cardText = document.createElement("div");
        cardText.classList.add("overview-card-text");
        let h = document.createElement("h4");
        h.innerText = itemName;
        let gtin = document.createElement("p");
        gtin.innerText = "GTIN: " + itemGtin;
        let pDiv = document.createElement("div");
        pDiv.classList.add("overview-card-p");

        card.addEventListener("click", function () {
            let wrapper = document.getElementById("infoWrapper");
            wrapper.show();
            wrapper.classList.remove("closed");
            let infoDialog = document.getElementById("infoDialog");
            let infoText = document.createElement("div")
            infoText.id = "infoText";
            let hInfo = document.createElement("h4");
            hInfo.innerText = itemName;
            let infoValue = document.createElement("p");
            infoValue.innerText = value + " " + unit;
            let infoGtin = document.createElement("p");
            infoGtin.innerText = "ID: " + itemGtin;
            let infoDescription = document.createElement("p");
            infoDescription.innerText = "Description: " + itemDescription;
            let infoProduct = document.createElement("p");
            infoProduct.innerText = "Product: " + itemProduct;
            let infoProducer = document.createElement("p");
            infoProducer.innerText = "Producer: " + itemProducer
            infoText.appendChild(hInfo);
            infoText.appendChild(infoValue);
            infoText.appendChild(infoDescription);
            infoText.appendChild(infoGtin);
            infoText.appendChild(infoProduct);
            infoText.appendChild(infoProducer);
            infoDialog.appendChild(infoText);
        });

        pDiv.appendChild(gtin);
        cardText.appendChild(h);
        cardText.appendChild(pDiv);
        cardContainer.appendChild(cardText);
        card.appendChild(cardContainer);

        return card;
    }
    function loadItems() {
        let lastItem = false;
        for (let i = 0; i < 12; i++) {
            if (items.content[counter] != null && items.content[counter] != undefined) {
                let itemName = items.content[counter].name;
                let itemGtin = items.content[counter].gtin;
                let itemProduct = items.content[counter].product;
                let itemProducer = items.content[counter].producer;
                let itemImage = items.content[counter].image;
                let quantity = items.content[counter].quantity;
                let value = quantity.value;
                let unit = quantity.unit;
                let itemDescription = items.content[counter].description;
                let expended = expendedArray[counter];

                grid.appendChild(createCard(itemName, itemGtin, itemProduct, itemProducer, itemImage, value, unit, itemDescription, expended));

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
                loadItems();
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