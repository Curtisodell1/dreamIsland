const animalCrossingApi = "https://acnhapi.com/v1/villagers/"
const previewList = document.getElementById("previewCardContainer")



const fetchAnimals =
    fetch(animalCrossingApi)
        .then(r => r.json())
        .then(allChar => previewCard(allChar))

function previewCard(allChar) {
    for (let char in allChar) {
        const singleChar = allChar[char]

        const previewCard = document.createElement("div")
        previewCard.classList.add("previewCard")
        previewCard.setAttribute("id", singleChar.name['name-USen'])
        previewList.appendChild(previewCard)

        const previewIcon = document.createElement("img")
        previewIcon.classList.add("previewIcon")
        previewIcon.src = singleChar['icon_uri']
        previewCard.appendChild(previewIcon)

        const previewName = document.createElement("p")
        previewName.innerText = singleChar.name['name-USen']
        previewName.classList.add("previewName")
        previewCard.appendChild(previewName)

        const previewId = document.createElement("p")
        previewId.setAttribute("id", singleChar.id)
        previewId.style.display = "none"
        previewCard.appendChild(previewId)

        const previewSpecies = document.createElement("p")
        previewSpecies.setAttribute("class", "species")
        previewSpecies.style.display = "none"
        previewSpecies.innerText = singleChar.species
        previewCard.appendChild(previewSpecies)

        const previewPersonality = document.createElement("p")
        previewPersonality.setAttribute("class", "personality")
        previewPersonality.style.display = "none"
        previewPersonality.innerText = singleChar.personality
        previewCard.appendChild(previewPersonality)

        previewCard.onclick = () => {
            renderBigCard(singleChar.id)
        }
    }
    randomizer()
    showTommyBoy()
}

function randomizer() {
    renderBigCard(Math.floor(Math.random() * (391 - 1 + 1) + 1))
}

function renderBigCard(id) {
    fetch(animalCrossingApi + id)
        .then(r => r.json())
        .then(oneChar => {
            bigCardImage.src = oneChar.image_uri
            bigCardImage.style
            bigName.innerText = oneChar.name['name-USen']
            bigSpecies.innerText = 'Species:   ' + oneChar.species
            bigPersonality.innerText = 'Personality:   ' + oneChar.personality
            bigBirthday.innerText = 'Birthday:   ' + oneChar['birthday-string']
            bigCatchphrase.innerText = 'Catchphrase:   ' + '"' + oneChar['catch-phrase'] + '"'
            bigId.innerText = oneChar.id
        })
}

///Function for Sorting Small Cards by Character Name Alphabetically/////

function sortAlphabeticallyAZ() {
    const animals = Array.from(document.getElementsByClassName("previewCard"))
    animals.sort(function (a, b) {
        if (a.id > b.id) { return 1 }
        if (b.id > a.id) { return -1 }
        return 0
    })
    previewList.innerText = ""
    for (let animal of animals) {
        renderSmallCard(animal)
    }
    showTommyBoy()
}

function sortAlphabeticallyZA() {
    const animals = Array.from(document.getElementsByClassName("previewCard"))
    animals.sort(function (a, b) {
        if (a.id > b.id) { return -1 }
        if (b.id > a.id) { return 1 }
        return 0
    });
    previewList.innerText = ""
    for (let animal of animals) {
        renderSmallCard(animal)
    }
    showTommyBoy()
}
function renderSmallCard(animal) {
    const previewCard = document.createElement("div")
    previewCard.classList.add("previewCard")
    previewCard.setAttribute("id", animal.children[1].innerText)
    previewCard.style.display = "flex"
    previewList.appendChild(previewCard)

    const previewIcon = document.createElement("img")
    previewIcon.classList.add("previewIcon")
    previewIcon.src = animal.children[0].src
    previewCard.appendChild(previewIcon)

    const previewName = document.createElement("p")
    previewName.innerText = animal.children[1].innerText
    previewName.classList.add("previewName")
    previewCard.appendChild(previewName)

    const previewId = document.createElement("p")
    previewId.setAttribute("id", animal.children[2].id)
    previewId.style.display = "none"
    previewCard.appendChild(previewId)

    const previewSpecies = document.createElement("p")
    previewSpecies.setAttribute("class", "species")
    previewSpecies.style.display = "none"
    previewSpecies.innerText = animal.children[3].innerText
    previewCard.appendChild(previewSpecies)

    const previewPersonality = document.createElement("p")
    previewPersonality.setAttribute("class", "personality")
    previewPersonality.style.display = "none"
    previewPersonality.innerText = animal.children[4].innerText
    previewCard.appendChild(previewPersonality)

    previewCard.onclick = () => {
        renderBigCard(animal.children[2].id)
    }
    showTommyBoy()
}
///Function for Personality Filter//////

function searchByPersonality(personality) {
    const animals = document.getElementsByClassName("personality")
    Array.from(animals).forEach(animal => {
        if (animal.innerText === personality) {
            animal.parentNode.style.display = "flex"
        } else {
            animal.parentNode.style.display = "none"
        }
    })
}

///Function for Species Filter//////

function searchBySpecies(species) {
    const animals = document.getElementsByClassName("species")
    Array.from(animals).forEach(animal => {
        if (animal.innerText === species) {
            animal.parentNode.style.display = "flex"
        } else {
            animal.parentNode.style.display = "none"
        }
    })
}

function clearSpecies() {
    const animals = document.getElementsByClassName("previewCard")
    Array.from(animals).forEach(animal => {
        if (animal.style.display = "none") {
            animal.style.display = "flex"
        }
    })
}

