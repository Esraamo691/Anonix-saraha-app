// import axios from "axios";

// export default async function handler(req, res) {
//   const url = `http://sarahne.eu-4.evennode.com${req.url.replace("/api", "")}`;

//   try {
//     const response = await axios({
//       method: req.method,
//       url,
//       data: req.body,
//     });
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     res
//       .status(error.response?.status || 500)
//       .json(error.response?.data || { error: "Server error" });
//   }
// }
import axios from "axios";

export default async function handler(req, res) {
  const path = req.query.path.join("/");
  const url = `http://sarahne.eu-4.evennode.com/${path}`;

  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Server error" });
  }
}
