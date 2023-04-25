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

export async function getAUserActivity(id) {
  let response = await axios.get(`http://localhost:5000/activities/user/643e93e228fe348dc275fe37`)
  if(!response.status == 200){
    throw {
      message: "Failed to fetch Activity", 
      statusText: response.statusText,
      status: response.status
  }
  }

  let data = await response.data
 
  return data
}

export async function getAUserAid(id) {
  let response = await axios.get(`http://localhost:5000/aids/user/643e93e228fe348dc275fe37`)
  if(!response.status == 200){
    throw {
      message: "Failed to fetch Aid", 
      statusText: response.statusText,
      status: response.status
  }
  }

  let data = await response.data
 
  return data
}

export async function getAUserEssay(id) {
  let response = await axios.get(`http://localhost:5000/essays/user/643e93e228fe348dc275fe37`)
  if(!response.status == 200){
    throw {
      message: "Failed to fetch Essay", 
      statusText: response.statusText,
      status: response.status
  }
  }

  let data = await response.data
 
  return data
}

export async function getAUserRecommendation(id) {
  let response = await axios.get(`http://localhost:5000/recommendations/user/643e93e228fe348dc275fe37`)
  if(!response.status == 200){
    throw {
      message: "Failed to fetch Recommendation", 
      statusText: response.statusText,
      status: response.status
  }
  }

  let data = await response.data
 
  return data
}

