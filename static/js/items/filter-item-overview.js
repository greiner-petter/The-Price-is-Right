let select = document.getElementById("select");

select.addEventListener("change", async function() {
    document.getElementById('search-input-Overview').value = '';
    let value = select.value;
    if (value==="all") {
        overview();
    }
    let filteredArray = [[],[]];
    let counter = 0;
    let grid;
    let items;
    grid = document.getElementById("overview-inner");
    grid.innerHTML = "";
    items = await fetchAllItems();
    products = await fetchAllProducts();

    let data = items.content;

    function filterData(data) {
        for(let f of data) {
            for (let p of products.content) {
            if (p.id === f.product) {
                if (p.extended == select.value.toLowerCase()) {
                filteredArray[0].push(f);
                filteredArray[1].push(p.extended)
                }
            }
        }
        }
    }

    filterData(data);

    loadItems(select.value);

    function createCard(itemName,itemGtin,itemProduct,itemProducer,itemImage,value,unit,itemDescription,expended) {
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
        gtin.innerText = "GTIN: "+itemGtin;
        let pDiv = document.createElement("div");
        pDiv.classList.add("overview-card-p");

        card.addEventListener("click", function() {
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
            infoGtin.innerText = "ID: "+ itemGtin;
            let infoDescription = document.createElement("p");
            infoDescription.innerText = "Name: " + itemDescription;
            let infoProduct = document.createElement("p");
            infoProduct.innerText = "Description: "+ itemDescription;
            let infoProducer = document.createElement("p");
            infoProducer.innerText = "Produkt: "+itemProducer
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
        for (let i = 0; i<12;i++) { 
            if (filteredArray[0][counter] != null && filteredArray[0][counter] != undefined) {
                let itemName = filteredArray[0][counter].name;
                let itemGtin =filteredArray[0][counter].gtin;
                let itemProduct = filteredArray[0][counter].product;
                let itemProducer = filteredArray[0][counter].producer;
                let itemImage = filteredArray[0][counter].image;
                let quantity = filteredArray[0][counter].quantity;
                let value = quantity.value;
                let unit = quantity.unit;
                let itemDescription = filteredArray[0][counter].description;
                let expended = filteredArray[1][counter];
                
                grid.appendChild(createCard(itemName,itemGtin,itemProduct,itemProducer,itemImage,value,unit,itemDescription,expended));
                
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
});

    