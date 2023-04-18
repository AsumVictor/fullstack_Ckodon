//get specific review of a reviews
import axios from 'axios';


 export async function getASpecificReview(id) {
  let response = await axios.get(`http://localhost:5000/undergradeReviews/id/${id}`)
  if(!response.status == 200){
    throw {
      message: "Failed to fetch Review", 
      statusText: response.statusText,
      status: response.status
  }
  }

  let data = await response.data
 
  return data
}

export async function getAUserReview(id) {
  let response = await axios.get(`http://localhost:5000/undergradeReviews/user/${id}`)
  if(!response.status == 200){


    throw {
      message: "Failed to fetch Review", 
      statusText: response.statusText,
      status: response.status
  }
  }

  let data = await response.data
 
  return data
}


export async function getAUserHonor(id) {
  let response = await axios.get(`http://localhost:5000/honors/user/643e93e228fe348dc275fe37`)
  if(!response.status == 200){
    throw {
      message: "Failed to fetch Honor", 
      statusText: response.statusText,
      status: response.status
  }
  }

  let data = await response.data
 
  return data
}
