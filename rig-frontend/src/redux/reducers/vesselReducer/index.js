import { FETCH_DATA_FAILURE_VESSEL, FETCH_DATA_REQUEST_VESSEL, FETCH_DATA_SUCCESS_VESSEL } from "../../actions/vesselAction"

const initialState = {
    vessels: [],
    isLoadingVessels:false,
    errorVessels:null
}


export const vesselReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST_VESSEL:
            return {
                ...state,
                isLoadingVessels: true,
                errorVessels: null
            }

        case FETCH_DATA_SUCCESS_VESSEL:
            return {
                ...state,
                isLoadingVessels: false,
                vessels : action.payload
            }

        case FETCH_DATA_FAILURE_VESSEL:
            return {
                ...state,
                isLoadingVessels: false,
                errorVessels: action.payload
            }
                    
        default:
            return state;
       
    }
}