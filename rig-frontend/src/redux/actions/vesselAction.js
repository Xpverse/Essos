import axios from "axios"
import { BASE_URL } from "../../constants"
export const FETCH_DATA_REQUEST_VESSEL = "FETCH_DATA_REQUEST_VESSEL"

export const FETCH_DATA_SUCCESS_VESSEL = "FETCH_DATA_SUCCESS_VESSEL"

export const FETCH_DATA_FAILURE_VESSEL = "FETCH_DATA_FAILURE_VESSEL"

export const FETCH_CURRENT_VESSEL = "FETCH_CURRENT_VESSEL"

export const FETCH_SUCCESS_CURRENT_VESSEL = "FETCH_SUCCESS_CURRENT_VESSEL"

export const FETCH_FAILURE_CURRENT_VESSEL = "FETCH_FAILURE_CURRENT_VESSEL"



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

export const fetchCurrentVessel = () => ({
    type: FETCH_CURRENT_VESSEL
})

export const fetchCurrentVesselSuccess = (data) => ({
    type: FETCH_SUCCESS_CURRENT_VESSEL,
    payload: data
})

export const fetchCurrentVesselFailure = (error) => ({
    type: FETCH_FAILURE_CURRENT_VESSEL,
    payload: error
})

export const fetchVesselRequestData = () => {
    return (dispatch) => {
        dispatch(fetchVesselDataRequest())
        console.log("Checkpoint 1")
        axios.get(`${BASE_URL}/api/v1/vessels`,{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          })
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

export const fetchCurrentVesselFinalAction = (id) => {
    return (dispatch) => {
        dispatch(fetchCurrentVessel())
        console.log("Checkpoint 1")
        axios.get(`${BASE_URL}/api/v1/vessels/${id}`,{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          })
            .then(response => {
                const data = response.data
                console.log("Current vessel Data***",data)
                dispatch(fetchCurrentVesselSuccess(data))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchCurrentVesselFailure(error))
            })
    }
    
}