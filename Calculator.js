const body=document.getElementById('body');
const userAlertDiv = document.getElementById('userAlertsDiv');
const pBodyDiv=document.getElementById('parentBodyDiv');
const bodyDiv=document.getElementById('bodyDiv');
var alertInfo='';
var total="";
var array= [total,'AC','DEL','/','1','2','3','*','4','5','6','+','7','8','9','-','.','0','='];

function createTable() {
    for(i=0; i<array.length; i++) {
        var b=document.createElement('button');
            b.id='button' + i;
            b.classList.add('buttons');
            b.innerText=array[i];
            bodyDiv.appendChild(b);
    }   buttonsOnClick();
}
createTable();

function buttonsOnClick() {
    for (i=1; i<array.length; i++) {
        let bc=bodyDiv.children[i];
            bc.addEventListener("click", Event => {
                totalAmount(bc);
            })
    }    
}

function totalAmount(bc) {
    let equationNow= bodyDiv.firstChild.innerHTML
    let t=bc.innerText;
    let tParse=parseFloat(t);
        if(Number.isNaN(tParse) 
        && t != '='
        && t != 'AC'
        && t != 'DEL'   
        && t != '.'
        ){
            if (t.toString().includes('*') 
                || t.toString().includes('/')
                || t.toString().includes('+')
                || t.toString().includes('-')) {
            equalsOperator(bc)}
            bodyDiv.firstChild.innerHTML+=t.toString();
            positionZeroSymbolCheck();
        } else  if (t === '=') {
                equalsOperator(bc);
            }   else if (t === 'AC') {
                    bodyDiv.firstChild.innerHTML="";
                }   else if (t === 'DEL') {
                    let stringToSlice= bodyDiv.firstChild.innerHTML
                    let numToSlice= stringToSlice.toString()
                        bodyDiv.firstChild.innerHTML=numToSlice.slice(0,-1);
                    } else if (t === ".") {
    //Below checks output String, BEFORE equation symbols, for decimals, and removes last Decimal if more then one is in the equation.
                        if (   (equationNow.indexOf('*') == -1 && equationNow.indexOf('/') == -1 && equationNow.indexOf('+') == -1 && equationNow.indexOf('-') == -1 && ((equationNow.match(/[.]/g) || []).length) >= 1)
                            || (equationNow.indexOf('*') != -1 && equationNow.indexOf('*') < equationNow.indexOf('.') && (((equationNow.match(/[.]/g) || []).length) >= 0))
                            || (equationNow.indexOf('/') != -1 && equationNow.indexOf('/') < equationNow.indexOf('.') && (((equationNow.match(/[.]/g) || []).length) >= 0))
                            || (equationNow.indexOf('+') != -1 && equationNow.indexOf('+') < equationNow.indexOf('.') && (((equationNow.match(/[.]/g) || []).length) >= 0))
                            || (equationNow.indexOf('-') != -1 && equationNow.indexOf('-') < equationNow.indexOf('.') && (((equationNow.match(/[.]/g) || []).length) >= 0))
                            ) {
                            let replaceDecimal=bodyDiv.firstChild.innerHTML.replace('.', '');
                                bodyDiv.firstChild.innerHTML=replaceDecimal;
                                bodyDiv.firstChild.innerHTML+=t.toString();
                        } else     
    //Below checks output String, AFTER equation symbols, for decimals, and removes last Decimal if more then one is in the equation.)
                        var firstDecimal=equationNow.indexOf('.');
                        var secondDecimal=equationNow.indexOf('.',parseInt(firstDecimal+1));
                            if ((secondDecimal >= 0 && equationNow.indexOf('*') < secondDecimal && bc.innerText == '.')
                             || (secondDecimal >= 0 && equationNow.indexOf('/') < secondDecimal && bc.innerText == '.')
                             || (secondDecimal >= 0 && equationNow.indexOf('+') < secondDecimal && bc.innerText == '.')
                             || (secondDecimal >= 0 && equationNow.indexOf('-') < secondDecimal && bc.innerText == '.')
                                ) {
                                    alertInfo="Invalid decimal position, removed last instance!";
                                    createPopupText(alertInfo);
                        } else bodyDiv.firstChild.innerHTML+=t.toString();
                            
                    }
        else bodyDiv.firstChild.innerHTML+= tParse.toString();
}

