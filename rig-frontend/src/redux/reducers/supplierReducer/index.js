import { FETCH_DATA_FAILURE_SUPPLIER, FETCH_DATA_REQUEST_SUPPLIER, FETCH_DATA_SUCCESS_SUPPLIER } from "../../actions/supplierAction"



const initialState = {
    suppliers: [],
    isLoadingSuppliers:false,
    errorSuppliers:null
}


export const supplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST_SUPPLIER:
            return {
                ...state,
                isLoadingSuppliers: true,
                errorSuppliers: null
            }

        case FETCH_DATA_SUCCESS_SUPPLIER:
            return {
                ...state,
                isLoadingSuppliers: false,
                suppliers : action.payload
            }

        case FETCH_DATA_FAILURE_SUPPLIER:
            return {
                ...state,
                isLoadingSuppliers: false,
                errorSuppliers: action.payload
            }
                    
        default:
            return state;
       
    }
}