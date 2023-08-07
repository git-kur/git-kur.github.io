$( document ).ready(function() {
$('.open-overlay').click(function () {
            $('.open-overlay').css('pointer-events', 'none');
            var overlay_navigation = $('.overlay-navigation'),
                top_bar = $('.bar-top'),
                middle_bar = $('.bar-middle'),
                bottom_bar = $('.bar-bottom');

            overlay_navigation.toggleClass('overlay-active');
            if (overlay_navigation.hasClass('overlay-active')) {
                top_bar.velocity({ translateY: "0px" }, { duration: 300 });
                middle_bar.velocity({ opacity: "0" }, { duration: 300 });
                bottom_bar.velocity({ translateY: "0px" }, { duration: 300 });

                overlay_navigation.velocity("slideDown", {
                    duration: 300,
                    delay: 0,
                    begin: function () {
                        $('nav ul li').velocity("transition.perspectiveLeftIn", {
                            stagger: 150,
                            delay: 0,
                            complete: function () {
                                $('nav ul li a').velocity({
                                    opacity: [1, 0],
                                }, {
                                    delay: 10,
                                    duration: 140,
                                    complete: function () {
                                        $('.open-overlay').css('pointer-events', 'auto');
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                $('.open-overlay').css('pointer-events', 'none');
                top_bar.velocity({ translateY: "-10px" }, { duration: 300 });
                middle_bar.velocity({ opacity: "1" }, { duration: 300 });
                bottom_bar.velocity({ translateY: "10px" }, { duration: 300 });

                $('nav ul li').velocity("transition.perspectiveRightOut", {
                    stagger: 150,
                    delay: 0,
                    complete: function () {
                        overlay_navigation.velocity("fadeOut", {
                            delay: 0,
                            duration: 300,
                            complete: function () {
                                $('nav ul li a').velocity({
                                    opacity: [0, 1],
                                }, {
                                    delay: 0,
                                    duration: 50,
                                    complete: function () {
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