function equalsOperator(bc) {
    var equationLocation=bodyDiv.firstChild.innerHTML.toString();

    let multiplyCharacter=equationLocation.indexOf('*');
    let divisionCharacter=equationLocation.indexOf('/');
    let additionCharacter=equationLocation.indexOf('+');
    let subtractionCharacter=equationLocation.indexOf('-');

//Checks if equationLocation contains > 1 "*", "/", "+", "-"... and stops equation calculation process to remove duplicates.
    let multiplyAmountInEquation= (equationLocation.match(/[*]/g) || []).length
    let divisionAmountInEquation= (equationLocation.match(/[/]/g) || []).length
    let additionAmountInEquation= (equationLocation.match(/[+]/g) || []).length
    let subtractionAmountInEquation= (equationLocation.match(/[-]/g) || []).length

    // Var eqLocLastPosition is last character in string bodydiv.firstChild.innerHTML.
    var eqLocLastPosition= equationLocation[equationLocation.length-1];

    //Checks for decimal before a '*' '/' '+' or '-' symbol, and removes the decimal and calls function equalsOperator(bc) to re-run.
        if (eqLocLastPosition == '.' 
            && (bc.innerHTML == '*' || bc.innerHTML == '/' || bc.innerHTML == '+' || bc.innerHTML == '-')
            ) {
                bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
                alertInfo="Invalid Decimal symbol, removed prior instance!";
                equalsOperator(bc);
                createPopupText(alertInfo);
        } else
            
    // Below fixes error where multiple '/' could be places after a '*' or in the second half of a equation.
        if ((divisionAmountInEquation >=1 && eqLocLastPosition == '*' && bc.innerHTML == '/')
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-2);
            alertInfo="Invalid Multiplication & Division symbols, removed last instances!";
            createPopupText(alertInfo);
        } else
    // Below fixes error where multiple '/' could be places after a '+' or in the second half of a equation.
        if ((divisionAmountInEquation >=1 && eqLocLastPosition == '+' && bc.innerHTML == '/'
            || divisionAmountInEquation >=1 ** additionAmountInEquation >=1 && eqLocLastPosition == '+' && bc.innerHTML == '*') 
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-2);
            alertInfo="Invalid Addition & Division symbols, removed last instances!";
            createPopupText(alertInfo);
        } else

    // Below fixes error where multiple '/' could be places after a '-' or in the second half of a equation.
        if ((divisionAmountInEquation >=1 && eqLocLastPosition == '-' && bc.innerHTML == '/')
            || divisionAmountInEquation >= 1 && subtractionAmountInEquation >= 1 
            && eqLocLastPosition != '/' && bc.innerHTML == '*' && (parseInt(eqLocLastPosition) <= 9) == false
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-2);
            alertInfo="Invalid Subtraction & Division symbols, removed last instances!";
            createPopupText(alertInfo);
        } else

    // Below fixes error where multiple '*' could be places after a '-' or in the second half of a equation.
        if ((multiplyAmountInEquation >=1 && eqLocLastPosition == '-' && bc.innerHTML == '*')
            || multiplyAmountInEquation >= 1 && subtractionAmountInEquation >= 1 
            && eqLocLastPosition != '*' && bc.innerHTML == '/' && (parseInt(eqLocLastPosition) <= 9) == false
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-2);
            alertInfo="Invalid Subtraction & Multiplication symbols, removed last instances!";
            createPopupText(alertInfo);
        } else

    // Below fixes error where multiple '*' could be places after a '+' or in the second half of a equation.
            if ((multiplyAmountInEquation >=1 && eqLocLastPosition == '+' && bc.innerHTML == '*')
            || multiplyAmountInEquation >= 1 && additionAmountInEquation >= 1 
            && eqLocLastPosition != '*' && bc.innerHTML == '/' && (parseInt(eqLocLastPosition) <= 9) == false
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-2);
            alertInfo="Invalid Addition & Multiplication symbols, removed last instances!";
            createPopupText(alertInfo);
        } else

    // Below fixes error where '*' could be places after a '/', which creates output of NaN.
        if ((divisionAmountInEquation >=1 && eqLocLastPosition == '/' && bc.innerHTML == '*')
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            alertInfo="Invalid Division symbol, removed last instances!";
            createPopupText(alertInfo);
        } else

    //Checks for duplicates of "*".
        if (multiplyAmountInEquation >=1 && multiplyCharacter == equationLocation.length-1 
            && bc.innerText != '-'
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            alertInfo="Invalid Multiplication symbol, removed last instance!";
            createPopupText(alertInfo);
        } else

    //Checks for duplicates of "/".
        if (divisionAmountInEquation >=1 && divisionCharacter == equationLocation.length-1 
            && equationLocation.charAt(equationLocation.length) != '-' && bc.innerHTML != '-'
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            alertInfo="Invalid Division symbol, removed last instance!";
            createPopupText(alertInfo);
        } else

    //Checks for duplicates of "+".
        if (additionAmountInEquation >=1 && additionCharacter == equationLocation.length-1
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            alertInfo="Invalid Addition symbol, removed last instance!";
            createPopupText(alertInfo);
        } else
        
    //Checks for duplicates of "-". Allows position [0] & [-1] to be "-" while not allowing two "-" adjacent.
        if (subtractionAmountInEquation >=1 && equationLocation.charAt(equationLocation.length-1) == '-'
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            alertInfo="Invalid Subtraction symbol, removed last instance!";
            createPopupText(alertInfo);
        } else     

    if (multiplyCharacter >= 1 && (parseInt(eqLocLastPosition) <= 9)
    ) {
        console.log(bodyDiv.firstChild.innerHTML + ' ' + '=' + ' ')
        let replaceM=bodyDiv.firstChild.innerHTML.replace('*', '');
        bodyDiv.firstChild.innerHTML= replaceM
    let equationFinalized=bodyDiv.firstChild.innerHTML;
    let equationFinalString=equationFinalized.toString();
        let left=equationFinalString.substring(0,multiplyCharacter)
        let right=equationFinalString.substring(multiplyCharacter,equationFinalString.length);
            let leftP= parseFloat(left);
            let rightP= parseFloat(right);
                bodyDiv.firstChild.innerHTML=leftP*rightP;
                    console.log(bodyDiv.firstChild.innerHTML);
    }   else
    //Var bcNow is accessed in: if(divisionCharacter), and: if(additionCharacter), as well as if(subtractionAmountInEquation).
    var bcNow= bc.innerText;
    var eqLocLastPosition= equationLocation[equationLocation.length-1];
    //(parseInt(eqLocLastPosition) <= 9)   checks for numbers after division symbol, if true.. continues.
    if ((divisionCharacter >= 1 && bcNow == '=' && (parseInt(eqLocLastPosition) <= 9))
        || (equationLocation[0] == '-' && subtractionAmountInEquation >= 2 && divisionAmountInEquation >= 1 &&(parseInt(eqLocLastPosition) <= 9))
        || (bcNow == '*' && divisionAmountInEquation >= 1 && (parseInt(eqLocLastPosition) <= 9))
        || (bcNow == '/' && divisionAmountInEquation >= 1 && (parseInt(eqLocLastPosition) <= 9))
        || (bcNow == '+' && divisionAmountInEquation >= 1 && (parseInt(eqLocLastPosition) <= 9))
        || (bcNow == '-' && divisionAmountInEquation >= 1 && (parseInt(eqLocLastPosition) <= 9))
        ) {
        console.log(bodyDiv.firstChild.innerHTML + ' ' + '=' + ' ')
        let replaceD=bodyDiv.firstChild.innerHTML.replace('/', '');
        bodyDiv.firstChild.innerHTML= replaceD
    let equationFinalized=bodyDiv.firstChild.innerHTML;
    let equationFinalString=equationFinalized.toString();
        let left=equationFinalString.substring(0,divisionCharacter)
        let right=equationFinalString.substring(divisionCharacter,equationFinalString.length);
            let leftP= parseFloat(left);
            let rightP= parseFloat(right);
                bodyDiv.firstChild.innerHTML=leftP/rightP;
                    console.log(bodyDiv.firstChild.innerHTML);
    }   else

    if (additionCharacter > 0 && bcNow != undefined && equationLocation.indexOf('+') != equationLocation.length-1) {
        console.log(bodyDiv.firstChild.innerHTML + ' ' + '=' + ' ')
        let replaceA=bodyDiv.firstChild.innerHTML.replace('+', '');
        bodyDiv.firstChild.innerHTML= replaceA
    let equationFinalized=bodyDiv.firstChild.innerHTML;
    let equationFinalString=equationFinalized.toString();
        let left=equationFinalString.substring(0,additionCharacter)
        let right=equationFinalString.substring(additionCharacter,equationFinalString.length);
            let leftP= parseFloat(left);
            let rightP= parseFloat(right);
                bodyDiv.firstChild.innerHTML=leftP+rightP;    
                    console.log(bodyDiv.firstChild.innerHTML);
    }   else
