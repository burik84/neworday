!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),c=0;o[c]&&o[c]!==t;)++c;return Boolean(o[c])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype),document.addEventListener("DOMContentLoaded",function(){console.log("Загрузился документ");var e=document.querySelectorAll(".js-modal-open"),t=document.querySelector("#overlay-modal"),o=document.querySelectorAll(".js-modal-close");e.forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),document.querySelector(".modal").classList.add("active"),t.classList.add("active")})}),o.forEach(function(e){e.addEventListener("click",function(e){this.closest(".modal").classList.remove("active"),t.classList.remove("active")})}),document.body.addEventListener("keyup",function(e){27==e.keyCode&&(document.querySelector(".modal.active").classList.remove("active"),document.querySelector(".overlay.active").classList.remove("active"))},!1),t.addEventListener("click",function(){document.querySelector(".modal.active").classList.remove("active"),this.classList.remove("active")})});
//# sourceMappingURL=script.js.map