//////////////////// When X event happens
document.addEventListener("DOMContentLoaded", () => {
    fetchAllDogs()
    filterGoodDogs()
})

//////////////////// Fetch Y from the server
function fetchAllDogs(){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogs => renderAllDogs(dogs))
}

function fetchToggleDogGoodness(event, dog){
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: !dog.isGoodDog
        })
    }).then(res => res.json())
    .then(dog => showDogInfo(event, dog))
}

//////////////////// Slap Z to the dom (manipulate/render)
function renderAllDogs(dogs) {
    dogs.forEach(dog => renderOneDog(dog))
}

function renderOneDog(dog) {
    const dogBar = document.getElementById("dog-bar")
    const span = document.createElement("span")

    span.setAttribute("data-span-id", dog.id)
    span.innerText = dog.name
    dogBar.append(span)

    span.addEventListener("click", event => showDogInfo(event, dog))
}

function showDogInfo(event, dog){
    const span = event.target
    const dogInfo = document.getElementById("dog-info")
    const id = event.target.dataset.spanId

    const dogDetails = `
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    `
    
    dogInfo.innerHTML = dogDetails

    const dogGoodnessButton = document.createElement("button")

    dogGoodnessButton.innerText = dogGoodness(dog)
    dogGoodnessButton.onclick = function() {fetchToggleDogGoodness(event, dog)}

    dogInfo.append(dogGoodnessButton)
}

function dogGoodness(dog){
    let status
    if (dog.isGoodDog){
        status = "Good dog!"
    } else {
        status = "Bad dog!"
    }
    return status
}

function filterGoodDogs(){
    const dogFilterButton = document.getElementById("good-dog-filter")
    dogFilterButton.dataset.viewGoodDogs = false
    dogFilterButton.onclick = event => toggleDogView(event)
}

function toggleDogView(event){
    const dogFilterButton = event.target
    let dogView = dogFilterButton.dataset.viewGoodDogs
    if (dogFilterButton.dataset.viewGoodDogs){
        dogFilterButton.dataset.viewGoodDogs = false
    } else {
        dogFilterButton.dataset.viewGoodDogs = true
    }
    // dogView ? dogFilterButton.dataset.viewGoodDogs = true : dogFilterButton.dataset.viewGoodDogs = false
    // dogFilterButton.dataset.viewGoodDogs = !dogFilterButton.dataset.viewGoodDogs
    // dogFilterButton.dataset.viewGoodDogs = true
    console.log(dogFilterButton)
    console.log(dogView)
}