//Var subtractionMatch scope level detection of '-' in equation output string.
var subtractionMatch=(equationLocation.match(/-/g) || []).length;
    if (subtractionAmountInEquation > 1 && subtractionMatch == 2 
        && equationLocation[equationLocation.length-1] != '-'
        && divisionAmountInEquation == 0) {
//elString is CURRENT output string. allows for log1 to store value of FIRST '-' symbol in equation
var elString=bodyDiv.firstChild.innerHTML.toString();
        let rS1=elString.replace('-', "");
            bodyDiv.firstChild.innerHTML=rS1;
//elString is CURRENT output string. log2 stores value of SECOND '-' symbol in equation
var elString=bodyDiv.firstChild.innerHTML.toString();
        let log2=elString.indexOf('-');
        let rS2=elString.replace('-', "");
        bodyDiv.firstChild.innerHTML=rS2;

        let equationFinalized=bodyDiv.firstChild.innerHTML;
        let equationFinalString=equationFinalized.toString();
            let left=equationFinalString.substring(0,log2)
            let right=equationFinalString.substring(log2,equationLocation.length);
                let leftP= parseFloat(left);
                let rightP= parseFloat(right);
                    bodyDiv.firstChild.innerHTML=-leftP-rightP;
                    console.log('-' + left + ' ' + '-' + ' ' + right + ' ' + '=' + ' ');
                    console.log(bodyDiv.firstChild.innerHTML);
                    var includesSubString= bodyDiv.firstChild.innerHTML.toString()
    } else
