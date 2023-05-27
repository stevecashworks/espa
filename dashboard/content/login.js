const form =document.querySelector('form')
const loginBtn=document.getElementById('emailLogin');
const errorDiv= document.getElementById('error')
const createErrorUi=(message)=>{
    errorDiv.style.display='block';
    errorDiv.textContent=message
}
const  fields=['email','password']
const obj={};
const submitItem=async()=>{
  errorDiv.style.display='none'    
    const formData=new FormData(form)
    for(let [key,value] of formData.entries()){
        obj[key]=value;
    }
    
    const FetchData=async(uri,method,data,tk)=>{
        try {
            const resp= await fetch(uri,{method,
                headers:{"Content-Type":"application/json"},
             body:JSON.stringify(data)
            })
            const jsonData=await resp.json();
            console.log(jsonData)
            return jsonData
        } catch (error) {
            console.log(error)
        }
        
    } 
    const form_Was_Filled_Correctly=fields.every(field=>Boolean(obj[field]));
    if(form_Was_Filled_Correctly){

        const data= await FetchData('http://localhost:5000/api/v3/users/login','POST',obj)
        await localStorage.setItem('kointk',data.result)
        
        if(data.success){
            setTimeout( ()=>{window.location.assign('./index.html')},2000)
            
        }else{
            createErrorUi(data.result)
        }
    }
    else{
     createErrorUi('All fields must be filled to continue')
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
}) 
loginBtn.addEventListener('click',submitItem)