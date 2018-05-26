  var header = document.querySelector('header');
  var content = document.querySelector('main');
  var menu = header.querySelector('.menu');
  var menuBtn = header.querySelector('#openMenu');
  var headerInitialTop = header.offsetTop;
  var lastPosition = 0;
  var ticking = false;
  var links = document.querySelectorAll('header li')

  links.forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      var anchor = this.querySelector('a');
      var target = document.querySelector(anchor.getAttribute('href'));

      window.scroll({
        top: target.offsetTop - 120,
        behavior: 'smooth',
      });

      if(window.innerWidth < 992){
        closeMenu();
      }
    })
  })

  window.addEventListener('resize', function() {
    if(window.innerWidth > 991){
      fixHeader(window.scrollY);
    }
  })


  function fixHeader(scrollPosition){
    if(scrollPosition >= headerInitialTop){
      header.classList.add('header--fixed');
    }else{
      header.classList.remove('header--fixed');
    }
  }

  window.addEventListener('scroll', function() {
    lastPosition = window.scrollY;
    if(!ticking){
      window.requestAnimationFrame(() => {
        fixHeader(lastPosition);
        ticking = false;
      });
    }
    ticking = true;
  });

  function openMenu(){
    menuBtn.classList.add('active');
    menu.classList.add('active');
  }

  function closeMenu(){
    menuBtn.classList.remove('active');
    menu.classList.remove('active');
  }

  menuBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(menuBtn.classList.contains('active')){

      closeMenu();
    }else{
      openMenu();
    }
  })
