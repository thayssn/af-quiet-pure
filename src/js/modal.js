var modal = document.querySelector('.modal');
var modal_title = modal.querySelector('.modal__title');
var modal_form = modal.querySelector('form');
var modal_close = modal.querySelector('.modal__close');
var modal_row = modal.querySelector('.row');

modal_form.addEventListener('submit', function(e){
  e.preventDefault();
  var obg = document.createElement('h3');
  obg.textContent = 'Obrigado!';
  obg.style.margin = '0 auto';
  modal_row.innerHTML = '';
  modal_row.appendChild(obg);
  return false;
})

modal_close.addEventListener('click', function(){
  modal.classList.add('hidden');
})
