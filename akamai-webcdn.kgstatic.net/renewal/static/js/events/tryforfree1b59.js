$(document).ready(function (){
	const observer = lozad(); // lazy loads elements with default selector as
	observer.observe();
	 
	/**
	* [PopupLayer : 레이어 팝업 제이쿼리 플러그인.]
	* @param {string}	options.layer		[필수 : 오픈시킬 Layer 요소]
	* @param {string}	options.dim			[기본값 - '.dimmed_layer' : 딤드 레이어 요소]
	* @param {boolean}	options.dimClick	[기본값 - false : true 값은 딤드 클릭 시에도 레이어 닫힘]
	* @param {string}	options.closeBtn	[기본값 - '.btn_close' : 닫기 버튼 요소]
	* @param {boolean} options.fade 		[기본값 - false : true 값은 on/off시 fade 효과로 변경]
	* @param {number}  options.fadeSpeed   [기본값 - 400 : fade 효과 스피드]
	*/
	function PopupLayer( selector, options ) {
		this.layer = typeof options.layer === 'string' ? $(options.layer) : false,
		this.dimmedLayer = typeof options.dim === 'string' ? $( options.dim ) : false,
		this.dimClick = options.dimClick === true ? options.dimClick : false,
		this.closeBtn = this.layer.find( typeof options.closeBtn === 'string' ? options.closeBtn : false ),
		this.fade = options.fade === true ? options.fade : false,
		this.fadeSpeed = typeof options.fadeSpeed === 'number' ? options.fadeSpeed : false,
		this.callbackBefore = typeof options.callbackBefore === 'function' ? options.callbackBefore : false,
		this.callbackAfter = typeof options.callbackAfter === 'function' ? options.callbackAfter : false;
		this.flag = false;
		this.nodeClick(selector);
	}
	PopupLayer.prototype = {
		nodeClick: function ( selector ) {
			var self = this;
			$( selector ).on('click', function(e) {
				e.preventDefault();
				if (isSlideDrag) {console.log('no!!!'); return false;}
				self.showInfoLayer( self.layer );
				if ( self.callbackBefore ) {
					self.callbackBefore( self.layer );
				}
				return false;
			});
		},
		showInfoLayer: function ( layer ) {
			this.showLayer( layer );
			if ( this.dimClick ) this.setCloseLayer( layer, this.dimmedLayer );
			if ( this.closeBtn ) this.setCloseLayer( layer, this.closeBtn );
		},
		showLayer: function ( layer ) {
			if ( this.dimmedLayer ) {
				this.fade ? this.dimmedLayer.fadeIn( this.fadeSpeed ) : this.dimmedLayer.show();
			}
			this.fade ? layer.fadeIn( this.fadeSpeed ) : layer.show();
		},
		setCloseLayer: function ( layer, target ) {
			var self = this;
			if ( this.flag || !target ) return;

			target.on('click', function(e) {
				e.preventDefault();
				self.fade ? layer.fadeOut( self.fadeSpeed ) : layer.hide();
				if ( self.dimmedLayer ){
					self.fade ? self.dimmedLayer.fadeOut( self.fadeSpeed ) : self.dimmedLayer.hide();
				}
				if ( self.callbackAfter ) {
					self.callbackAfter( self.layer );
				}
				self.flag = true;
			});
		}
	}
	$.fn.extend({
		layer: function ( setting ) {
			return this.each( function() {
				var options = $.extend( {}, $.fn.layerDefaults, setting || {} );
				var layer = new PopupLayer( this, options );
			});
		},
		layerDefaults: {
			dim: '.dimmed_layer',
			closeBtn: '.btn_close',
			dimClick: false,
			fade: false,
			fadeSpeed: 400
		}
	});

	//ie 체크
	function isIE() {
		var myNav = navigator.userAgent.toLowerCase();
		return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}

	// ie8일 경우 레이어 중앙 정렬
	(function setLayerPos(){
		if (isIE() < 9 && isIE()) {
			$('.vod_layer, .shot_layer').css({'margin-top':'-340px','left':'0'})
		}
	})()

	/* vod 슬라이드 */
	$('.slide_vod').slick({
		variableWidth: true,
		arrows: true,
		infinite: false,
		speed:400,
		cssEase: 'ease-out',
		touchThreshold: 50,
		edgeFriction: 0.3,
		outerEdgeLimit: true,
		prevArrow: $('.section_vod .btn_prev'),
		nextArrow: $('.section_vod .btn_next'),
		dots: false,
		dotsClass:'list_paging',
		slidesToShow: 3,
		customPaging : function(slick, idx) {
			return '<a href="#none" class="link_paging">Slide'+ idx +'</a>';
		},
		/* 2019-04-11 수정 시작 */
		responsive: [{
			breakpoint: 1320,
			settings: {
				slidesToShow: 2,
			}
		},{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
			}
		},{
			breakpoint: 768, /* css가 768 아래로 dots로 변경됨 */
			settings: {
				arrows: false,
				dots: true,
				slidesToShow: 1,
			}
		}]
		/* // 2019-04-11 수정 끝 */
	});

	/* Classes 슬라이드 */
	$('.slide_classes').slick({
		variableWidth: true,
		arrows: false,
		dots: true,
		infinite: false,
		speed:400,
		cssEase: 'ease-out',
		touchThreshold: 50,
		edgeFriction: 0.3,
		outerEdgeLimit: true,
		prevArrow: $('.section_classes .btn_prev'),
		nextArrow: $('.section_classes .btn_next'),
		lazyLoad: 'ondemand',
		dots: true,
		dotsClass:'list_paging',
		slidesToShow: 1,
		customPaging : function(slick, idx) {
			return '<a href="javascript:;" class="link_paging">Slide'+ idx +'</a>';
		}
	});

	/* 스크린샷 슬라이드 */
	$('.slide_shots').slick({
		variableWidth: true,
		arrows: true,
		infinite: false,
		speed:400,
		cssEase: 'ease-out',
		touchThreshold: 200,
		edgeFriction: 0.3,
		outerEdgeLimit: true,
		prevArrow: $('.section_shots .btn_prev'),
		nextArrow: $('.section_shots .btn_next'),
		dots: false,
		dotsClass:'list_paging',
		slidesToShow: 3,
		customPaging : function(slick, idx) {
			return '<a href="javascript:;" class="link_paging">Slide'+ idx +'</a>';
		},
		/* 2019-04-11 수정 시작 */
		responsive: [{
			breakpoint: 1320,
			settings: {
				slidesToShow: 2,
			}
		},{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
			}
		},{
			breakpoint: 768, /* css가 768 아래로 dots로 변경됨 */
			settings: {
				arrows: false,
				dots: true,
				slidesToShow: 1,
			}
		}]
		/* // 2019-04-11 수정 끝 */
	});

	/* 스크린샷 - 팝업 슬라이드 */
	$('.slide_shots2').slick({
/*		variableWidth: true, */
		arrows: true,
		infinite: true,
		speed:400,
		cssEase: 'ease-out',
		touchThreshold: 50,
		edgeFriction: 0.3,
		outerEdgeLimit: true,
		prevArrow: $('.shot_layer .btn_prev'),
		nextArrow: $('.shot_layer .btn_next'),
		lazyLoad: 'ondemand'
	});

	/* 초기화 */
	setCombatLink(false, 'uhsd5YvoWaM');
	var CombatLink = 'uhsd5YvoWaM';
	var VodLink = 'uhsd5YvoWaM';
	var screenshotIdx = 0;
	var isSlideDrag = false;

	/* Classes 영상 레이어 오픈 */
	$('.info_class .btn_g2').layer({
		layer: '#vodLayer1',
		dimClick: true,
		fade: true,
		callbackBefore: function ( layer ) {
			$('#vodTarget').attr("src", "https://www.youtube.com/embed/" + CombatLink + "?autoplay=1&autohide=1&controls=1&modestbranding=0&rel=0&showinfo=0&enablejsapi=1&origin=http%3A%2F%2Fblack.game.daum.net");
		},
		callbackAfter: function ( layer ) {
			$('#vodTarget').attr('src', '');
		}
	});

	/* vod, feature 영상 번호 받기 */
	$('.section_intro .btn_g3, .section_vod .link_vod, .section_feature .link_feature, .slide_classes .btn_g2').click(function () {/* 2019-04-11 수정 */
		VodLink = $(this).data('vod');
	})

	/* vod, feature 영상 레이어 오픈 */
	$('.section_intro .btn_g3, .section_vod .link_vod, .section_feature .link_feature, .slide_classes .btn_g2').layer({/* 2019-04-11 수정 */
		layer: '#vodLayer2',
		dimClick: true,
		fade: true,
		callbackBefore: function ( layer ) {
			$('#vodTarget2').attr("src", "https://www.youtube.com/embed/" + VodLink + "?autoplay=1&autohide=1&controls=1&modestbranding=0&rel=0&showinfo=0&enablejsapi=1&origin=http%3A%2F%2Fblack.game.daum.net");
		},
		callbackAfter: function ( layer ) {
			$('#vodTarget2').attr('src', '');
		}
	});
	
	/* 슬라이드 스와이프인지 클릭인지 체크 */
	$('.section_vod .link_vod, .link_shots').on('mousedown', function(e){
		var a =  e.pageX;
		$(this).one('mouseup', function(e){
			var b = e.pageX;
			isSlideDrag = ((b - a) > 5 || (a - b) > 5) ? true : false;

			$(this).off('mousemove');
		});
	});

	/* 스크린샷 클릭 인덱스 받기 */
	$('.link_shots').click(function(){
		screenshotIdx = $(this).data('idx');
	})

	/* 스크린샷 레이어 오픈 */
	$('.link_shots').layer({
		layer: '.shot_layer',
		dimClick: true,
		fade: true,
		callbackBefore: function ( layer ) {
			$('.slide_shots2').slick('unslick').slick('reinit').slick({
//				variableWidth: true,
				arrows: true,
				infinite: true,
				speed:400,
//				centerMode: true,
				cssEase: 'ease-out',
				touchThreshold: 50,
				edgeFriction: 0.3,
				outerEdgeLimit: true,
				prevArrow: $('.shot_layer .btn_prev'),
				nextArrow: $('.shot_layer .btn_next'),
				initialSlide: screenshotIdx,
				lazyLoad: 'ondemand'
			})
		},
		callbackAfter: function ( layer ) {
		}
	});
	
	// 클래스 정보 슬라이드 로테이션 (responsive for mobile)
	$('.slide_classes').on('afterChange', function(slick, slide){
		onSelectClass(slide.currentSlide);
    });
	
	// 클래스 정보 로테이션
	$('.list_class .link_class').on('click', function() {
		var idx = $(this).parent().index();
		
		onSelectClass(idx);
		$('.slide_classes').slick('slickGoTo', idx);

		return false;
	});

	/* 각성 전환 버튼 클릭 */
	$('.detail_class .btn_trigger').on('click',function(){
		$(this).parent().toggleClass('awake');
		var isAwake = $(this).parent().hasClass('awake');
		setCombatLink(isAwake);
		$('.btn_video').toggleClass('awake');
	}); 

	// change classes selection
	function onSelectClass(idx) {
		var charList = $('.list_class li');
		var detailList = $('.info_class .detail_class');

		charList.removeClass('on').eq(idx).addClass('on');
		detailList.removeClass('awake').css('display', 'none').removeClass('on');
		$('.btn_video').addClass('awake');
		
		loadImages(detailList, idx);
		setCombatLink();
	}
	
	function loadImages(classes, idx) {
		classes.eq(idx).css('display','block').addClass('on');
		$.each(classes.eq(idx).find('img'), function(index, value) {
			observer.triggerLoad(value);
		});
	}
	
	function setCombatLink(isAwake, combat) {
		var $selected = $('.info_class .on .btn_g2');
			CombatLink = isAwake? $selected.data('combat-awake') : $selected.data('combat');
		if (combat) {
			CombatLink = combat;
		}
		return CombatLink;
	}

	/* 인풋 액션 */
	$(".tf_info").focus(function () {
		$(this).parent().addClass('type_fill');
	}).blur(function () {
		if ($(this).val().length > 0) { return; }
		$(this).parent().removeClass('type_fill');
	})
	
	/* Signup 이동 링크 */
	$('#linkSignup').on('click', function (){
		var pos = $('#sectSignup').offset().top;
		$('html, body').animate({ scrollTop: pos }, 1000);
	})

	/* 2019-04-11 추가 시작 */
	/* Top 이동 링크 */
	$('.btn_top').on('click', function (){
		$('html, body').animate({ scrollTop: 0 }, 600);
	})
	/* // 2019-04-11 추가 끝 */
	
	// 리프레시 버튼 클릭시  : 2019-04-11 수정
	$('.recaptcha-info').on('click', function(){
		grecaptcha.reset();
	})
})
