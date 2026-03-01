const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const Button = document.querySelector("#convertBtn");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
let ExchVal = document.querySelector("#result");

const UpdateFlag = (select) => {
    let code = select.value;
    let countrycode = countryList[code];
    let newScr = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = select.parentElement.querySelector("img");
    if (img) {
        img.src = newScr;
    }
};

for (let select of dropdown) {
    for (code in countryList) {
        let option = document.createElement("option");
        option.innerText = code;
        option.value = code;
        if (select.name === "from" && code === "USD") {
            option.selected = "selected";
        } else if (select.name === "to" && code === "PKR") {
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change", (select) => {
        UpdateFlag(select.target);
    });
}

const UpdateExchange = async () => {
    let Amount = document.querySelector("input");
    let AmountVal = Amount.value;

    if (AmountVal === "" || AmountVal < 0) {
        AmountVal = 1;
    }

    Button.textContent = "Converting...";
    Button.disabled = true;
    Button.style.opacity = "0.7";

    try {
        const URL = `${Base_URL}/${fromcurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
        }

        let data = await response.json();
        let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
        let finalAmount = (AmountVal * rate).toFixed(2);

        ExchVal.style.transition = "opacity 0.3s ease";
        ExchVal.style.opacity = "0";
        setTimeout(() => {
            ExchVal.innerText = `${AmountVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
            ExchVal.style.opacity = "1";
        }, 150);

    } catch (error) {
        ExchVal.innerText = "Error fetching rates. Please try again.";
        console.error("Error:", error);
    } finally {
        Button.textContent = "Exchange Rate";
        Button.disabled = false;
        Button.style.opacity = "1";
    }
};

Button.addEventListener("click", (event) => {
    event.preventDefault();
    UpdateExchange();
});

let input = document.querySelector("input");
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        UpdateExchange();
    }
});

window.addEventListener("load", () => {
    UpdateExchange();
});

let currency1 = document.querySelector("[name=from]");
let currency2 = document.querySelector("[name=to]");

let swap = document.getElementById("icon");

swap.addEventListener("click", () => {
    let swapvar = 0;
    swapvar = currency1.selectedIndex;
    currency1.selectedIndex = currency2.selectedIndex;
    currency2.selectedIndex = swapvar;

    swap.style.transition = "transform 0.3s ease";
    swap.style.transform = "rotate(180deg) scale(1.2)";
    setTimeout(() => {
        swap.style.transform = "rotate(360deg)";
    }, 300);
    setTimeout(() => {
        swap.style.transform = "rotate(90deg)";
    }, 600);

    UpdateExchange();
    UpdateFlag(currency1);
    UpdateFlag(currency2);
});
