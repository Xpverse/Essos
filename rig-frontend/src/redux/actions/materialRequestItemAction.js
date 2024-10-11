// import axios from "axios"

// export const FETCH_DATA_REQUEST_MATERIALREQUESTITEM = "FETCH_DATA_REQUEST_MATERIALREQUESTITEM";

// export const FETCH_DATA_SUCCESS_MATERIALREQUESTITEM = "FETCH_DATA_SUCCESS_MATERIALREQUESTITEM";

// export const FETCH_DATA_FAILURE_MATERIALREQUESTITEM = "FETCH_DATA_FAILURE_MATERIALREQUESTITEM";

// export const fetchMaterialRequestItemDataRequest = () => ({
//     type: FETCH_DATA_REQUEST_MATERIALREQUESTITEM,
// });

// export const fetchMaterialRequestItemDataSuccess = (data) => ({
//     type: FETCH_DATA_SUCCESS_MATERIALREQUESTITEM,
//     payload: data,
// });

// export const fetchMaterialRequestItemDataFailure = (error) => ({
//     type: FETCH_DATA_FAILURE_MATERIALREQUESTITEM,
//     payload: error,
// });

// export const fetchMaterialRequestItemData = () => {
//     return (dispatch) => {
//         dispatch(fetchMaterialRequestItemDataRequest());
//         console.log("Fetching Material Request Item Data...");

//         axios.get("http://localhost:8000/api/v1/material-request-items/{}")
//             .then((response) => {
//                 const data = response.data;
//                 console.log("Material Request Item Data:", data);
//                 dispatch(fetchMaterialRequestItemDataSuccess(data));
//             })
//             .catch((error) => {
//                 console.error("Error fetching material request item data:", error);
//                 dispatch(fetchMaterialRequestItemDataFailure(error));
//             });
//     };
// };
