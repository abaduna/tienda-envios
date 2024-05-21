import { fromProductAction } from "../action/formProdcut";
const initialState = {
  title: "",
  descripction: "",
  precio: 0,
  stck: 0,
  weight: 0,
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case fromProductAction.SET_DATA:
      return {
        title: action.payload.title,
        descripction: action.payload.descripction,
        precio: action.payload.precio,
        stck: action.payload.stck,
        weight: action.payload.weight,
      };
    case fromProductAction.SET_TITLE:
        return{
            title: action.payload,
        }
    default:
      return state;
  }
};
