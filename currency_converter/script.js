const swapButton = document.getElementById("swap");
const convertButton = document.getElementById("convert");
const input1 = document.getElementById("firstInput");
const input2 = document.getElementById("secondInput");
const selectX = document.getElementById("x");
const selectY = document.getElementById("y");

// Fetch exchange rate data for a given base currency
async function currencyInfo(currency) {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Response Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error.message);
  }
}

// Populate both dropdowns with all available currency keys
async function populateDropdowns() {
  const data = await currencyInfo("usd");
  if (!data) return;

  const currencies = Object.keys(data.usd); // get all keys e.g. ["aed", "afn", "all", ...]

  selectX.innerHTML = "";
  selectY.innerHTML = "";

  currencies.forEach((code) => {
    const optionX = document.createElement("option");
    optionX.value = code;
    optionX.textContent = code.toUpperCase();

    const optionY = document.createElement("option");
    optionY.value = code;
    optionY.textContent = code.toUpperCase();

    selectX.appendChild(optionX);
    selectY.appendChild(optionY);
  });

  // Set default selections: USD → INR
  selectX.value = "usd";
  selectY.value = "inr";

  //init
  await convert()
}

// Convert the amount
async function convert() {
  const fromCurrency = selectX.value;
  const toCurrency = selectY.value;
  const amount = parseFloat(input1.value);

  if (!amount || isNaN(amount)) {
    input2.value = "";
    return;
  }

  const data = await currencyInfo(fromCurrency);
  if (!data) return;

  const rate = data[fromCurrency][toCurrency];
  input2.value = (amount * rate).toFixed(4);
  document.getElementById("rateInfo").innerHTML =
    `1 ${fromCurrency.toUpperCase()} = <span>${rate.toFixed(4)} ${toCurrency.toUpperCase()}</span>`;
  document.getElementById("rateDate").textContent =
    "Rates as of " +
    new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
}

// Swap currencies and values
swapButton.addEventListener("click", () => {
  const tempCurrency = selectX.value;
  selectX.value = selectY.value;
  selectY.value = tempCurrency;

  const tempValue = input1.value;
  input1.value = input2.value;
  input2.value = tempValue;
});

convertButton.addEventListener("click", convert);

// Init
populateDropdowns();
