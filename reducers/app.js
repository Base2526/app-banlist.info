import { FETCH_DATA, CHECK_DATA, FETCH_ALL_DATA, TEST_DATA, CLEAR_DATA } from '../constants';

export const  mergeArrays = (...arrays) => {
  let jointArray = []

  arrays.forEach(array => {
      jointArray = [...jointArray, ...array]
  })
  const uniqueArray = jointArray.reduce((newArray, item) =>{
      let found = newArray.find(({ id }) => id === item.id);
      if (found){
          return newArray
      } else {
          return [...newArray, item]
      }
  }, [])
  return uniqueArray
}

const initialState = {
  data: [],
  tests: []
}

export const app = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:{
      return {
        ...state,
        data: mergeArrays(state.data, action.data)
      }
    }
      
    default:
      return state;
  }
}