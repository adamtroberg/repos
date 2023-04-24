let basket = [];
let totalItems = 0;
getBasket();

class ShopItems
{
    constructor(name, price, amount){
        this.name = name;
        this.price = price;
        this.amount = amount;
    }
}
    
let nuclear_energy = new ShopItems("Nuclear Energy", 21, "1");
let vietnamese_power = new ShopItems("Vietnamese Power", 21, "1");
let ultra_adrenal = new ShopItems("Ultra Adrenal", 229, "1");
let extreme_caffeine = new ShopItems("Extreme Caffeine", 829, "1");
let ultra_china_drink = new ShopItems("Ultra China Drink", 5, "1");
let russian_bear_5000 = new ShopItems("Russian Bear 5000", 21, "1");

ListItems();

function AddToBasket(item) 
{

    let foundItem = basket.find((i) => i.name === item.name);
    totalItems++;
    document.getElementById("basket-text").innerHTML = totalItems + " items";
    if (foundItem) 
    {
        foundItem.amount++;
    } 
    else 
    {
        basket.push(item);
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    localStorage.setItem("totalItems", JSON.stringify(totalItems));
    console.log(totalItems);
}

function getBasket()
{
    if (localStorage.getItem("totalItems") != null)
    {
        totalItems = JSON.parse(localStorage.getItem("totalItems"));
        basket = JSON.parse(localStorage.getItem("basket"));
        if (document.getElementById("basket-text") !== null)    
        {
            document.getElementById("basket-text").innerHTML = totalItems + " items";
            console.log(totalItems);
        }
        console.log(totalItems);
    }
}

function GoToBasket()
{
    window.location.href = "checkout.html";
    console.log(basket);   
}


function ListItems()
{
    let subtotal = document.getElementById("subtotal");
    let subtotalAmount = 0;
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    for (let i = 0; i < basket.length; i++) {
        let li = document.createElement("li");
        li.textContent = basket[i].name + " - " + basket[i].amount + " st" + " á " + basket[i].price + " kr";
        ul.appendChild(li);
        subtotalAmount += basket[i].amount * basket[i].price; 
    }
    subtotal.innerHTML = "Subtotal: " + subtotalAmount + " kr";
    console.log(subtotal.innerHTML);
}

function ContinueShopping()
{
    window.location.href = "webbshop.html";
    console.log(basket);
}

function Pay()
{
    console.log(basket);
}

function ClearBasket()
{
    basket = [];
    totalItems = 0;
    localStorage.clear();
    ListItems();
}