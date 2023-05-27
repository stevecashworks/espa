const con=document.querySelector(".carousel")

const elem=(el,className="")=>{
const element= document.createElement(el);
element.setAttribute("class",className)
return element
}
let count=1;
console.log(con)
const Data=[
    {
    img:"./assets/mountains.jpg",
     text:"We follow principles rooted in technology, and data science as much as those found in financial services. Fields like machine learning and distributed computing guide us"},
     {
        img:"./assets/diamond.jpg",
        text:"We believe ESPA finance can contribute meaningfully towards a society in which quality investmentsunderpin better outcomes across many different dimensions including stronger communities, happier families, broader equality and inclusivity, better health and greater prosperity  "
     }
    

]
Data.forEach((data)=>{
    const carouselItem= elem("div","intro")
   //  const standingMan=elem("img","standing-man")
   //  standingMan.setAttribute('loading','lazy')
   //  standingMan.setAttribute("src",faces[index])
    const divi=elem("div","divi")
    carouselItem.style.backgroundImage=`url(${data.img})`
    carouselItem.style.flexDirection="row-reverse"
    const title=elem("p")
    title.innerHTML="Here at ESPA ...."
    const ab= elem("p","ab")
    ab.innerHTML=data.text;
    const btn=elem("button","btn")
    btn.innerHTML="Get Started";
    divi.appendChild(title)
    divi.appendChild(ab)
    divi.appendChild(btn)
   //  carouselItem.appendChild(standingMan)
    carouselItem.appendChild(divi)
    con.appendChild(carouselItem)
})
const carouselItems= document.querySelectorAll('.intro')

console.log(document.querySelectorAll(".ab"))
carouselItems[0].classList.add('active')
setInterval(()=>{
 if(count===carouselItems.length-1){
    count=0;
    carouselItems.forEach(item=>item.classList.remove("active"))
    carouselItems[count].classList.add('active')

 }else{
    count+=1;
    carouselItems.forEach(item=>item.classList.remove("active"))
    carouselItems[count].classList.add('active')


 }
},5000)
