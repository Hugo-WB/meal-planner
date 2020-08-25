interface LocalData {

}
const initialState:LocalData = {

}

export default (state = initialState,action:any):LocalData =>{
  switch(action.type){
    default:
      return state
  }
}