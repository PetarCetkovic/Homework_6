
function addElem(table,descr, val){
    let row     = document.createElement("tr");
    let des   = document.createElement("td");
    let value   = document.createElement("td");
    if(table.id==="incT"){
        value.className = "incomeList";
    }else{
        value.className = "expenseList";
    }  

    des.appendChild(document.createTextNode(descr));
    value.appendChild(document.createTextNode(val));
    row.appendChild(des);
    row.appendChild(value);
    table.appendChild(row);
}

function getSum(list){
    let sum =0;
    for(let i=0;i<list.length;i++){
        sum = sum + parseFloat(list[i].innerText);
    }
    return sum;
}
function calcBudget(){
    return totalIncome() - totalExpense();
}

function totalIncome(){
    let incList = document.getElementsByClassName("incomeList");
    return getSum(incList);
}

function totalExpense(){
    let expList = document.getElementsByClassName("expenseList");
    return getSum(expList);
}

function fillBudgetCalc(){
    let availableBudg = document.getElementById("avaBudg");
    let totalIncomeV  = document.getElementById("totalIncomeValue");
    let totalExpenseV = document.getElementById("totalExpenseValue");
    availableBudg.innerText = calcBudget();
    totalIncomeV.innerText  = totalIncome();
    totalExpenseV.innerText = totalExpense();
}

function addItem(event){
    event.preventDefault();
    let description = document.getElementById("item").value;
    let valueOfElem = document.getElementById("val").value;
    let incTable    = document.getElementById("incT");
    let expTable    = document.getElementById("expT");
    let plOrMin = document.getElementById("plusOrMinus").value;
    console.log(plOrMin);
    if(plOrMin==="+"){
        addElem(incTable,description, valueOfElem);
    }
    else{
        addElem(expTable,description, valueOfElem);
    }
    console.log(calcBudget());
    fillBudgetCalc();
}

let button = document.getElementById("sub");
button.addEventListener("click", addItem);
// button.addEventListener("click", function(){
//     console.log(document.getElementById("plusOrMinus").value);
// })