 import axios from 'axios';
 export const uploadVideo = async (object, formData) => {
  await axios.post("http://localhost:3977/api/v1//video/upluadVideoFiles", formData, {headers: {'Content-Type': 'application/json'}})
 }

