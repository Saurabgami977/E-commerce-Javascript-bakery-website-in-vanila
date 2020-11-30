let btn = document.querySelectorAll('.button');
let storeItems = document.querySelectorAll('.store-item');
let search = document.querySelector('#search');


btn.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = e.target.dataset.filter;

        if (filter === 'all') {
            storeItems.forEach(item => {
                item.style.display = 'block'
            })
        } else if (filter === 'cakes') {
            show('cakes');
        } else if (filter === 'cupcakes') {
            show('cupcakes')
        } else if (filter === 'doughnuts') {
            show('doughnuts')
        } else if (filter === 'sweets') {
            show('sweets')
        }
    })
})

search.addEventListener('input', find);

function find() {
    storeItems.forEach(item => {
        text = item.classList.toString();
        if (text.includes(`${search.value}`)) {
            item.style.display = `block`;
            item.style.margin = `2px 30px`
        } else {
            item.style.display = 'none'
        }
    });
}

function show(foods) {
    storeItems.forEach(item => {
        if (item.classList.contains(foods)) {
            item.style.display = 'block'
            item.style.margin = '2px 30px'
        } else {
            item.style.display = 'none'
        }
    });
};













let leftBtn = document.querySelector('.left-btn-icon');
let rightBtn = document.querySelector('.right-btn-icon');
let closeBtn = document.querySelector('.close-btn-icon')
let modalImg = document.querySelector('.modal-image');
let storeItem = document.querySelectorAll('.store-item');
let modalContainer = document.querySelector('.modal-container')
let images = document.querySelectorAll('.store-img');

let imageList = [];
images.forEach(image => [
    imageList.push(image.src)
])
let imageCounter = 0;

leftBtn.addEventListener('click', previous);
rightBtn.addEventListener('click', next);
closeBtn.addEventListener('click', closeModal);

storeItem.forEach(element => {
    element.addEventListener('click', (e) => {
        let imageSrc = e.target.src;
        if (!imageSrc.includes('cart.svg')) {
            modalImg.style.background = `url(${imageSrc}) center/cover no-repeat fixed`
            modalContainer.classList.add('showModal')
            imageCounter = imageList.indexOf(imageSrc);

        }
    })
});

function popupModal() {
    modalImg.style.background = `url(img/cake-2.jpeg) center/cover no-repeat fixed`
}

function previous() {
    imageCounter--;
    if (imageCounter < 0) {
        imageCounter = imageList.length - 1;
    }
    modalImg.style.background = `url(${imageList[imageCounter]}) center/cover no-repeat fixed`
}

function next() {
    imageCounter++;
    if (imageCounter > imageList.length - 1) {
        imageCounter = 0;
    }
    modalImg.style.background = `url(${imageList[imageCounter]}) center/cover no-repeat fixed`
}

function closeModal() {
    document.querySelector('.modal-container').classList.remove("showModal")
    document.querySelector('.modal-container').classList.add("closeModal")
}


// Cart function

// grabing cartButton to toogle cart
let cartButton = document.getElementById('cartButton');
window.onload = cartButton.click();

//grabing myCart
let myCart = document.getElementById('myCart');

//adding click event listner in cart button which runs openCart function
cartButton.addEventListener('click', opencart)
//for making myCart invisible my moving it to 400px in x-axis
myCart.style.transform = 'translate(400px, 0px)';

//function to toogle cart
function opencart() {
    //if myCart is hidden
    if (myCart.style.transform == `translate(400px, 0px)`) {
        myCart.style.transform = 'translate(0px, 0px)';
        myCart.style.transition = '1s all ease-in-out';
    } else {
        //if myCart is visible
        myCart.style.transform = 'translate(400px, 0px)'
        myCart.style.transition = '1s all ease-in-out'
    }
}
//toCart is an array that will hold all the items that are added to cart
let toCart = [];
//Initialize html to put it inside cart
let html;
//grabbing cartitems to populate its innerhtml
let cartItems = document.getElementById('cartItems');

//grabing total cart amount with id in cart 
let cartTotalValue = document.getElementById('cartTotalValue');
//dom elem of button to show total amount
let cartTotalAmountt = document.getElementById('cartTotalAmountt');
//dom elem of button to show total number of items
let numberOfTotalCartItems = document.getElementById('numberOfTotalCartItems');
//to store number of items;
let numberOfCartItemCount = 0;

