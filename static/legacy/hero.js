"use strict";

const texts = [
    'Entdecke neue Produkte.',
    'Spende deinen Kassenbon.'
];
let textIndex = 0;
let accumulateTextDelta = 0;
function animateText(delta) {
    accumulateTextDelta += delta;

    if (document.querySelector('#animated-text').innerHTML.length === texts[textIndex].length) {
        if (accumulateTextDelta >= 2500) {
            accumulateTextDelta = 0;
            document.querySelector('#animated-text').innerHTML = '';
            textIndex = (textIndex + 1) % texts.length;
        }
    } else {
        if (accumulateTextDelta >= 25) {
            accumulateTextDelta = 0;
            document.querySelector('#animated-text').innerHTML = texts[textIndex].substring(0, document.querySelector('#animated-text').innerHTML.length + 1);
        }
    }
    
}

let accumulateCardDelta = 0;
function animateCards(delta) {
    accumulateCardDelta += delta;
    if (accumulateCardDelta >= window.screen.width * 4) {
        accumulateCardDelta = 0;
        createNewImage(-1000);
    }

    let imgs = document.querySelectorAll('.img-card');

    for (let img of imgs) {
        let x = Number(img.style.right.replace("px", ""));
        if (x >= window.screen.width + 500) {
            document.querySelector('#img-container').removeChild(img);
            continue;
        }
        img.style.right = `${(x + 1)}px`;
    }
    
}

let lastTick = performance.now();
function animate(now) {
    const delta = now - lastTick;
    lastTick = now;

    animateText(delta);
    animateCards(delta);

    window.requestAnimationFrame(animate);
}

// Create a bunch of random placed cards.
const imgURLs = [
    "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1609062111394-0427aa22d6c1?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600411832986-5a4477b64a1c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1556228720-210aabb357b7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1608564348103-2b78891150cf?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createNewImage(pos) {
    let img = document.createElement('img');
    img.classList.add('img-card');
    img.src = imgURLs[getRandomInt(0, imgURLs.length)];
    img.style.right = `${pos}px`;
    document.querySelector('#img-container').appendChild(img);
}
document.addEventListener('DOMContentLoaded', async (event) => {
    let x = -1000;
    for (let i = 0; i < 12; i++) {
        createNewImage(x);
        x += window.screen.width * 0.3;
    }
})


window.requestAnimationFrame(animate);
