function makeError(message, status){
    let err = message instanceof Error ? message : new Error(message);
    err.status = status;
    return err;
}

function error404(req, res, next){
    let err = makeError('Not Found', 404);
    return next(err);
}

function handleRouteErrors(error,req,res,next){
    if (error.stack) console.error(error.stack);
    res.status(error.status || 500).redirect('/404');
}

function handleRouteErrorsAPI(error, req, res, next){
    if (error.stack) console.error(error.stack);
    res.status(error.status || 500).json({error: error.message});
}


module.exports = {
    makeError,
    error404,
    handleRouteErrors,
    handleRouteErrorsAPI
}