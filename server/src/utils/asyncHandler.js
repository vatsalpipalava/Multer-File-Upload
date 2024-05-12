// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) =>
//             next(err)
//         );
//     };
// };

// const asyncHandler = (requestHandler) => {
//     return async (req, res, next) => {
//         try {
//             await requestHandler(req, res, next);
//         } catch (err) {
//             next(err);
//         }
//     };
// };

const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next);
    } catch (error) {
        // Ensure status code is set to 500 if it's not defined
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message,
        });
    }
};

export { asyncHandler };
