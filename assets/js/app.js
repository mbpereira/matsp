var materialize = M;

var http = axios.create({
  baseURL: 'https://matsp-dashboard.herokuapp.com/'
});

var methods = {
  move: function(to, slider) {
    var instance = materialize.Carousel.getInstance(
      document.querySelector(slider)
    );
    if (to === 1) instance.next();
    else instance.prev();
  },
  typeWriter: function(el) {
    var txt = el.textContent.slice();
    el.textContent = "";

    function typeWriter(i = 0) {
      if (i >= txt.length) {
        el.textContent = "";
        return typeWriter(0);
      }

      el.textContent += txt.charAt(i);
      setTimeout(function() {
        typeWriter(i + 1);
      }, 100);
    }
    typeWriter(0);
  }
};

(function() {
  // init
  var sliders = document.querySelectorAll(".carousel");
  var tabs = document.querySelectorAll(".tabs");
  var typeWriters = document.querySelectorAll(".type-writer");
  var tooltips = document.querySelectorAll(".tooltipped");

  materialize.Carousel.init(sliders, {
    fullWidth: true,
    indicators: true
  });

  materialize.Tabs.init(tabs, {
    swipeable: true
  });

  materialize.Tooltip.init(tooltips);

  typeWriters.forEach(function(tw) {
    methods.typeWriter(tw);
  });
})();

(function() {
  // event handlers
  var carouselActs = document.querySelectorAll(".carousel-actions");
  // delegation
  carouselActs.forEach(function(current) {
    current.addEventListener("click", function(e) {
      var el = e.target;
      var to = Number(el.getAttribute("data-to"));
      var slider = el.getAttribute("data-slider");

      methods.move(to, slider);
    });
  });

  window.addEventListener('scroll', reveal);

  function reveal(e) {
    var elements = document.querySelectorAll('[data-reveal]');

    elements.forEach(function (el) {
      if(scrollY >= 2/3 * el.offsetTop)
        el.classList.add('active');
      else
        el.classList.remove('active');
    });
  }

})();

(function (axios) {
  var form = document.querySelector('#contact-form');
  
  form.addEventListener('submit', contact);

  function contact(e) {
    e.preventDefault();
    
    form.classList.add('is-sending');

    var elements = e.target.elements;
    var envelope = {
      email: elements.email.value,
      name: elements.name.value,
      subject: elements.subject.value,
      text: elements.text.value,
    };

    axios.post('/contact', envelope)
      .then(r => {
        form.classList.remove('is-sending');
        form.classList.add('sended');
      })
      .catch(err => { 
        form.classList.remove('is-sending');
        form.classList.add('error');
      })
      .then(() => setTimeout(() => {
        if(form.classList.contains('error'))
          form.classList.remove('error');
        else {
          form.classList.remove('sended');
          Object.keys(elements).forEach(element => elements[element].value = '');
        }
      }, 5000));
  }
})(http);
