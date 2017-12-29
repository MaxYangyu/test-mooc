import axios from 'axios';
import {getRedirectPath} from '../util' //根据用户信息 跳转地址

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROT_MSG = 'ERROT_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';
const initState = {
    redirectTo: '',
    name: '',
    pwd: '',
    type: '',
};


export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload};
        case LOAD_DATA:
            return {...state, isAuth: true, ...action.payload};
        case ERROT_MSG:
            return {...state, isAuth: false, msg: action.msg};
        case LOGOUT:
            return {...initState, redirectTo: '/login'};
        default:
            return state
    }

}

function authSuccess(data) {
    return {
        type: AUTH_SUCCESS,
        payload: data
    }
}

function errorMsg(msg) {
    return {msg, type: ERROT_MSG}
}

/*检查 有登录的返回信息*/
export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}

/*登录*/
export function login({name, pwd}) {
    if (!name || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', {name, pwd})
            .then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

/*注册*/
export function regisger({name, pwd, repeatpwd, type}) {
    if (!name || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {
        axios.post('/user/register', {name, pwd, type})
            .then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess({name, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}


/*bossinfo的信息*/
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}

/*注销*/
export function logoutSubmit() {
    return {type: LOGOUT}
}