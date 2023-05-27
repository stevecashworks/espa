import packages from "./packages.js"
import createPackageUi from './createPackageUi.js'
const titles=['starter',"standard","premium","exclusive","ultimate","corporate"]
console.log(packages)
export const createPackages=()=>{

    titles.forEach(title=>{
        const thisPackage=packages[title]
        createPackageUi(packages,title)
    })
}

