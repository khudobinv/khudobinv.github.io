$(document).ready(function() {
    $('.slider').slick({
        autoplay: true,
        arrows: true,

        autoplaySpeed: 1500,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<a>👈</a>',
        nextArrow: '<a>👉</a>',
        responsive: [
          {
            breakpoint: 420,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          }
        ],
        customPaging: function(slider, i) {
            return '<span class="pager-item">' + (i + 1) + '</span>';
          }
      });
})