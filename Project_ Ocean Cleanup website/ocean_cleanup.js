//** Calculator and its input/output
const calculatorForm = document.getElementById("calculator");

const plasticBottles = document.getElementById("plasticBottles");
const plasticBags = document.getElementById("plasticBags");
const foodWrapping = document.getElementById("foodWrapping");
const yogurtCreamContainers = document.getElementById("yogurtCreamContainers");

const takeawayBoxes = document.getElementById("takeawayBoxes");
const takeawayCups = document.getElementById("takeawayCups");
const plasticPackages = document.getElementById("plasticPackages");

const productBottles = document.getElementById("productBottles");
const toiletries = document.getElementById("toiletries");
const toothbrushes = document.getElementById("toothbrushes");
const toothpaste = document.getElementById("toothpaste");

const householdSize = document.getElementById("householdSize");

const totalFP = document.getElementById("totalFP");
const mostWasteSource = document.getElementById("source");
const resetButton = document.getElementById("resetButton");

let inputElements = [plasticBottles, plasticBags, foodWrapping, yogurtCreamContainers,
    takeawayBoxes, takeawayCups, plasticPackages,
    productBottles, toiletries, toothbrushes, toothpaste,
    householdSize];

//** Functions
function notNegative(e) {
    if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        return false;
    }
}
// remove tip
function removeTip() {
    if (document.getElementById("tip") != null) document.getElementById("tip").remove();
}
// add tip
function tip(source, text) {
    mostWasteSource.innerHTML = source;
    let createTip = document.createElement("p");
    createTip.setAttribute("id", "tip");
    mostWaste.after(createTip);
    createTip.innerHTML = text;
}

//** Reset calculator to default
function resetCalculator() {
    plasticBottles.value = 0;
    plasticBags.value = 0;
    foodWrapping.value = 0;
    yogurtCreamContainers.value = 0;

    takeawayBoxes.value = 0;
    takeawayCups.value = 0;
    plasticPackages.value = 0;

    productBottles.value = 0;
    toiletries.value = 0;
    toothbrushes.value = 0;
    toothpaste.value = 0;

    householdSize.value = 0;

    totalFP.innerHTML = "0";
    mostWasteSource.innerHTML = "unknown sources";

    removeTip();
}

//** Footprint calculator
function totalFootprint() {
    let plasticBottlesFP = plasticBottles.value * 52 * 0.730;
    let plasticBagsFP = plasticBags.value * 52 * 0.417;
    let foodWrappingFP = foodWrapping.value * 52 * 0.583;
    let yogurtCreamContainersFP = yogurtCreamContainers.value * 52 * 0.383;

    let takeawayBoxesFP = takeawayBoxes.value * 12 * 0.383;
    let takeawayCupsFP = takeawayCups.value * 12 * 0.240;
    let plasticPackagesFP = plasticPackages.value * 12 * 0.834;

    let productBottlesFP = productBottles.value * 0.120;
    let toiletriesFP = toiletries.value * 0.080;
    let toothbrushesFP = toothbrushes.value * 0.020;
    let toothpasteFP = toothpaste.value * 0.015;

    //All waste items array
    let wasteItemsFP = [plasticBottlesFP, plasticBagsFP, foodWrappingFP, yogurtCreamContainersFP,
        takeawayBoxesFP, takeawayCupsFP, plasticPackagesFP,
        productBottlesFP, toiletriesFP, toothbrushesFP, toothpasteFP];

    // Sum
    let sum = wasteItemsFP.reduce(function (a, b) { return a + b; }, 0);
    let total = (sum / (parseInt(householdSize.value) + 1)).toFixed(3);
    // Show total footprint
    if (total > 0) totalFP.innerHTML = total;
    else totalFP.innerHTML = "0";
    // Get max
    let max = Math.max.apply(null, wasteItemsFP);
    // Tip
    if (max > 0) {

        removeTip(); // remove any existing tip
        let wasteSource, tipText; // declear variable for tip function

        switch (wasteItemsFP.indexOf(max)) {
            case 0:
                wasteSource = "plastic bottles";
                tipText = "Many beverages can be purchased in glass bottles. Consider to bring reusable bottles for water and hot beverages when you are out and about.";
                tip(wasteSource, tipText);
                break;
            case 1:
                wasteSource = "plastic bags";
                tipText = "Bring reusable fabric totes for shopping and refuse plastic bags when offered.";
                tip(wasteSource, tipText);
                break;
            case 2:
                wasteSource = "food wrapping";
                tipText = "Consider to buy more unpackaged food at local markets.";
                tip(wasteSource, tipText);
                break;
            case 3:
                wasteSource = "yogurt, cream, etc. containers";
                tipText = "Some places offer dairy in glass containers. You could even explore recipes to make your own yogurt.";
                tip(wasteSource, tipText);
                break;
            case 4:
                wasteSource = "take-away plastic boxes";
                tipText = "Cut down on take-out packaging by preparing more meals at home.";
                tip(wasteSource, tipText);
                break;
            case 5:
                wasteSource = "take-away cups";
                tipText = "Bring your own tumbler when ordering hot beverages to go.";
                tip(wasteSource, tipText);
                break;
            case 6:
                wasteSource = "plastic-wrapped packages";
                tipText = "Try to purchase more products in shops rather than online.";
                tip(wasteSource, tipText);
                break;
            case 7:
                wasteSource = "detergent & cleaning product bottles";
                tipText = "Explore refill stations in your neighborhood to cut down on bottles from detergents and cleaning products.";
                tip(wasteSource, tipText);
                break;
            case 8:
                wasteSource = "shampoo, conditioner & toiletries";
                tipText = "Explore refill stations in your neighborhood to cut down on plastic waste from toiletries.";
                tip(wasteSource, tipText);
                break;
            case 9:
                wasteSource = "plastic toothbrushes";
                tipText = "Seriously? How often do you brush your teeth? Anyway, Did you know there are toothbrushes made from wood?";
                tip(wasteSource, tipText);
                break;
            case 10:
                wasteSource = "toothpaste";
                tipText = "Seriously? How much toothpaste do you use? Did you know there are plastic-free alternatives available?";
                tip(wasteSource, tipText);
                break;
            default:
                mostWasteSource.innerHTML = "unknown sources";
                break;
        }
    }
}
// Initiate program
inputElements.forEach(function () {
    this.onkeydown = notNegative;
    this.onchange = totalFootprint;
});