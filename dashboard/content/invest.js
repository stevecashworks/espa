// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { firebaseConfig } from "./fire.js";
// import  {getStorage,ref,getDownloadURL,uploadBytesResumable}  from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";
import { createPackages } from "../../create-packages.js"
import packages from "../../packages.js";
let condition
console.log("hello")
createPackages()
document.querySelectorAll('.investbtn').forEach(x=>x.onclick=()=>{
    
})
let min 
let max
let plan=new URLSearchParams(window.location.search).get('package')||undefined;
if(plan){
min=packages[plan]['min']
max=packages[plan]['max']

}

document.querySelectorAll('.investbtn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
     const {id} =e.target
     plan=id;
     console.log(plan)
    
        min =packages[plan]["min"]
        max =packages[plan]["max"]
        checkErrors()
        creatErrorUi()
        // console.log("min:", min)
        // console.log("max:", max)
        
    })
})
// const app=initializeApp(firebaseConfig)
//  const storage=getStorage(app)
let choice="";
let img;
let amount;
let errors=[];
const btn=document.getElementById('proofBtn');

const creatErrorUi=()=>{
      const errorDiv=document.getElementById('errors')
      errorDiv.innerHTML=""
      errors.forEach(err=>{
          const er= document.createElement('p')
          er.style.padding="10px"
          er.style.borderRadius="10px"
          er.setAttribute("class","mb-4 text-white text-center bg-danger");
          er.innerHTML=err;
          errorDiv.appendChild(er);
          
          
        })
        
        btn.disabled=(errors.length!==0)
        
        
}
const checkErrors=()=>{
    // console.log(amount)
    const error=[]
    if(!choice){
        error.push("please select a coin to trade with!")
    }
    if(!amount){
        error.push("you need to input an amount" )
    }
    if(!img){
        error.push("You  need to  upload screenshot as proof of payment")
    }
    if(!plan){
        error.push("You need to select a plan to work with")
    }
    if(plan){
        if(!condition){
            error.push(`On ${plan} Plan, you can only invest an amount within $${min} and $${max}`)

            
           
        }
        
    }
    return error
}


// console.log(window.location.search)
const choiceImage=document.getElementById('choiceImage')
const choiceTitle=document.getElementById('choiceTitle')
const choiceId=document.getElementById('choiceId');
const proofInput=document.getElementById('proofInp')
const proofImg=document.getElementById('proofImg')
const amountInput=document.getElementById('amountInp');
const returnOut= document.getElementById('return')