//search bar
const searchBar = document.getElementById("searchField")
searchBar.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase()
    const animals = document.getElementsByClassName("previewName")
    const cards = Array.from(document.getElementsByClassName("previewCard"))
    Array.from(animals).forEach(animal => {
        if (animal.textContent.toLowerCase().includes(searchValue)) {
            animal.parentNode.style.display = "flex"
        } else {
            animal.parentNode.style.display = "none"
        }
    })
    checkForNoAnimals()
})
function checkForNoAnimals() {
    const tommyBoy = document.getElementById("Tom Nook")
    const cards = Array.from(document.getElementsByClassName("previewCard"))
    function checkIfShown(card) {return card.style.cssText === 'display: none;'}
    let value = cards.every(checkIfShown)
    if (value === true) {tommyBoy.style.display = "flex"}
    else {tommyBoy.style.display = "none"}
}

function showTommyBoy() {
    if (document.getElementById("Tom Nook") === null) {
    const previewCard = document.createElement("div")
    previewCard.classList.add("previewCard")
    previewCard.setAttribute("id", "Tom Nook")
    previewCard.style.display = "none"
    previewList.appendChild(previewCard)

    const previewIcon = document.createElement("img")
    previewIcon.classList.add("previewIcon")
    previewIcon.src = "https://okasaneko.files.wordpress.com/2014/01/kittymama-fitness-03.jpg"
    previewCard.appendChild(previewIcon)

    const previewName = document.createElement("p")
    previewName.innerText = "Uh-oh! \nNo Results"
    previewName.classList.add("previewName")
    previewCard.appendChild(previewName)

    const previewId = document.createElement("p")
    previewId.setAttribute("id", "Tom Nook")
    previewId.style.display = "none"
    previewCard.appendChild(previewId)

    const previewSpecies = document.createElement("p")
    previewSpecies.setAttribute("class", "species")
    previewSpecies.style.display = "none"
    previewSpecies.innerText = "No Results"
    previewCard.appendChild(previewSpecies)

    const previewPersonality = document.createElement("p")
    previewPersonality.setAttribute("class", "personality")
    previewPersonality.style.display = "none"
    previewPersonality.innerText = "noPersonality"
    previewCard.appendChild(previewPersonality)
}}

//Favorite button below
const favoriteButton = document.getElementById("favoriteButton")
const favoriteAnimal = document.querySelectorAll("p.favorite")
favoriteButton.addEventListener("click", () => {
    if (favoriteAnimal.innerText == 0) {
        favoriteAnimal.innerText += 1
    } else (favoriteAnimal.innerText == 1); {
        favoriteAnimal.innerText -= 0
    }
})

const newFavoriteId = document.getElementById('bigId')
let updatedFavorites = []

favoriteButton.addEventListener("click", () => {
    if (localStorage.favorites === undefined) {
        const favoriteIdArray = []
        localStorage.setItem('favorites', JSON.stringify(favoriteIdArray))
        const currentFavorites = JSON.parse(localStorage.getItem('favorites'))
        updatedFavorites = [...currentFavorites, newFavoriteId.innerText]
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
        renderFavoriteCards(updatedFavorites)
    }
    else if (JSON.parse(localStorage.favorites).length === 10) {
        alert("Your village is full!")
    }
    else {
        const currentFavorites = JSON.parse(localStorage.getItem('favorites'))
        const updatedFavorites = [...currentFavorites, newFavoriteId.innerText]
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
        const favoriteCardContainer = document.getElementById('favoriteCardContainer')
        favoriteCardContainer.innerText = ""
        renderFavoriteCards(updatedFavorites)
    }
})

const dreamVillageTitle = document.getElementById('dream-village-title')

function renderFavoriteCards(updatedFavorites) {
    updatedFavorites.forEach((singleFavorite) => {
        fetch(animalCrossingApi + `${singleFavorite}`)
            .then(r => r.json())
            .then(singleVillagerInfo => {
                const favoriteName = document.createElement('p')
                favoriteName.innerText = singleVillagerInfo.name['name-USen']
                favoriteName.classList.add("favoriteCardName")

                const favoriteImg = document.createElement('img')
                favoriteImg.src = singleVillagerInfo.image_uri
                favoriteImg.classList.add("favoriteCardImg")

                const favoriteCard = document.createElement('div')
                favoriteCard.classList.add("favoriteCard")

                favoriteCard.appendChild(favoriteName)
                favoriteCard.appendChild(favoriteImg)

                const favoriteCardContainer = document.getElementById('favoriteCardContainer')
                favoriteCardContainer.appendChild(favoriteCard)

            })
    })
    dreamVillageTitle.style.display = "block"
}

const deleteButton = document.getElementById("deleteVillage")
const footer = document.getElementsByTagName("footer")
const favoriteCardContainer = document.getElementById('favoriteCardContainer')

deleteButton.addEventListener("click", () => {
    localStorage.removeItem("favorites")
    favoriteCardContainer.textContent = ""

    if (favoriteCardContainer.textContent === "") {
        dreamVillageTitle.style.display = "none"
    }
})

const seeDreamIsland = document.getElementById('seeFavoritesButton')

seeDreamIsland.addEventListener("click", () => {
    if (localStorage.favorites != undefined) {
        const currentFavorites = JSON.parse(localStorage.getItem('favorites'))
        // const updatedFavorites = [...currentFavorites, newFavoriteId.innerText]
        localStorage.setItem('favorites', JSON.stringify(currentFavorites))
        const favoriteCardContainer = document.getElementById('favoriteCardContainer')
        favoriteCardContainer.innerText = ""
        renderFavoriteCards(currentFavorites)
    } else {
        alert("Add a villager to your dream island first!")
    }
})