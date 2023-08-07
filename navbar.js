
    $(document).ready(function() {
      $('.open-overlay').click(function() {
        $('.open-overlay').css('pointer-events', 'none');
        var overlay_navigation = $('.overlay-navigation'),
          top_bar = $('.bar-top'),
          middle_bar = $('.bar-middle'),
          bottom_bar = $('.bar-bottom');

        overlay_navigation.toggleClass('overlay-active');
        if (overlay_navigation.hasClass('overlay-active')) {
          top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
          middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
          bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
          overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down');

          $('nav ul li').fadeIn({
            duration: 300,
            complete: function() {
              $('nav ul li a').animate({ opacity: 1 }, {
                delay: 10,
                duration: 140,
                complete: function() {
                  $('.open-overlay').css('pointer-events', 'auto');
                }
              });
            }
          });
        } else {
          $('.open-overlay').css('pointer-events', 'none');
          top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
          middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
          bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
          overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up');

          $('nav ul li').fadeOut({
            duration: 300,
            complete: function() {
              overlay_navigation.fadeOut({
                delay: 0,
                duration: 300,
                complete: function() {
                  $('nav ul li a').animate({ opacity: 0 }, {
                    delay: 0,
                    duration: 50,
                    complete: function() {
                      $('.open-overlay').css('pointer-events', 'auto');
                    }
                  });
                }
              });
            }
          });
        }
      });
    });

