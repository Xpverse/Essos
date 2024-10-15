import axios from "axios"
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

export const fetchRIG_WELL_MAPRequestData = () =>  {
    return (dispatch) => {
        dispatch(fetchRigWellMapDataRequest())
        console.log("Checkpoint 1")
        axios.get("http://localhost:8000/api/v1/rigwellmaps")
            .then(response => {
                const data = response.data
                console.log(data)
                dispatch(fetchRigWellMapDataSuccess(data))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchRigWellMapDataFailure(error))
            })
    }
}