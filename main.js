(function (){

function $create(elem){
    return document.createElement(elem);
}

function $id(elem){
    return document.getElementById(elem);
}

function $class(elem){
    return document.getElementsByClassName(elem);
}

function addElem(table,descr, val, sign){
    let row     = $create("tr");
    let des     = $create("td");
    let value   = $create("td");
    let del     = $create("td");
    let procent = $create("td");
    let d       = $create("button");
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
$id("month").innerText = monthArray[d.getMonth()];

function updatePrecent(list, procent){
    for(let i = 0; i<list.length;i++){
        let pr = parseFloat(list[i].innerText)/totalExpense();
        procent[i].innerText= (pr*100).toFixed(1)+"%";
    }
}
function up(){
    updatePrecent($class("expenseList"), $class("percentExp"));
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
    return getSum($class("incomeList"));
}

function totalExpense(){
    return getSum($class("expenseList"));
}

function fillBudgetCalc(){
    $id("avaBudg").innerText = calcBudget().toFixed(2);
    $id("totalIncomeValue").innerText  = totalIncome();
    $id("totalExpenseValue").innerText = totalExpense();
    saveAll();
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
    if($id("val").value==="" || notNumber($id("val").value)){
        alert("Please insert number in value field"); 
        return 0;
    }

    if($id("plusOrMinus").value==="+"){
        addElem($id("incT"),$id("item").value, $id("val").value, "+");
    }
    else{
        addElem($id("expT"),$id("item").value, $id("val").value, "-");
    }
    fillBudgetCalc();
    up();
    saveAll();
}

function removeItem(event){
    if(event.target.classList.contains("deleteInc")){
        if(confirm("Jeste li sigurni da zelite da uklonite item?")){
           const tr = event.target.parentNode.parentNode;
           $id("incT").removeChild(tr);
        }
    }
    else if(event.target.classList.contains("deleteExp")){
        if(confirm("Jeste li sigurni da zelite da uklonite item?")){
            const tr = event.target.parentNode.parentNode;
            $id("expT").removeChild(tr);
         }
    }
    fillBudgetCalc();
    up();
    saveAll();
}

$id("sub").addEventListener("click", addItem);

$class("inc")[0].addEventListener("click",  function(e){
    removeItem(e);
});
$class("exp")[0].addEventListener("click", removeItem);

function saveAll(){

    window.localStorage.inc = $id("incDiv").innerHTML;
    window.localStorage.exp = $id("expDiv").innerHTML;
    window.localStorage.bud = $id("budgDiv").innerHTML;
}

function startLocale(){
    
    let storedInc = window.localStorage.inc;
    let storedExp = window.localStorage.exp;
    let storedBud = window.localStorage.bud;
    if(storedExp || storedInc){
        $id("incDiv").innerHTML = storedInc;
        $id("expDiv").innerHTML = storedExp;
        $id("budgDiv").innerHTML = storedBud;
    }
}
startLocale();
}());
