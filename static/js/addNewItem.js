"use strict";

let itemNameToGtinMap = new Map();
let itemGtinToNameMap = new Map();

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("../elements/addNewItem.html")
        const newItemButton = await response.text();
        document.getElementById("newItemContainer").innerHTML = newItemButton;
    } catch (error) {
        console.error("Fehler beim Laden des New Item Buttons", error);
    }

    document.getElementById("addNewItemButton").addEventListener("click", (event) => {
        document.getElementById("addNewItemWrapper").show();
        document.getElementById("addNewItemWrapper").classList.remove("closed");
    });
    document.getElementById("closeNewItemButton").addEventListener("click", (event) => {
        document.getElementById("addNewItemWrapper").classList.add("closed");
        setTimeout(function () {
            document.getElementById("addNewItemWrapper").close();
        }, 1000);
    });
    document.getElementById("addNewItemBlur").addEventListener("click", (event) => {
        document.getElementById("addNewItemWrapper").classList.add("closed");
        setTimeout(function () {
            document.getElementById("addNewItemWrapper").close();
        }, 1000);
    });

    // Generate Kassenbons for Dropdown
    let data = await fetchAllData();
    let uniqueTimes = new Set();
    for (let It of data.content) {
        uniqueTimes.add(It.time);
    }

    let newOption = document.createElement('option');
    newOption.setAttribute('value', getCurrentTimeInISOFormat());
    newOption.innerHTML = 'Neuer Kassenbon';
    document.getElementById("kassenbon-dropdown").appendChild(newOption);
    for (let time of uniqueTimes) {
        let timeOption = document.createElement('option');
        timeOption.setAttribute('value', time);
        timeOption.innerHTML = time;
        document.getElementById("kassenbon-dropdown").appendChild(timeOption);
    }

    // Generate Stores for Dropdown
    let stores = await fetchStoreJson();
    for (let store of stores.content) {
        let storeOption = document.createElement('option');
        storeOption.setAttribute('value', store.id);
        storeOption.innerHTML = store.id;
        document.getElementById("store-dropdown").appendChild(storeOption);
    }

    // Generate Items for Dropdown
    let items = await fetchAllItems();
    for (let item of items.content) {
        itemNameToGtinMap.set(item.name, item.gtin);
        itemGtinToNameMap.set(item.gtin, item.name);
        let itemOption = document.createElement('option');
        itemOption.setAttribute('value', item.name);
        itemOption.innerHTML = item.name;
        document.getElementById("item-dropdown").appendChild(itemOption);
    }

    document.getElementById('submitRecieptButton').addEventListener('click', async () => {
        const time = document.getElementById("kassenbon-dropdown").value;
        const store = document.getElementById("store-dropdown").value;
        const itemGTIN = itemNameToGtinMap.get(document.getElementById("item-dropdown").value);

        const amount = parseInt(document.getElementById("amount").value);
        const priceInCent = parseInt(document.getElementById("price").value * 100.0);

        const special = document.getElementById("special").checked;
        const soldOut = document.getElementById("sold-out").checked;

        postData(time, store, itemGTIN, amount, priceInCent, special, soldOut);
    });
});