export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(error, req, res, next) {
  console.error("Server error:", error);

  const statusCode = error.statusCode || 500;

  let message =
    statusCode === 500
      ? "Something went wrong while processing your request."
      : error.message;

  if (
    error.status === 429 ||
    error.statusCode === 429 ||
    error.message?.includes("RESOURCE_EXHAUSTED")
  ) {
    message =
      "The AI assistant is receiving too many requests. Please try again shortly.";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}