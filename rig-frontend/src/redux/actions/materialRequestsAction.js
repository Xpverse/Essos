import axios from "axios"
export const FETCH_DATA_REQUEST_MATERIALREQUEST = "FETCH_DATA_REQUEST_MATERIALREQUEST"

export const FETCH_DATA_SUCCESS_MATERIALREQUEST = "FETCH_DATA_SUCCESS_MATERIALREQUEST"

export const FETCH_DATA_FAILURE_MATERIALREQUEST = "FETCH_DATA_FAILURE_MATERIALREQUEST"



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