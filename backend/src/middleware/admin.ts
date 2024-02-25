import HttpStatusCodes from "http-status-codes";

export default  function(req, res, next) {
    let role= req.currentUser.role
    let isAdmin   = role.name == "ADMIN" ? true : false
    if (isAdmin)
      next();
    else
    res.status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "restricted for normal users" });
 
}
