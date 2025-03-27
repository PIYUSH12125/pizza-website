document.addEventListener('DOMContentLoaded', function() {
    // Initialize or retrieve the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const checkoutPage = document.querySelector('#checkout-page');
    const totalPrice = document.querySelector('#total-price');
    const payment = document.querySelector(".payment");
    const close = document.querySelector(".close");
    const proceedPayment = document.getElementById('proceed-payment');
    const cardNumberInput = document.querySelector("input[placeholder='Card Number']");
    const visaImg = document.querySelector("img[src='visa.png']");
    const masterImg = document.querySelector("img[src='master.png']");
    let total = 0;

    // Display cart items with images on the checkout page
    for (let pizza in cart) {
        let div = document.createElement('div');
        div.classList.add('cart-item');
        let img = document.createElement('img');
        img.src = cart[pizza].imageUrl;
        img.style.width = '200px';
        img.style.height = 'auto';
        img.style.marginLeft = '30px';
        let textContent = `${pizza}: ${cart[pizza].price} x ${cart[pizza].quantity}`;
        let text = document.createElement('p');
        text.textContent = textContent;
        div.appendChild(img);
        div.appendChild(text);
        checkoutPage.appendChild(div);
        total += cart[pizza].price * cart[pizza].quantity;
    }
    totalPrice.textContent = `Total: Rupees:${total.toFixed(2)}`;

    // Reset cart and reload page
    document.getElementById('reset-cart').addEventListener('click', function() {
        localStorage.clear();
        location.reload();
    });

    // Open payment dialog
    proceedPayment.addEventListener('click', function(event) {
        event.preventDefault();
        payment.style.display = "flex";
    });

    // Close payment dialog
    close.addEventListener('click', function() {
        payment.style.display = "none"; 
    });

    // Card number input event to display card type image
    cardNumberInput.addEventListener('keyup', function() {
        const cardNum = this.value;
        if (cardNum.startsWith('4')) {
            visaImg.style.display = 'block';
            masterImg.style.display = 'none';
        } else if (/^5[1-5]/.test(cardNum)) {
            masterImg.style.display = 'block';
            visaImg.style.display = 'none';
        } else {
            visaImg.style.display = 'none';
            masterImg.style.display = 'none';
        }
    });

    // Validate and handle checkout
    document.querySelector('.payButton').addEventListener('click', function(event) {
        event.preventDefault();

        const nameInput = document.querySelector("input[placeholder='John Doe']");
        const phoneInput = document.querySelector("input[placeholder='+1 234 5678']");
        const addressInput = document.querySelector("input[placeholder='Elton St 21 22-145']"); // Not mandatory
        const monthInput = document.querySelector("input[placeholder='mm']");
        const yearInput = document.querySelector("input[placeholder='yyyy']");
        const cvvInput = document.querySelector("input[placeholder='cvv']");

        // Regex validations
        const regexName = /^[a-zA-Z\s]*$/;
        const regexPhone = /^\+?[0-9]{10,15}$/;

        if (!regexName.test(nameInput.value.trim())) {
            alert("Name should contain only letters and spaces.");
            return;
        }

        if (!regexPhone.test(phoneInput.value.trim())) {
            alert("Please enter a valid phone number.");
            return;
        }

        if (!visaImg.style.display && !masterImg.style.display) {
            alert("Please enter a valid Visa or MasterCard number.");
            return;
        }

        if (!monthInput.value.trim() || !yearInput.value.trim() || !cvvInput.value.trim()) {
            alert("Please complete all card details.");
            return;
        }

        // If all validations pass
        localStorage.clear();
        alert('Thank you for your purchase!');
        window.location.href = 'pizza.html'; // Redirect to home page
    });
});
