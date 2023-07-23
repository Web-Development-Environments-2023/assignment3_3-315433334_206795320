// useRecipes.js

import axios from 'axios' 

export default function useRecipes(){

  const addToFavorite = async (id) => {
    const url = '/users/favorites' 

    await axios.post(url, {
      params: {
        recipe_Id: id  
      }
    }, {
      withCredentials: true
    })

  }

  const isWatched = async (id) => {
    const url = '/users/isWatched'

    const response = await axios.get(url, {
      params: {
        recipe_Id: id
      } 
    }, {
      withCredentials: true 
    })

    return response.data
  }

  return {
    addToFavorite,
    isWatched
  }

}