import { FETCH_DATA_FAILURE_WELL, FETCH_DATA_REQUEST_WELL, FETCH_DATA_SUCCESS_WELL } from "../../actions/wellAction"


const initialState = {
    wells: [],
    isLoadingWells:false,
    errorWells:null
}


export const wellReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST_WELL:
            return {
                ...state,
                isLoadingWells: true,
                errorWells: null
            }

        case FETCH_DATA_SUCCESS_WELL:
            return {
                ...state,
                isLoadingWells: false,
                wells : action.payload
            }

        case FETCH_DATA_FAILURE_WELL:
            return {
                ...state,
                isLoadingWells: false,
                errorWells: action.payload
            }
                    
        default:
            return state;
       
    }
}