document.addEventListener("DOMContentLoaded", () =>{

function oneBoot(boot) {
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
        <img src="${boot.image}" alt="${boot.model}" class ="boot-image">
        <h3>${boot.model} </h3>
        <p class="paragraph">Price: ${boot.price}</p>
        <p class="paragraph">Sizes: ${boot.sizes.join(', ')}</p>
        <p class="paragraph">Available:
        <span class= "availability">  ${boot.available}</span> Shoes</p>
        <p class="paragraph">Description: ${boot.description}</p>
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

document.querySelector("#donate-shoes").addEventListener('submit', handleDonate)


function handleDonate(e){
    e.preventDefault()
    let boots ={
        brand: e.target.brand.value,
        image: e.target.image_url.value
    }
    
    donateBoot(boots)
}


function donateBoot(boot){
    fetch('https://phase1-project-data.onrender.com/donations',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            brand: boot.brand,
            image: boot.image,
        })
    })
    .then(res => res.json())
    .then(() => {
        getDonations()
    })
    
}

function deleteBoot(id){
    fetch(`https://phase1-project-data.onrender.com/donations/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(boot => console.log(boot))
}



function getDonations() {
    fetch("https://phase1-project-data.onrender.com/donations")
        .then(res => res.json())
        .then(donations => {
            const donationsList = document.querySelector("#donations-list");
            donationsList.innerHTML = ""; 
            donations.forEach(boot => {
                let card2 = document.createElement("li");
                card2.className = "donation-card";
                card2.innerHTML = `
                    <img src="${boot.image}" alt="${boot.brand}">
                    <h3>${boot.brand}</h3>
                    <div>
                    <button id = 'remove'> Remove </button>
                    </div>
                `;
                donationsList.appendChild(card2);

                card2.querySelector('#remove').addEventListener('click', () => {
                    card2.remove()
                    deleteBoot(boot.id)
                })
            });
        });

        
}




})