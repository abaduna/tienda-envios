import { fetchUsers } from "./../action/tetchUsers.action";


export const initialState = {
    loading: true ,
    error: false,
    UserFound:false,
    data: {}
}
export const fechReducer = (state,action) =>{
    switch (action.type) {
        case fetchUsers.SET_ENCONTRADO:
            return{
                loading: false,
                error: false,
                UserFound:true,
                data: action.payload
            }

        case (fetchUsers.SET_ERROR):
            return {
                ...initialState,
                error: true,
                loading: false,
                data: action.payload
            }
        
        case (fetchUsers.SET_NO_ENCONTRADO):
            return {
                ...initialState,
                error: false,
                loading: false,
                UserFound:false,
                data: action.payload
            }
        default:
            return state 

    }
}