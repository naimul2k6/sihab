// Sample Product Data (can be replaced with an API call)
const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Black T-shirt featuring a bold 'Free Palestine' design with a raised fist, Palestinian flag, and text in Arabic and English.",
    price: 29.99,
    image: "https://images-cdn.ubuy.co.id/653d18637ccdfd17d60cc66c-free-gaza-free-palestine-flag-arabic.jpg"
  },
  {
    id: 2,
    name: "Product 2",
    description: "A black t-shirt with the slogan 'RUNNING INTO MY 40s' in bold orange and white text, featuring two running silhouettes and a dynamic star design.",
    price: 39.99,
    image: "https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C71mucekhPNL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png"
  },
  {
    id: 3,
    name: "Product 3",
    description: "Comfortable gray T-shirt featuring 'Alhamdulillah for Everything' in elegant black typography, ideal for daily wear.",
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/B1qmQK-r4OS._CLa%7C2140%2C2000%7C61hg85NPJsL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UL1500_.png"
  }

];

// Cart array to hold items added to the cart
let cart = [];

// Function to render products
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productElement);
  });
}

// Function to add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingProductIndex = cart.findIndex(item => item.id === productId);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Function to update cart display
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  cartItems.innerHTML = "";

  let totalPrice = 0;
  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.innerHTML = `
      <p>${item.name} - $${item.price.toFixed(2)} x
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
      </p>
    `;
    cartItems.appendChild(cartItemElement);
    totalPrice += item.price * item.quantity;
  });

  totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Function to update quantity in the cart
function updateQuantity(productId, quantity) {
  const cartItem = cart.find(item => item.id === productId);
  if (quantity > 0) {
    cartItem.quantity = parseInt(quantity);
  } else {
    cartItem.quantity = 1;
  }
  updateCart();
}

// Function to clear the cart
document.getElementById("clear-cart").onclick = function() {
  cart = [];
  updateCart();
};

// Function to handle checkout
document.getElementById("checkout").onclick = function() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
  } else {
    alert("Proceeding to checkout.");
  }
};

// Initial render
renderProducts();
