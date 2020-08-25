interface LocalData {
  currentPage:string,

}
const initialState:LocalData = {
  currentPage:"Dashboard"
}

export default (state = initialState,action:any):LocalData =>{
  switch(action.type){
    default:
      return state
  }
}