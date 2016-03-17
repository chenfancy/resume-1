!function() {
  var ua = window.navigator.userAgent,
      browser = {};

  if( ua.indexOf('Trident') > -1 ){
    browser.ie = true;
    browser.v = ua.indexOf('rv:11')>-1 ? 11 : +ua.replace(/^.+MSIE\s([0-9]+).+$/g, '$1');
  } else if( ua.indexOf('Chrome') > -1 ){
    browser.chrome = true;
    browser.v = +ua.replace(/^.+chrome\/([0-9]+).+$/gi, '$1');
  } else if( ua.indexOf('Firefox/') > -1 ){
    browser.ff = true;
    browser.v = +ua.replace(/^.+firefox\/([0-9]+).+$/gi, '$1');
  }

  if( ua.indexOf('Android') > -1 || ua.indexOf('iPad') > -1 || ua.indexOf('iPhone') > -1 ) browser.mobile = true;
  if( ua.indexOf('Macintosh') > -1 ) browser.mac = true;
  if( browser.ff || (browser.chrome && browser.v > 31) || browser.mac ) browser.support = true;
  if( browser.ie && browser.v < 9 ) browser.old_ie = true;

  window.browser = browser;
}()