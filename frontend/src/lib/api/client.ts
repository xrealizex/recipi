import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"

const options = {
  ignoreHeaders: true
}

// export const client = applyCaseMiddleware(axios.create({
//   baseURL: process.env.REACT_APP_API_URL
// }), options)


export const client = applyCaseMiddleware(axios.create({
  baseURL: "https://recipe-choice.onrender.com/api/v1"
}), options)
