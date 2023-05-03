let showDogButton = document.getElementById('button-random-dog');
let container = document.getElementById('content');
let inputBreed = document.getElementById('input-breed');
let showBreedButton = document.getElementById('button-show-breed');
let showSubBreedButton = document.getElementById('button-show-sub-breed');
let showAllButton = document.getElementById('button-show-all');




async function getRandomImage() {
    let response = await fetch("https://dog.ceo/api/breeds/image/random");
    if (response.status >= 200 && response.status < 300) {
        let data = await response.json();
        return data.message;
    } else {
        throw new Error(`incorrect service response: ${response.status}`);
    }
}

async function showRandomImage() {
    try {
        let imageUrl = await getRandomImage();
        let image = document.createElement('img');
        image.setAttribute('src', imageUrl);
        image.classList.add('border', 'border-3', 'border-success', 'my-5', 'img-fluid', 'h-100');
        container.replaceChildren(image);
    } catch (error) {
        console.log(error)
    }
}


async function getBreedImage() {
    let breed = inputBreed.value.toLowerCase();
    let response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    if (response.status >= 200 && response.status < 300) {
        let data = await response.json();
        return data.message;
    } else {
        throw new Error(`incorrect service response: ${response.status}`);
    }
}

async function showBreedImage() {
    try {
        let imageUrl = await getBreedImage();
        let image = document.createElement('img');
        image.setAttribute('src', imageUrl);
        image.classList.add('border', 'border-3', 'border-success', 'my-5');
        container.replaceChildren(image);
    } catch (error) {
        console.log(error);
        let message = document.createElement('p');
        message.innerText = "Breed not found!";
        container.replaceChildren(message);
    }
}

async function getListOfSubBreed() {
    let response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (response.status >= 200 && response.status < 300) {
        let data = await response.json();
        return data.message;
    } else {
        throw new Error(`incorrect service response: ${response.status}`);
    }
}

function showError(error) {
    let message = document.createElement('p');
    message.innerText = error;
    container.replaceChildren(message);
}

async function showListOfSubBreed() {
    try {
        let breed = inputBreed.value.toLowerCase();
        let listAllSubBreed = await getListOfSubBreed();
        let listSubBreed = listAllSubBreed[breed];
        if (!listSubBreed) {
            showError(`Breed not found!`);
            return;
        }
        if (listSubBreed.length === 0) {
            showError(`No sub-breeds found!`);
            return;
        }
        let list = document.createElement('ol');
        listSubBreed.forEach((subBreed) => {
            let li = document.createElement('li');
            li.innerText = subBreed;
            list.appendChild(li);
        });
        container.replaceChildren(list);
    } catch (error) {
        console.error(error);
    }
}

async function showAllBreeds() {
    try {
        let listAllBreeds = await getListOfSubBreed();
        let listOl = document.createElement('ol');
        for (let breed in listAllBreeds) {
            let liBreed = document.createElement('li');
            liBreed.innerText = breed;
            if (listAllBreeds[breed].length !== 0) {
                let listUl = document.createElement('ul');
                listAllBreeds[breed].forEach(subBreed => {
                    let liSubBreed = document.createElement('li');
                    liSubBreed.innerText = subBreed;
                    listUl.appendChild(liSubBreed);
                });
                liBreed.appendChild(listUl);
            }
            listOl.appendChild(liBreed);
        }
        container.replaceChildren(listOl);
    } catch (error) {
        console.log(error);
    }
}

showDogButton.addEventListener('click', () => {
    showRandomImage().then();
})

showBreedButton.addEventListener('click', () => {
    showBreedImage().then();
})

showSubBreedButton.addEventListener('click', () => {
    showListOfSubBreed().then();
})

showAllButton.addEventListener('click', () => {
    showAllBreeds().then();
})