document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    document.querySelectorAll('.bx-cart-alt').forEach(button => {
        button.addEventListener('click', function() {
            let pizza = {
                name: this.getAttribute('data-name'),
                price: parseInt(this.getAttribute('data-price')),
                quantity: 1
            };

            if (cart[pizza.name]) {
                cart[pizza.name].quantity++;
            } else {
                cart[pizza.name] = pizza;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Item added to cart!');
        });
    });
});

let darkmode = document.querySelector('#darkmode');

  darkmode.onclick = () => {
      if(darkmode.classList.contains('bx-moon')){
          darkmode.classList.replace('bx-moon','bx-sun');
          document.body.classList.add('active');
      }else{
          darkmode.classList.replace('bx-sun','bx-moon');
          document.body.classList.remove('active');
      }
  }
