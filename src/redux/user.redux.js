import axios from 'axios';
import {getRedirectPath} from '../util' //根据用户信息 跳转地址

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROT_MSG = 'ERROT_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const initState = {
    redirectTo: '',
    isAuth: '',
    name: '',
    pwd: '',
    type: '',
};


export function user(state = initState, action) {
    console.log(state, action);
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, redirectTo: getRedirectPath(action.payload), msg: '', isAuth: true, ...action.payload};
        case LOGIN_SUCCESS:
            return {...state, redirectTo: getRedirectPath(action.payload), msg: '', isAuth: true, ...action.payload};
        case LOAD_DATA:
            return {...state, isAuth: true, ...action.payload};
        case ERROT_MSG:
            return {...state, isAuth: false, msg: action.msg};
        default:
            return state
    }

}


function errorMsg(msg) {
    return {msg, type: ERROT_MSG}
}

function registerSuccess(data) {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}

function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

/**/
export function loadData(userinfo) {
    console.log(loadData)
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
                    dispatch(loginSuccess(res.data.data))
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
                    dispatch(registerSuccess({name, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}