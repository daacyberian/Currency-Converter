const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const Button = document.querySelector(".Exchange button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select"); 
let ExchVal = document.querySelector(".Exchange-amount p");

const UpdateFlag = (select)=>{
    let code = select.value;
    let countrycode = countryList[code];
    let newScr= `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = select.parentElement.previousElementSibling.querySelector("img");
    img.src = newScr;
};

for (let select of dropdown) {
        for(code in countryList)
        {
            let option = document.createElement("option");
            option.innerText = code;
            option.value = code;
            if(select.name==="from" && code==="USD")
            {
                option.selected = "selected";
            }
            else if(select.name==="to" && code==="PKR")
            {
                option.selected = "selected";
            }
            select.append(option);   
        }
        select.addEventListener("change",(select)=>{
            UpdateFlag(select.target);
        });
}
        
Button.addEventListener("click",(event)=>{
    event.preventDefault();
    UpdateExchange();
});    

UpdateExchange = async() =>{
    let Amount = document.querySelector(".headers input");
    let AmountVal = Amount.value;
    if( AmountVal === "" || AmountVal < 1)
    {
        AmountVal = 1;
    }
    const URL = `${Base_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalAmount = AmountVal*rate;
    ExchVal.innerText = `${AmountVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
};

window.addEventListener("load", ()=>{    
    UpdateExchange();
})

let currency1= document.querySelector("[name=from]");
let currency2= document.querySelector("[name=to]");

let swap = document.getElementById("icon");

swap.addEventListener("click", () =>{
  let swapvar=0; 
  swapvar = currency1.selectedIndex;
  console.log(swapvar);
  currency1.selectedIndex = currency2.selectedIndex;
  currency2.selectedIndex = swapvar;
  UpdateExchange();
  UpdateFlag(currency1);
  UpdateFlag(currency2);
})
