// Initiera variabler som används i hela skripet.
let basket = [];
let totalItems = 0;
let subtotalAmount = 0;

// Hämta varukorgsinformationen från local storage.
getBasket();

// Skapa en class ShopItems som innehåller all information för varukorgsprodukterna.
class ShopItems
{
    constructor(name, price, amount){
        this.name = name;
        this.price = price;
        this.amount = amount;
    }
}
    
// Specifik information för varje produkt.
let nuclear_energy = new ShopItems("Nuclear Energy", 21, "1");
let vietnamese_power = new ShopItems("Vietnamese Power", 21, "1");
let ultra_adrenal = new ShopItems("Ultra Adrenal", 229, "1");
let extreme_caffeine = new ShopItems("Extreme Caffeine", 829, "1");
let ultra_china_drink = new ShopItems("Ultra China Drink", 5, "1");
let russian_bear_5000 = new ShopItems("Russian Bear 5000", 21, "1");

// Funktion som körs för att lista alla items i varukorgen.
ListItems();

// Funktion som lägger till produkten i varukorgen
function AddToBasket(item) 
{
    // Hitta produkten 
    let foundItem = basket.find((i) => i.name === item.name);
    // Öka totalItems samt ändra HTML för totalItems.
    totalItems++;
    document.getElementById("basket-text").innerHTML = totalItems + " items";
    if (foundItem) 
    {
        // Om itemet redan finns i varukorgen öka amount.
        foundItem.amount++;
    } 
    else 
    {
        // Annars lägg till itemet i varukorgen
        basket.push(item);
    }
    // Spara itemet i localstorage.
    localStorage.setItem("basket", JSON.stringify(basket));
    localStorage.setItem("totalItems", JSON.stringify(totalItems));
}

// Funktion för att hämta data från local storage.
function getBasket()
{
    // kolla att inte localstorage är tomt
    if (localStorage.getItem("totalItems") !== null)
    {
        // Hämta data
        totalItems = JSON.parse(localStorage.getItem("totalItems"));
        basket = JSON.parse(localStorage.getItem("basket"));
        // Om basket-text inte är null sätt den till totalItems.
        if (document.getElementById("basket-text") !== null)    
        {
            document.getElementById("basket-text").innerHTML = totalItems + " items";
        }
    }
}

// Gå till checkout
function GoToBasket()
{
    window.location.href = "checkout.html";
}

// Funktion för att appenda alla items till "Varor" div.
function ListItems()
{
    // Initiera variabler.
    let subtotal = document.getElementById("subtotal");
    let ul = document.querySelector("ul");
    subtotalAmount = 0;
    ul.innerHTML = "";
    // Loopa igenom basket arrayen.
    for (let i = 0; i < basket.length; i++) {
        // Skapa ett li element.
        let li = document.createElement("li");
        // Sätt text för li elementet.
        li.textContent = basket[i].name + " - " + basket[i].amount + " st" + " á " + basket[i].price + " kr";
        // Lägg till en class till elementet
        li.classList.add("varukorg-item");
        // Lägg till elementet i varor diven.
        ul.appendChild(li);
        // Lägg till priset i subtotal.
        subtotalAmount += basket[i].amount * basket[i].price; 
    }
    subtotal.innerHTML = "Subtotal: " + subtotalAmount + " kr";
}
// Funktion för rabatt.
function GiveDiscount()
{
    // Initiera variabler.
    let rabattkod = document.getElementById("rabattkod-input");
    let subtotal = document.getElementById("subtotal");
    let realSubtotal = 0;
    let ul = document.querySelector("ul");
    // Kolla att rabattkoden är giltig.
    if (rabattkod.value == "koffein")
    {
        // Skapa en realSubtotal för totala priset exklusive rabatter.
        for (let i = 0; i < basket.length; i++) {
            realSubtotal += basket[i].amount * basket[i].price; 
        }
        // Kolla att inte varukorgen är tom.
        if (subtotalAmount == 0)
        {
            alert("Du har inget i varukorgen!")
        }
        // Kolla att inte rabattkoden redan är använd
        else if (subtotalAmount == realSubtotal * 0.5)
        {
           alert("Rabattkod redan använd!")
        }
        // Applicera rabatten
        else
        {
            subtotalAmount = subtotalAmount * 0.5;
            subtotal.innerHTML = "Subtotal: " + subtotalAmount + " kr";
            let li = document.createElement("li");
            li.textContent = "50% rabatt!"
            li.classList.add("rabattkod-text");
            ul.appendChild(li);
            alert("Godkänd rabattkod. 50% rabatt införd.")
        }
    }
    // Felaktig rabattkod
    else
    {
        alert("Felaktig rabattkod!");
    }
}

// Funktion för att gå tillbaka till webbshoppen.
function ContinueShopping()
{
    window.location.href = "index.html";
}

// Funktion som aktiveras om man klickar på Betala
function Pay()
{
    window.location.href = "https://biluppgifter.se";
}

// Funktion för att rensa basketen.
function ClearBasket()
{
    // Clearar all data.
    basket = [];
    totalItems = 0;
    localStorage.clear();
    ListItems();
}