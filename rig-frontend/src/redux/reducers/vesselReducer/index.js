import { FETCH_DATA_FAILURE_VESSEL, FETCH_DATA_REQUEST_VESSEL, FETCH_DATA_SUCCESS_VESSEL ,FETCH_CURRENT_VESSEL,FETCH_SUCCESS_CURRENT_VESSEL,FETCH_FAILURE_CURRENT_VESSEL} from "../../actions/vesselAction"

const initialState = {
    vessels: [],
    isLoadingVessels:false,
    errorVessels:null,

    currentVessel:null,
    isLoadingCurrentVessel:false,
    errorCurrentVessel:null,
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

            case FETCH_CURRENT_VESSEL:
                return {
                    ...state,
                    isLoadingCurrentVessel: true,
                    errorCurrentVessel: null
                }
    
            case FETCH_SUCCESS_CURRENT_VESSEL:
                return {
                    ...state,
                    isLoadingCurrentVessel: false,
                    currentVessel : action.payload
                }
    
            case FETCH_FAILURE_CURRENT_VESSEL:
                return {
                    ...state,
                    isLoadingCurrentVessel: false,
                    errorCurrentVessel : action.payload
                }
                    
        default:
            return state;
       
    }
}