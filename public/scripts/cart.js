let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');


iconCart.addEventListener('click', function() {
  // Toggle cart visibility and animation
  if (cart.style.right == '-100%') {
    cart.style.right = '0';
    container.style.transform = 'translateX(-400px)';
  } else {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
  }
})

function addCart($idProduct) {
  // Add product to cart logic
  let productsCopy = JSON.parse(JSON.stringify(products));
  if (!listCart[$idProduct]) {
    // If product not in cart, add it
    listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
    listCart[$idProduct].quantity = 1;
  } else {
    // If product already in cart, increase quantity
    listCart[$idProduct].quantity++;
  }

  // Save cart to cookie
  document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

  // Update cart content
  addCartToHTML();
}

function addCartToHTML() {
  // Clear existing cart content
  let listCartHTML = document.querySelector('.listCart');
  listCartHTML.innerHTML = '';

  let totalHTML = document.querySelector('.totalQuantity');
  let totalQuantity = 0;

  // If there are products in the cart
  if (listCart) {
    listCart.forEach(product => {
      if (product) {
        // Create HTML for each cart item
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.innerHTML = `
          <img src="${product.image}">
          <div class="content">
            <div class="name">${product.name}</div>
            <div class="price">$${product.price} / 1 product</div>
          </div>
          <div class="quantity">
            <button onclick="changeQuantity(${product.id}, '-')">-</button>
            <span class="value">${product.quantity}</span>
            <button onclick="changeQuantity(${product.id}, '+')">+</button>
          </div>
        `;

        // Append item to cart list
        listCartHTML.appendChild(newCart);
        totalQuantity += product.quantity;
      }
    });
  }

  // Update total quantity badge
  totalHTML.innerText = totalQuantity;
}

function handleProductClick(productName) {
  // Find the product with the matching name in the Data array
  const product = Data.find(product => product.name === productName);

  if (product) {
    addCart(product.id); // Call the addCart function to add the product to the cart
  } else {
    console.error("Product not found in Data:", productName);
  }
}
