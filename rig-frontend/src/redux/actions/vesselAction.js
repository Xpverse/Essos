import axios from "axios"
export const FETCH_DATA_REQUEST_VESSEL = "FETCH_DATA_REQUEST_VESSEL"

export const FETCH_DATA_SUCCESS_VESSEL = "FETCH_DATA_SUCCESS_VESSEL"

export const FETCH_DATA_FAILURE_VESSEL = "FETCH_DATA_FAILURE_VESSEL"



export const fetchVesselDataRequest = () => ({
    type: FETCH_DATA_REQUEST_VESSEL
})

export const fetchVesselDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS_VESSEL,
    payload: data
})

export const fetchVesselDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE_VESSEL,
    payload: error
})

export const fetchVesselRequestData = () => {
    return (dispatch) => {
        dispatch(fetchVesselDataRequest())
        console.log("Checkpoint 1")
        axios.get("http://localhost:8000/api/v1/vessels")
            .then(response => {
                const data = response.data
                console.log(data)
                dispatch(fetchVesselDataSuccess(data))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchVesselDataFailure(error))
            })
    }
}