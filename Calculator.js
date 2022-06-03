const body=document.getElementById('body');
const pBodyDiv=document.getElementById('parentBodyDiv');
const bodyDiv=document.getElementById('bodyDiv');
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
                            if (bodyDiv.firstChild.innerHTML.indexOf('.') >= 1) {
                                let replaceDecimal=bodyDiv.firstChild.innerHTML.replace('.', '');
                                    bodyDiv.firstChild.innerHTML=replaceDecimal;
                                    bodyDiv.firstChild.innerHTML+=t.toString();
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
            && (bc.innerHTML == '*' || bc.innerHTML == '/' || bc.innerHTML == '+' || bc.innerHTML == '-')) {
                bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
                equalsOperator(bc);
            }
            

    // Below fixes error where multiple '/' could be places after a '*' or in the second half of a equation.
        if ((divisionAmountInEquation >=1 && eqLocLastPosition == '*' && bc.innerHTML == '/')
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-2);
            console.log("Invalid Division symbol in equation. Removed last instances!")
        } else
    // Below fixes error where multiple '/' could be places after a '+' or in the second half of a equation.
        if ((divisionAmountInEquation >=1 && eqLocLastPosition == '+' && bc.innerHTML == '/')
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-2);
            console.log("Invalid Division symbol in equation. Removed last instances!")
        } else

    // Below fixes error where multiple '/' could be places after a '-' or in the second half of a equation.
        if ((divisionAmountInEquation >=1 && eqLocLastPosition == '-' && bc.innerHTML == '/')
            || divisionAmountInEquation >= 1 && subtractionAmountInEquation >= 1 
            && eqLocLastPosition != '/' && bc.innerHTML == '*' && (parseInt(eqLocLastPosition) <= 9) == false
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-2);
            console.log("Invalid Division symbol in equation. Removed last instances!")
        } else

    //Checks for duplicates of "*".
        if (multiplyAmountInEquation >=1 && multiplyCharacter == equationLocation.length-1 
            && eqLocLastPosition != '-'
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            console.log("Invalid Multiplication symbol in equation. Removed last instance!")
        } else

    //Checks for duplicates of "/".
        if (divisionAmountInEquation >=1 && divisionCharacter == equationLocation.length-1 
            && equationLocation.charAt(equationLocation.length) != '-' && bc.innerHTML != '-'
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            console.log("Invalid Division symbol in equation. Removed last instance!")
        } else

    //Checks for duplicates of "+".
        if (additionAmountInEquation >=1 && additionCharacter == equationLocation.length-1
            ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            console.log("Invalid Addition symbol in equation. Removed last instance!")
        } else
        
    //Checks for duplicates of "-". Allows position [0] & [-1] to be "-" while not allowing two "-" adjacent.
        if (subtractionAmountInEquation >=1 && equationLocation.charAt(equationLocation.length-1) == '-'
        ) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            console.log("Invalid Subtraction symbol in equation. Removed last instance!")
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
            && divisionAmountInEquation == 0) {
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
        }
    }


/* 
Fixed: 
        1.) Numbers could not be divided by negative numbers.
        2.) Two Negative symbols (infront and behind a set of numbers) would = NaN when any other symbol were entered.
        3.) Couldn't multiply a number by a negative number.
        4.) Symbols '*', '/', '+', or '-' could be placed after a decimal allowing multiple of these symbols to be in a equation,
            often resulting in output of NaN
BugReport:
        1.) Only 1 decimal can be put into an equation. (second decimal removes first decimal);
        2.) sometimes equations with a decimal number will be rounded up by a fraction of its value. 
            Example: 1.02 * 1 = 1.020,000,000,000,000,002

*/
