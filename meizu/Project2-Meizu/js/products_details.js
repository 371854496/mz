/**
 * products_details.js
 */
//1.按照fid和颜色值加载页面函数
function loadPage(fid,color) {
    $.ajax({
        type:"GET",
        url:"data/product_details/product_details.php",
        data:{fid:fid,color:color},
        success:function (result) {
            var {fid,detail,data,imgs,colsm,recom,recomimg}=result;
            var dimg=JSON.parse(detail);//详情大图
            $(".bread-title").html(data[0].title);
            var html="";
            html+=`<div class="details-title">
                    <h3>${data[0].title}</h3>
                    <span>${data[0].subtitle}</span>
                </div>
               <div class="detail_prices">
                   <b>价 格：</b><span>￥</span><span>${data[0].price}</span>
               </div>
               <div class="details_spec">
                   <b>型 号：</b>
                   <a href="#" class="selected">${data[0].title}</a>
               </div>
               <div class="details_set">
                   <dl>
                       <dt>网络类型：</dt>
                       <dd>
                           <a href="#" class="selected">全网通公开版</a>
                       </dd>
                   </dl>
                   <dl>
                       <dt>颜色分类：</dt>
                       <dd class="smPic">`;
            //获取四个小图
            $.each(colsm,function (i,val) {
                var c=val.color;//获取手机颜色
                //判断颜色与搜索一样时，选中框
                if(color!="") {
                    html += `<a href="#" data-toggle="pic" class='${c == color ? "selected" : ""}'>
                              <img src="${val.img1}" alt="">${c}</a>`;
                }else{
                    html += `<a href="#" data-toggle="pic" class='${i==0 ? "selected" : ""}'>
                              <img src="${val.img1}" alt="">${c}</a>`;
                }
            })
            html+=`</dd>
                   </dl>
                   <dl>
                       <dt>内存容量：</dt>
                       <dd>
                           <a href="#" class="selected">${data[0].spec}</a>
                       </dd>
                   </dl>
               </div>`;
            $(".product_load").html(html);
            var html="";
            //加载左侧四个中图
            $.each(imgs,function(i,val){
                if(val!==""){//图片不为空才增加
                html+=`<li>
                           <a href="#" data-toggle="mdPic">
                               <img src="${val}" alt="">
                           </a>
                       </li>`;
                }
            })
            $(".show-list-pic").html(html);
           //加载左侧大图
            var html="";
            html+=`<img src="${imgs.img1}" data-toggle="showPic" alt="">`;
            $(".show-pic").html(html);
            //加载页面detail
            var html="";
            $.each(dimg,function (i,val) {
                html+=`<img src="${val}" alt="">`;
            })
            $(".introduce").html(html);
           // console.log(recom);
            //加载推荐页面
            var html="";
            for(var i=0;i<recom.length;i++){
                var item=recom[i];
                var p=recomimg[i];
                html+=`<li>
                <a href="products_details.html?fid=${item.phone_family_id}&color=${item.color}">
                    <img src="${p.img1}" alt="">
                    <dl>
                    <dt>${item.title}</dt>
                    <dd>${item.subtitle}</dd>
                <dd><span>￥</span><span>${item.price}</span></dd>
                </dl>
                </a>
                </li>`;
            }
            $(".recom_ul").html(html);
        },
        error:function () {
            alert("网络故障，请检查");
        }
    })
}
//2.按照地址栏内容搜索并加载页面
$(function(){
    var search=location.search;
    if(search==""){
        alert("搜索参数不存在,请重新搜索");
        location="mz_pro6s.html";//跳转回首页
    }
    var query=decodeURI(search.split("?")[1]).split("&");
    var fid=parseInt(query[0].split("=")[1]);
    var color="";
    if(query[1]==null){
        color="";
    }else{
        color=query[1].split("=")[1];
    }
    //2.1 加载页面
    loadPage(fid,color);
    //2.2 鼠标移入左侧四个中图，改变左侧相对应大图
    $(".show-list-pic").on("mouseover","[data-toggle=mdPic]",function(e){
        e.preventDefault();
        var src=$(this).children().attr("src");
        $(".show-pic").children().attr("src",src);
        $(".largePic").children().attr("src",src);
    });
    //2.3 鼠标移入遮罩层，右侧出现此图片的放大版
    $(".supperMask").mouseover(function () {
        $(".mask").show();
       $(".largePic").show();
    });
    $(".supperMask").mouseout(function () {
        $(".mask").hide();
        $(".largePic").hide();
    });
    //2.4 遮罩层移动，放大图片也移动
    $(".supperMask").mousemove(function (e) {
            //鼠标位置
         var middleWidth=$(".mDiv").width(),
             middleHeight=$(".mDiv").height(),
             shadeWidth=$(".mask").width(),
             shadeHeight=$(".mask").height(),
             bigWidth = $(".largePic").width(),//放大图片盒子的宽度
             bigHeight = $(".largePic").height(),//放大图片盒子的高度
             rateX = bigWidth / shadeWidth,//放大区和遮罩层的宽度比例
             rateY = bigHeight / shadeHeight,//放大区和遮罩层的高度比例
             x = e.pageX,//鼠标距离页面左边的边距
             y = e.pageY;
        //设置遮罩层的位置
        $('.mask').offset({
            top: y-shadeHeight/2,
            left: x-shadeWidth/2
        });
        var _top=$(".mask").position().top,
            _left=$(".mask").position().left;
            hdiffer = middleHeight - shadeHeight,
            wdiffer = middleWidth - shadeWidth;
            if (_top < 0) _top = 0;
            else if (_top > hdiffer) _top = hdiffer;
            if (_left < 0) _left = 0;
            else if (_left > wdiffer) _left =wdiffer;
        $(".mask").css({
            top:_top,
            left:_left
        });
        $(".largePic img").css({
            top: - rateY*_top,
            left: - rateX*_left
        });
    });
    //2.5 单击右侧小图片a,加载选中的手机颜色页面
    $(()=>{
        $(".product_load").on("click","[data-toggle=pic]",function(e){
            e.preventDefault();
            var color=$(this).text().trim();//获取所选中的a标签中的颜色
            var l=location.href.lastIndexOf("=");//获取最后一个等号的位置
            var i=location.href.indexOf("color");
            if(i==-1){
                location=location.href+"&color="+color;
            }else{
                var s=location.href.substring(0,l+1);//截取除了color的前面所有地址
                location=s+color;//拼接地址栏
            }
        })
    });
    //2.6 数量增加减少按钮
    $(()=>{
        $(".count").on("click","[data-toggle=buy]",function (e) {
            e.preventDefault();
            var num=parseInt($("#countNum").val());
            if($(this).is(".add")){
                num++;
            }else if($(this).is(".plus")){
                num--;
                if(num<=0){
                    num=1;
                }
            }
            $("#countNum").val(num);
        })
    });
    //2.7 搜索框，搜索跳转到商品列表页面
    $(()=>{
        $("#search_btn").click(function(e){
            e.preventDefault();
            var searchVal=$("#search").val();
            location=`search.html?kw=${searchVal}`;//需要调整
        })
    });
    //2.8 推荐页面前后按钮
    $(()=>{
        $(".recommand_nav").on("click","a",function(e){
            e.preventDefault();
           var width=$(".recom_ul li").width()*10;
            $(".recom_ul").css("width",width+50);
            if($(this).hasClass("active")){
                if($(this).hasClass("re_forword")){
                    $(".recom_ul").animate({
                        left:-1225
                    },100);
                 $(this).removeClass("active").prev().addClass("active");
                }else if($(this).hasClass("re_prev")){
                    $(".recom_ul").animate({
                        left:0
                    },100);
                    $(this).removeClass("active").next().addClass("active");
                }
            }
        })
    });
    //2.9 详情，规格，常见问题点击事件
    $(()=>{
        $(".detail_tab").on("click","[data-toggle=tab]",function(e){
            e.preventDefault();
            var id=$(this).attr("href");
           if(!$(this).parent().is(".selected")){
               $(this).parent().addClass("selected").siblings().removeClass("selected");
               $(id).show().siblings().hide();
               $(".details_content").css({
                   height:$(id).height(),
                   paddingBottom:100
               });
           }
        })
    })
})