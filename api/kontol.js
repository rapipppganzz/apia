export default function handler(req, res) {
  return res.status(200).json({
    status: "API HIDUP 🔥",
    method: req.method
  });
}
