 

const currencyMap = new Map();
currencyMap.set("UAH", { cc: "UAH", rate: 1, txt: "Українська гривня" });


initListeners();
getCurrency().catch(
    (err) => {
        alert("Not today!");
        console.log(err);
    });


async function getCurrency() {
        const response = await fetch(
          "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
        );
        const currency = await response.json();
      
  
      currency.forEach((el) => currencyMap.set(el.cc, el));
      

      const header = document.getElementById("usd_eur");
      header.innerHTML = `<p>${currencyOnDate( currencyMap.get("USD"))}
      </p><p>${currencyOnDate(currencyMap.get("EUR"))}</p> `;
    
      inputSelector("firstSelect", Array(...currencyMap.keys()).sort());
      inputSelector( "secondSelect", Array(...currencyMap.keys()).sort());

} 

function currencyOnDate(cur) {
    return `На ${cur.exchangedate} за курсом НБУ <b>1</b> ${cur.txt} коштує <b>${cur.rate}</b> UAH`
}


function inputSelector(id,options) {
    let select = document.getElementById(id);
    let optionsHTML;
    options.forEach(element => {
        optionsHTML += `<option>${element}</option>`;
    });
    
    select.innerHTML += optionsHTML;
}



    


function initListeners() {
    let input1 = document.getElementById("firstInput");
    let input2 = document.getElementById("secondInput");
    let select1 = document.getElementById("firstSelect");
    let select2 = document.getElementById("secondSelect");
    
    input1.oninput = countCurrency("input1");
    input2.oninput = countCurrency("input2");
    select1.onchange = countCurrency("input1");
    select2.onchange = countCurrency("input2");
}


function countCurrency( changed ) {
    let input1 = document.getElementById("firstInput");
    let input2 = document.getElementById("secondInput");
    let select1 = document.getElementById("firstSelect");
    let select2 = document.getElementById("secondSelect");
 
 
    return function () {
        let cur1 = { value: input1.value, cc: select1.value};
        let cur2 = { value: input2.value, cc: select2.value };
        if (changed == "input1") {
            input2.value = exchange(cur1, cur2.cc);
        }
        else {
            input1.value = exchange(cur2, cur1.cc);
        }
        function exchange(cur1, curCC) {
            return cur1.value * currencyMap.get(cur1.cc).rate / currencyMap.get(curCC).rate;
        }
        
    }
   
}








