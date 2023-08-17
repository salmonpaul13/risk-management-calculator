document.addEventListener("DOMContentLoaded", () => {
    const capitalInput = document.getElementById("capital");
    const lossPercentageInput = document.getElementById("lossPercentage");
    const lotSizeInput = document.getElementById("lotSize");
    const stopLossPointsInput = document.getElementById("stopLossPoints");
    const calculateButton = document.getElementById("calculate");
    const setDefaultsButton = document.getElementById("setDefaults");
    const lotsOutput = document.getElementById("lots");

    calculateButton.addEventListener("click", calculateLots);
    setDefaultsButton.addEventListener("click", setDefaultValues);

    populateInputsFromLocalStorage(); // Populate inputs on page load
    calculateLots(); // Calculate initially
});

function setDefaultValues() {
    const capitalInput = document.getElementById("capital");
    const lossPercentageInput = document.getElementById("lossPercentage");
    const lotSizeInput = document.getElementById("lotSize");
    const stopLossPointsInput = document.getElementById("stopLossPoints");

    localStorage.setItem("defaultCapital", capitalInput.value);
    localStorage.setItem("defaultLossPercentage", lossPercentageInput.value);
    localStorage.setItem("defaultLotSize", lotSizeInput.value);
    localStorage.setItem("defaultStopLossPoints", stopLossPointsInput.value);
}

function populateInputsFromLocalStorage() {
    const capitalInput = document.getElementById("capital");
    const lossPercentageInput = document.getElementById("lossPercentage");
    const lotSizeInput = document.getElementById("lotSize");
    const stopLossPointsInput = document.getElementById("stopLossPoints");

    const defaultCapital = localStorage.getItem("defaultCapital") || "";
    const defaultLossPercentage = localStorage.getItem("defaultLossPercentage") || "";
    const defaultLotSize = localStorage.getItem("defaultLotSize") || "";
    const defaultStopLossPoints = localStorage.getItem("defaultStopLossPoints") || "";

    capitalInput.value = defaultCapital;
    lossPercentageInput.value = defaultLossPercentage;
    lotSizeInput.value = defaultLotSize;
    stopLossPointsInput.value = defaultStopLossPoints;
}

function calculateLots() {
    const capitalInput = document.getElementById("capital");
    const lossPercentageInput = document.getElementById("lossPercentage");
    const lotSizeInput = document.getElementById("lotSize");
    const stopLossPointsInput = document.getElementById("stopLossPoints");
    const lotsOutput = document.getElementById("lots");

    const capital = parseFloat(capitalInput.value);
    const lossPercentage = parseFloat(lossPercentageInput.value);
    const lotSize = parseInt(lotSizeInput.value);
    const stopLossPoints = parseFloat(stopLossPointsInput.value);

    if (isNaN(capital) || isNaN(lossPercentage) || isNaN(lotSize) || isNaN(stopLossPoints)) {
        lotsOutput.textContent = "Invalid input";
        return;
    }

    const riskAmount = capital * (lossPercentage / 100);
    const riskPerLot = stopLossPoints * lotSize;

    const lots = Math.floor(riskAmount / riskPerLot);
    lotsOutput.textContent = lots;
}
