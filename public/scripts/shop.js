
  fetch('/shopdata')
  .then(response => response.json())
  .then(data => {
    console.log("Data received!");
   // console.log(data);
     Data = data;
     displayProducts(Data);
     setCategories();
     setStrands();
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
  let Data;
  let cart = [];
  console.log(Data);
  const productsContainer = document.querySelector(".products");
  const categoryList = document.querySelector(".category-list");
  
  function displayProducts(products) {
    if (products.length > 0) {
      const product_details = products.map((product) => `
        <div class="product" onclick="handleProductClick('${product.name}')">
          <div class="img">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product-details">
            <span class="name">${product.name}</span>
            <span class="amt">₱${product.price}</span>
            <span class="seller">${product.seller}</span>
          </div>
        </div>`
      ).join("");
  
      productsContainer.innerHTML = product_details;
    } else {
      productsContainer.innerHTML = "<h3>No Products Available</h3>";
    }
  }

  // for cart
  function handleProductClick(productName) {
    const selectedProduct = Data.find((product) => product.name === productName);
  
    // Create the popup card
    const popupCard = document.createElement("div");
    popupCard.classList.add("popup-card");
  
    // Function to calculate the updated price based on quantity
    function updatePrice() {
      const quantity = parseInt(document.getElementById("quantity").value, 10);
      const totalPrice = selectedProduct.price * quantity;
      document.getElementById("totalPrice").textContent = `₱${totalPrice}`;
    }
  
    popupCard.innerHTML = `
      <div class="popup-content">
        <span class="close-button" onclick="closePopup()">&times;</span>
        <img src="${selectedProduct.image}" alt="${selectedProduct.name}" />
        <h2>${selectedProduct.name}</h2>
        <p id="totalPrice">₱${selectedProduct.price}</p>
  
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" min="1" value="1" oninput="updatePrice()">
  
        <button onclick="addToCart('${productName}')">Add to Cart</button>
      </div>
    `;
  
    // Append the popup card to the body
    document.body.appendChild(popupCard);
  }

  function closePopup() {
    const popupCard = document.querySelector(".popup-card");
    if (popupCard) {
      popupCard.remove();
    }
  }
  
  function addToCart(productName) {
    const selectedProduct = Data.find((product) => product.name === productName);
    const quantityElement = document.getElementById("quantity");
    
    // Check if the quantity element exists before accessing its value
    const quantity = quantityElement ? parseInt(quantityElement.value, 10) : 1;
  
    const item = {
      name: selectedProduct.name,
      image: selectedProduct.image,
      price: selectedProduct.price,
      quantity: quantity
    };
  
    cart.push(item);
  
    updateCartLink();
    closePopup();
  }

  function updateCartLink() {
    const cartLink = document.querySelector(".cart-link");
    if (cartLink) {
      cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> CART (${cart.length})`;
    }
  }

  function openCartPopup() {
    // Create the popup card
    const cartPopup = document.createElement("div");
    cartPopup.classList.add("popup-card");
  
    // Calculate total price
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    cartPopup.innerHTML = `
      <div class="popup-content">
        <span class="close-button" onclick="closePopup()">&times;</span>
        <h2>Your Cart</h2>
        <div class="cart-items">
          ${cart.map(item => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" />
              <div class="item-details">
                <p>${item.name}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ₱${item.price * item.quantity}</p>
              </div>
              <span class="delete-item" onclick="deleteCartItem('${item.name}')">&times;</span>
            </div>
          `).join('')}
        </div>
        <div class="total-price">
          <p>Total Price: ₱${totalPrice}</p>
        </div>
        <button onclick="checkout()">Checkout</button>
      </div>
    `;
  
    // Append the popup card to the body
    document.body.appendChild(cartPopup);
  }
  
  function deleteCartItem(productName) {
    // Remove the item from the cart
    cart = cart.filter(item => item.name !== productName);
  
    // Update the cart link and close the cart popup
    updateCartLink();
    closePopup();
  
    // Reopen the cart popup to show the updated cart
    openCartPopup();
  }
  
  function checkout() {
    // Check if the cart is empty
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before proceeding to checkout.");
      return;
    }
  
    // Implement your checkout logic here
    console.log("Checkout clicked");
  
    // Reset cart after checkout
    cart = [];
    updateCartLink();
  
    // Redirect to the checkout page or perform other actions
    alert("Purchase complete! Please check your email.");
  }
    
    

  
  // Function to close the popup card
  function closePopup() {
    const popupCard = document.querySelector(".popup-card");
    if (popupCard) {
      popupCard.remove();
    }
  }
  

  
  function setCategories() {
    const allCategories = Data.map((product) => product.catagory);
    //console.log(allCategories);
    const catagories = [
      "All",
      ...allCategories.filter((product, index) => {
        return allCategories.indexOf(product) === index;
      }),
    ];
    //console.log(catagories);
    categoryList.innerHTML = catagories.map((catagory) => `<li>${catagory}</li>`).join("");
  
    categoryList.addEventListener("click", (e) => {
      const selectedCatagory = e.target.textContent;
      selectedCatagory === "All" ? displayProducts(Data) : displayProducts(Data.filter((product) => product.catagory == selectedCatagory));
    });
  }
  
  const txtSearch = document.querySelector("#txtSearch");
  txtSearch.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (value) {
      displayProducts(Data.filter((product) => product.name.toLowerCase().indexOf(value) !== -1));
    } else {
      displayProducts(Data);
    }
  });

 
function setStrands() {
  const allStrands = Data.map((product) => product.strand);
  const uniqueStrands = [
    "All",
    ...new Set(allStrands), // Ensure unique strands
  ];

  const strandDropdown = document.createElement("select");
  strandDropdown.id = "strand-filter";
  uniqueStrands.forEach((strand) => {
    const option = document.createElement("option");
    option.value = strand;
    option.text = strand;
    strandDropdown.appendChild(option);
  });

  const strandFilterContainer = document.createElement("div");
  strandFilterContainer.classList.add("strand-filter");
  strandFilterContainer.innerHTML = `<h3>Strand</h3>`;
  strandFilterContainer.appendChild(strandDropdown);

  const categoryList = document.querySelector(".category-list");
  categoryList.parentNode.insertBefore(strandFilterContainer, categoryList.nextSibling); // Insert below category list

  strandDropdown.addEventListener("change", (e) => {
    const selectedStrand = e.target.value;
    displayProducts(selectedStrand === "All" ? Data : Data.filter((product) => product.strand === selectedStrand));
  });
}
  strandDropdown.addEventListener("change", (e) => {
    const selectedStrand = e.target.value;
    displayProducts(Data.filter((product) => product.strand === selectedStrand));
  });


function selectStrand(strand) {
  const strandDropdown = document.getElementById("strand-filter");
  strandDropdown.value = strand;
  strandDropdown.dispatchEvent(new Event('change'));
}
  
  

