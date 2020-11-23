const search = document.querySelector('#search');
const loader = document.querySelector('.loader');

window.onload = () => {
    console.log("Hello")
    loadNumbers();
}

const loadNumbers = async () => {
    loader.style.visibility = "visible";
    try {
        const response = await fetch('../numbers.json');
        const stations = await response.json();
        console.log(stations);

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
        displayNumbers(output);
    }
    catch (error) {
        const errorMessage = `<img src="images/icon-error.svg">
                                <span>Failed to fetch emergency numbers, please check your internet connection.</span>`;
        // displayError(errorMessage);
    }
}


const displayNumbers = (output) => {
    document.querySelector('.stations').innerHTML = output;
    loader.style.visibility = "hidden";
}