const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies/";
const btn  = document.querySelector("form button")
const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");
const msg = document.querySelector("#msg");

const dropdowns = document.querySelectorAll('#dropdown select');
for(let select of dropdowns){
    for (currency in countries){
        let newelement = document.createElement("option");
        newelement.innerText = currency;
        newelement.value = currency;
    if(select.name === "from" && currency === "USD" )
        newelement.selected = "selected";
    else if(select.name === "to" && currency === "INR")
        newelement.selected = "selected";
    select.append(newelement);
  
}
select.addEventListener("change",(evt) => {
    updateflag(evt.target);
});
}
function updateflag(element){
   
     let currency = element.value;
    let countrycode = countries[currency];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}
btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updatexchange();
    
});
const updatexchange = async () => {
    let amount = document.querySelector("#amount input");
    let amtvalue = amount.value;
    if(amtvalue === "" || amtvalue < 1){
        amtvalue = 1;
        amount.value = 1;
    }
        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];
        let finalAmount = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]*parseInt(amount.value)).toFixed(2);
    
        msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmount}${toCurr.value}`;
}
window.addEventListener("load",() => {
    updatexchange();
});


