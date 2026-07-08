/**
 * Wraps async route handlers and forwards errors
 * to the Express error handling middleware.
 */

const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;