const entry="http://localhost:5000/api/v3/investments"
export const approve=async(id, requestType)=>{
    const res= await fetch(`${entry}/approve/${id}/${requestType}`)
    const data= await res.json()
    if(data.success){
        $('.result').addClass("visible")
        $('.result').html("Request approved  successfully")
        setTimeout(()=>{
            $('.result').removeClass('visible');
            window.location.assign('./admin.html')
        },4000)
        
    }
}
 
export const deleteRequest=async(id)=>{
    // alert(id)
    const res= await fetch(`${entry}/delete/${id}`)
    const data= await res.json()
    if(data.success){
        $('.result').addClass("visible")
        $('.result').html("Deleted successfully")
        setTimeout(()=>{
            $('.result').removeClass('visible');
            window.location.assign('./admin.html')
        },3000)
        
    }
}
export const sendMessage=async(id)=>{
    const message=document.getElementById('message').value
    const resp=await fetch(`http://localhost:5000/api/v3/investments/message/${id}`,{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({message})

    })
    const data=await resp.json()
    if(data.success){
    
        $('.result').addClass("visible")
        $('.result').html("Message was sent successfully")
        setTimeout(()=>{
            $('.result').removeClass('visible');
            window.location.assign('./admin.html')
        },4000)
    }
    
   
    
}