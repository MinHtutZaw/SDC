

/* Script for Data Adding to array */
function addToCart(productName,imageUrl,price){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
 
    cart.push({productName,imageUrl,price});
 
    localStorage.setItem('cart',JSON.stringify(cart));
 
    alert("Added to  cart!!");
    displayCart();
}
 
/* Script for show added items in cart-container */
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total');
    const totalPriceContainer = document.getElementById('total_price');
 
    let total = 0;
   
 
    cartContainer.innerHTML = ''; // Clear the cart 
 
    const groupedItems = {};
 
    cartItems.forEach(item => {
        if (!groupedItems[item.productName]) {
            groupedItems[item.productName] = {
                quantity: 0,
                price: 0,
            };
        }
 
        groupedItems[item.productName].quantity += 1;
        groupedItems[item.productName].price += item.price;
    });
 
    for (const productName in groupedItems) {
        const item = groupedItems[productName];
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `<img src="${cartItems.find(item => item.productName === productName).imageUrl}" alt="${productName} Image">
        <div class="cart-item-details">
            <p class="cart-item-name">${productName} (Quantity: ${item.quantity})</p>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>`;
 
        cartContainer.appendChild(cartItem);
 
        total += item.price;
    }
 
    totalPrice.textContent = `$${total.toFixed(2)}`;//show total price

    //Total price show or hide
    if (cartItems.length > 0) {
        totalPriceContainer.style.display = 'block';
    } else {
        totalPriceContainer.style.display = 'none';
    }
  }
 
  displayCart();
 
  function clearCart(){
    localStorage.removeItem('cart');
    displayCart();
  }