// totalCartAmount as a cart totalamount
let totalCartAmount = [];
let cartTotalAmount;

function calculate() {
    if (toCart.length != 0) {

        toCart.forEach(element => {
            cartTotalAmount = Number(element.foodValue.substr(2, 2));
        })
        totalCartAmount.push(cartTotalAmount)
        cartTotalAmount = 0;
        cartTotalAmount += totalCartAmount.reduce((accumulator, currentValue) => accumulator + currentValue);

        //for total amount of inside cart box
        cartTotalValue.innerHTML = `$ ${cartTotalAmount}`
        // for total amount to show up in external button
        cartTotalAmountt.innerHTML = cartTotalAmount;

        // number of items count to show up in external button
        numberOfCartItemCount++;
        numberOfTotalCartItems.innerHTML = numberOfCartItemCount;
    } else {
        numberOfTotalCartItems.innerHTML = 0;
        cartTotalAmountt.innerHTML = '$ 0';
        cartTotalValue.innerHTML = `$ 0`
    }
}

//grabing all the elements with class cartItem which is all cart image inside each bakery's items
let cartItem = document.querySelectorAll('.cartItem');

//grabing alertPopup badge
let alertPopup = document.getElementById('alertPopup');
//alertPopup badge dispaly none
alertPopup.style.display = 'none'
//alertText
let alertText = document.getElementById('alertText');

//iterating over all the elements having cartItem as a class
cartItem.forEach(element => {
    //adding click event listner to each
    element.addEventListener('click', () => {
        // popupModal showUp
        alertText.innerText = 'Added!';
        alertPopup.style.display = 'block';
        //Again hide the modal
        setTimeout(() => {
            alertPopup.style.display = 'none';
        }, 1000)
        //selecting the dom element of clicked element
        let foodName = element.parentElement.nextElementSibling.children[0].children[0].textContent;
        let foodValue = element.parentElement.nextElementSibling.children[0].children[1].innerText;
        let foodImage = element.parentElement.children[0].src;

        //creating new objects with consturctor and returning a object to push in toCart array.
        let cartItemValues = new ItemsInCart(foodName, foodValue, foodImage).eachItem();
        toCart.push(cartItemValues);
        //Running updateCart to check for toCart arraya and populating dom
        updateCart();
        calculate();
    })
})




//running updateCart to populate dom in page load
updateCart();

function updateCart() {
    if (toCart.length === 0) {
        //if toCart array is empty show this in dom
        html = `<h1>Nothing to show add a item to cart first</h1>`;
    } else {
        // if toCart has length more than 1 then first clear the dom and populate by iterating over the toCart array and storing it in a variable 'html'
        html = '';
        toCart.forEach((element, index) => {
            html += `<div class="itemInCart" id="${index}">
            <img src="${element.foodImage}" alt="" class="cartImage">
            <div class="cartItemDescription">
            <h4 class="cartItemName">${element.foodName}</h4>
            <p class="cartItemValue">${element.foodValue}</p>
            </div>
            <img src="img/trash.svg" alt="" class="cartDeleteButton">
            </div>`;
        })
    }
    //setting 'html' as innerhtml of cartItems
    cartItems.innerHTML = html;

}

//Creating class constructor
class ItemsInCart {
    constructor(foodName, foodValue, foodImage) {
        this.foodName = foodName;
        this.foodValue = foodValue;
        this.foodImage = foodImage;
    }
    // to return object
    eachItem() {
        let itemContent = {
            foodName: this.foodName,
            foodValue: this.foodValue,
            foodImage: this.foodImage
        };
        return itemContent;

    }
}




//Clearing ll the carts
let clearCart = document.getElementById('clearCart')
clearCart.addEventListener('click', () => {
    if (toCart.length != 0) {
        if (window.confirm('Do you really want to clear all the cart items')) {
            alertText.innerText = 'Deleted!';
            alertPopup.style.display = 'block';
            setTimeout(() => {
                alertPopup.style.display = 'none';
            }, 1000)
            toCart = [];

            updateCart();
            calculate();
        }
    } else {
        alert('Your Cart is already empty')
    }
})

