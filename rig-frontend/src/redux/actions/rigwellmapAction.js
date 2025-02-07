import axios from "axios"
import { BASE_URL } from "../../constants"
export const FETCH_DATA_REQUEST_RIG_WELL_MAP = "FETCH_DATA_REQUEST_RIG_WELL_MAP"

export const FETCH_DATA_SUCCESS_RIG_WELL_MAP = "FETCH_DATA_SUCCESS_RIG_WELL_MAP"

export const FETCH_DATA_FAILURE_RIG_WELL_MAP = "FETCH_DATA_FAILURE_RIG_WELL_MAP"



export const fetchRigWellMapDataRequest = () => ({
    type: FETCH_DATA_REQUEST_RIG_WELL_MAP
})

export const fetchRigWellMapDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS_RIG_WELL_MAP,
    payload: data
})

export const fetchRigWellMapDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE_RIG_WELL_MAP,
    payload: error
})

export const fetchRigWellMapRequestData = () =>  {
    return (dispatch) => {
        dispatch(fetchRigWellMapDataRequest())
        console.log("Checkpoint Rig Well Map")
        axios.get(`${BASE_URL}/api/v1/rigwellmaps`,{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          })
            .then(response => {
                const data = response.data
                console.log("******RIG WELL MAP DATA*****")
                console.log(data)
                dispatch(fetchRigWellMapDataSuccess(data))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchRigWellMapDataFailure(error))
            })
    }
}