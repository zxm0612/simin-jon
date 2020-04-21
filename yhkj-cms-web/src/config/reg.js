/**
 *正则库
 */

//判断手机号是否符合规范
export  function  isPoneAvailable(str) {
  var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

