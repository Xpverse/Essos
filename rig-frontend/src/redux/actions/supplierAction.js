import axios from "axios"
import { BASE_URL } from "../../constants"
export const FETCH_DATA_REQUEST_SUPPLIER = "FETCH_DATA_REQUEST_SUPPLIER"

export const FETCH_DATA_SUCCESS_SUPPLIER = "FETCH_DATA_SUCCESS_SUPPLIER"

export const FETCH_DATA_FAILURE_SUPPLIER = "FETCH_DATA_FAILURE_SUPPLIER"



export const fetchSupplierDataRequest = () => ({
    type: FETCH_DATA_REQUEST_SUPPLIER
})

export const fetchSupplierDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS_SUPPLIER,
    payload: data
})

export const fetchSupplierDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE_SUPPLIER,
    payload: error
})

export const fetchSupplierRequestData = () => {
    return (dispatch) => {
        dispatch(fetchSupplierDataRequest())
        console.log("Checkpoint 1")
        axios.get(`${BASE_URL}/api/v1/suppliers`,{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          })
            .then(response => {
                const data = response.data
                console.log(data)
                dispatch(fetchSupplierDataSuccess(data))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchSupplierDataFailure(error))
            })
    }
}