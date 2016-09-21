// takeover console
/*
(function() {
  var console = window.console;
  if (!console) return;
  function intercept(method) {
    var original = console[method];
    console[method] = function() {

      // do sneaky stuff
      if (original.apply) {
        // Do this for normal browsers
        original.apply(console, arguments);
      }
      else {
        // Do this for IE
        var message = Array.prototype.slice.apply(arguments).join(' ');
        original(message);
      }
    }
  }

  var methods = ['log', 'warn', 'error'];
  for (var i = 0; i < methods.length; i++) intercept(methods[i]);
})();
*/

var fn_docs = (function() {
  return {
    _data: {},
    _jos: {}, // jquery objects 저장소
    menu: {
      print: function(menus) {

        var currentPath = (function() {
          var pathname = location.pathname;
          //console.log(pathname, pathname.indexOf('/demo'));
          pathname = pathname.substr(pathname.indexOf('/demo'));
          //console.log(pathname);
          var paths = pathname.split(/\//g);
          paths.shift();
          paths.pop();
          return paths.join('/').split('/').length;
        })();

        var getUrl = function(url) {
          var diff_depth = 3 - (url.split(/\//g).length - currentPath);
          var pre_url = [];
          for (var i = 0; i < diff_depth; i++) pre_url.push("../");
          return pre_url.join("") + url;
        };

        var po = [];
        po.push('<div class="docs-menu-group-container">');
        for (var i = 0, l = menus.length, menu; i < l; i++) {
          menu = menus[i];
          po.push('<ul class="docs-menu-group">');
          po.push('<li class="docs-menu-group-title">');
          if (menu.url) {
            po.push('<a href="' + getUrl(menu.url) + '">' + menu.title + '</a>');
          }
          else {
            po.push(menu.title);
          }
          po.push('</li>');

          if (menu.child && menu.child.length > 0) {
            po.push('<ul class="docs-menu-group-child">');

            menu.child.forEach(function(c) {
              //console.log(currentPath, c.url);
              po.push('<li><a href="' + getUrl(c.url) + '">' + c.title + '</a></li>');
            });
            po.push('</ul>');
          }
          po.push('</ul>');
        }
        po.push('</div>');
        fn_docs._jos["menu-target"].html(po.join(''));
      }
    }
  }
})();

$(document.body).ready(function() {
  if (window.fn_docs) {
    fn_docs._jos["menu-target"] = $("#docs-menu-print-target");
    fn_docs.menu.print(window.doc_menu_object || []);
  }

  //prettyPrint();
});