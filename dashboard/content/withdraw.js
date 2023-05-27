const submitBtn=document.getElementById('submitbtn')
$('label').addClass('text-gray-500 mb-2')
let userDetails
  fetch(`http://localhost:5000/api/v3/users/token/${localStorage.getItem('kointk')}`,{
        method:'post',
        headers:{"Content-Type":'application/json'}
        
    }).then(res=>res.json()).then(data=>{userDetails=data.result})
 
    
    



const withdraw=async()=>{
    const {balance}=userDetails
     const amount=document.getElementById('amount').value
     const walletId=document.getElementById('wallet-id').value
     const coinType= document.getElementById('coin-type').value
     const reWalletId=document.getElementById('re-wallet-id').value
     console.log({coinType,amount,walletId,reWalletId})
      const errors=document.querySelectorAll('.err');
      const errorArr=[]
      errors.forEach(err=>{
        err.style.display="none";
        
      })
     if(!coinType){
        errors[0].style.display='block'
        errorArr.push(0);
     }
     if(!amount){
        errors[1].style.display='block';
        errorArr.push(1);

        
     }
     if(!walletId){
        errors[2].style.display='block';
        errorArr.push(2);


    }
     if(!reWalletId){
        errors[3].style.display='block';
        errorArr.push(3);

     }
     if(!(walletId===reWalletId)){
        errors[4].style.display='block';
        errorArr.push(4);

     }
     $("#error-con").css('display',"none")
     if(errorArr.length>0){
        $('#error-con').addClass('bg-warning text-white font-weight-bold text-center p-2 m-2').html('Please fix errors to continue');
        $("#error-con").css('display',"block")
     
    }else{
        const proceed=confirm(`Are you sure you want to withdraw ${amount} into the wallet ${walletId}?`)
     if(proceed){
        if(balance<amount){
            $(".alert").addClass('visible-alert text-center').html("Insufficient funds, please  check balance and try with a lesser amount")
            setTimeout(() => {
                $('.alert').removeClass('visible-alert')
            },6000);
        }

        else{
            await fetch(`http://localhost:5000/api/v3/investments/add/${localStorage.getItem('kointk')}`,{
                method:"post",
                headers:{'Content-Type':"application/json"},
                body:JSON.stringify({amount,requestType:"withdrawal",coinType,walletId})
            }).then(res=>res.json()).then(data=>{
                if(data.success){
                    $('.alert').addClass('visible-alert').html("We have recieved your request and we'll respond soon!")
                    setTimeout(()=>{
                        location.assign('./index.html')
                    },4000)
                }
            })
         }

     }
    
    }


}
submitBtn.onclick=withdraw