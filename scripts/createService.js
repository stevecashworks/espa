const container=document.querySelector('.all-services')
const createServiceUI=({name,description,image})=>{
    const serviceDiv=document.createElement('div')
    const serviceImage=document.createElement('img')
    const serviceTitle=document.createElement('p')
    const serviceGroup=document.createElement('div')
    serviceGroup.setAttribute('class','service-group')
    serviceTitle.setAttribute('class','service-title')
    serviceTitle.innerHTML=name

    const descriptionDiv=document.createElement('div')
    descriptionDiv.setAttribute('class','service-div')
    //the outer Div that takes all description paragraphs
    description.forEach(des=>{
        const desc=document.createElement('div');
        desc.setAttribute('class','desc')
        desc.textContent=des;
        descriptionDiv.appendChild(desc)
    })
    serviceImage.setAttribute('src',image)
    serviceDiv.setAttribute("class",'service')
    serviceGroup.appendChild(serviceImage);
    serviceGroup.appendChild(descriptionDiv);
    serviceDiv.appendChild(serviceTitle)
    serviceDiv.appendChild(serviceGroup)
    container.appendChild(serviceDiv)
}
export default createServiceUI