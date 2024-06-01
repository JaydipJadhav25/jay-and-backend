//1.using promises
const asynchandler = (reqhandler) => { (req , res, next) =>{
 
return Promise.resolve(reqhandler(req , res , next)).catch((err) => next(err))

}}





export {asynchandler}



//2.asynchandler using try ctach ........


// const asynchandler = (fn) => async(req , res , next) => {

//     try {
//         await(req , res , next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success :false , 
//             message : err.message
//         })
        
//     }

// }
