import axios from "axios"
import { BASE_URL } from "../../constants"
export const FETCH_DATA_REQUEST_VESSELJOURNEY = "FETCH_DATA_REQUEST_VESSELJOURNEY"

export const FETCH_DATA_SUCCESS_VESSELJOURNEY = "FETCH_DATA_SUCCESS_VESSELJOURNEY"

export const FETCH_DATA_FAILURE_VESSELJOURNEY = "FETCH_DATA_FAILURE_VESSELJOURNEY"

export const POST_DATA_VESSELJOURNEY = "POST_DATA_VESSELJOURNEY"

export const POST_DATA_SUCCESS_VESSELJOURNEY = "POST_DATA_SUCCESS_VESSELJOURNEY"

export const POST_DATA_FAILURE_VESSELJOURNEY = "POST_DATA_FAILURE_VESSELJOURNEY"



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

export const postVesselJourney = () => ({
    type: POST_DATA_VESSELJOURNEY
})

export const postVesselJourneySuccess = (data) => ({
    type: POST_DATA_SUCCESS_VESSELJOURNEY,
    payload: data
})

export const postVesselJourneyFailure = (error) => ({
    type: POST_DATA_FAILURE_VESSELJOURNEY,
    payload: error
})

export const fetchVesselJourneyRequestData = () => {
    return (dispatch) => {
        dispatch(fetchVesselJourneyDataRequest())
        console.log("Checkpoint 1")
        axios.get(`${BASE_URL}/api/v1/vessel-journeys`)
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

export const postVesselJourneyFinalAction = (body) => {
    return (dispatch) => {
        dispatch(postVesselJourney())
        const createBody = {
            
        }
        
        axios.post(`${BASE_URL}/api/v1/vessel-journeys`,JSON.stringify(createBody),{
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(response => {
                const data = response.data
                console.log(data)
                
                dispatch(postVesselJourneySuccess())
            })
            .catch(error => {
                dispatch(postVesselJourneyFailure())
            })
    }
    
}