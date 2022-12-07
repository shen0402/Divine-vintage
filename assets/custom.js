function changeSubscriptionVariant() {
    const selector = document.querySelector('.subscribe-selector');
    const sellingPlanId = selector.options[selector.selectedIndex].getAttribute('data-selling-plan-id');
    const lastMonth = selector.options[selector.selectedIndex].getAttribute('data-last-month');
    const price = selector.options[selector.selectedIndex].getAttribute('data-price');
    document.querySelector('.variant-subscription__input').value = sellingPlanId;
    if (document.getElementById('prepaid-subscription').checked) {
        document.getElementById('last-month').value = `This is a prepaid membership, all charges are upfront`;
        document.querySelector('.subscription-expire-msg').textContent = `This is a prepaid membership, all charges are upfront`;
    } else {
        if (lastMonth != 'Ongoing') {
            document.getElementById('last-month').value = `Your subscription will last ${lastMonth} months`;
            document.querySelector('.subscription-expire-msg').textContent = `Your subscription will last ${lastMonth} months`;   
        }
    }

    document.querySelector('.product__price [data-price]').textContent = price;
    
    if (selector.selectedIndex == 0) {
        document.querySelector('.subscription-field').classList.add('disabled');
        document.getElementById('prepaid-subscription').disabled = true;
    } else {
        document.querySelector('.subscription-field').classList.remove('disabled');
        document.getElementById('prepaid-subscription').disabled = false;
    }
}

document.querySelector('.subscribe-selector').addEventListener('change', function(){
    changeSubscriptionVariant();
});

document.getElementById('prepaid-subscription').addEventListener('change', function(){
    const _this = this;
    const selector = document.querySelector('.subscribe-selector');
    var selectedIndex = selector.selectedIndex;
    selector.querySelectorAll('option').forEach((option, index) => {
        if (index > 3 && !_this.checked) {
            option.classList.add('hidden');
        } else if (index <= 3 && _this.checked) {
            option.classList.add('hidden');
        } else {
            option.classList.remove('hidden');
        }
    });

    if (_this.checked) {
        selector.getElementsByTagName('option')[selectedIndex + 3].selected = 'selected';
    } else {
        selector.getElementsByTagName('option')[selectedIndex - 3].selected = 'selected';
    }

    changeSubscriptionVariant();
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
          'properties': {
            '_last_month': data['properties[_last_month]']
          }
        }]
    }
    console.log(formData);
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