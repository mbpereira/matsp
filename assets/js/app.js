var materialize = M;

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

  materialize.Carousel.init(sliders, {
    fullWidth: true,
    indicators: true
  });

  materialize.Tabs.init(tabs, {
    swipeable: true
  });

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
})();
