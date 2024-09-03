
// product clicked
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.closest('.product-card').getAttribute('data-name');
            if(productName){
                window.location.href = `/product?name=${encodeURIComponent(productName)}`;
            }
        });
    });
});

// view cart page
document.addEventListener('DOMContentLoaded', function() {
    const viewCart = document.querySelectorAll('.fa-cart-shopping');

    viewCart.forEach(button => {
        button.addEventListener('click', function() {
            console.log("View Cart");
        });
    });
});
// size clicked and recorded as selectedSize
// Initialize cartItems from localStorage or create an empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

let selectedSize = null;
document.addEventListener('DOMContentLoaded', function() {
    const sizeButton = document.querySelectorAll('.product-size');

    sizeButton.forEach(button => {
        button.addEventListener('click', function() {
            sizeButton.forEach(btn => btn.classList.remove('active-size'));
            this.classList.add('active-size');

            if(this.classList.contains("size-small")){
                selectedSize = "small";
            } else if(this.classList.contains("size-medium")){
                selectedSize = "medium";
            } else if(this.classList.contains("size-large")){
                selectedSize = "large";
            } else {
                console.log("error with sizes");
            }
            console.log("Selected size:", selectedSize);
        });
    });
});
// add to cart clicked



document.addEventListener('DOMContentLoaded', function() {
    const cartButtons = document.querySelectorAll('.add-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartButtons.forEach(btn => btn.classList.remove('active-cart'));
            this.classList.add('active-cart');
            if (!selectedSize) {
                alert("Please select a size before adding to cart.");
                return;
            }

            const productName = document.querySelector('.featurette-heading').textContent.trim();
            const productPrice = parseFloat(document.querySelector('.price').textContent.replace('$', '').trim());

            const newCartItem = {
                productName: productName,
                productPrice: productPrice,
                productSize: selectedSize
            };
            console.log(newCartItem);

            cartItems.push(newCartItem);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log("Cart Items:", cartItems);

        });
    });
    

});

// Redirect to the cart page and send cart items to the server
document.addEventListener('DOMContentLoaded', function() {
    const viewCartButtons = document.querySelectorAll('.fa-cart-shopping');

    viewCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            
            fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItems)
            })
            .then(response => response.json())
            .then(data => {
                window.location.href = '/cart';
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });
});

// Clear the cart 
document.addEventListener('DOMContentLoaded', function() {
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {  // Check if the element exists
        clearCartButton.addEventListener("click", function() {
            localStorage.removeItem('cartItems');
            window.location.reload();
        });
    }
});

// remove item from cart
document.addEventListener('DOMContentLoaded', function() {
    const removeButtons = document.querySelectorAll('.remove-button');
    if(removeButtons){
        removeButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Find the item to remove based on its index
                cartItems.splice(index, 1);
            
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Optionally, refresh the page to reflect the changes
                window.location.reload();
            });
        });
    }
});
    
    

