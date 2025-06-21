"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: {
                name: err.name,
                errors: err.errors,
            },
        });
    }
    return res.status(500).json({
        message: err.message || 'Something went wrong',
        success: false,
        error: err,
    });
}
