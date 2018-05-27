var modal = document.querySelector('.modal');
var modal_title = modal.querySelector('.modal__title');
var modal_form = modal.querySelector('form');
var modal_close = modal.querySelector('.modal__close');

modal_form.addEventListener('submit', function(e){
  e.preventDefault();
  modal_title.textContent = 'Obrigado!'
  modal_form.style.display = 'none';
  return false;
})

modal_close.addEventListener('click', function(){
  modal.classList.add('hidden');
})
