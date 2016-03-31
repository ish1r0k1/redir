/**
 * Redir.js - directory redirector
 * @version v1.0.0
 * @author @ish1r0k1
 * @license MIT
 */
(function(window, document) {
  'use strict';

  var Redir = function() {
    this.Cookie = new Cookie;

    var ua = window.navigator.userAgent;

    this.isSp = /Android|iPhone|iPad/.test(ua);

    this.relativePath = true;

    this.setUrl();
    this.addListeners();

    if( this.toUrl ) {
      this.go();
    }
  };

  Redir.prototype.setUrl = function() {
    var domain = location.origin,
        path = location.pathname,
        query = location.search,
        hash = location.hash,
        ua = window.navigator.userAgent,
        reg = new RegExp(/\/sp\//i),
        url;

    if( this.Cookie.get('mode') !== 'pc' && this.isSp) {
      if( reg.test(path) ) return;

      url = this.relativePath ? './sp' : '/sp' + path;
      url += query + hash;
    } else if( reg.test(path) ) {
      path = path.replace(reg, '/');
      url = (path + query + hash).replace(/\/{2}/, '/');
    }

    this.toUrl = url || null;
  };

  Redir.prototype.addListeners = function() {
    window.addEventListener('DOMContentLoaded', this.initializeDoms.bind(this));
  };

  Redir.prototype.initializeDoms = function() {
    var elements = document.querySelectorAll('.js-redir');

    for( var i = 0, len = elements.length; i < len; i++ ) {
      var element = elements[i];

      if( this.isSp ) {
        element.addEventListener('click', this.changeMode.bind(this));
      } else {
        element.style.display = 'none';
      }
    }
  };

  Redir.prototype.changeMode = function() {
    var device = this.Cookie.get('mode') !== 'pc' ? 'pc' : 'sp';

    this.Cookie.set('mode', device, 1);

    this.setUrl();
    this.go();
  };

  Redir.prototype.go = function() {
    location.href = this.toUrl;
  };

  var Cookie = function() { };

  Cookie.prototype.get = function(name) {
    if( document.cookie.length > 0 ) {
      var start = document.cookie.indexOf(name + '='),
          end;

      if( start !== -1 ) {
        start = start + name.length + 1;
        end = document.cookie.indexOf(';', start);

        if( end === -1 ) {
          end = document.cookie.length;
        }

        return unescape(document.cookie.substring(start, end));
      }
    }
    return '';
  };

  Cookie.prototype.set = function(name, value, expireDays) {
    var exDate = new Date();
    exDate.setDate(exDate.getDate() + expireDays);
    return document.cookie = name + '=' + escape(value) + ((expireDays == null) ? '' : '; expires=' + exDate.toUTCString() + '; path=/; domain=' + window.location.host.toString());
  };

  Cookie.prototype.check = function(name) {
    name = this.get(name);

    if( name !== null && name !== '' ) {
      return true;
    } else {
      return false;
    }
  }

  Cookie.prototype.remove = function(name) {
    this.set(name, '', -1);
  };

  new Redir;
})(window, document);
