;
document.addEventListener("DOMContentLoaded", function() {

  console.log("Загрузился документ");
  /* Записываем в переменные массив элементов-кнопок и подложку.
        Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  var modalButton = document.querySelectorAll('.js-modal-open'),
    overlay = document.querySelector('#overlay-modal'),
    closeButton = document.querySelectorAll('.js-modal-close');

  // Перебираем кнопки и вешаем обработчик
  modalButton.forEach(function(item) {
    item.addEventListener('click', function(event) {
      /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
      event.preventDefault();
      var modalElem = document.querySelector('.modal');
      /* Добавим классы
   подложке и окну чтобы показать их. */
      modalElem.classList.add('active');
      overlay.classList.add('active');
    });
  });
  closeButton.forEach(function(item) {
    item.addEventListener('click', function(event) {
      var parentModal = this.closest('.modal');
      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  // Закрытие модального окна по кнопек esc
  document.body.addEventListener('keyup', function(event) {
    var key = event.keyCode;
    if (key == 27) {
      document.querySelector('.modal.active').classList.remove('active');
      document.querySelector('.overlay.active').classList.remove('active');
    };
  }, false);


  // Закрытие модального окна по клику вне модального окна
  overlay.addEventListener('click', function() {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
  });

});