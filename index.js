const btns=document.querySelectorAll('.btn')
console.log(btns)
btns.forEach(button=>button.onclick=()=>{window.location.assign('./register/register.html')})
import { createPackages } from "./create-packages.js";
createPackages()
const hamLines=document.querySelectorAll('.hamline')
const ham=document.querySelector('.ham')
const menu= document.querySelector('.menu-div')
 ham.onclick=()=>{
    hamLines.forEach(line=>{
        line.classList.toggle('opened')
        menu.classList.toggle('menu-open')
    })
 }
 
 const getStats=async()=>{
    const resp= await fetch('http://localhost:5000/api/v3/stats');
    const jsonData= await resp.json();
    console.log(jsonData)
    const {result}=jsonData
    const runningDays= document.getElementById("runningDays")
    const investments= document.getElementById("investments")
    const accounts= document.getElementById("accounts")
    const withdrawals= document.getElementById("withdrawals");
    runningDays.innerHTML= result.runningDays
    investments.innerHTML="$"+result.totalInvestments
    withdrawals.innerHTML="$"+result.totalWithdrawals
    accounts.innerHTML=result.totalAccounts
 }
 const accordionHeaders=document.querySelectorAll('.accordion-header')
 accordionHeaders.forEach(acc=>{
   acc.addEventListener('click',(e)=>{
      console.log(e.target.parentElement)
      e.target.parentElement.classList.toggle('accordion-open')
   })
 })
 
 getStats()