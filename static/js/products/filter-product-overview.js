let select = document.getElementById("select");

select.addEventListener("change", async function() {
    let value = select.value;
    if (value==="all") {
        overview();
    }
    let filteredArray = [];
    let counter = 0;
    let grid;
    let products;
    grid = document.getElementById("overview-inner");
    grid.innerHTML = "";
    products = await fetchAllProducts();

    let data = products.content;

    function filterData(data) {
        for(let f of data) {
            if (f.extended.includes(select.value)) {
                filteredArray.push(f);
            }
        }
    }

    filterData(data);

    loadProducts(select.value);

    function createCard(productId,productDescription,productExtended,productName) {
        let card = document.createElement("div");
        card.classList.add("overview-card");
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("overview-card-container");
        if (productExtended.length > 0) {
        cardContainer.classList.add(productExtended);
        }
        let cardText = document.createElement("div");
        cardText.classList.add("overview-card-text");
        let h = document.createElement("h4");
        h.innerText = productDescription;
        let pId = document.createElement("p");
        pId.innerText = "ID: "+ productId;
        let extended = document.createElement("p");
        extended.innerText = "Kategorie: "+productExtended
        let pDiv = document.createElement("div");
        pDiv.classList.add("overview-card-p")

        card.addEventListener("click", function() {
            let wrapper = document.getElementById("infoWrapper");
            wrapper.show();
            wrapper.classList.remove("closed");
            let infoDialog = document.getElementById("infoDialog");
            let infoText = document.createElement("div")
            infoText.id = "infoText";
            let hInfo = document.createElement("h4");
            hInfo.innerText = productDescription;
            let pIdInfo = document.createElement("p");
            pIdInfo.innerText = "ID: "+ productId;
            let pName = document.createElement("p");
            pName.innerText = "Name: " + productName;
            let pDescription = document.createElement("p");
            pDescription.innerText = "Description: "+ productDescription;
            let extendedInfo = document.createElement("p");
            extendedInfo.innerText = "Kategorie: "+productExtended
            infoText.appendChild(hInfo);
            infoText.appendChild(pName);
            infoText.appendChild(pIdInfo);
            infoText.appendChild(pDescription);
            infoText.appendChild(extendedInfo);
            infoDialog.appendChild(infoText);
        });

        pDiv.appendChild(pId);
        pDiv.appendChild(extended);
        cardText.appendChild(h);
        cardText.appendChild(pDiv);
        cardContainer.appendChild(cardText);
        card.appendChild(cardContainer);

        return card;
    }
    function loadProducts() {
        let lastItem = false;
        for (let i = 0; i<12;i++) { 
            if (filteredArray[counter] !== null && filteredArray[counter] !== undefined) {
                if (filteredArray[counter].extended.includes(value)) {
                    let productId = filteredArray[counter].id;
                    let productDescription =filteredArray[counter].description;
                    let productExtended = filteredArray[counter].extended;
                    let productName = filteredArray[counter].name;
                
                    grid.appendChild(createCard(productId,productDescription,productExtended,productName));
                }
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
});

    