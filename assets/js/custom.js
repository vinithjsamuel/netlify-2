function openFullscreen(elem) {
  if(elem.webkitEnterFullscreen){/*ios*/
    elem.webkitEnterFullscreen();
  } else if (elem.webkitRequestFullscreen) {/* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function validateQuestionAnswerForm(_field_id) {
  let _score = 0;
  let _this_form = $(_field_id);
  _this_form.find('.question-answer').each(function(){
    let _field_name = $(this).find('.form-check-input').attr('name');
    let _field = $('input.form-check-input[name="'+_field_name+'"]');
    let _selected_field = $('input.form-check-input[name="'+_field_name+'"]:checked');
    if(_field.is(':checked')){
      _score = parseInt(_selected_field.val())+_score;
    }else{
      _score = -1;
      /*scroll to missing form*/
      $('html, body').animate({
        scrollTop: _this_form.offset().top-150
      }, 500, "easeInOutExpo");
      return false
    }
  });
  return _score;
}

$( document ).ready(function() {

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 500, "easeInOutExpo");
        return false;
      }
    }
  });

  $('body').on('click','.js-scroll-trigger-same-page', function(){
    var _scrollToId = $(this).attr('href');
    if ($(_scrollToId).length) {
      $('html, body').animate({
        scrollTop: ($(_scrollToId).offset().top - 72)
      }, 500, "easeInOutExpo");
      return false;
    }
  })

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('body').removeClass('sidebar-show');
  });

  $('body').on('click','.menu-icon,.sidebar-overlay', function(){
    $('body').toggleClass('sidebar-show');
  })

  if($('.text-typed').length){
    $( ".text-typed" ).each(function( index ) {
      var _type_text = $( this ).data('text');
      var typed = new Typed('.text-typed', {
        strings: [_type_text],
        typeSpeed: 50,
        loop: true,backDelay: 1500,
        startDelay: 1000,
        cursorChar:'',
      });
    });
  }

  /*Scroll - start*/
  var lastScrollTop = 0;
  var didScroll;
  $(window).scroll(function(event){
    didScroll = true;
  });
  setInterval(function() {
    if (didScroll) {
      var st = $(this).scrollTop();
      if(st > 55){
        if (st > lastScrollTop){
          $('body').addClass('minimize-header');
        } else {
          $('body').removeClass('minimize-header');
        }
        $('body').removeClass('top-section');
      }else{
        $('body').removeClass('minimize-header');
        $('body').addClass('top-section');
      }
      lastScrollTop = st;
      didScroll = false;
    }
  }, 100);
  /*Scroll - end*/

  $(window).bind("load resize scroll",function(e) {
      var y = $(window).scrollTop();
      /*$('.section-bg-1,.section-bg-2').css('background-position', '0% ' + parseInt(-y / 6) + 'px');*/
      $(".section-bg-1,.section-bg-2").filter(function() {
          return $(this).offset().top < (y + $(window).height()) &&
                 $(this).offset().top + $(this).height() > y;
      }).css('background-position', '0px ' + parseInt(-y / 6) + 'px');

      /*dynamic height for full width video section*/
      if($(window).width() >= 992){
        if($('.add-full-vh').length && $('.video-full-width-fixed').length && $('.video-block').length){
          $('.add-full-vh').css('margin-top',parseInt($('.video-block').find('video').height()-88)+'px');
        }
      }
  });

  const main_swiper = new Swiper(".main-slider", {
    slidesPerView: 1,
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 3000,disableOnInteraction: true,
    },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
    // pagination: {
    //     el: ".gradient-pagination",
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //       return '<span class="' + className + '"></span>';
    //     },
    // },
  });
  main_swiper.on('slideChangeTransitionEnd', function () {
    var _active_slider = $('.main-slider .swiper-slide.swiper-slide-active').find('.slider-content').data('active-slider');
    var _color_theme = $('.main-slider .swiper-slide.swiper-slide-active').find('.slider-content').data('color-theme');
    $("body").removeClass("slider-theme-primary slider-theme-dark");
    $("body").addClass(_color_theme);
    $("body").attr('data-active-slider',_active_slider);
  });
  $('body').on('click','.switch-main-slider', function(){
    if(!$(this).hasClass('btn-dark')){
      var _slider_index = $(this).data('slider-index');
      main_swiper.slideTo(_slider_index);
    }
  })

  var icons_carousel = new Swiper(".icons-carousel", {
    slidesPerView: 2,
    spaceBetween: 5,
    loop: true,
    autoplay: {
      delay: 1000,disableOnInteraction: false,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      // when window width is >= 480px
      520: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      620: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      756: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
      1092: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      1192: {
        slidesPerView: 6,
        spaceBetween: 5,
      },
      1400: {
        slidesPerView: 7,
        spaceBetween: 5,
      },
      // when window width is >= 640px
      1500: {
        slidesPerView: 7,
        spaceBetween: 5,
      },
      1800: {
        slidesPerView: 6,
        spaceBetween: 5,
      }
    }
  });

  var models_carousel = new Swiper(".models-carousel", {
    slidesPerView: 2,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 2000,disableOnInteraction: false,
    },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      // when window width is >= 480px
      520: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      756: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      // when window width is >= 640px
      1500: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      1800: {
        slidesPerView: 4,
        spaceBetween: 0,
      }
    }
  });

  /*Video pause play action - start*/
  var _teaser_video = document.getElementById('teaser_video');
  $('body').on('click','#videoPlayPause', function(){
    if($(this).hasClass('pause')){
      $(this).removeClass('pause');
      _teaser_video.play();
    }else{
      $(this).addClass('pause');
      _teaser_video.pause();
    }
  })
  $('body').on('click','#videoMute', function(){
    $('#teaser_video').prop("muted", !$('#teaser_video').prop("muted"));
    if($('#teaser_video').prop("muted")){
      $(this).addClass('mute');
    }else{
      $(this).removeClass('mute');
    }
  })

  if($('.countdown-group').length){
    const myInterval = setInterval(function(){
      var _existing_number = parseInt($('.seconds-char-text-2').text());
      var _existing_first_number = parseInt($('.seconds-char-text-1').text());
      _existing_number = _existing_number+1;
      if(_existing_first_number == 1)_existing_number = 0;
      if(_existing_number > 9){
        _existing_number = 0;$('.seconds-char-text-1').text(1);
      }else{
        $('.seconds-char-text-1').text(0);
      }
      $('.seconds-char-text-2').text(_existing_number);
    }, 1000);
  }

  if($('.question-form').length){
    $("#quiz_form_step1,#quiz_form_step2,#quiz_form_step3").on("submit", function(e){
      var _form = $(this);
      var _step1_score = validateQuestionAnswerForm('#quiz_form_step1');
      if(_step1_score != -1){
        var _step2_score = validateQuestionAnswerForm('#quiz_form_step2');
        if(_step2_score != -1){
          var _step3_score = validateQuestionAnswerForm('#quiz_form_step3');
          if(_step3_score == -1)return false;
        }
      }
      if(_step1_score && _step2_score && _step3_score){
        let total_score = _step1_score + _step2_score + _step3_score;
        let _result = 'normal';
        if(total_score <= 10){_result = 'normal';
        }else if(total_score <= 20){_result = 'mild';
        }else if(total_score <= 30){_result = 'moderate';
        }else{_result = 'severe';}
        $('.question-answer input.form-check-input,.question-form button').attr("disabled",true);
        $('.question-form button').css('visibility','hidden');
        $('.result-levels').find('.'+_result).removeClass('d-none');
        $('body').addClass('show-results');
        $('html, body').animate({
          scrollTop: $('section#result').offset().top-100
        }, 500, "easeInOutExpo");
      }
      return false;
    })
  }

  $('body').on('click','.countdown-start', function(){
    $('.countdown-start').css('opacity','0');
    const _numbers = (($('html').attr('dir')) && ($('html').attr('dir') == 'rtl')) ? ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩","١٠"] : [1,2,3,4,5,6,7,8,9,10];
    const countdownInterval = setInterval(function(){
      var _number_key = parseInt($('.countdown-timer-result').data('number_key'));
      _number_key = _number_key+1;
      if(_number_key == 10){
        _number_key = 0;
        $('.countdown-start').css('opacity','1');
        $('.countdown-timer-result').data('number_key',_number_key);
        $('.countdown-timer-result').text(_numbers[_number_key]);
        clearInterval(countdownInterval);/*Not to restart*/
      }
      $('.countdown-timer-result').data('number_key',_number_key);
      $('.countdown-timer-result').text(_numbers[_number_key]);
    }, 1000);
  })

  $('body').on('click','#videoExpand', function(){
    openFullscreen(_teaser_video);
  })
  if(_teaser_video){
    setTimeout(function () {_teaser_video.play();$('#videoPlayPause').removeClass('pause');}, 3000);
  }
  /*Video pause play action - end*/

  setTimeout(function () {
    if($('.preloader').length){
      $('.preloader').fadeOut();
    }
  }, 2500);

});

/*Form validation - start*/
(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()
/*Form validation - end*/
