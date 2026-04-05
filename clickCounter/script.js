let counterValue = 0

let counterValue1 = document.getElementById('currentCount1')
let counterValue2 = document.getElementById('currentCount2')


const buttonInc = document.getElementById('increaseButton')
const buttonDec = document.getElementById('decreaseButton')

console.log(buttonDec)

buttonInc.addEventListener('click', (e)=>{
   if(counterValue <5){
    counterValue++;
   
   
   counterValue1.innerText = counterValue
   counterValue2.innerText = counterValue
   }
   else{
        counterValue1.innerText = `limit reached ${counterValue}`
        counterValue2.innerText = `limit reached ${counterValue}`
   }
   
})


buttonDec.addEventListener('click', (e)=>{
   if(counterValue > 0){
    counterValue--;
   
   
   counterValue1.innerText = counterValue
   counterValue2.innerText = counterValue
   }
   
   
})