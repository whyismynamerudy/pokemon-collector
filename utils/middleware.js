const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: "invalid token"
        });
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: "token expired"
        });
    }

    next(error);
};

module.exports = {
    errorHandler
}