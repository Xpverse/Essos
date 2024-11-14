import { FETCH_DATA_FAILURE_RIG_WELL_MAP, FETCH_DATA_REQUEST_RIG_WELL_MAP, FETCH_DATA_SUCCESS_RIG_WELL_MAP } from "../../actions/rigwellmapAction"



const initialState = {
    rigWellMaps: [],
    isLoadingRigWellMaps:false,
    errorRigWellMaps:null
}


export const rigWellMapReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST_RIG_WELL_MAP:
            return {
                ...state,
                isLoadingRigWellMaps: true,
                errorRigWellMaps: null
            }

        case FETCH_DATA_SUCCESS_RIG_WELL_MAP:
            return {
                ...state,
                isLoadingRigWellMaps: false,
                rigWellMaps : action.payload
            }

        case FETCH_DATA_FAILURE_RIG_WELL_MAP:
            return {
                ...state,
                isLoadingRigWellMaps: false,
                errorRigWellMaps: action.payload
            }
                    
        default:
            return state;
       
    }
}