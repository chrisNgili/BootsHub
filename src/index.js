function getBoots(){
    fetch("https://phase1-project-data.onrender.com/boots")
    .then(res => res.json())
    .then(data =>console.log(data))
}
