const button = document.querySelectorAll('button')
console.log(button);

const body = document.querySelector('body')

button.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        body.style.backgroundColor = element.id
        
    })
})