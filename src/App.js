document.getElementById('zakatForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const wealth = document.getElementById('wealth').value;
    const wealthType = document.getElementById('wealth_type').value;

    const response = await fetch('https://your-backend-url.com/calculate_zakat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wealth, wealth_type: wealthType }),
    });
    const data = await response.json();

    const resultDiv = document.getElementById('result');
    if (data.zakat) {
        resultDiv.innerHTML = `<p>Your Zakat is: ${data.zakat} (calculated from ${wealth} ${wealthType})</p>`;
    } else {
        resultDiv.innerHTML = `<p>${data.message || data.error}</p>`;
    }
});

