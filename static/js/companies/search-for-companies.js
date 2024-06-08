

async function searchForCompanies(value) {
    let filteredArray = [];
    let counter = 0;
    let grid;
    let companies;
    grid = document.getElementById("overview-inner");
    grid.innerHTML = "";
    companies = await fetchAllCompanies();

    let data = companies.content;
    function filterData(data) {
        for (let company of data) {
            let city = company.location.address.city;
            if (city.toLowerCase() === value.toLowerCase()) {
                companyName = company.name;
                companyAdresse = company.location.address;
                companyContact = company.location.address.contact;
                filteredArray.push(createCard(companyName, companyAdresse, companyContact));
            }
        }
    }

    filterData(data);

    loadItems(value);

    // select.value = "all";

    function createCard(companyName, companyAdresse, companyContact) {
        let card = document.createElement("div");
        card.classList.add("overview-card");
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("overview-card-container");
        cardContainer.classList.add(companyName);
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
        for (let i = 0; i < filteredArray.length; i++) {
            grid.appendChild(filteredArray[i]);
            counter++;
        }
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    let button = document.getElementById("search-img-Overview");
    let input = document.getElementById("search-input-Overview");

    button.addEventListener("click", async function () {
        if (input.value) {
            searchForCompanies(input.value);
        } else {
            grid = document.getElementById("overview-inner");
            grid.innerHTML = "";
            overview();
        }
    });

    document.getElementById("search-Overview").addEventListener("submit", (event) => {

        if (input.value) {
            searchForCompanies(input.value);
        } else {
            grid = document.getElementById("overview-inner");
            grid.innerHTML = "";
            overview();
        }
    });

    document.getElementById("trash-icon").addEventListener("click", async () => {
        document.getElementById("search-input-Overview").value = "";
        grid = document.getElementById("overview-inner");
        grid.innerHTML = "";
        overview();
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('search')) {
        const search = urlParams.get('search');
        searchForCompanies(search);
    }
});