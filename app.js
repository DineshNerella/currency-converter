const BASE_URL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(let curCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=curCode;
        newOption.value=curCode;
        if(select.name ==="from" && curCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name ==="to" && curCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    });
}

const updateFlag=(element)=>{
    let curCode=element.value;
    let countryCode=countryList[curCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};



btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    const rate = await getExchangeRate(fromCurr.value, toCurr.value);
    let finalAmount=amtVal*rate;
    console.log(finalAmount);
    let temp=amount.value;
    msg.innerText=`${temp} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `

});

async function getExchangeRate(fromCurr, toCurr){
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurr}`;
    let response=await fetch(url);
    console.log(response);
    let data=await response.json();
    console.log(data);
    return data.rates[toCurr];
}
