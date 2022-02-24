/*分析：
获取li的index
更换背景图片
更换播放器图片，文本
更换播放器按钮及title为暂停
图片旋转，歌曲播放
暂停播放，上一首，下一首
播放器可以显示与隐藏
* */
//准备工具,收集数据
var index=0;
var li=$(".banner ul li");//获取横幅的里元素
var img=$(".music .m_img img");//获取播放器img元素
var text=$(".music .m_text");//获取播放器m_text元素
var prev=$(".music .m_btn .m_prev");//获取播放器上一首a元素按钮
var play=$(".music .m_btn  .m_play");//获取播放器播放/暂停a元素按钮
var next=$(".music .m_btn .m_next");//获取播放器下一首a元素按钮

var mp3=$(".music .m_mp3" );//媒体
var flag=false;//歌曲是否播放的标记
var close=true;//播放器是否显示    显示：true 隐藏：false；

/*获取点击的li*/
li.click(function () {
    // console.log($(this).index());获取里元素的索引
    //获取当前点击的索引
    index=$(this).index();
    //调用播放歌曲show函数
    show();

});
//播放歌曲 封装一个函数，方便上一首，下一首调用
function show() {
//更换背景图片 索引+1=图片名称
    change_bg(index+1);

    //更换播放器图片、文本
    change_img_text(index+1);
    //更换播放按钮机title为暂停
    change_btn_title();
    
//    图片旋转
    img_rotate();

//  播放歌曲
    play_mp3();


}
/*更换背景图片*/
function change_bg(idx) {
    $("body").css({
        "background":"url(img/"+idx+".jpeg) no-repeat",
        "background-size": "cover"
    })
}



//更换播放图片、文本
function change_img_text(idx) {
    img.attr("src","img/"+idx+".png");//更换播放器图片
    text.html(li.eq(index).attr("title"));//获取li的title
}

// 更换播放按钮及title为暂停
function change_btn_title(){
    play.removeClass("m_play");// 移除原来的样式
    play.addClass("m_pause");//添加新的样式
    play.attr("title","暂停");//更换title
}
//
function img_rotate() {
    //移除所有img图片旋转样式
    li.children().removeClass("img_rotate");
    //给当前点击的li添加图片旋转样式
    li.eq(index).children().addClass("img_rotate");
//  同样效果  li.eq(index).addClass("img_rotate");
}
//播放歌曲
function play_mp3() {
//获取选中的li的datasrc
    mp3.attr("src",li.eq(index).attr("datasrc"));//
    mp3.get(0).play();//歌曲播放，固定写法：get(0)
//    修改歌曲是否播放的标记 true播放，false暂停
    flag=true;
}

//暂停或播放音乐
play.click(function () {
    /* 1.暂停播放 2.图片旋转停止 3.暂停按钮更换为播放 4.title更换为播放*/

    if(flag){
        mp3.get(0).pause();//暂停播放
        li.eq(index).children().removeClass("img_rotate");//移除图片旋转
        play.removeClass("m_pause").addClass("m_play").attr("title","播放");
        flag=false;//修改歌曲是否播放的标记
    }
    else{
        mp3.get(0).play();//暂停播放

        play.removeClass("m_play").addClass("m_pause").attr("title","暂停");
        flag=true;//修改歌曲是否播放的标记
        //第一次进入
        change_bg(index+1);
    }
});
//上一首
prev.click(function () {
    index--;
    //无，背景图片缺失
    if(index<0){
        index=li.length-1;
    }
    //播放
    show();

});
//下一首
next.click(function () {
    index++;
    if (li.length-1<index){
        index=0;
    }
    show();
});

/* 播放器可以隐藏与显示*/
$(".m_close").click(function () {
    //如果显示则隐藏,close=true,才有效
    if (close) {
        $(this).addClass("m_open");
        //
        $(".music").animate({"left": "-500px"}, 800);//css动画里的 1000ms=1s
        close=false;
    }
    else{
        $(this).removeClass("m_open");
        //恢复初始值
        $(this).addClass("m_close");
        $(".music").animate({"left": "0px"}, 1000);//css动画里的 1000ms=1s
        close=true;
    }

});
