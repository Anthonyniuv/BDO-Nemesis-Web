$(document).ready(function(){
 const observer = lozad(); // lazy loads elements with default selector as
							// '.lozad'
  observer.observe();
  
  $(".movie_link").colorbox({
		iframe:true,
		opacity:0.7,
		innerWidth:"80%",
		innerHeight:"75%",
		overlayClose:false,
		onLoad:function(){
		},
		onClosed : function() {
		}
	});
  
  // 뉴스 슬라이더
  $('.black_news .slide_center').slick({
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: 'ondemand',
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    touchThreshold: 20,
    customPaging:function(slider,i){
      return '<span class="ir_pm btn_page">'+(i+1)+'</span>';
    },
    prevArrow:'<a href="javascript:;" class="img_black btn_prev">Previous</a>',
    nextArrow:'<a href="javascript:;" class="img_black btn_next">Next</a>'
  });
  $('.black_news .slick-dots li span').click(function(e) {
	  e.stopPropagation();
  });
  
  $('.txt_time').each(function(){
	var date = getDateString($(this).text());
	var time = getTimeString($(this).text());
	$(this).text(date + " | " + time);
  });

  // 스크린샷 슬라이더
  $('.black_screenshot .slide_center').slick({
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    swipe: false,
    touchThreshold: 20,
    customPaging:function(slider,i){
      return '<a href="#none" class="ir_pm btn_page">'+(i+1)+'</a>';
    },
    prevArrow:'<a href="#none" class="img_black btn_prev">Previous</a>',
    nextArrow:'<a href="#none" class="img_black btn_next">Next</a>'
  });
  
  // 레이어 슬라이더
  const mapSlider = $('.popup_layer .slide_photo').slick({
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    touchThreshold: 20,
    swipeToSlide: true,
    customPaging:function(slider,i){
      return '<a href="#none" class="img_black btn_page">'+(i+1)+'</a>';
    },
    prevArrow:'<a href="#none" class="btn_prev"><span class="img_black">Previous</span></a>',
    nextArrow:'<a href="#none" class="btn_next"><span class="img_black">Next</span></a>'
  });

  // 클래스 정보 로테이션
  $('.list_class .link_class').on('click', function() {
    var idx = $(this).parent().index();
    var charList = $('.list_class li');
    var detailList = $('.info_class .detail_class');

    charList.removeClass('on');
    charList.eq(idx).addClass('on');
    detailList.removeClass('awake');
    detailList.css('display','none');
// $('.inner_class').addClass('normal'); // change button
    $('.btn_video').addClass('awake');
    
    loadImages(detailList, idx);
    setCombatLink();

    return false;
  });
  
  $('.detail_class .btn_trigger').on('click',function(){
    $(this).parent().toggleClass('awake');
    var isAwake = $(this).parent().hasClass('awake');
    setCombatLink(isAwake);
    
// $('.inner_class').toggleClass('normal'); // change button
    $('.btn_video').toggleClass('awake');
  }); 
  
  function loadImages(classes, idx) {
	  classes.eq(idx).css('display','block');
	  $.each(classes.eq(idx).find('img'), function(index, value) {
		  observer.triggerLoad(value);
	  });
  }
  function setCombatLink(isAwake) {
	  var $selected = $('.list_class .on .link_class');
	  var combatId = isAwake? $selected.data('combat-awake') : $selected.data('combat');
	  $('#combat_link').attr("href", "https://www.youtube.com/embed/" + combatId + "?autoplay=1&autohide=1&controls=1&modestbranding=0&rel=0&showinfo=0&enablejsapi=1&origin=http%3A%2F%2Fblack.game.daum.net");
  }

  $('.show_screenshot').click(function() {
	  const $popup =  $('.popup_layer.screenshot_layer');
	  if ($popup.length) {
		  $.each($popup.find('img'), function(index, value) {
			  observer.triggerLoad(value);
		  });
		  
		  $.each(mapSlider, function(index, slider) {
			  slider.slick.refresh(); 
		  });
		  
		  $('.dimmed_layer').css('display','block');
		  $popup.css('display', 'block');
		  
		  var index = $(this).data('index')
		  setTimeout(function() {
			  $('.screenshot_layer .slide_photo').slick('slickGoTo', index, false);
		  }, 1000);
	  }
  });
  
  // 월드맵
  $('.black_map img[usemap]').rwdImageMaps();
  
  $('#worldMap area').on('mouseover', function() {
    $('.wrap_area').removeClass('on');
    var areaname = $(this).data('areaname');
    $('.wrap_territory .' + areaname).addClass('on');
  });
 
  $('.tit_territory').on('mouseover', function () {
    $(this).parent().addClass('on');
  });

  $('.img_territory').on('mouseleave', function() {
    $(this).parent().removeClass('on');
  });
  
  $('.img_territory, .tit_territory').click(function() {
	  const className = $(this).data('areaname') + '_class';
	  const $popup =  $('.popup_layer.' + className);
	  if ($popup.length) {
		  $.each($popup.find('img'), function(index, value) {
			  observer.triggerLoad(value);
		  });
		  
		  $.each(mapSlider, function(index, slider) {
			  if ($(slider).parents('.popup_layer').hasClass(className)) {
				  slider.slick.refresh(); 
			  }
		  })
		  
		  $('.dimmed_layer').css('display','block');
		  $popup.css('display', 'block');
	  }
  });
  
  $('.img_territory, .map_obj').click(function() {
	  const className = $(this).data('obj') + '_class';
	  const $popup =  $('.popup_layer.' + className);
	  if ($popup.length) {
		  observer.triggerLoad($popup.find('img').get(0));
		  
		  $('.dimmed_layer').css('display','block');
		  $popup.css('display', 'block');
	  }
  });
  
  $('.link_next').click(function() {
	  $("html, body").animate({ scrollTop: 860 }, 600);
  });
  

  setTimeout(function() { 
	  if($("#intro_video")[0].readyState < 3 ){
		  $("#intro_video").attr("poster", "../akamai-webcdn.kgstatic.net/renewal/static/images/main/main_guardian.jpg");
		  $("#intro_video").css("top", "80%");
		  $("#intro_video").load();
	  }
  }, 800) 
  
  
  
});


