import { FETCH_DATA_FAILURE_RIG, FETCH_DATA_REQUEST_RIG, FETCH_DATA_SUCCESS_RIG } from "../../actions/rigAction"


const initialState = {
    rigs: [],
    isLoadingRigs:false,
    errorRigs:null
}


export const rigReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST_RIG:
            return {
                ...state,
                isLoadingRigs: true,
                errorRigs: null
            }

        case FETCH_DATA_SUCCESS_RIG:
            return {
                ...state,
                isLoadingRigs: false,
                rigs : action.payload
            }

        case FETCH_DATA_FAILURE_RIG:
            return {
                ...state,
                isLoadingRigs: false,
                errorRigs: action.payload
            }
                    
        default:
            return state;
       
    }
}