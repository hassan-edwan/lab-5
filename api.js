document.addEventListener('DOMContentLoaded', function () {
    const fromCurrencyDropdown = document.getElementById('fromCurrency');
    const toCurrencyDropdown = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');

    // Fetch currency options using Frankfurter API
    fetch('https://api.frankfurter.app/currencies')
        .then(response => response.json())
        .then(data => {
            for (const currency in data) {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = data[currency];
                fromCurrencyDropdown.appendChild(option);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = data[currency];
                toCurrencyDropdown.appendChild(option2);
            }
        })
        .catch(error => console.error('Failed to load currency data: ' + error));

    // Handle form submission
    const form = document.getElementById('currencyConverterForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const fromCurrency = fromCurrencyDropdown.value;
        const toCurrency = toCurrencyDropdown.value;
        const amount = parseFloat(amountInput.value);

        if (fromCurrency === toCurrency) {
            alert("Cannot convert the same values.");
        } else {
            // Make an API request to get the currency conversion rate from Frankfurter API
            fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`)
                .then(response => response.json())
                .then(data => {
                    const rate = data.rates[toCurrency];
                    const convertedAmount = amount * rate;
                    resultDiv.textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
                })
                .catch(error => console.error('Failed to perform conversion: ' + error));
        }
    });
});
