function getSSOParamsFromURL(route) {
  let token: any = route?.query?.token;
  let userName: any = route?.query?.userName;
  let merchantId = route?.query?.merchantId;
  let applicationCode = route?.query?.applicationCode;
  let lang = route?.query?.locale;
  // pass登錄后需要跳轉會原本系統，爲了兼容老token，價格標識
  let oauth = route?.query?.oauth;
  let userId = route?.query?.userId;

  const queryParamsFromRouteHash = getQueryParamsFromRouteHash(route);
  const getParamValFromHashParams = (key: string) => {
    const param = queryParamsFromRouteHash.find((item) => item[0] === key);
    if (param) return param[1];
    return;
  };
  if (!token) {
    token = getParamValFromHashParams('token');
  }
  if (!userName) {
    userName = getParamValFromHashParams('userName');
  }
  if (!merchantId) {
    merchantId = getParamValFromHashParams('merchantId');
  }
  if (!applicationCode) {
    applicationCode = getParamValFromHashParams('applicationCode');
  }
  if (!oauth) {
    // 标识，pass redirect重定向回来后需要区分是以前的application互相跳转，还是oauth的登录redirect
    oauth = getParamValFromHashParams('oauth');
  }

  return {
    token,
    oauth,
    userName,
    merchantId,
    applicationCode,
    lang,
    userId,
  };
}

function getQueryParamsFromRouteHash(route) {
  let hashStr = route?.hash || '?';
  hashStr = hashStr.slice(hashStr.indexOf('?') + 1, hashStr.length);
  return hashStr.split('&').map((str) => {
    return str.split('=');
  });
}
