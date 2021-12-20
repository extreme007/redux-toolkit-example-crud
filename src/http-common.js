import axios from "axios";

export default axios.create({
    baseURL: "https://61c030ed33f24c001782318a.mockapi.io/",
    headers: {
        "Content-type": "application/json",
    },
});
