// EWC stands for element with class lol..
const path= localStorage.getItem('kointk')?"./dashboard/content/invest.html":"./register/register.html"
const EWC=(el,className,text)=>{
    const newElem=document.createElement(el)
    newElem.setAttribute("class", className)
    newElem.innerHTML=text||'';
    
    return newElem   
    
}

export const createPackageUi=(obj,key)=>{
    const packagesCon= document.querySelector('.packages') 
    const packageCon=EWC('div',"package");
    const packageTitle=EWC('p','package-title',key+" plan")
    const  minCon=EWC('div',"minCon")
    const min=EWC('p',"min","Minimum:")
    const MinVal=EWC("p", "minVal",obj[key]["min"])
    minCon.appendChild(min)
    minCon.appendChild(MinVal)
 // max
 const  maxCon=EWC('div',"minCon")
 const max=EWC('p',"min","Maximum:")
 const MaxVal=EWC("p", "minVal",obj[key]["max"])
 maxCon.appendChild(max)
 maxCon.appendChild(MaxVal)

 const  durationCon=EWC('div',"minCon")
 const duration=EWC('p',"min","Duration :")
 const durationVal=EWC("p", "minVal",obj[key]["durationHrs"]+"hrs")
 durationCon.appendChild(duration)
 durationCon.appendChild(durationVal)

 const  ROICon=EWC('div',"minCon")
 const ROI=EWC('p',"min","Expected returns:")
 const ROIVal=EWC("p", "minVal",obj[key]["percentage"]+"%")
 ROICon.appendChild(ROI)
 ROICon.appendChild(ROIVal)



 packageCon.appendChild(packageTitle)
//  if(key==="starter"){
//   const p=EWC('p',"min once","One Time only")      
//   p.style.color="teal"
//   p.style.textAlign="center"
//   packageCon.appendChild(p)
  
//  }
 packageCon.appendChild(minCon) 
 packageCon.appendChild(maxCon) 
 packageCon.appendChild(durationCon) 
 packagesCon.appendChild(packageCon)
 packageCon.appendChild(ROICon)
 const btn=EWC('button',"investbtn","invest")
 btn.id=key
 btn.onclick=()=>{
    window.location.assign(`${path}?package=${key}`)
 }
 packageCon.appendChild(btn)


}
export default createPackageUi