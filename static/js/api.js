"use strict";

const API_KEY = 'fdcd436a-71f9-4ee0-9c58-0b68440ffd7a';

function config(httpVerb) {
    return {
        method: httpVerb,
        headers: {
            'X-API-KEY': API_KEY,
            'Accept': 'application/json'
        }
    };
}

async function fetchStoreJson() {
    const response = await fetch('http://trawl-fki.ostfalia.de/api/store/find?name=%25&page=0&size=100', config('GET'));
    const stores = await response.json();
    return stores;
}

async function fetchItemByName(name) {
    //encodeURI("Banae [gut und guenstig]") => Bananae%20%5Bgut%20un%20guenstig%5D
    const response = await fetch(`http://trawl-fki.ostfalia.de/api/item/find?name=${encodeURI(name)}`, config('GET'));
    const item = await response.json();
    return item
}

async function fetchAllProducts() {
    const response = await fetch('http://trawl-fki.ostfalia.de/api/product/find?name=%25&page=0&size=500',config('GET'));
    const items = await response.json();
    return items;
}

async function fetchAllItems() {
    const response = await fetch('http://trawl-fki.ostfalia.de/api/item/find?name=%25&page=0&size=500',config('GET'));
    const items = await response.json();
    return items;
}

async function fetchAllCustomerData() {
    const response = await fetch('http://trawl-fki.ostfalia.de/api/data', config("GET"));
    const data = await response.json();
    return data;
}

async function fetchAllStores() {
    const response = await fetch('http://trawl-fki.ostfalia.de/api/store/find?name=%25&page=0&size=100', config("GET"));
    const data = await response.json();
    return data;
}

async function fetchAllData() {
    const response = await fetch('http://trawl-fki.ostfalia.de/api/data?page=0&size=999', config('GET'));
    const items = await response.json();
    return items;
}

async function deleteData(time, store, itemGtin) {
    const response = await fetch(`http://trawl-fki.ostfalia.de/api/data?time=${time.replaceAll(':', '%3A')}&store=${store}&item=${itemGtin}`, config('DELETE'));
}

async function fetchAllCompanies() {
    const response = await fetch('http://trawl-fki.ostfalia.de/api/company/find?name=%25&page=0&size=100', config('GET'));
    const data = await response.json();
    return data;
}

function getCurrentTimeInISOFormat() {
    const now = new Date();
    
    // Get the components of the date
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth is zero-based
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    // Construct the ISO format string
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    
    return isoString;
}

async function postData(time, store, itemGTIN, amount, price, special, soldOut) {
    
    const response = await fetch('http://trawl-fki.ostfalia.de/api/data', {
        method: 'POST',
        headers: {
            'X-API-KEY': API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: `{ \
            "time": "${time}",\
            "store": "${store}",\
            "item": "${itemGTIN}",\
            "number": ${amount},\
            "price": ${price},\
            "special": ${special},\
            "soldOut": ${soldOut}\
          }`
    });

    if (response.ok) {
        console.log('data posted!');
    } else {
        const resp = await response.json();

        if (resp != undefined) {
            if (resp.code != undefined) {
                alert("" + resp.code + " - " + resp.message);
            }
        }
    }
    
}