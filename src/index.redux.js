const ADD = '加钱';
const REMOVE = '减钱';

/*reducer*/

export function counter(state = 10, active) {
    switch (active.type) {
        case ADD:
            return state + 1
        case REMOVE:
            return state - 1
        default:
            return 10
    }
}


/*action creator*/
export function add() {
    return {type: ADD}
}

export function remove() {
    return {type: REMOVE}
}
export function addAsync() {
    return dispatch =>{
        setTimeout(()=>{
            dispatch(add())
        },2000)
    }
}