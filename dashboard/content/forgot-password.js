const resetBtn=document.getElementById('reset-btn');
resetBtn.addEventListener( "click", (e)=>{
    e.preventDefault()
    async function getUser(){
    const  email=document.getElementById('exampleInputEmail').value;
     const resp=await  fetch('http://localhost:5000/api/v3/users/findemail',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email})
     })
     const data=  await resp.json()
     console.log(data)
}
getUser()

}
)