import {FETCH_DATA_REQUEST_MATERIALREQUEST,FETCH_DATA_SUCCESS_MATERIALREQUEST,FETCH_DATA_FAILURE_MATERIALREQUEST} from "../actions/materialRequestsAction"


const initialState = {
    materialRequests: [],
    isLoadingMaterialRequests:false,
    errorMaterialRequests:null
}


export const thunkReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST_MATERIALREQUEST:
            return {
                ...state,
                isLoadingMaterialRequests: true,
                errorMaterialRequests: null
            }

        case FETCH_DATA_SUCCESS_MATERIALREQUEST:
            return {
                ...state,
                isLoadingMaterialRequests: false,
                materialRequests : action.payload
            }

        case FETCH_DATA_FAILURE_MATERIALREQUEST:
            return {
                ...state,
                isLoadingMaterialRequests: false,
                errorMaterialRequests: action.payload
            }
                    
        default:
            return state;
       
    }
}