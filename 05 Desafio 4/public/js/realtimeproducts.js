const socket = io();

  socket.on('productList', (products) => {
    const productListElement = document.getElementById('product-list');
    productListElement.innerHTML = ''; 

    products.forEach((product) => {
      productListElement.innerHTML += `<li>${product.title} - ${product.price}</li>`; // Agrega cada producto a la lista
    });
  });