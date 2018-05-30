var acc = document.getElementsByClassName("question");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");

        var answer = this.nextElementSibling;
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
}

var seeMore = document.querySelector('#seemore');
var accordionItem = document.querySelectorAll('.accordion__item.hidden')

seeMore.addEventListener('click', function(e){
  e.preventDefault();
  accordionItem.forEach(function(item){
    item.classList.remove('hidden');
  })
  seeMore.style.display =  'none';
});
