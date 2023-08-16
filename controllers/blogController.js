const fs = require("fs");

exports.post = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];

  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);

  res.json({ ext });
};
