// DOM elements
const checkboxNumber = document.getElementById('number') 
const checkboxChar = document.getElementById('char')
const length = document.getElementById('length')
const txt = document.getElementById('inputText')
const button = document.getElementById('button')
const lengthValueText = document.getElementById('lengthValue')



// generate password function
function passwordGenerator(){
    const allowNumber = checkboxNumber.checked
    const allowChar = checkboxChar.checked

    const lengthValue = parseInt(length.value) || 5

    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz"

    if(allowChar) str+= "!@#$%^&*()_==<>?,.:;"
    if(allowNumber) str+="0123456789"

    let password =""

    for(let i = 0; i < lengthValue;i++){
        let charIdx = Math.floor(Math.random() * str.length +1)

        password+=str.charAt(charIdx)
    }

    txt.value = password;
    lengthValueText.innerText = lengthValue
}

// handeling events
checkboxChar.addEventListener('input', passwordGenerator)
checkboxNumber.addEventListener('input', passwordGenerator)
length.addEventListener('input', passwordGenerator)


// default password
passwordGenerator()


//copy function
button.addEventListener('click' , async (e)=>{
    try{
        const txtValue = txt.value

        await navigator.clipboard.writeText(txtValue)

        button.innerText = 'Copied'
        setTimeout(()=> button.innerText = 'Copy' , 2000)
    }catch(err){
        console.log("error to copy");
        
    }
})