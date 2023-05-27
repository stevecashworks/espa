const header= document.querySelector('header')
const services=document.querySelectorAll('.service')
window.addEventListener('scroll',()=>{
    if(window.scrollY>=700){
        
        header.classList.add('dark');
    }
    else{
        header.classList.remove('dark');
    }
})
const observer= new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
             entry.target.classList.add('visible')
        }else{
            entry.target.classList.remove('visible')
            
        }
    })
})
services.forEach(service=>{
    observer.observe(service)
})