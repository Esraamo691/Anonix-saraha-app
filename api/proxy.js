// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const response = await axios.post(
//       "http://sarahne.eu-4.evennode.com/auth/register",
//       req.body,
//       {
//         headers: { "Content-Type": "application/json" },
//       },
//     );

//     res.status(response.status).json(response.data);
//   } catch (error) {
//     res
//       .status(error.response?.status || 500)
//       .json(error.response?.data || { error: error.message });
//   }
// }
export default async function handler(req, res) {
  const { path } = req.query;

  const backendUrl = `http://sarahne.eu-4.evennode.com/${path}`;

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error" });
  }
}
