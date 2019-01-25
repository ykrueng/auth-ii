module.exports = (err, req, res, next) => {
  switch (err) {
    case 400:
      res.status(err).json({
        error: "You shall not pass!"
      });
      break;
    default:
      res.status(500).json({
        error: "Failed to login."
      });
      break;
  }
};
