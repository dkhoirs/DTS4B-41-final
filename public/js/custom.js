/*
	Template Name: Digiqole - News Magazine Newspaper HTML5 Template
	Author: Tripples
	Author URI: https://themeforest.net/user/tripples
	Description: Digiqole - News Magazine Newspaper HTML5 Template
	Version: 1.1
	1. Main slideshow
	2. Site search
	3. Owl Carousel
	4. Video popup
	5. Contact form
	6. Back to top
  
*/


jQuery(function ($) {
	"use strict";
	/* ----------------------------------------------------------- */
	/*  Popup
	/* ----------------------------------------------------------- */
	$(document).ready(function () {

		$(".gallery-popup").colorbox({ rel: 'gallery-popup', transition: "fade", innerHeight: "500" });

		$(".popup").colorbox({ iframe: true, innerWidth: 600, innerHeight: 400 });
		load_banner();
	});

	/* ----------------------------------------------------------- */
	/*  Contact form
	/* ----------------------------------------------------------- */
	/* ----------------------------------------------------------- */
	/*  Mobile Menu
	/* ----------------------------------------------------------- */
	$('.navbar-nav .menu-dropdown').on('click', function (event) {
		event.preventDefault();
		event.stopPropagation();
		$(this).siblings().slideToggle();
	});


	$('.nav-tabs[data-toggle="tab-hover"] > li > a').hover(function () {
		$(this).tab('show');
	});

	/**-------------------------------------------------
	 *Fixed HEader
	 *----------------------------------------------------**/

	$(window).on('scroll', function () {

		/**Fixed header**/
		if ($(window).scrollTop() > 250) {
			$('.is-ts-sticky').addClass('sticky fade_down_effect');
		} else {
			$('.is-ts-sticky').removeClass('sticky fade_down_effect');
		}
	});




	/*==========================================================
					search popup
	======================================================================*/
	if ($('.xs-modal-popup').length > 0) {
		$('.xs-modal-popup').magnificPopup({
			type: 'inline',
			fixedContentPos: false,
			fixedBgPos: true,
			overflowY: 'auto',
			closeBtnInside: false,
			callbacks: {
				beforeOpen: function beforeOpen() {
					this.st.mainClass = "my-mfp-slide-bottom xs-promo-popup";
				}
			}
		});
	}



	/* ----------------------------------------------------------- */
	/*  Owl Carousel
	/* ----------------------------------------------------------- */

	//Trending slide

	$(".trending-slide").owlCarousel({

		loop: true,
		animateIn: 'fadeIn',
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		nav: true,
		margin: 30,
		dots: false,
		mouseDrag: false,
		slideSpeed: 500,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items: 1,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			}
		}

	});

	$(".transing-slide-style2").owlCarousel({
		loop: true,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		nav: true,
		loop: true,
		margin: 10,
		dots: false,
		mouseDrag: false,
		slideSpeed: 500,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items: 1,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			768: {
				items: 3,
				mouseDrag: true,
			}
		}

	});


	//Featured slide
	

	
	if ($('#fullbox-slider').length > 0) {
		$('#fullbox-slider').owlCarousel({
			nav: false,
			items: 4,
			margin: 0,
			reponsiveClass: true,
			dots: false,
			autoplayHoverPause: true,
			loop: true,
			responsive: {
				// breakpoint from 0 up
				0: {
					items: 1,
				},
				// breakpoint from 480 up
				480: {
					items: 2,
				},
				// breakpoint from 768 up
				768: {
					items: 2,
				},
				// breakpoint from 768 up
				1200: {
					items: 4,
				}
			}
		});
	}
	//Latest news slide

	$(".latest-news-slide").owlCarousel({

		loop: false,
		animateIn: 'fadeInLeft',
		autoplay: false,
		autoplayHoverPause: true,
		nav: true,
		margin: 30,
		dots: false,
		mouseDrag: false,
		slideSpeed: 500,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items: 3,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 3
			}
		}

	});



	$('#contact-form').submit(function () {

		var $form = $(this),
			$error = $form.find('.error-container'),
			action = $form.attr('action');

		$error.slideUp(750, function () {
			$error.hide();

			var $name = $form.find('.form-control-name'),
				$email = $form.find('.form-control-email'),
				$subject = $form.find('.form-control-subject'),
				$message = $form.find('.form-control-message');

			$.post(action, {
				name: $name.val(),
				email: $email.val(),
				subject: $subject.val(),
				message: $message.val()
			},
				function (data) {
					$error.html(data);
					$error.slideDown('slow');

					if (data.match('success') != null) {
						$name.val('');
						$email.val('');
						$subject.val('');
						$message.val('');
					}
				}
			);

		});

		return false;

	});


	/* ----------------------------------------------------------- */
	/*  Back to top
	/* ----------------------------------------------------------- */

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.backto').fadeIn();
		} else {
			$('.backto').fadeOut();
		}
	});

	// scroll body to 0px on click
	$('.backto').on('click', function () {
		$('.backto').tooltip('hide');
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	$('.backto').tooltip('hide');

	$("#form-search-artikel").submit(function () {
		var key = $("#keyword-search-artikel").val();
		window.location.href = "{{url('/search/')}}/" + key;
	});
	function load_banner() {
		postdata("/load_banner_frontend", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
			var list_banner = "";
			$.each(data, function (key, value) {
				list_banner += `<div class="ad-banner float-right">
					<a href="`+ value.link +`" class="">
						<figure data-href="../../gambar_banner/`+ value.gambar +`" class="progressive replace">
							<img src="../../gambar_banner/`+ value.gambar +`" class="img-fluid preview" alt="">
						</figure>
					</a>
				</div>
			</div>`;
			});
			$('#banner-top-slider').html(list_banner);
			if (data.length > 0) {
				$('#banner-top-slider').owlCarousel({
					nav: false,
					items: 4,
					margin: 30,
					reponsiveClass: true,
					dots: false,
					autoplay: true,
					autoplayTimeout: 100,
					autoplayHoverPause: true,
					loop: true,
					responsive: {
						// breakpoint from 0 up
						0: {
							items: 1,
						},
						// breakpoint from 480 up
						480: {
							items: 1,
						},
						// breakpoint from 768 up
						768: {
							items: 1,
						},
						// breakpoint from 768 up
						1200: {
							items: 1,
						}
					}
				});
			}
		}, function (e) {

		});
	}
	
});