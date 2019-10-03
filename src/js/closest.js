// Библиотека создает функцию closest. Используя её мы можем искать элемент, который находится выше по дереву и класс которого совпадает с тем который мы ищем.

! function(e) {
  "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function(e) {
    for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;) ++n;
    return Boolean(o[n])
  }), "function" != typeof e.closest && (e.closest = function(e) {
    for (var t = this; t && 1 === t.nodeType;) {
      if (t.matches(e)) return t;
      t = t.parentNode
    }
    return null
  })
}(window.Element.prototype);