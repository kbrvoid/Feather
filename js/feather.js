/*
* Feather V0.0.5 Alpha
* Copyright 2016, Kabir Shah
* http://kingpixil.github.io/Feather/
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

/*globals Node:true, NodeList:true*/
$ = (function (document, window, $) {
  var node = Node.prototype,
      nodeList = NodeList.prototype,
      forEach = 'forEach',
      trigger = 'trigger',
      each = [][forEach],
      thing = document.createElement('i');

  nodeList[forEach] = each;
  window.on = node.on = function (event, fn) {
    this.addEventListener(event, fn, false);
    return this;
  };

  nodeList.on = function (event, fn) {
    this[forEach](function (el) {
      el.on(event, fn);
    });
    return this;
  };

  window[trigger] = node[trigger] = function (type, data) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
  };

  nodeList[trigger] = function (event) {
    this[forEach](function (el) {
      el[trigger](event);
    });
    return this;
  };

  $ = function (s) {
    var r = document.querySelectorAll(s || '☺'),
        length = r.length;

    return length == 1 ? r[0] : r;
  };

  $.on = node.on.bind(thing);
  $[trigger] = node[trigger].bind(thing);

  return $;
})(document, this);
