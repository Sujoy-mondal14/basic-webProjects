const swapButton = document.getElementById('swap')
const convertButton = document.getElementById('convert')
const input1 = document.getElementById('firstInput')
const input2 = document.getElementById('secondInput')


// API calling function
async function currencyInfo (currency){
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`

   try{
        const res = await fetch(url)
        if(!res.ok){
            throw new Error(`Response Status : ${res.status}`)
        }

        const data = await res.json()

        return data
   }catch(error){
        console.error(error.message)
   }

}



