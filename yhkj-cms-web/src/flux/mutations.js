import {getPermission} from "./mutation-types";

export default {
  //权限存入vuex
  [getPermission](state,permission){
    state.permission = permission
  },
}
