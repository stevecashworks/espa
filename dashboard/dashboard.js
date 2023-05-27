const tk = localStorage.getItem('kointk')
if(!tk){
    window.location.assign('../../index.html');
}
const nameElem= document.querySelector('.username')
const account= document.querySelector('.account')
console.log(tk);
const fileUserDetails=async()=>{
    
    const fetchUserData=async()=>{
        const response=await fetch(`http://localhost:5000/api/v3/users/token/${tk}`,{
            method:"post",
            headers:{'Content-Type':'application/json'}
        })
        const data=await response.json()
        console.log(data)
        if(data.success){
            return data.result
        }else{
            console.log('Oops something went wrong, please try again later')
        }
    }
    
    
    const userData= await fetchUserData();
    $('#referal').html(userData.referalls.length)
    $("#total-earnings").html("$"+userData.earnings)
    fetch(`http://localhost:5000/api/v3/investments/latest/${userData._id}`).then(res=>res.json()).then(data=>{
        if(data.success){
            console.log(data)
            $("#last-investment").html(`$${data.result.investment.amount}`)
            $("#last-withdrawal").html(`$${data.result.withdrawal.amount}`)
        }
    })
        nameElem.textContent=userData.firstName + " " + userData.lastName
        account.textContent=userData.firstName + " " + userData.lastName
        $('#balance').html("$"+userData.balance)
        const link=`http://localhost:5500/register/register.html?ref=${userData._id}`
        document.getElementById('link').addEventListener('click',()=>{
            navigator.clipboard.writeText(link).then(()=>{
                console.log('copied');
                
                $('#copied').css('opacity',"1")
                setTimeout(()=>{
                    $('#copied').css('opacity','0')
                },3000)
            }).catch(err=>{
                console.log(err)
            })
        })
        

        const {notifications,messages}=userData;
        $('#messageNO').html(messages.length)
        console.log('messages:', messages)
        notifications.sort((a,b)=>new Date(b.time)-new Date(a.time))
        console.log(notifications)
        $('#notifications').html(notifications.length)
        notifications.sort((a,b)=>a.time-b.time).slice(0,3).forEach(notice=>{
            const {time,content,read}=notice;
            const con=document.createElement('div');
            con.setAttribute("class","dropdown-item d-flex align-items-center")
            const mr3=document.createElement('div');
            mr3.setAttribute('class','mr-3');
            const circle=document.createElement('div')
            if(/recieved/i.test(content)){
                circle.setAttribute("class", "icon-circle bg-warning ")

            }
            else if(/not\s+approved/i.test(content)){
                circle.setAttribute("class", "icon-circle bg-danger ")

            }

            else{
                circle.setAttribute("class", "icon-circle bg-success ")

            }
            const i=document.createElement('i')
            i.setAttribute('class',"fas fa-donate text-white")
            circle.appendChild(i)
            mr3.appendChild(circle)
            con.appendChild(mr3)
            const right=document.createElement('div');
            const dateCon= document.createElement('div')
            dateCon.setAttribute('class',"small text-gray-500")
            dateCon.innerHTML= new Date(time)
            const contentCon=document.createElement("span");
            contentCon.style.display="block"
            // contentCon.classList.add("text-truncate")
            contentCon.innerHTML=content;
            right.appendChild(dateCon)
            right.appendChild(contentCon)
            con.appendChild(right)
            document.getElementById("notifications-dropdown").appendChild(con)
        })
        messages.sort((a,b)=>a.time-b.time).slice(0,3).forEach(notice=>{
            const {time,content,read}=notice;
            const con=document.createElement('div');
            con.setAttribute("class","dropdown-item d-flex align-items-center")
            const mr3=document.createElement('div');
            mr3.setAttribute('class','mr-3');
            const circle=document.createElement('div')
            if(/recieved/i.test(content)){
                circle.setAttribute("class", "icon-circle bg-warning ")

            }
            else if(/not\s+approved/i.test(content)){
                circle.setAttribute("class", "icon-circle bg-danger ")

            }

            else{
                circle.setAttribute("class", "icon-circle bg-success ")

            }
            const i=document.createElement('i')
            i.setAttribute('class',"fas fa-donate text-white")
            circle.appendChild(i)
            mr3.appendChild(circle)
            con.appendChild(mr3)
            const right=document.createElement('div');
            const dateCon= document.createElement('div')
            dateCon.setAttribute('class',"small text-gray-500")
            dateCon.innerHTML= new Date(time)
            const contentCon=document.createElement("span");
            contentCon.style.display="block"
            // contentCon.classList.add("text-truncate")
            contentCon.innerHTML=content;
            right.appendChild(dateCon)
            right.appendChild(contentCon)
            con.appendChild(right)
            document.getElementById("messages").appendChild(con)
        })
    }
    fileUserDetails()

    const logout=()=>{
        const proceed=window.confirm('Are you sure you want to logout?')
       if(proceed){

           localStorage.removeItem("kointk")
           window.location.reload()
        }
    }
    const getPendingRequests=async()=>{
       const pending= await fetch(`http://localhost:5000/api/v3/investments/${localStorage.getItem('kointk')}/pending`)
        .then(res=>res.json())
        .then(data=>data)
        if(pending.success){
            $('#pending').html(pending.result.filter(x=>x.requestType==="withdrawal"&&x.status==="pending").length)
        }
    }
    getPendingRequests()