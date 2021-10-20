
$(window).load(function(){
	/* PARTNER GUIDES 슬라이더 */
	var partnerGuidesSlider = $('.slide_guides .list_nav').bxSlider({
		controls: true,
		prevSelector: '#prevGiudes',
		nextSelector: '#nextGiudes',
		prevText: '<span class="ico_fame ico_prev">Preview slide list</span>',
		nextText: '<span class="ico_fame ico_next">Next slide list</span>',
		pager: false,
		infiniteLoop: false,
		minSlides: 5,
		maxSlides: 2,
		hideControlOnEnd:true,
		slideWidth: 1120,
		slideMargin: 5,
	});

	/* PARTNER GUIDES 슬라이더: 영상 활성 */
	$('.playlist_guides').find('.link_nav').click(function (e) {
		var data = {
			title: $(this).data('title'),
			lang: $(this).data('lang'),
			imgurl: $(this).data('imgurl'),
			vodurl: $(this).data('vodurl'),
			vodtype: $(this).data('vodtype'),
		};

		$('.slide_guides .tit_guides').text(data.title);
		$('.slide_guides .tag_lang').text(data.lang);
		$('.slide_guides .img_vod').attr('src', data.imgurl);
		$('.slide_guides .link_vod').attr('data-vodurl', data.vodurl);
		$('.slide_guides .link_vod').attr('data-vodtype', data.vodtype);

		$('.playlist_guides .list_nav').find('.link_nav').removeClass('on');
		$(this).addClass('on');

		e.preventDefault();
	});

	/* FUNNY MOMENTS 슬라이더 */
	var partnerGuidesSlider = $('.slide_funny .list_slide').bxSlider({
		controls: true,
		prevSelector: '#prevMoments',
		nextSelector: '#nextMoments',
		prevText: '<span class="ico_fame ico_prev">Preview slide list</span>',
		nextText: '<span class="ico_fame ico_next">Next slide list</span>',
		pager: false,
		infiniteLoop: false,
		minSlides: 3,
		maxSlides: 2,
		hideControlOnEnd:true,
		slideWidth: 1140,
		slideMargin: 0,
	});

	/* 레이어 팝업 */
	function layerFamehall(element, settings) {
		var _ = this;

		// 커스텀 가능한 기본 옵션
		_.defaults = {
			btnOpen: '.btn_',
			btnClose: '.btn_close', /* {string} 닫기 버튼 클래스 */
			layerPop: $('.popup_layer'),/* {selector} 오픈되는 레이어 */
			layerPopIn: $('.inner_popup_layer'), /* {selector} 오픈되는 레이어의 inner 클래스 */
			layerDim: $('.dimmed_layer'), /* {selector} 딤드 레이어 */
			showSpeed: 300, /* 레이어 팝업 열리는 속도 */
			closeSpeed: 300, /* 레이어 팝업 닫히는 속도 */
			callbackOpen: function(_){
			},
			callbackClose: function(_){
			},
		}

		// 플러그인 내부에서 사용하는 변수
		_.initials = {
				windowLoad: false,
				onClass: 'on'
		}

		$.extend(_, _.initials);
		_.options = $.extend({}, _.defaults, settings);

		// 옵션을 내부변수에 맵핑
		_.$layer = $(element);
		_.btnOpen = _.options.btnOpen;
		_.btnClose = _.options.btnClose;
		_.layerPop = _.options.layerPop;
		_.layerPopIn = _.options.layerPopIn;
		_.layerDim = _.options.layerDim;
		_.showSpeed = _.options.showSpeed;
		_.closeSpeed = _.options.closeSpeed;

		// window load 체크
		$(window).load(function() {
			_.windowLoad = true;
		});

		_.preventDef = function(e){
			e.preventDefault();
			return false;
		}
		
		// 레이어 열기
		$(document).on('click', _.btnOpen, function(event) {
			_.openLayer();
			_.options.callbackOpen(_, event.currentTarget);/* 2019-06-07 수정 */

			return false;
		});

		// 레이어 닫기 (버튼)
		_.layerPop.find(_.btnClose).on('click', function() {	
			_.closeLayer();
			_.options.callbackClose(_, _.btnClose);/* 2019-06-07 수정 */
			return false;
		});

		// 레이어 닫기 (딤)
		_.layerDim.on('click', function() {	
			_.closeLayer();
			_.options.callbackClose(_, _.layerDim);/* 2019-06-07 수정 */
			return false;
		});
	}

	//팝업 열기
	layerFamehall.prototype.openLayer = function () {
		var _ = this;

		_.layerDim.fadeIn(_.showSpeed);
		_.layerPop.show();
		setTimeout(function(){ 
				_.layerPop.addClass(_.onClass);
		},10);

		_.$layer.trigger('openLayer', [_]);
	}

	//팝업 닫기
	layerFamehall.prototype.closeLayer = function () {
		var _ = this;

		_.layerDim.fadeOut(_.closeSpeed);
		_.layerPop.removeClass(_.onClass);
		_.layerPop.css({'transition-duration': _.closeSpeed + 'ms'});
		_.layerPopIn.css({'transition-duration': _.closeSpeed + 'ms'});

		setTimeout(function(){ 
			_.layerPop.hide();
			_.layerPop.css({'transition-duration': ''});
			_.layerPopIn.css({'transition-duration': ''});
		},_.closeSpeed);

		$('html,body').unbind('mousewheel', _.preventDef);

		_.$layer.trigger('closeLayer', [_]);
	}

	// jquery 플러그인으로 생성
	$.fn.layerFamehall = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
				_[i].layerFamehall = new layerFamehall(_[i], opt);
            else
				ret = _[i].layerFamehall[opt].apply(_[i].layerFamehall, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

	/* 동영상 레이어 */
	var vodLayer = $('#vodLayer').layerFamehall({ 
		layerPop: $('#vodLayer'),
		btnOpen: '.slide_guides .link_vod, .slide_funny .link_vod',
		callbackOpen: function(el, clicker) {
			var vodId = $(clicker).attr('data-vodurl');
			var vodType = $(clicker).attr('data-vodtype');

			if (vodType === 'twitch') {
				// 트위치
				// https://player.twitch.tv/?autoplay=true&video=v443016261 비디오인지 클립인지 구분해야할듯
				if($.isNumeric(vodId)) {
					$('#vodTarget').attr("src", "https://player.twitch.tv/?autoplay=true&video=v" + vodId );
				} else {
					$('#vodTarget').attr("src", "https://clips.twitch.tv/embed?clip=" + vodId + "?autoplay=1");
				}
			} else {
				// 유튜브
				$('#vodTarget').attr("src", "https://www.youtube.com/embed/" + vodId + "?autoplay=1&autohide=1&controls=1&modestbranding=0&rel=0&showinfo=0&enablejsapi=1");
			}
		},
		callbackClose: function(){
			$('#vodTarget').attr('src', '');
		}
	});

	/* 이미지 레이어 */
	var imgLayer = $('#visuLayer').layerFamehall({ 
		layerPop: $('#visuLayer'),
		btnOpen: '.slide_funny .link_visu',
		callbackOpen: function(el, clicker) {
			var imgUrl = $(clicker).attr('data-imgurl');
			$('#visuTarget').attr("src", imgUrl);
		},
		callbackClose: function(){
		}
	});

	/* BDO PARTNERS: 더보기 */
	$('.bdo_famehall .btn_seemore').on('click', function(){
		$(this).hide();
		$('.bdo_famehall .group_bdo').removeClass('fold');
	})

	/* BDO PARTNERS: 소팅 */
	$('.bdo_famehall .link_nav').on('click', function(){
		var bdoType = $(this).attr('data-type');
		
		$(this).parent().addClass('on').siblings().removeClass('on');
		printBodPartners(bdoType);
	})

	/* BDO PARTNERS: 로딩 시 디폴트 출력(all) */
	printBodPartners('all');

	function printBodPartners(bdoType) {
		var res = [],
			bdoLi = [],
			_dataBdo = JSON.parse(JSON.stringify(dataBdo));

		switch (bdoType) {
			case 'all': // 전체
				res = _dataBdo;
			break;
			case 'abc': // A-Z
				res = _dataBdo.sort(function(a, b){
					var a = a.name.toString().toLowerCase(); 
					var b = b.name.toString().toLowerCase();

					if (a < b) { return -1; }
					if (a > b) { return 1; }
					return 0;
				});
			break;
			case 'en': // en
				res = _dataBdo.filter(function(el){
					return el.lang === 'en';
				});
			break;
			case 'de': // de
				res = _dataBdo.filter(function(el){
					return el.lang === 'de';
				});
			break;
			case 'es': // es
				res = _dataBdo.filter(function(el){
					return el.lang === 'es';
				});
			break;
			case 'fr': // fr
				res = _dataBdo.filter(function(el){
					return el.lang === 'fr';
				});
			break;
		}

		for (var i = 0; i < res.length; i++){
			var str = '<div class="box_bdo">'; /* 2019-06-17-v2 수정 */
				str += '	<a href="' + res[i].linkUrl +'" class="link_bdo" target="_blank">';
				str += '	<span class="thumb_bdo"><img src="' + res[i].imgUrl +'" width="68" width="68" class="thumb_g" alt=""></span>';
				str += '	<span class="name_bdo">' + res[i].name +'</span>';
				str += '	</a>';
				str +='</div>';
			bdoLi.push(str)
		}

		$('.group_bdo').html(bdoLi);
	}
})