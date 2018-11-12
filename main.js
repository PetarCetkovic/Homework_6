function addElem(table,descr, val, sign){
    let row     = document.createElement("tr");
    let des     = document.createElement("td");
    let value   = document.createElement("td");
    let del     = document.createElement("td");
    let procent = document.createElement("td");
    let d       = document.createElement("button");
    if(table.id==="incT"){
        value.className = "incomeList table";
        d.className     = "deleteInc";
        procent.className = "percentInc";
    }else{
        value.className = "expenseList table";
        d.className     = "deleteExp";
        procent.className = "percentExp";
    }  

    des.appendChild(document.createTextNode(descr));
    value.appendChild(document.createTextNode(sign+val));
    d.appendChild(document.createTextNode("X"));
    del.appendChild(d);
    row.appendChild(des);
    row.appendChild(value);
    row.appendChild(procent);
    row.appendChild(del)
    table.appendChild(row);
}
const monthArray = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"];
const d = new Date();
document.getElementById("month").innerText = monthArray[d.getMonth()];

function updatePrecent(list, procent){
    for(let i = 0; i<list.length;i++){
        let pr = parseFloat(list[i].innerText)/totalExpense();
        procent[i].innerText= (pr*100).toFixed(1)+"%";
    }
}
function up(){
    let expList = document.getElementsByClassName("expenseList");
    let procentsExp = document.getElementsByClassName("percentExp");
    updatePrecent(expList, procentsExp);
}
function getSum(list){
    let sum =0;
    for(let i=0;i<list.length;i++){
        sum = sum + parseFloat(list[i].innerText);
    }
    return sum.toFixed(2);
}
function calcBudget(){
    return totalIncome() - Math.abs(totalExpense());
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
    availableBudg.innerText = calcBudget().toFixed(2);
    totalIncomeV.innerText  = totalIncome();
    totalExpenseV.innerText = totalExpense();
}

function notNumber(num){
    let s=""+num;
    for (let i = s.length - 1; i >= 0; i--) {
        const d = s.charCodeAt(i);
        if (d < 46 || d > 57 || num==""){
        return true;
        }
    }
}

function addItem(event){
    event.preventDefault();
    let description = document.getElementById("item").value;
    let valueOfElem = document.getElementById("val").value;
    if(valueOfElem==="" || notNumber(valueOfElem)){
        alert("Please insert number in value field"); 
        return 0;
    }
    let incTable    = document.getElementById("incT");
    let expTable    = document.getElementById("expT");
    let plOrMin = document.getElementById("plusOrMinus").value;
    if(plOrMin==="+"){
        addElem(incTable,description, valueOfElem, "+");
    }
    else{
        addElem(expTable,description, valueOfElem, "-");
    }
    fillBudgetCalc();
    up();
    saveAll();
}

function removeItem(event){
    let table = document.getElementById("expT");
    if(event.target.classList.contains("deleteInc")){
        table = document.getElementById("incT");
        if(confirm("Jeste li sigurni da zelite da uklonite item?")){
           const tr = event.target.parentNode.parentNode;
            table.removeChild(tr);
        }
    }
    else if(event.target.classList.contains("deleteExp")){
        if(confirm("Jeste li sigurni da zelite da uklonite item?")){
            const tr = event.target.parentNode.parentNode;
            table.removeChild(tr);
         }
    }
    fillBudgetCalc();
    up();
    saveAll();
}
const  button = document.getElementById("sub");
button.addEventListener("click", addItem);

const del    = document.getElementsByClassName("inc");
const del2   = document.getElementsByClassName("exp");
del[0].addEventListener("click",  removeItem);
del2[0].addEventListener("click", removeItem);

function saveAll(){
    let all = document.getElementById("allGrid").innerHTML;
    var list={
        budget:all
    }
    var listee=[];
    listee.push(list);
    localStorage.setItem('listee', JSON.stringify(listee));
}

function startLocale(){
    var listeee = JSON.parse(localStorage.getItem('listee'))
    document.getElementById("allGrid").innerHTML = listeee[0].budget;
    
}
// window.addEventListener("load",startLocale);