var includesSubString= bodyDiv.firstChild.innerHTML.toString()
var includesSubtraction= includesSubString.includes('-');
var subtractionCharacterNow=equationLocation.indexOf('-');
        if (subtractionCharacterNow > 0 && includesSubtraction == true
            && divisionAmountInEquation == 0 && multiplyAmountInEquation == 0) {
            console.log(bodyDiv.firstChild.innerHTML + ' ' + '=' + ' ')
            let replaceS=bodyDiv.firstChild.innerHTML.replace('-', '');
            bodyDiv.firstChild.innerHTML= replaceS
        let equationFinalized=bodyDiv.firstChild.innerHTML;
        let equationFinalString=equationFinalized.toString();
            let left=equationFinalString.substring(0,subtractionCharacter)
            let right=equationFinalString.substring(subtractionCharacter,equationFinalString.length);
                let leftP= parseFloat(left);
                let rightP= parseFloat(right);
                    bodyDiv.firstChild.innerHTML=leftP-rightP;    
                        console.log(bodyDiv.firstChild.innerHTML);
    }   
}

//check for '*', '/', or '+' are in position [0] of output string, and removes position [0] if true.
    function positionZeroSymbolCheck() {
        let locString=bodyDiv.firstChild.innerHTML.toString();
        if (locString == '*' || locString == '/' || locString == '+') {
            bodyDiv.firstChild.innerHTML= "";
            createPopupText("Invalid equation format, removed all inputs!");
        }
    }

//==================================================================================================
                            /*USER ALERTS ARE CREATED & DELIGATED BELOW*/

//creates popup text and then sets a timeout to call function popUpTextTimeout() to remove children;
function createPopupText(alertInfo) {
    let div=document.createElement("div");
    div.classList.add('popupText');
    div.innerText=alertInfo;
        userAlertDiv.prepend(div);
        if (userAlertDiv.childElementCount > 3) {
            userAlertDiv.removeChild(userAlertDiv.lastChild);
        } else setTimeout(popupTextTimeout, 5000);
}

function popupTextTimeout() {
    if (userAlertDiv.childElementCount >= 0) {
    userAlertDiv.removeChild(userAlertDiv.lastChild);
    }
}
