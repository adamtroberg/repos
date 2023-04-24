let basket = [];
let totalItems = 0;
let subtotalAmount = 0;

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
    let ul = document.querySelector("ul");
    subtotalAmount = 0;
    ul.innerHTML = "";
    for (let i = 0; i < basket.length; i++) {
        let li = document.createElement("li");
        li.textContent = basket[i].name + " - " + basket[i].amount + " st" + " á " + basket[i].price + " kr";
        li.classList.add("varukorg-item");
        ul.appendChild(li);
        subtotalAmount += basket[i].amount * basket[i].price; 
    }
    subtotal.innerHTML = "Subtotal: " + subtotalAmount + " kr";
}

function GiveDiscount(){
    let rabattkod = document.getElementById("rabattkod-input");
    let subtotal = document.getElementById("subtotal");
    let realSubtotal = 0;
    if (rabattkod.value == "koffein")
    {
        for (let i = 0; i < basket.length; i++) {
            realSubtotal += basket[i].amount * basket[i].price; 
        }
        if (subtotalAmount == 0)
        {
            alert("Du har inget i varukorgen!")
        }
        else if (subtotalAmount == realSubtotal * 0.5)
        {
           alert("Rabattkod redan använd!")
        }
        else
        {
            subtotalAmount = subtotalAmount * 0.5;
            subtotal.innerHTML = "Subtotal: " + subtotalAmount + " kr";
            alert("Godkänd rabattkod. 50% rabatt införd.")
        }
    }
    else
    {
        alert("Felaktig rabattkod!");
    }
}

function ContinueShopping()
{
    window.location.href = "index.html";
}

function Pay()
{
    window.location.href = "https://biluppgifter.se";
}

function ClearBasket()
{
    basket = [];
    totalItems = 0;
    localStorage.clear();
    ListItems();
}