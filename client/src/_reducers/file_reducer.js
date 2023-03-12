export default function (state = {}, action) {
    return {...state, uploadSuccess: action.payload};
}