document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.querySelector('input[type="text"]');
    const fromSelect = document.querySelector('select[name="from"]');
    const toSelect = document.querySelector('select[name="to"]');
    const msgDiv = document.querySelector('.msg');
    const button = document.querySelector('button');

    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/'; // Replace with your API endpoint if different

    async function fetchExchangeRates(baseCurrency) {
        try {
            const response = await fetch(`${apiUrl}${baseCurrency}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            alert('Could not fetch exchange rates. Please try again later.');
            return null;
        }
    }

    button.addEventListener('click', async (event) => {
        event.preventDefault();
        
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const data = await fetchExchangeRates(fromCurrency);
        if (!data) return;

        const rate = data.rates[toCurrency];
        if (rate) {
            const convertedAmount = (amount * rate).toFixed(2);
            msgDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            alert('Could not retrieve the conversion rate.');
        }
    });
});