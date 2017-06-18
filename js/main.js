
var num=0;//计数，用来切换页数
var onOff=true;//防止多次滑动造成错乱

/*初始化第一页对应小圆点高亮*/
renderPage();

/*右侧导航的点击事件*/
$('#right-side-bar a').click(function(){
	if(!onOff)return;
	onOff=false;
	num=$(this).index();
	renderPage();

});

/*鼠标滚动触发的事件*/
mScroll(document,function(){
	if(!onOff)return;
	onOff=false;
	num--;
	if(num<0){
		num=0;
		onOff=true;
		return;
	}
	renderPage();

},function down(){
	if(!onOff)return;
	onOff=false;
	num++;
	if(num>3){
		num=0;
	}

	renderPage();
});

/*封装滚轮函数，区别滚轮事件是firefox还是chrome*/
function mScroll(obj,upper,down){
	obj.addEventListener('DOMMouseScroll', fn, false);
	obj.onmousewheel  = fn;
	function fn(ev){
		var n;/*负数代表向下，正数是向上，n就是这个数字*/
		if(ev.detail){
			n = -ev.detail;//firefox
		}else{
			n = ev.wheelDelta;//ie和chrome
		}
		//n小于0向下滚动，否则向上。
		if(n<0){
			down();
		}else{
			upper();
		}
	}
}

/*封装函数改变页,渲染相应小圆点面*/
function renderPage(){
	$("#right-side-bar a").removeClass('on').eq(num).addClass('on');
	$(".page").fadeOut().eq(num).fadeIn(600,function(){
		onOff=true;
	});
}