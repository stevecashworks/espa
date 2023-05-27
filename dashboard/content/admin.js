const tHead= document.querySelector(".user-head")
const tBody= document.querySelector(".user-body")
const ex=["_id","__v", "password","notifications","proof","createdAt","updatedAt"]
const elem= (el)=>document.createElement(el)
const getAllUsers=async()=>{
const  usersRes= await fetch('http://localhost:5000/api/v3/users/all')
const data= await usersRes.json()
if(data.success){
     const users=data.result
     

     
        Object.keys(users[0]).forEach(key=>{
            if(!ex.includes(key)){
                
            
                const th=elem('th')
                th.classList.add('p-3')
                th.innerHTML=key.toUpperCase();
                tHead.appendChild(th)
            }

        })
        const th=elem('th')
        th.textContent="ACTIONS"
        tHead.appendChild(th)
        users.forEach((user,index)=>{
            const tr= elem("tr")
            if(index%2===0){
                tr.classList.add("table-active")
            }
            Object.keys(user).forEach(key=>{
                if(!ex.includes(key)){
                    const td= elem("td")
                    td.innerHTML=user[key]
                    tr.appendChild(td)
                }
            })
            const td=elem("td")
            td.setAttribute("class", "flex")
             const inf= elem("button")
             const dng= elem("button")
             inf.setAttribute("class","ml-3 btn btn-outline-info")
             dng.setAttribute("class","ml-3 btn btn-outline-danger")
             inf.textContent="Edit"
             dng.textContent="Delete"
             td.appendChild(inf)
             td.appendChild(dng)
             tr.appendChild(td)
            tBody.appendChild(tr)
        })

     }

 
}
const getAllRequests=async()=>{
    const res=await fetch('http://localhost:5000/api/v3/investments/all')
    const dat= await res.json()
if(dat.success){
    const data=dat.result
    const rTbody=document.querySelector('.request-body')
    const rThead=document.querySelector('.request-head');
    let uniqueKeys= new Set()
for(let x  of data){
    for(y in x){
        uniqueKeys.add(y)
    }
}
 uniqueKeys=Array.from(uniqueKeys)
    for ( let key of uniqueKeys){
        if(!ex.includes(key)){
            
            const th= elem("th")
            th.innerHTML=key==="userId"?"User Name":key.toUpperCase();
            rThead.appendChild(th)

        }
}
const th=elem("th")
th.innerHTML="ACTIONS"
rThead.appendChild(th)

// iterate over the entire list
console.log(data)

console.log(new Date(data[0]["Date"]).toDateString())
 for(let request of data){
     const tr=elem('tr');
     for (let key of uniqueKeys){
        if(!ex.includes(key)){
            const td= elem('td')
            td.style={fontWeight:"bold",fontSize:'12px'}
            td.innerHTML=(key==="Date"?
            new Date(request[key]).toDateString().split(" ").join("/"):
            key==="userId"?request[key].firstName+" "+request[key].lastName:
            request[key]?request[key]:
            "Not provided! ")
            tr.appendChild(td)

        }
     } 
     const td=elem('td')
     const btn=elem("a")
     btn.setAttribute("class",'btn btn-outline-info btn-block')
     btn.setAttribute("href",`./request.html?id=${request._id}`)
     btn.innerHTML="Review"
     td.appendChild(btn)
     tr.appendChild(td)
     rTbody.appendChild(tr) 
 }


}

}
getAllUsers()
getAllRequests()