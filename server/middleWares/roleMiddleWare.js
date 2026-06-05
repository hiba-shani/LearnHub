<<<<<<< HEAD
const roleMiddleWare=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Access Denied"})
        }
        next();


    }
}

=======
const roleMiddleWare=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Access Denied"})
        }
        next();


    }
}

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
module.exports=roleMiddleWare;