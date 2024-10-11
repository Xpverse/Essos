import {FETCH_DATA_REQUEST_MATERIALREQUEST,FETCH_DATA_SUCCESS_MATERIALREQUEST,FETCH_DATA_FAILURE_MATERIALREQUEST, FETCH_CURRENT_MATERIALREQUEST, FETCH_SUCCESS_CURRENT_MATERIALREQUEST, FETCH_FAILURE_CURRENT_MATERIALREQUEST, FETCH_SUCCESS_CURRENT_MATERIALREQUESTITEMS, FETCH_CURRENT_MATERIALREQUESTITEMS, FETCH_FAILURE_CURRENT_MATERIALREQUESTITEMS} from "../../actions/materialRequestsAction"


const initialState = {
    materialRequests: [],
    isLoadingMaterialRequests:false,
    errorMaterialRequests:null,
    
    currentMaterialRequest:null,
    isLoadingCurrentMaterialRequest:false,
    errorCurrentMaterialRequest:null,

    currentMaterialRequestItems:[],
    isLoadingCurrentMaterialRequestItems:false,
    errorCurrentMaterialRequestItems:null,
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
        
        case FETCH_CURRENT_MATERIALREQUEST:
            return {
                ...state,
                isLoadingCurrentMaterialRequest: true,
                errorCurrentMaterialRequest: null
            }

        case FETCH_SUCCESS_CURRENT_MATERIALREQUEST:
            return {
                ...state,
                isLoadingCurrentMaterialRequest: false,
                currentMaterialRequest : action.payload
            }

        case FETCH_FAILURE_CURRENT_MATERIALREQUEST:
            return {
                ...state,
                isLoadingCurrentMaterialRequest: false,
                errorCurrentMaterialRequest : action.payload
            }
        
        case FETCH_CURRENT_MATERIALREQUESTITEMS:
            return {
                ...state,
                isLoadingCurrentMaterialRequestItems: true,
                errorCurrentMaterialRequestItems: null
            }
    
        case FETCH_SUCCESS_CURRENT_MATERIALREQUESTITEMS:
            return {
                ...state,
                isLoadingCurrentMaterialRequestItems: false,
                currentMaterialRequestItems : action.payload
                }
    
        case FETCH_FAILURE_CURRENT_MATERIALREQUESTITEMS:
            return {
                ...state,
                isLoadingCurrentMaterialRequestItems: false,
                errorCurrentMaterialRequestItems : action.payload
            }
   
            
        default:
            return state;
       
    }
}