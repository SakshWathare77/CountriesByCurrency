function getCountryInfo() {
    var currencyCode = document.getElementById('currencyInput').value.toUpperCase();
    var currencyInput = document.getElementById('currencyInput').value;

    fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`)
        .then(response => response.json())
        .then(data => {
            displayCountryInfo(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayCountryInfo({ error: 'Unable to fetch country information.' });
        });

        document.getElementById('tagline').style.display = 'none';s
}

function displayCountryInfo(data) {
    var countryInfoDiv = document.getElementById('countryInfo');
    countryInfoDiv.innerHTML = '';

    if (data.error) {
        countryInfoDiv.innerHTML = `<p>${data.error}</p>`;
    } else {
        data.forEach(country => {
            var card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital[0]}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Subregion:</strong> ${country.subregion}</p>
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            `;

            countryInfoDiv.appendChild(card);
        });
    }
}