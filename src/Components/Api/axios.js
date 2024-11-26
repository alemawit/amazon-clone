import axios from "axios";

const axiosInstance = axios.create({
  //local instance of firebase functions
  //   baseURL: "http://127.0.0.1:5001/clone-3ed40/us-central1/api",
  //deployed version of amazon server on render.com
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://amazon-api-deploy-2g2k.onrender.com"
      : "http://127.0.0.1:5001/clone-3ed40/us-central1/api",
});
export {axiosInstance}