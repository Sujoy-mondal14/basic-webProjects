const buttons = document.querySelectorAll('button');
const currentDisplay = document.getElementById('current')



buttons.forEach(element =>{
    element.addEventListener('click' , (e)=>{
        currentDisplay.innerHTML = e.target
        console.log(e.target);
        
        
    })
})
