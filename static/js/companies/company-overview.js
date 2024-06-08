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

    let companies = await fetchAllCompanies();

    loadItems();

    function createCard(companyName, companyAdresse, companyContact) {
        let card = document.createElement("div");
        card.classList.add("overview-card");
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("overview-card-container");
        cardContainer.classList.add(companyName);
        cardContainer.classList.add("company");
        let cardText = document.createElement("div");
        cardText.classList.add("overview-card-text");
        let h = document.createElement("h4");
        h.innerText = companyName;
        let address = document.createElement("p");
        address.innerHTML = companyAdresse.city;
        let contact = document.createElement("p");
        contact.classList.add("contact");
        contact.innerHTML = companyContact;
        let subAddress = document.createElement("p");
        subAddress.classList.add("subAdderss")
        subAddress.innerHTML = `<b>Come visit us:</b><br>${companyAdresse.street},<br>${companyAdresse.zip} ${companyAdresse.city}<br>${companyAdresse.state}`;
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
            hInfo.innerText = companyName;
            let hContact = document.createElement("p");
            hContact.innerHTML = `Contact:<br>${companyContact}`;
            let hAdresse = document.createElement("p");
            hAdresse.innerHTML = `Based in:<br>${companyAdresse.street} ${companyAdresse.zip},<br>${companyAdresse.city} ${companyAdresse.state}`;
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
            if (companies.content[counter] != null && companies.content[counter] != undefined) {
                let companyName = companies.content[counter].name;
                let companyAdresse = companies.content[counter].location.address;
                let companyContact = companies.content[counter].location.address.contact;
                let card = createCard(companyName, companyAdresse, companyContact);
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
