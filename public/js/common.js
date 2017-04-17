$(function(){
	$('.dropdown').hover(function(){
		$('.dropdown').removeClass('open');
		$(this).addClass('open');
	},function(){
		$(this).removeClass('open');
	});
	
	console.log(document.documentElement.clientHeight/3+'px');
	$('.modal_open .mutiview-dialog-bg').width(document.documentElement.clientWidth).height(document.documentElement.clientHeight);
$(window).resize(function(){
	console.log(document.documentElement.clientHeight/3);
	$('.modal_open .mutiview-dialog-bg').width(document.documentElement.clientWidth).height(document.documentElement.clientHeight);
})



//分类详情页
$(document).on('click',".category",function(){  
   var id=$(this).attr('data-id')
   selectCategory('#selsctCategory',id)
});  

// 登录注册
$('body').removeClass('modal_open');
$('.mutiview-dialog-bg').width(0).height(0);
$('.modal_wrapper').css('display','none');
$('#userLogin , .title_login , #user_icon').click(function(){userLogin('.login','.title_login');})
$('#userRegister  , .title_register').click(function(){userLogin('.register','.title_register');})
$('.mutiview-dialog  .close_btn').click(function(){
	$('body').removeClass('modal_open');
	$('.mutiview-dialog-bg').width(0).height(0);
	$('.modal_wrapper').css('display','none');
})
// 个人中心

$('.user_nav li').click(function(){
	$('.user_nav li').removeClass('active');
	$(this).addClass('active');
	$('.user_content .content').hide();
	$('.user_content .content').eq($(this).index()).show();
})

// 图片详情页
$('.comment').click(function(e){
	var target=$(this)
	var toId=target.data('tid')
	var commentId=target.data('cid')
	if($('#toId').length>0){
		$('#toId').val(toId)
	}else{
		$('<input>').attr({
			type:'hidden',
			id:'toId',
			name:'comment[tid]',
			value:toId
		}).appendTo('#commentForm')
	}
	if($('#commentId').length>0){
		$('#commentId').val(commentId)
	}else{
	$('<input>').attr({
		type:'hidden',
		id:'commentId',
		name:'comment[cid]',
		value:commentId
	}).appendTo('#commentForm')
}
})

//swpier
var swiper = new Swiper('.swiper-container1', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        centeredSlides: true,
        autoplay: 2500,
        // autoplay: false,
        autoplayDisableOnInteraction: false,
        effect: 'fade',
        loop: true
    });
 var swiper = new Swiper('.swiper-container2', {
        paginationClickable: true,
        slidesPerView:4,
        spaceBetween: 40,
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 40
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            }
        }
    });


// 点赞收藏


 $('[data-toggle="tooltip"]').tooltip()
// $(document).on('hover,click','[data-toggle="tooltip"]',tooltip())

$(document).on('click','.icon_love',function(e){  
	if($(e.target).hasClass('loved')){
		// 取消收藏
		favourite(e,'/favourite?id=','0')
	}else{
		//收藏
		favourite(e,'/favourite?id=','1')
	}

})


})
//收藏按钮
function favourite(e,url,cancel){
	var target=$(e.target)
	var id=target.data('id')
	$.ajax({
		type:'GET',
		url:url+id+'&cancel='+cancel
	})
	.done(function(results){
		if(results.success===1&&cancel==1){
			target.addClass('loved').html('&#xe614;');
			target.next('span').html(results.favourite)
		}else{
			target.removeClass('loved').html('&#xe62b;');
			target.next('span').html(results.favourite)
		}

	})
}

// 登录注册
function  userLogin(item1,item2){
	$('body').addClass('modal_open');
	$('.modal_wrapper').css('display','block');
	$('.mutiview-dialog').css('margin-top',document.documentElement.clientHeight/4+'px');
	$('.modal_open .mutiview-dialog-bg').width(document.documentElement.clientWidth).height(document.documentElement.clientHeight);
	$(window).resize(function(){
	$('.mutiview-dialog').css('margin-top',document.documentElement.clientHeight/4+'px');
	$('.modal_open .mutiview-dialog-bg').width(document.documentElement.clientWidth).height(document.documentElement.clientHeight);
})
	$('.modal_wrapper').find('.mutiview-dialog-content').css('display','none');
	$('.modal_wrapper').find(item1).css('display','block');
	$('.modal_wrapper').find('.title').removeClass('active');
	$('.modal_wrapper').find(item2).addClass('active');
	}
// header
function headGenre(item,scope){
	var string=''
 $.ajax({
             type: "GET",
             url: "/headGenre",
             data:{scope:scope},
             dataType: "json",
             success: function(data){
				for(var i=0;i<data.length;i++){
					string=string+'<li data-id="'+data[i].id+'"><a href="/genre/'+scope+'/'+data[i].id+'" title="" >'+data[i].name+'</a></li>' 
				}
				$(item).html(string)
			}
	})
}
