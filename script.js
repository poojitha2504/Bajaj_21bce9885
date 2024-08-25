const backendUrl = 'https://your-backend-url/endpoint';

function submitJson() {
    const jsonInput = document.getElementById('json-input').value;
    const errorMessage = document.getElementById('error-message');
    const responseContainer = document.getElementById('response-container');
    const responseDisplay = document.getElementById('response-display');

    // Validate JSON format
    let jsonData;
    try {
        jsonData = JSON.parse(jsonInput);
    } catch (e) {
        errorMessage.textContent = 'Invalid JSON format';
        responseContainer.style.display = 'none';
        return;
    }

    // Clear previous error message
    errorMessage.textContent = '';

    // Send POST request to backend
    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        window.apiResponse = data; // Store the API response
        responseContainer.style.display = 'block';
        updateDisplay();
    })
    .catch(error => {
        errorMessage.textContent = 'Error fetching data from API';
        responseContainer.style.display = 'none';
    });
}

function updateDisplay() {
    const selectedOptions = Array.from(document.getElementById('options').selectedOptions, option => option.value);
    const responseDisplay = document.getElementById('response-display');

    if (window.apiResponse) {
        const filteredData = {};

        if (selectedOptions.includes('Alphabets')) {
            filteredData['Alphabets'] = window.apiResponse['Array for alphabets'];
        }
        if (selectedOptions.includes('Numbers')) {
            filteredData['Numbers'] = window.apiResponse['Array for numbers'];
        }
        if (selectedOptions.includes('Highest alphabet')) {
            filteredData['Highest alphabet'] = Math.max(...window.apiResponse['Array for alphabets']);
        }

        responseDisplay.textContent = JSON.stringify(filteredData, null, 2);
    }
}
