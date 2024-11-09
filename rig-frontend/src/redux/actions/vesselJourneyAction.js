import axios from "axios"
export const FETCH_DATA_REQUEST_VESSELJOURNEY = "FETCH_DATA_REQUEST_VESSELJOURNEY"

export const FETCH_DATA_SUCCESS_VESSELJOURNEY = "FETCH_DATA_SUCCESS_VESSELJOURNEY"

export const FETCH_DATA_FAILURE_VESSELJOURNEY = "FETCH_DATA_FAILURE_VESSELJOURNEY"



export const fetchVesselJourneyDataRequest = () => ({
    type: FETCH_DATA_REQUEST_VESSELJOURNEY
})

export const fetchVesselJourneyDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS_VESSELJOURNEY,
    payload: data
})

export const fetchVesselJourneyDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE_VESSELJOURNEY,
    payload: error
})

export const fetchVesselJourneyRequestData = () => {
    return (dispatch) => {
        dispatch(fetchVesselJourneyDataRequest())
        console.log("Checkpoint 1")
        axios.get("http://localhost:8000/api/v1/vessel-journeys")
            .then(response => {
                const data = response.data
                console.log(data)
                dispatch(fetchVesselJourneyDataSuccess(data))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchVesselJourneyDataFailure(error))
            })
    }
}