function oneBoot(boot){
    let card = document.createElement('li')
    card.className='card'
    card.innerHTML = `
    <img src ="${boot.image}">

 
   `
   document.querySelector('#nike-list').appendChild(card)

}




function getBoots(){
    fetch("https://phase1-project-data.onrender.com/boots")
    .then(res => res.json())
    .then(boots =>boots.forEach(boot => oneBoot(boot)))
}

function start(){
    getBoots()
   // boots.forEach(boot => oneBoot(boot))
}
start()