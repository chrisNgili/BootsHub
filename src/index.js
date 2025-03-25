function oneBoot(boot) {
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
        <img src="${boot.image}" alt="${boot.model}">
        <h3>${boot.model} </h3>
        <p>Price: ${boot.price}</p>
        <p>Sizes: ${boot.sizes.join(', ')}</p>
        <p>${boot.description}</p>
    `;

    
    if (boot.brand.toLowerCase() === "nike") {
        document.querySelector('#nike-list').appendChild(card);
    } else if (boot.brand.toLowerCase() === "adidas") {
        document.querySelector('#adidas-list').appendChild(card);
    } else if (boot.brand.toLowerCase() === "puma") {
        document.querySelector('#puma-list').appendChild(card);
    }
}

function getBoots() {
    fetch("https://phase1-project-data.onrender.com/boots")
        .then(res => res.json())
        .then(boots => boots.forEach(boot => oneBoot(boot)))  
}

function start() {
    getBoots();  
}

start();
