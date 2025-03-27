document.addEventListener("DOMContentLoaded", () =>{




// This fucntion creates a card for every boot
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

    // This button reduces the number of available shoes by 1 when pressed.
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

    // This condition categorizes the shoes according to brand name
    if (boot.brand.toLowerCase() === "nike") {
        document.querySelector('#nike-list').appendChild(card);
    } else if (boot.brand.toLowerCase() === "adidas") {
        document.querySelector('#adidas-list').appendChild(card);
    } else if (boot.brand.toLowerCase() === "puma") {
        document.querySelector('#puma-list').appendChild(card);
    }
}


// This function retrieves the shoes from the API
function getBoots() {
    fetch("https://phase1-project-data.onrender.com/boots")
        .then(res => res.json())
        .then(boots => boots.forEach(boot => oneBoot(boot)))  
}


// Updates the number of available shoes when the purchase button is pressed
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

// Provides smooth scrolling when an element is pressed on the nav bar
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

// Creates an object when a shoe is donated
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



// Provides a delete option to the donated items if a person would like to remove their donations
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



// Creates a card for all donations and adds the remove button

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