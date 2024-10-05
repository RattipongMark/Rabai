class createError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // Set status to 'fail' if status code starts with '4'

        Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
    }
}

module.exports = createError;
