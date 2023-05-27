// import FetchData from "./fetchData";
const form=document.querySelector('form')
const allSourceInputs=document.querySelectorAll('.option-unit>input');
const textArea=document.querySelector('textarea')
const apiEntry='http://localhost:5000/api/v3';

const lb=document.getElementById('others-btn')
const watchList=[document.getElementById('ref'),document.getElementById('others')]
allSourceInputs.forEach(x=>{x.addEventListener('change',()=>{
    if(watchList.some(x=>x.checked)){
        const checked=watchList.find(x=>x.checked);
        
        const placeholder=checked.id==='ref'?"Your referral id":"Please specify"
        textArea.placeholder=placeholder
        textArea.style.display='block'
        }
    else{
        textArea.style.display='none'
    }
})})

// submits the form when the submit event listener is fired
const reffererId=new URLSearchParams(window.location.search).get("ref")
if(reffererId){
    document.getElementById('ref').checked=true
    fetch('http://localhost:5000/api/v3/users/ref/'+reffererId).then(res=>res.json()).then(data=>console.log(data.result))
}
 const SubmitItem=async(e)=>{
    e.preventDefault();
    const data=new FormData(form)
    const keyVals={}
   for(let [key,val] of data.entries()){
    keyVals[key]=val

   }

   const FetchData=async(uri,method,data,tk)=>{
    try {
     const resp= await fetch(uri,{method,
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify({...data,invitedBy:reffererId})
         })
         const jsonData=await resp.json();
         console.log(jsonData)
         if(Boolean(jsonData.success)){
 console.log('successful!')
             localStorage.setItem('kointk',jsonData.result)
             window.location.assign('../dashboard/content/index.html')
         }
      return jsonData
    } catch (error) {
      console.log(error)
    }
     
 
 }
 if(keyVals.password===keyVals.repeatPassword){

     console.log(keyVals)
     await(FetchData(`${apiEntry}/users/register`,'POST',keyVals))
     // setTimeout(()=>{ window.location.assign('../dashboard/content/index.html')},2000)
     
    }
    else{
        console.log('passwords don\'t match')
    }
    }
    form.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log('submitted')
SubmitItem(e)
})
const getCountries=async()=>{
    const resp=await fetch("https://restcountries.com/v3.1/all");
    const countries= await resp.json();
    const sortedCountries=countries.sort(x=>x.name.common)
    const countriesCon= document.getElementById('countries')
    sortedCountries.forEach(country=>{
            const opt= document.createElement('option');
             opt.value=country.name.common
             opt.innerHTML=country.name.common;
             
             opt.style.color="rgb(0,0,0,0.9)"

             countriesCon.appendChild(opt)
    })
}
getCountries()