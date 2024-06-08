"use strict";

document.addEventListener('DOMContentLoaded', async function () {
    overview();
});

let allData;

// This function combines multiple data items with the same date to a 'Kassenbon'
async function fetchCombinedData() {
    let data = await fetchAllData();
    let map = new Map();

    for (let entry of data.content) {
        if (map.has(entry.time)) {
            map.get(entry.time).push(entry);
        } else {
            map.set(entry.time, [entry]);
        }
    }

    allData = [];
    for (let it of map) {
        allData.push([it[0], it[1]]);
    }
}

async function overview() {
    let counter = 0;
    let grid;

    grid = document.getElementById("overview-inner");

    await fetchCombinedData();

    loadData();

    function createCard(time, entries) {
        let card = document.createElement("div");
        card.classList.add("overview-card");
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("overview-card-container");
        cardContainer.classList.add("kassenbon");
        let cardText = document.createElement("div");
        cardText.classList.add("overview-card-text");
        let h = document.createElement("h4");
        h.innerText = time;

        card.addEventListener("click", function () {
            let wrapper = document.getElementById("dataWrapper");
            wrapper.show();
            wrapper.classList.remove("closed");
            let infoContainer = document.getElementById("dataContainer");
            let infoText = document.createElement("div")
            infoText.id = "dataText";

            let store = '';
            let total = 0;
            let pTime = document.createElement('h3');
            pTime.innerText = time;
            infoText.appendChild(pTime);

            let index = 0;
            for (let entry of entries) {
                store = entry.store;
                total += entry.price / 100.0 * entry.number;
                
                const idContainer = `data-${index++}`;
                const entryContainer = document.createElement('div');
                entryContainer.id = idContainer;
                entryContainer.classList.add('entryContainer');
                { let info = document.createElement('p'); info.innerText = itemGtinToNameMap.get(entry.item); entryContainer.appendChild(info); }
                { let info = document.createElement('p'); info.innerText = `${entry.price / 100.0}€ x ${entry.number} = ${entry.price / 100.0 * entry.number}€`; entryContainer.appendChild(info); }
                { let info = document.createElement('p'); info.innerHTML = `${entry.special ? '&check;' : '&cross;'} Special ${entry.soldOut ? '&check;' : '&cross;'} Sold out `; entryContainer.appendChild(info); }
                let utilDiv = document.createElement('div');
                utilDiv.style.display = 'flex';
                utilDiv.style.gap = '5px';
                {
                    let remove = document.createElement('div');
                    remove.classList.add('removedataButton');
                    let removeImg = document.createElement('img');
                    removeImg.setAttribute('src', 'img/xmark.circle.fill.svg');
                    removeImg.setAttribute('alt', 'x');
                    removeImg.style = 'filter: brightness(0%);';
                    remove.appendChild(removeImg);
                    remove.addEventListener("click", (event) => {
                        console.log(`removed ${itemGtinToNameMap.get(entry.item)}`);
                        infoText.removeChild(entryContainer);
                        deleteData(entry.time, entry.store, entry.item);
                    });
                    utilDiv.appendChild(remove);
                }
                {
                    let edit = document.createElement('div');
                    edit.classList.add('removedataButton');
                    let editImg = document.createElement('img');
                    editImg.setAttribute('src', 'img/edit.png');
                    editImg.setAttribute('alt', 'edit');
                    editImg.setAttribute('width', '32px');
                    editImg.style = 'filter: brightness(0%);';
                    edit.appendChild(editImg);
                    edit.addEventListener("click", (event) => {
                        console.log(`removed ${itemGtinToNameMap.get(entry.item)}`);
                        infoText.removeChild(entryContainer);
                        deleteData(entry.time, entry.store, entry.item);
                        // Now edit
                        document.getElementById('addNewItemButton').click();
                        function selectElement(id, valueToSelect) {    
                            let element = document.getElementById(id);
                            element.value = valueToSelect;
                        }
                        selectElement('kassenbon-dropdown', entry.time);
                        selectElement('store-dropdown', entry.store);
                        selectElement('item-dropdown', itemGtinToNameMap.get(entry.item));
                        selectElement('amount', entry.number);
                        selectElement('price', entry.price / 100.0);
                    });
                    utilDiv.appendChild(edit);
                }
                entryContainer.appendChild(utilDiv);
                infoText.appendChild(entryContainer);
            }

            let pTotal = document.createElement('h5');
            pTotal.innerText = `Total: ${total}€`;
            infoText.appendChild(pTotal);

            let pStore = document.createElement('p');
            pStore.innerText = `Store: ${store}`;
            infoText.appendChild(pStore);

            infoContainer.appendChild(infoText);
        });

        cardText.appendChild(h);
        cardContainer.appendChild(cardText);
        card.appendChild(cardContainer);

        return card;
    }
    function loadData() {
        let lastItem = false;
        for (let i = 0; i < 12; i++) {
            if (allData[counter] != null && allData[counter] != undefined) {
                let kassenbon = allData[counter];
                grid.appendChild(createCard(kassenbon[0], kassenbon[1]));

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
                loadData();
                button.remove();
            }
        }
    }
    document.getElementById("closedataButton").addEventListener("click", (event) => {
        document.getElementById("dataWrapper").classList.add("closed");
        setTimeout(function () {
            document.getElementById("dataWrapper").close();
            document.getElementById("dataText").remove();
        }, 1000);
    });
    document.getElementById("dataBlur").addEventListener("click", (event) => {
        document.getElementById("dataWrapper").classList.add("closed");
        setTimeout(function () {
            document.getElementById("dataWrapper").close();
            document.getElementById("dataText").remove();
        }, 1000);
    });
}