const choices={
    dodge:{name:"dodge-coin",id:"245738798291hkhbc",image:"../../assets/coins/dodge.jpg"},
    bitcoin:{name:"bitcoin",id:"245738798291hkhbci46",image:"../../assets/coins/bitcoin.png"},
    eth:{name:"ethereum",id:"245738798291hkhhjdshbcaa",image:"../../assets/coins/eth.svg"},
    litecoin:{name:"litecoin",id:"245738798291hkhhjdshbcaax123",image:"../../assets/coins/lite.png"}
}
const coinImages=document.querySelectorAll('.coin')
coinImages.forEach(item=>{
    item.addEventListener('click',(e)=>{
        getChoice(e)
    })
})
const getChoice=(e)=>{
    const {id} = e.currentTarget
    
    choice=id;
    if(choice){
        $("#copy-btn").css("display","block")
    }
    
    coinImages.forEach(image=>
        image.classList.remove('circled')
        
    )
    errors=checkErrors();
    
    document.getElementById(id).classList.add("circled")
    const selected= choices[choice];
    choiceImage.setAttribute('src',selected.image)
    choiceImage.style.display='block'
    choiceTitle.innerHTML=`Our ${selected.name} wallet id for investments is :`
    choiceId.innerHTML=selected.id
creatErrorUi()

}
proofInput.addEventListener('change',(e)=>{
    setProof(e)
})
const setProof=(e)=>{
    proofImg.setAttribute('src',URL.createObjectURL(e.target.files[0]))
    img=e.target.files[0];
    errors=checkErrors()
    creatErrorUi()
}
const url= 'http://localhost:5000/api/v3/investments/add/'+localStorage.getItem('kointk')
// console.log(url)
const submitProof=async()=>{
    const details={img,choice,amount,requestType:"investment"};
    
    try {

const uploadFile=async(file)=>{
    // let fileUrl
    // const storageRef = ref(storage, `images/${file.name}`);
    
    // const uploadTask = uploadBytesResumable(storageRef, file);
    // // console.log(uploadTask)
    
    // // Register three observers:
    // // 1. 'state_changed' observer, called any time the state changes
    // // 2. Error observer, called on failure
    // // 3. Completion observer, called on successful completion
    // await uploadTask.on('state_changed', 
    // (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //     switch (snapshot.state) {
    //         case 'paused':
    //             console.log('Upload is paused');
    //             break;
    //             case 'running':
    //                 console.log('Upload is running');
    //                 break;
    //             }
    //         }, 
    //         (error) => {
    //             // Handle unsuccessful uploads
    //             console.log(error)
    //         }, 
    //         () => {
    //             // Handle successful uploads on complete
    //             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //             getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
    //                 const resp=await fetch(url,{
    //                     method:'post',
    //                     headers:{"Content-Type":"application/json"},
    //                     body:JSON.stringify({...details,proof:downloadURL,plan})
                        
    //                 })
    //                 const data=await resp.json()
    //                 console.log(data)
    //                 if(data.success){
    //                     $('.message').removeClass('bg-warning').addClass("bg-success visible-message").html(`We have recieved your request to invest $${amount} and we'll get back to you shortly `);
                       
    //                     setTimeout(()=>{
    //                         $(".message").removeClass("visible-message");
    //                         window.location.assign('./index.html')
    //                     },7000)
    //                 }
    //                 else{
    //                     $('.message').removeClass('bg-success').addClass("bg-warning visible-message").html(`An error occured while processing your request`);
                        
    //                     setTimeout(()=>{
    //                         $(".message").removeClass("visible-message");
    //                     },7000)
    //                 }    
                
    //             });
                
                
             
            // }
            // );
            const resp=await fetch(url,{
                                    method:'post',
                                    headers:{"Content-Type":"application/json"},
                                    body:JSON.stringify({...details,proof:"none",plan})
                                    
                                })
                                const data=await resp.json()
                                console.log(data)
                                if(data.success){
                                    $('.message').removeClass('bg-warning').addClass("bg-success visible-message").html(`We have recieved your request to invest $${amount} and we'll get back to you shortly `);
                                   
                                    setTimeout(()=>{
                                        $(".message").removeClass("visible-message");
                                        window.location.assign('./index.html')
                                    },7000)
                                }
                                else{
                                    $('.message').removeClass('bg-success').addClass("bg-warning visible-message").html(`An error occured while processing your request`);
                                    
                                    setTimeout(()=>{
                                        $(".message").removeClass("visible-message");
                                    },7000)
                                }    
                            
            
        }
        await uploadFile(img)
              
    } catch (error) {
    console.log('an error occured:',error)
        $(".message").removeClass('bg-success').addClass('bg-warning').addClass("visible-message text-center").html("An error occured while trying to reach our servers please try again later!")
    }
}
amountInput.addEventListener('change',(e)=>{showReturn(e)}
)
btn.onclick=submitProof

const showReturn=(e)=>{
    amount=e.target.value||undefined
    
    errors=checkErrors();
    console.log(errors)
    creatErrorUi();
    if(plan){
        
         if(Number(e.target.value>=20)){
            amount=e.target.value;
             condition=max==="unlimited"?(amount>=min):(amount>=min&&amount<=max)
             console.log(condition)
            if(condition){

            
                $("#return").html("calculating ...");
                $("#return").removeClass("text-gray-700") ;
                $("#return").addClass("text-danger");
                errors=checkErrors();
                setTimeout(()=>{
                    $("#return").removeClass("text-danger");
                    
                    $("#return").addClass("text-warning") 
                },1500)
                
                
                
                setTimeout(()=>{
                    $("#return").removeClass("text-warning");
                    
                    $("#return").addClass("text-success") 
                    const amount=Number(e.target.value);
                    const percentage=Number(packages[plan].percentage)
                    console.log(percentage)
                    const totalReturns= (amount+Math.round((amount*percentage/100)));
                    returnOut.innerHTML=`return of $${totalReturns} guaranteed at ${percentage}% profit `
                    creatErrorUi()
                    
                },3000)
            } else{
                    $("#return").html("Amount does not match the selected plan")
            }
        }    
    }
      
        
}
const copyId=()=>{
    navigator.clipboard.writeText(choiceId.innerHTML).then(()=>{

        $(".copied").addClass("copied-visible");
        setTimeout(()=>{
            $(".copied").removeClass("copied-visible")
        },3000)
        
    }

    ).catch(err=>console.log(err))
}
document.getElementById('copy-btn').onclick=copyId
//add packages 
// starters 50-500
//midi 500-1000
//maxi 1000-10000
//combo 10000-50000
//ultimate -50000....