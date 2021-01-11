const initialState = {
  data: {},
  isLoggedIn: false,
  // isLoggedOut: false,
  count:10
};

const loginReducer = (state = initialState, action) => {
  console.log("inside reducer",action, state);
  switch (action.type) {
    case "LOG_IN" : 
      console.log("inside LOG_IN before return",state);
      return{
        ...state,
        isLoggedIn: true,
        count: state.count + 1
      }
    
    case "LOG_OUT" : 
      console.log("LOG_OUT",state);
      return{
        ...state,
        count: state.count - 1,
        isLoggedIn: false
      }

    default:
      return state;
  }
};

export default loginReducer