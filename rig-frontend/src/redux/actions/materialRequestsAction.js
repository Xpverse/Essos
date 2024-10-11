import axios from "axios"
export const FETCH_DATA_REQUEST_MATERIALREQUEST = "FETCH_DATA_REQUEST_MATERIALREQUEST"

export const FETCH_DATA_SUCCESS_MATERIALREQUEST = "FETCH_DATA_SUCCESS_MATERIALREQUEST"

export const FETCH_DATA_FAILURE_MATERIALREQUEST = "FETCH_DATA_FAILURE_MATERIALREQUEST"

export const FETCH_CURRENT_MATERIALREQUEST = "FETCH_CURRENT_MATERIALREQUEST"

export const FETCH_SUCCESS_CURRENT_MATERIALREQUEST = "FETCH_SUCCESS_CURRENT_MATERIALREQUEST"

export const FETCH_FAILURE_CURRENT_MATERIALREQUEST = "FETCH_FAILURE_CURRENT_MATERIALREQUEST"

export const FETCH_CURRENT_MATERIALREQUESTITEMS = "FETCH_CURRENT_MATERIALREQUESTITEMS"

export const FETCH_SUCCESS_CURRENT_MATERIALREQUESTITEMS = "FETCH_SUCCESS_CURRENT_MATERIALREQUESTITEMS"

export const FETCH_FAILURE_CURRENT_MATERIALREQUESTITEMS = "FETCH_FAILURE_CURRENT_MATERIALREQUESTITEMS"

export const fetchMaterialRequestDataRequest = () => ({
    type: FETCH_DATA_REQUEST_MATERIALREQUEST
})

export const fetchMaterialRequestDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS_MATERIALREQUEST,
    payload: data
})

export const fetchMaterialRequestDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE_MATERIALREQUEST,
    payload: error
})

export const fetchCurrentMaterialRequest = () => ({
    type: FETCH_CURRENT_MATERIALREQUEST
})

export const fetchCurrentMaterialRequestSuccess = (data) => ({
    type: FETCH_SUCCESS_CURRENT_MATERIALREQUEST,
    payload: data
})

export const fetchCurrentMaterialRequestFailure = (error) => ({
    type: FETCH_FAILURE_CURRENT_MATERIALREQUEST,
    payload: error
})

export const fetchCurrentMaterialRequestItems = () => ({
    type: FETCH_CURRENT_MATERIALREQUESTITEMS
})

export const fetchCurrentMaterialRequestItemsSuccess = (data) => ({
    type: FETCH_SUCCESS_CURRENT_MATERIALREQUESTITEMS,
    payload: data
})

export const fetchCurrentMaterialRequestItemsFailure = (error) => ({
    type: FETCH_FAILURE_CURRENT_MATERIALREQUESTITEMS,
    payload: error
})



export const fetchMaterialRequestData = () => {
    return (dispatch) => {
        dispatch(fetchMaterialRequestDataRequest())
        console.log("Checkpoint 1")
        axios.get("http://localhost:8000/api/v1/material-requests")
            .then(response => {
                const data = response.data
                console.log(data)
                dispatch(fetchMaterialRequestDataSuccess(data))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchMaterialRequestDataFailure(error))
            })
    }
}

export const fetchCurrentMaterialRequestFinalAction = (id) => {
    return (dispatch) => {
        dispatch(fetchCurrentMaterialRequest())
        console.log("Checkpoint 1")
        axios.get(`http://localhost:8000/api/v1/material-requests/${id}`)
            .then(response => {
                const data = response.data
                console.log(data)
                dispatch(fetchCurrentMaterialRequestSuccess(data))
                dispatch(fetchCurrentMaterialRequestItemsFinalAction(id))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchCurrentMaterialRequestFailure(error))
            })
    }
    
}

export const fetchCurrentMaterialRequestItemsFinalAction = (id) => {
    return (dispatch) => {
        dispatch(fetchCurrentMaterialRequestItems())
        console.log("Checkpoint 1")
        axios.get(`http://localhost:8000/api/v1/material-request-items/forMaterialRequest/${id}`)
            .then(response => {
                const data = response.data
                console.log(data)
                dispatch(fetchCurrentMaterialRequestItemsSuccess(data))

            })
            .catch(error => {
                console.log(error)
                dispatch(fetchCurrentMaterialRequestItemsFailure(error))
            })
    }
    
}


