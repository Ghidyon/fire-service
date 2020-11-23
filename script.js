const search = document.querySelector('#search');
const loader = document.querySelector('.loader');
const err = document.querySelector('.error');
const container = document.querySelector('.stations');

window.onload = () => loadNumbers();

const loadNumbers = async () => {
    loader.style.visibility = "visible";
    try {
        const response = await fetch('../numbers.json');
        const stations = await response.json();

        let output = "";
        stations.forEach(station => {
            const { name, number } = station;
            output += `<div class="station">
                            <div>
                                <a href="tel:${number}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-phone" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                    </svg>
                                </a>
                            </div>
                            <p>${name}</p>
                        </div>`;
        })
        document.querySelector('.stations').innerHTML = output;
        loader.style.visibility = "hidden";
    }
    catch (error) {
        const errorMessage = `<img src="images/icon-error.svg">
                                <span>Failed to fetch emergency numbers, please check your internet connection.</span>`;
        displayError(errorMessage);
    }
}

const getNumbers = async searchValue => {
    const response = await fetch('../numbers.json');
    const stations = await response.json();

    // Get matches to current text input
    const stationMatches = stations.filter(station => {
        const regex = new RegExp(`${searchValue}`, 'gi'); // regex to match stations with search value
        return station.name.match(regex);
    })

    let output = ``;
    stationMatches.forEach(station => {
        const { name, number } = station;
        output += `<div class="station">
                        <div>
                            <a href="tel:${number}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon-phone" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                </svg>
                            </a>
                        </div>
                        <p>${name}</p>
                    </div>`;
    })
    displayNumbers(output);

    if (stationMatches.length === 0) {
        container.innerHTML = "<h3>No Matches Found</h3>";
        container.style.textAlign = "center";
    }

    // Set media query when there is only one match

    const deviceWidth = window.matchMedia('(min-width: 700px)');

    const changeWidth = width => {
        if (width.matches) { //if media query matches
            container.style.width = "350px";
        }
    }

    if (stationMatches.length === 1) {
        changeWidth(deviceWidth);
        deviceWidth.addListener(changeWidth);
    }
    else {
        container.style.width = "100%";
    }

}

search.addEventListener('input', e => getNumbers(search.value));

// Function for UI

const displayNumbers = (display) => {
    document.querySelector('.stations').innerHTML = display;
    loader.style.visibility = "hidden";
}

const displayError = (error) => {
    loader.style.visibility = "hidden";
    err.innerHTML = error;
    err.style.display = "flex";
}