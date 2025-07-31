export default function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: err.message || "Erro interno do servidor.",
    ...(err.errors && { details: err.errors }),
  });
}
