  var header = document.querySelector('header');
  var content = document.querySelector('main');
  var headerInitialTop = header.offsetTop;
  var lastPosition = 0;
  var ticking = false;
  var links = document.querySelectorAll('header li')

  links.forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      var anchor = this.querySelector('a');

      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block:    "start"
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
    header.style.display = 'flex'
  }

  function closeMenu(){
    header.style.display = 'none'
  }
