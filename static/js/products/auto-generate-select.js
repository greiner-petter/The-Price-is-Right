document.addEventListener("DOMContentLoaded", async function() {
    let select = document.getElementById("select");
    let categories = [];
    products = await fetchAllProducts();

    for (let product of products.content) {
        let found = false;
        for (let category of categories) {
            if(product.extended.includes(category.extended[0])) {
                found = true;
            }
        }
        if (!found) {
            categories.push(product);
        }
    }
    
    for (let category of categories) {
        if (category.extended[0]) {
            let option = document.createElement("option");
            let cString = category.extended[0];
            cString = cString.charAt(0).toUpperCase() + cString.slice(1);
            option.value = category.extended[0];
            option.textContent = cString;
            select.appendChild(option);
        } 
        
    }
});