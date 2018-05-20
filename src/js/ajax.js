  var backURL = 'https://hotsite-dinamo.azurewebsites.net/';
  var chapters = document.querySelectorAll('.chapter__wrapper');
  var modal = document.querySelector('.modal')
  var layers = document.querySelectorAll('.modal__wrapper')

  function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url, true);
    xhr.setRequestHeader('Content-Type', config.contentType);
    xhr.onload = function () {
      if (xhr.status === 200) {
        if (config.success)
          config.success(xhr.responseText);
      }
      else {
        if (config.fail)
          config.fail(xhr.responseText);
      }
    };
    xhr.send(JSON.stringify(config.data));
  }

  function getChapters() {
    ajax({
      url: backURL + 'api/v1/chapters',
      method: 'GET',
      contentType: 'application/json',
      success: function (response) {
        var chaptersList = JSON.parse(response)
        setupChapters(chaptersList.data)
      }
    })
  }

  function registerUser(type) {
    var name = type == 'sign-up' ? document.querySelector('#register-name').value : null;
    var email = type == 'sign-up' ? document.querySelector('#register-email').value : document.querySelector('#sign_in_mail').value || localStorage.user ;
    var type = type == 'sign-up' ? document.querySelector('#register-type').value : null;

    if(type == 'sign-up' && (!name || !email || !type)) {
      document.querySelector('.modal_error').textContent = 'Por favor, preencha todos os campos';
    }else{
      document.querySelector('.modal_error').textContent = '';

      var data = {
        customer: {
          name: name,
          email: email,
          type: type
        },
        chapterId: modal.dataset.chapterId
      };

      ajax({
        url: backURL + 'api/v1/customers/new',
        method: 'POST',
        contentType: 'application/json',
        data: data,
        success: function (response) {
          response = JSON.parse(response)
          if(response.status == "Success"){
            document.querySelector('#download-link').href = backURL + response.data.url;
            localStorage.user = email;
            goTo('#download');
          }else{
            if(response.message === 'No file found'){
              goTo('#ops');
            }else{
              goTo('#ops-register');
            }
          }
        },
        fail: function () {
          goTo('#ops-register');
        }
      })
    }
  }

  function setupChapters(chaptersList) {
    var chaps = Object.values(chaptersList)
    chapters.forEach(function (chapter) {
      var chap = chaps.find(c => c.chapter == chapter.dataset.chapter);
      console.log(chap);
      chapter.classList.add('active--' + chap.is_active);
      chapter.querySelector('.chapter__title').textContent = chap.name;
      chapter.querySelector('.chapter__label__number').textContent = chap.chapter;
      chapter.querySelector('.chapter__description').textContent = chap.is_active ? 'Disponível' : 'Previsto para ' + chapter.dataset.release;
      chapter.querySelector('.chapter__box__bg').style.background = chap.color;

      chapter.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(chap);
      });
    })
  }


  function closeModal() {
    modal.style.display = 'none';
  }

  function hideLayers() {
    layers.forEach(function (layer) {
      layer.style.display = 'none';
    })
  }

  function goTo(layer) {
    var activeLayer = document.querySelector(layer)
    hideLayers();
    activeLayer.style.display = 'initial';
  }

  function getLink() {
    // TODO pegar o link para um usuario ja cadastrado
    goTo('#download')
  }

  function openModal(chapter) {
    var loggedIn = localStorage.user ? true : false;

    modal.style.display = 'flex';
    modal.dataset.chapterId = chapter.id;

    if (loggedIn) {
      if (chapter.is_active) {
        registerUser('sign-in', chapter);
      } else {
        goTo('#ops');
      }
    } else {
      goTo('#sign-up');
    }
  }

  getChapters();
