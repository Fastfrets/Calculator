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
            equalsOperator()}
            bodyDiv.firstChild.innerHTML+=t.toString();
        } else  if (t === '=') {
                equalsOperator();
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

function equalsOperator() {
    var equationLocation=bodyDiv.firstChild.innerHTML.toString();

    let multiplyCharacter=equationLocation.indexOf('*');
    let divisionCharacter=equationLocation.indexOf('/');
    let additionCharacter=equationLocation.indexOf('+');
    let subtractionCharacter=equationLocation.indexOf('-');

        let m=equationLocation[multiplyCharacter];
        let d=equationLocation[divisionCharacter];
        let a=equationLocation[additionCharacter];
        let s=equationLocation[subtractionCharacter];

//Checks if equationLocation contains > 1 "*", "/", "+", "-"... and stops equation calculation process to remove duplicates.
        let multiplyAmountInEquation= (equationLocation.match(/[*]/g) || []).length
        let divisionAmountInEquation= (equationLocation.match(/[/]/g) || []).length
        let additionAmountInEquation= (equationLocation.match(/[+]/g) || []).length
        let subtractionAmountInEquation= (equationLocation.match(/[-]/g) || []).length

    //Checks for duplicates of "*".
        if (multiplyAmountInEquation >=1 && multiplyCharacter == equationLocation.length-1) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            console.log("Invalid Multiplication symbol in equation. Removed last instance!")
        } else

    //Checks for duplicates of "/".
        if (divisionAmountInEquation >=1 && divisionCharacter == equationLocation.length-1) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            console.log("Invalid Division symbol in equation. Removed last instance!")
        } else

    //Checks for duplicates of "+".
        if (additionAmountInEquation >=1 && additionCharacter == equationLocation.length-1) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            console.log("Invalid Addition symbol in equation. Removed last instance!")
        } else

    //Checks for duplicates of "-". Allows position [0] & [-1] to be "-" while not allowing two "-" in a row.
        if (subtractionAmountInEquation >=1 && subtractionCharacter == equationLocation.length-1) {
            bodyDiv.firstChild.innerHTML= equationLocation.slice(0,-1);
            console.log("Invalid Subtraction symbol in equation. Removed last instance!")
        } else

//Sectioned off for insert
    if (multiplyCharacter > 0) {
        console.log(bodyDiv.firstChild.innerHTML + ' ' + '=' + ' ')
        let replaceM=bodyDiv.firstChild.innerHTML.replace('*', '');
        bodyDiv.firstChild.innerHTML= replaceM
    //Actual Equation done below.
    let equationFinalized=bodyDiv.firstChild.innerHTML;
    let equationFinalString=equationFinalized.toString();
        let left=equationFinalString.substring(0,multiplyCharacter)
        let right=equationFinalString.substring(multiplyCharacter,equationFinalString.length);
            let leftP= parseFloat(left);
            let rightP= parseFloat(right);
                bodyDiv.firstChild.innerHTML=leftP*rightP;
                    console.log(bodyDiv.firstChild.innerHTML);
    }   else
    
    if (divisionCharacter > 0) {
        console.log(bodyDiv.firstChild.innerHTML + ' ' + '=' + ' ')
        let replaceD=bodyDiv.firstChild.innerHTML.replace('/', '');
        bodyDiv.firstChild.innerHTML= replaceD
    //Actual Equation done below.
    let equationFinalized=bodyDiv.firstChild.innerHTML;
    let equationFinalString=equationFinalized.toString();
        let left=equationFinalString.substring(0,divisionCharacter)
        let right=equationFinalString.substring(divisionCharacter,equationFinalString.length);
            let leftP= parseFloat(left);
            let rightP= parseFloat(right);
                bodyDiv.firstChild.innerHTML=leftP/rightP;
                    console.log(bodyDiv.firstChild.innerHTML);
    }   else

    if (additionCharacter > 0) {
        console.log(bodyDiv.firstChild.innerHTML + ' ' + '=' + ' ')
        let replaceA=bodyDiv.firstChild.innerHTML.replace('+', '');
        bodyDiv.firstChild.innerHTML= replaceA
    //Actual Equation done below.
    let equationFinalized=bodyDiv.firstChild.innerHTML;
    let equationFinalString=equationFinalized.toString();
        let left=equationFinalString.substring(0,additionCharacter)
        let right=equationFinalString.substring(additionCharacter,equationFinalString.length);
            let leftP= parseFloat(left);
            let rightP= parseFloat(right);
                bodyDiv.firstChild.innerHTML=leftP+rightP;    
                    console.log(bodyDiv.firstChild.innerHTML);
    }   else



//===========================================================================================================================
//Var subtractionMatch cannot be higher or lower in scope!
    var subtractionMatch=(equationLocation.match(/-/g) || []).length;
    var elString=bodyDiv.firstChild.innerHTML.toString();
    if (subtractionAmountInEquation > 1 && subtractionMatch == 2) {
        let log1=equationLocation.indexOf('-');
        let rS1=elString.replace('-', '');
        bodyDiv.firstChild.innerHTML=rS1;
        let log2=equationLocation.indexOf('-');console.log(equationLocation)
//rS1 & rS2 show indexOf in position 0. This is main problem <<<<<<<< also equationLocation and equationFinalized should be same.
        let rS2=elString.replace('-', '');
        bodyDiv.firstChild.innerHTML=rS2

        let equationFinalized=bodyDiv.firstChild.innerHTML;
        console.log(equationFinalized)
        let equationFinalString=equationFinalized.toString();
            let left=equationFinalString.substring(0,log2)
            let right=equationFinalString.substring(log2,equationLocation.length);
                let leftP= parseFloat(left);
                let rightP= parseFloat(right);
                    bodyDiv.firstChild.innerHTML=-leftP-rightP;    
                        //console.log(bodyDiv.firstChild.innerHTML);
    } else

        if (subtractionCharacter > 0) {
            console.log(bodyDiv.firstChild.innerHTML + ' ' + '=' + ' ')

            let replaceS=bodyDiv.firstChild.innerHTML.replace('-', '');
            bodyDiv.firstChild.innerHTML= replaceS
        //Actual Equation done below.
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
