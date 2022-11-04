

const bcrypt = require('bcrypt');

export const hasPass = async(unHashPass:string) =>{


    const hash = await bcrypt.hash(unHashPass,10)
     if(hash) return hash

     return false;

}


export const isSamePass = async(unHassPass: string, hashPass:string) => {

let result = await bcrypt.compare(unHassPass,hashPass)
if (result) return result

return false

}