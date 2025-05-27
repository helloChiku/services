

 const generateApiResponse=(err: boolean,data: any, message : string, stack:any)=>{

    return {
        err,
        data, 
        message,
        stack: process.env.NODE_ENV === 'development' ? stack : undefined
    }
}


export default {
    generateApiResponse

}