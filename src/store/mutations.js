import {
  SAVE_TOKEN,
  REQUEST_ERROR,
  SAVE_IMINFO,
  SAVE_ROOMID,
  SAVE_USERINFOR ,
  SAVE_NOWUSERID,
} from './mutation-types.js'

import {setStore} from '../config/mUtils'

import {localapi, proapi} from 'src/config/env'

export default {
  [SAVE_TOKEN](state,token) {
    state.token=token;
    setStore('token', state.token);
  },
  [REQUEST_ERROR](state,code){
    state.errorCode=code;
  },
  [SAVE_IMINFO](state,imInfo){
    setStore('tim_uid',imInfo.tim_uid);
    setStore('tim_sig',imInfo.tim_sig);
    setStore('uid',imInfo.id);
  },
  [SAVE_ROOMID](state,roomId){
    state.roomId=roomId;
  },
  [SAVE_USERINFOR](state,userInfo){
    state.userInfo=userInfo;
  },
  [SAVE_NOWUSERID](state,nowUserId){
    state.nowUserId=nowUserId;
  }
}
