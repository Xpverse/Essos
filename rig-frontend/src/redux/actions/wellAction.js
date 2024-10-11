import axios from "axios"
export const FETCH_DATA_REQUEST_WELL = "FETCH_DATA_REQUEST_WELL"

export const FETCH_DATA_SUCCESS_WELL = "FETCH_DATA_SUCCESS_WELL"

export const FETCH_DATA_FAILURE_WELL = "FETCH_DATA_FAILURE_WELL"



export const fetchWellDataRequest = () => ({
    type: FETCH_DATA_REQUEST_WELL
})

export const fetchWellDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS_WELL,
    payload: data
})

export const fetchWellDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE_WELL,
    payload: error
})

export const fetchWellRequestData = () => {
    return (dispatch) => {
        dispatch(fetchWellDataRequest())
        console.log("Checkpoint 1")
        axios.get("http://localhost:8000/api/v1/wells")
            .then(response => {
                const data = response.data
                console.log(data)
                dispatch(fetchWellDataSuccess(data))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchWellDataFailure(error))
            })
    }
}