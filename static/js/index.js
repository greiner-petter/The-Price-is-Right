/*
type animation first section in index.html
*/

const dynamicText = document.querySelector("h1 span");
const words = ["Companies", "Stores", "Products", "Items"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");
    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}
typeEffect();

document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("search").addEventListener("submit", (event) => {
        let query = document.getElementById('search-input').value;
        window.location.href = `/items.html?search=${query}`;
    });
});

document.addEventListener('DOMContentLoaded', async (event) => {
    let fav = document.getElementById("favInner");
    let item1 = document.getElementById("item1");
    let data = await fetchAllCustomerData();
    let items = await fetchAllItems();
    let shops = await fetchStoreJson();
    let products = await fetchAllProducts();

    for (let i = 1; i < 3; i++) {
        let itemName;
        let storeName;
        let itemPrice;
        let itemGtin;
        let imgClass;
        let lastData = data.content[data.content.length - i];
        for (let item of items.content) {
            if (item.gtin === lastData.item) {
                itemName = item.name;
                itemPrice = lastData.price / 100;
                itemGtin = item.gtin;
                for (let product of products.content) {
                    if (product.id === item.product) {
                        imgClass = product.extended[0];
                    }
                }
            }
        }
        for (let store of shops.content) {
            if (store.id === lastData.store) {
                storeName = store.name;
            }
        }
        fav.appendChild(createCard(itemName, storeName, itemPrice, imgClass));

    }
});
function createCard(itemName, storeName, itemPrice, imgClass) {
    let card = document.createElement("div");
    card.classList.add("card");
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    cardContainer.classList.add(imgClass);
    let cardText = document.createElement("div");
    cardText.classList.add("card-text");
    let h = document.createElement("h4");
    h.innerText = itemName;
    let pPrice = document.createElement("p");
    pPrice.innerText = itemPrice + " €";
    let store = document.createElement("p");
    store.innerHTML = "Store: " + storeName;
    let link = document.createElement("a");
    link.innerText = "More...";
    link.setAttribute("href", "items.html");

    cardText.appendChild(h);
    cardText.appendChild(pPrice);
    cardText.appendChild(store);
    cardText.appendChild(link)
    cardContainer.appendChild(cardText);
    card.appendChild(cardContainer);



    return card;
}