import axios from "axios"
export const FETCH_DATA_REQUEST_RIG = "FETCH_DATA_REQUEST_RIG"

export const FETCH_DATA_SUCCESS_RIG = "FETCH_DATA_SUCCESS_RIG"

export const FETCH_DATA_FAILURE_RIG = "FETCH_DATA_FAILURE_RIG"



export const fetchRigDataRequest = () => ({
    type: FETCH_DATA_REQUEST_RIG
})

export const fetchRigDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS_RIG,
    payload: data
})

export const fetchRigDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE_RIG,
    payload: error
})

export const fetchRigRequestData = () => {
    return (dispatch) => {
        dispatch(fetchRigDataRequest())
        console.log("Checkpoint 1")
        axios.get("http://localhost:8000/api/v1/rigs")
            .then(response => {
                const data = response.data
                console.log(data)
                dispatch(fetchRigDataSuccess(data))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchRigDataFailure(error))
            })
    }
}