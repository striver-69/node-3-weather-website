console.log('client side jaavscript loaded in html page')

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    message1.textContent='Loading...'
    message2.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
        }else{
            console.log(data)
            message1.textContent=data.data.location
            message2.textContent=data.forecast.weather
        }
    })
})

})