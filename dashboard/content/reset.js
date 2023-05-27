const  params= new URLSearchParams(window.location.search);
const  qr=params.get('rq');
const id=qr.slice(0,qr.length-10)
const reset=async()=>{
    $(".error").removeClass("visible")
 const pass1= document.getElementById('new1').value;   
 const pass2= document.getElementById('new2').value ;
 if(pass1){

     console.log(pass1)
     console.log(pass2)
     
     if(pass1!==pass2){
         $(".error").addClass("visible")

        } else{
            const newPass=pass1
            console.log(id)
            const resp= await fetch(`http://localhost:5000/api/v3/users/reset/${id}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({newPass})
            })
            const jsonData=await resp.json();
            console.log(jsonData.result)

            
        }
    
    }
}