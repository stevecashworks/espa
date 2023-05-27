import {approve,deleteRequest,sendMessage} from "./handleRequests.js";
const rTbody=document.querySelector('.rtbody')
const elem=el=>document.createElement(el)
const urlParams= new URLSearchParams(window.location.search)
const id=urlParams.get("id");
let data;
const ex= ["_id","__v","userDetails","createdAt","updatedAt"]
console.log(id)
const func=async()=>{

    const getDetails=async()=>{
    const res= await fetch(`http://localhost:5000/api/v3/investments/request/${id}`)
    const jsonRes= await res.json()

    if(jsonRes.success){
         data= jsonRes.result
        console.log(data._id)
        console.log(data)
        console.log(data.Date);
        for (let key in  data ){
            if(!ex.includes(key)){
                
                const row =elem('tr');
                const th= elem('th')
                const td= elem('td')
                
                key==="Date"?  td.innerHTML= new Date(data[key]).toDateString().split(" ").join('/')  :key==="userId"?td.innerHTML=data[key].firstName+" "+data[key].lastName: td.innerHTML=data[key] 
                if(key==="userId"){
                    th.innerHTML="User Name"
                }
                else{th.innerHTML=key+":"}
                row.appendChild(th)
                row.appendChild(td)
                rTbody.appendChild(row);
                
            }    
        }
        
    }
  
}
 await getDetails()
 const {_id,requestType}=data
  document.getElementById("approve").onclick=()=>approve(_id,requestType)
  document.getElementById("decline").onclick=()=>deleteRequest(_id)
  document.getElementById("sendBtn").onclick=()=>sendMessage(_id)
}
func()
const toggleMessage=()=>{
    const message=document.querySelector('.message')
     message.style.display==="none"?message.style.display="block":message.style.display="none"

}
document.getElementById('message-opener').onclick=toggleMessage

