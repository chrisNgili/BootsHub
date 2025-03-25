function oneBoot(boot) {
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
        <img src="${boot.image}" alt="${boot.model}" class ="boot-image">
        <h3>${boot.model} </h3>
        <p>Price: ${boot.price}</p>
        <p>Sizes: ${boot.sizes.join(', ')}</p>
        <p>Available:
        <span class= "availability">  ${boot.available}</span> Shoes</p>
        <p>Description: ${boot.description}</p>
        <div class="buttons">
            <button> Purchase </button>
        </div>
    `;
    const purchaseButton = card.querySelector("button")
    purchaseButton.addEventListener('click', ()=> {   
        if(boot.available > 0){ 
            boot.available -= 1
            card.querySelector('span').textContent = boot.available
            updateStock(boot)
        }    
        purchaseButton.disabled = boot.available <= 0
        purchaseButton.textContent = boot.available <= 0 ? 'Sold Out'  : 'Purchase'
        purchaseButton.classList.toggle('sold-out', boot.available <=0 )
        
    })

    
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

function updateStock(boot){
    fetch(`https://phase1-project-data.onrender.com/boots/${boot.id}`,{
        method: 'PATCH',
        headers:{
        'Content-type': 'application/json'
        },
    body: JSON.stringify(boot)
    })
    .then(res => res.json())
    .then(boot => console.log(boot))    
}

function start() {
    getBoots();  
}

start();
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection?.scrollIntoView({ behavior: 'smooth' });
    });
});
