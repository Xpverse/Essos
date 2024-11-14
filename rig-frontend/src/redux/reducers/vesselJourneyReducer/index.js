import { FETCH_DATA_FAILURE_VESSELJOURNEY, FETCH_DATA_REQUEST_VESSELJOURNEY, FETCH_DATA_SUCCESS_VESSELJOURNEY } from "../../actions/vesselJourneyAction"


const initialState = {
    vesselJourneys: [],
    isLoadingVesselJourneys:false,
    errorVesselJouneys:null
}


export const vesselJourneyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST_VESSELJOURNEY:
            return {
                ...state,
                isLoadingVesselJourneys: true,
                errorVesselJouneys: null
            }

        case FETCH_DATA_SUCCESS_VESSELJOURNEY:
            return {
                ...state,
                isLoadingVesselJourneys: false,
                errorVesselJouneys : action.payload
            }

        case FETCH_DATA_FAILURE_VESSELJOURNEY:
            return {
                ...state,
                isLoadingVesselJourneys: false,
                errorVesselJouneys: action.payload
            }
                    
        default:
            return state;
       
    }
}