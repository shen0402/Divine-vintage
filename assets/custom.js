document.querySelectorAll('.variant-subscription__input').forEach(item=>{
    item.addEventListener('change', function(){
        document.querySelector('.sub-variant--id').value = this.getAttribute('data-subvariant-id');
        var available = this.getAttribute('data-subproudct-available');
        var submit = document.querySelector('.product-form__cart-submit');
        if (available == 'true') {
            submit.disabled = false;
            submit.removeAttribute('aria-disabled');            
            submit.querySelector('[data-add-to-cart-text]').textContent = 'Add to Bag';
        } else {
            submit.disabled = true;
            submit.setAttribute('aria-disabled', true);
            submit.querySelector('[data-add-to-cart-text]').textContent = 'Sold out';
        }
    });
});

document.querySelector('[subscription-add-to-cart]').addEventListener('click',function(e){
    e.preventDefault();
    const form = document.querySelector('.product-form');
    const data = Object.fromEntries(new FormData(form).entries());
    let formData = {
        'items': [{
          'id': data.id,
          'quantity': data.quantity,
          'selling_plan': data.selling_plan,
        }]
    }
    fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        return response.json();
    })
      .then(data=> window.location.href="/cart")
      .catch((error) => {
        console.error('Error:', error);
    });
});