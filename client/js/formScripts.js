// formScript.js
function closePopup() {
    // Hide the form and overlay
    document.getElementById('popup-form').style.display = 'none';
    document.getElementById('overlay1').style.display = 'none';
}

// Show popup function
function showPopup(productId) {
    // Set the product_id in the hidden input field
    document.getElementById('product_id').value = productId;
    
    // Show the overlay and popup form
    document.getElementById('overlay1').style.display = 'block';
    document.getElementById('popup-form').style.display = 'block';
    form.reset();
}

// Close popup function
function closePopup() {
    // Hide the overlay and popup form
    document.getElementById('overlay1').style.display = 'none';
    document.getElementById('popup-form').style.display = 'none';
    form.reset();
}

// Enable submit button when all fields are valid
const form = document.getElementById('inquiryForm');
const submitBtn = document.getElementById('submitBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const quantityInput = document.getElementById('quantity');

// Enable submit button when all fields are valid
form.addEventListener('input', () => {
    if (nameInput.value && emailInput.value && phoneInput.value && quantityInput.value > 0) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
});

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        product_id: document.getElementById('product_id').value,
        quantity: quantityInput.value,
        additional_requirements: document.getElementById('requirements').value
    };

    const response = await fetch('/submit-inquiry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        alert("Your inquiry has been submitted!");
        form.reset();
        submitBtn.disabled = true;
        closePopup(); // Close the popup after submission
    } else {
        alert("An error occurred. Please try again.");
    }
});
