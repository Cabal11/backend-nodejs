function verificarToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No autorizado",
    });
  }

  next();
}

export default verificarToken;
