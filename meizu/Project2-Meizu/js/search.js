$(() => {
  var kw = location.search;
  if (kw !== "") {
    kw = decodeURI(kw.split("=")[1]);
  }
  function loadSearch(kw, price_min, price_max, sort_price) {
    $.get("data/search/getSearchByKW.php", {kw, price_min, price_max, sort_price})
      .then(data => {
        console.log(data);
        var html = "";
        for (var p in data) {
          var imgs = data[p].color_imgs;
          html += `<a  href="products_details.html?fid=${data[p].fid}" class="box">
            <div class="up"><img src="${imgs[0].img1}"></div>
            <div class="sel">`
          for (var i = 0; i < imgs.length; i++) {
            html += `<div data-toggle="mImg"><img src="${imgs[i].img1}"></div>`;
          }
          html += `</div>
            <p class="title">${data[p].title}</p>
            <p class="text">${data[p].subtitle}</p>
            <p>¥<span class="price">${data[p].price}</span>起</p>
        </a>`;
          $(".container").html(html);
          $(".box").on("click", "[data-toggle=mImg]", function (e) {
            e.preventDefault();
            var str = $(this).children().attr("src",);
            $(this).parent().prev().children().attr("src", str);
          })
        }
      })
  }

  loadSearch(kw, 1, 2100000, 0, 0, 0);

  //多条件产品搜索功能----搜索按钮绑定事件

  let sort_price = 1;
  // let sort_hot=1;
  // let sort_new=1;
  let price_min = 0;
  let price_max = 210000;
  //价格排序
  $("#price").click(function (e) {
    e.preventDefault();
    price_min = $("#price_min").val();
    price_max = $("#price_max").val();
    sort_price *= -1;
    loadSearch(kw, price_min, price_max, sort_price, 0, 0);
  });
  // $("#new").click(function(e){
  //     e.preventDefault();
  //     price_min=$("#price_min").val();
  //     price_max=$("#price_max").val();
  //     sort_new*=-1;
  //     loadSearch(kw,price_min,price_max,0,sort_new,0);
  // });
  // $("#hot").click(function(e){
  //     e.preventDefault();
  //     price_min=$("#price_min").val();
  //     price_max=$("#price_max").val();
  //     sort_hot*=-1;
  //     loadSearch(kw,price_min,price_max,0,0,sort_hot);
  // });
  //搜索
  $("#search").click(function (e) {
    e.preventDefault();
    kw = $("#kw").val();
    console.log(kw)
    loadSearch(kw, price_min, price_max, 0, 0, 0);
  });

  //绑定kw  回车事件
  $("#kw").keyup(e=>{
    e.preventDefault();
    if(e.keyCode==13){
      $("#search").trigger("click");
    }
  });
})

