"use strict";

document.addEventListener('DOMContentLoaded', async function () {
    overview();
});

async function overview() {
    let counter = 0;
    let grid = document.getElementById("overview-inner");

    // Debugging statement to check if the grid element is found
    if (!grid) {
        console.error("Grid element with ID 'overview-inner' not found.");
        return;
    }

    let stores = await fetchAllStores();

    loadItems();

    function createCard(storeName, storeAddress, storeContact) {
        let card = document.createElement("div");
        card.classList.add("overview-card");
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("overview-card-container");
        cardContainer.classList.add(storeName);
        cardContainer.classList.add("store");
        let cardText = document.createElement("div");
        cardText.classList.add("overview-card-text");
        let h = document.createElement("h4");
        h.innerText = storeName;
        let address = document.createElement("p");
        address.innerHTML = storeAddress.city;
        let contact = document.createElement("p");
        contact.classList.add("contact");
        contact.innerHTML = storeContact;
        let subAddress = document.createElement("p");
        subAddress.classList.add("subAdderss")
        subAddress.innerHTML = `<b>Come visit us:</b><br>${storeAddress.street},<br>${storeAddress.zip} ${storeAddress.city}<br>${storeAddress.state}`;
        let pDiv = document.createElement("div");
        pDiv.classList.add("overview-card-p");

        card.addEventListener("click", function () {
            let wrapper = document.getElementById("infoWrapper");
            wrapper.show();
            wrapper.classList.remove("closed");
            let infoDialog = document.getElementById("infoDialog");
            let infoText = document.createElement("div");
            infoText.id = "infoText";
            let hInfo = document.createElement("h4");
            hInfo.innerText = storeName;
            let hContact = document.createElement("p");
            hContact.innerHTML = `Contact:<br>${storeContact}`;
            let hAdresse = document.createElement("p");
            hAdresse.innerHTML = `Based in:<br>${storeAddress.street} ${storeAddress.zip},<br>${storeAddress.city} ${storeAddress.state}`;
            infoText.appendChild(hInfo);
            infoText.appendChild(hAdresse)
            infoText.appendChild(hContact)
            infoDialog.appendChild(infoText);
        });

        cardText.appendChild(h);
        cardText.appendChild(address);
        cardText.appendChild(contact);
        cardText.appendChild(subAddress);
        cardText.appendChild(pDiv);
        cardContainer.appendChild(cardText);
        card.appendChild(cardContainer);

        return card;
    }

    function loadItems() {
        let lastItem = false;
        for (let i = 0; i < 12; i++) {
            if (stores.content[counter] != null && stores.content[counter] != undefined) {
                let storeNameComplex = stores.content[counter].name.split("_");
                let storeName = storeNameComplex[0];
                let storeAdresse = stores.content[counter].location.address;
                let storeContact = stores.content[counter].location.address.contact;
                let card = createCard(storeName, storeAdresse, storeContact);
                grid.appendChild(card);
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
