/**
 * Created by zd on 2014/7/3 0003.
 */

$(function() {

    window.carSelect = new SA.app.carSelect({
        b:'#selectBrand',
        m:'#selectModel',
        y:'#years',
        t:'#trim-list',
        onChange:function(type){
            if(type=='trim'){
                $('#selBrandValue').val( this.current.brand.value );
                $('#selModelValue').val( this.current.model.value );
                $('#yearValue').val( this.current.year.value );
                $('#infoValue').val( this.current.trim.value );
            }
        }
    });

    window.carSelect2 = new SA.app.carSelect({
        b:'#selectBrand2',
        m:'#selectModel2',
        y:'#years2',
        t:'#trim-list2',
        bid:'191',
        onChange:function(type){
            if(type=='trim'){
                $('#expectselBrandValue').val( this.current.brand.value );
                $('#expectselModelValue').val( this.current.model.value );
                $('#expectyearValue').val( this.current.year.value );
                $('#expectinfoValue').val( this.current.trim.value );
            }
        }
    });

    new SA.app.areaSelect({
        p:'#carProvince',
        c:'#carCity',
        onChange:function(type,data){
            if( type=='province' ){
                $('#cpvalue').val(data);
            }else{
                $('#ccvalue').val(data);
            }
        }
    });

    $('#selectBrand').on('click', function()
    {
        $("#main-page").hide();
        $('body').css('height', 'auto');
        $('#fullPage-nav').hide();
        $("#brand-page").show();
        window.scrollTo(0,0);
    });

    $(".goBack").on("click", function()
    {
        $("#main-page").show();
        $("#brand-page").hide();
        window.scrollTo(0,0);
    });

    $('#fullpage').fullpage({
        'navigation': true,
        'navigationPosition': 'bottom'
    });
    $('#card').removeClass().addClass('rubberBand animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
    var enroll_hei = 100 / 640 * document.body.clientWidth;
    $('#enroll-btn').height(enroll_hei).on('click', function()
    {
        var $form = $("#enroll-form");
        if($form.hasClass('show'))
        {
            $form.addClass('slidedown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass();
                }
            );
        }
        else
        {
            $form.addClass('slideup animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('slideup animated').addClass('show');
                }
            );
        }
    });

    $('.flexslider').flexslider({
        animation: "slide",
        controlNav:false
    });

    //显示当前城市的内容
    var ini_index = $('#nav li.current').index('#nav li');
    $(".flexslider").eq(ini_index).show();

    $('#nav li').each(function (i) {
        $(this).click(function () {
            $("#nav li").removeClass().eq(i).addClass('current');
            $(".flexslider").hide().eq(i).fadeOut(1300).fadeIn(800);
        });
    });
    var cityID = sohu_IP_Loc == 'unknown' ? '110000': sohu_IP_Loc;
    if(cityID.indexOf("CN") != -1){
        cityID = cityID.substring(2,cityID.length);
    }
    $.ajax({
        url:"http://2sc.sohu.com/db/getCar2sc.jsp",
        data:{
            city:cityID,
            count:1,
            carCount:8,
            picSize:220,
            brandId:"audi",
            auth:1
        },
        type:'get',
        success:function(data)
        {
            var dataObj = eval("(" + data + ")");
            var carInfo = dataObj.data;
            var len = carInfo.length;
            var recommendHtml = '';
            for(var i = 0; i < len; ++i)
            {
                recommendHtml += '<li><a class="imgwp" href="' + carInfo[i].url + '" target="_blank"><img src="' + carInfo[i].pic.replace('150x100', '220x150') + '" alt="' + carInfo[i].name + '" title="' + carInfo[i].name + '" />';
                recommendHtml += '<p>' + carInfo[i].name + '</p>';
                recommendHtml += '<p class="gray">[' + dataObj.cityname + '] ' + carInfo[i].firstCard + '上牌 ' + carInfo[i].mileAge/10000.0 + '万公里</p>';
                recommendHtml += '<p class="price">' + carInfo[i].price +'万</p></a></li>';
            }
            $("#car-recommend").find('.slides').html(recommendHtml);
            $("#car-recommend").flexslider(
                {
                    animation:"slide",
                    controlNav:false
                });
        }
    });

});

function validateFloat(val){//验证小数
    var patten = /^[0-9]*[1-9][0-9]*$/;
    return patten.test(val);
}
function validatePhone(val){//验证手机
    var patten = /^1[0-9]{10}$/;
    return patten.test(val);
}
function doSubmit(){

    var brandId = document.getElementById("selBrandValue").value;
    var modelId = document.getElementById("selModelValue").value;
    var yearValue = document.getElementById("yearValue").value;
    var trimId = document.getElementById("infoValue").value;
    var province = document.getElementById("cpvalue").value;
    var city = document.getElementById("ccvalue").value;
    var brandName = carSelect.current.brand.name||'';
    var modelName = carSelect.current.model.name||'';
    var trimName = carSelect.current.trim.name||'';
    var carName = brandName+modelName+trimName;
    carName = carName.replace("&nbsp;","");


    var phone = document.getElementById("phone").value;
    var username = document.getElementById("customerName").value;

    var sex = $('sex_0').is(':checked');
    var expectPrice = document.getElementById('expectPriceValue').value;
    var expectTime = document.getElementById('expectTimeValue').value;

    var expectBrandId = document.getElementById("expectselBrandValue").value;
    var expectModelId = document.getElementById("expectselModelValue").value;
    var expectModelYear = document.getElementById("expectyearValue").value;
    var expectTrimId = document.getElementById("expectinfoValue").value;
    var expectBrandName = carSelect2.current.brand.name||'';
    var expectModelName = carSelect2.current.model.name||'';
    var expectTrimName = carSelect2.current.trim.name||'';
    var expectCarName = expectBrandName+expectModelName+expectTrimName;
    expectCarName = expectCarName.replace("&nbsp;","");

    var dcityId = 0;
    if(city && city.length > 0){
        dcityId = city
    }else if(province && province.length > 0){
        dcityId = province;
    }

    if(!trimName || trimName == "下拉选择" || trimName == "请选择"){
        alert("请您选择车型名称！");
        return;
    }

    if(!province && !city){
        alert("请您选择城市信息！");
        return;
    }

    if(!expectPrice)
    {
        alert('请您选择预算信息！');
        return;
    }

    if(!expectTime)
    {
        alert("请您选择预购时间！");
        return;
    }

    if(!username || username.length > 20){
        alert("请您填写正确的用户名！");
        return;
    }

    if(!phone || !validatePhone(phone)){
        alert("请您填写正确的手机号码！");
        return;
    }

    if(!expectTrimName || expectTrimName == "下拉选择" || expectTrimName == "请选择"){
        alert("请您选择目标车型名称！");
        return;
    }

    var param = "brandId="+brandId+"&modelId="+modelId+"&modelYear="+yearValue+"&trimId="+trimId
        +"&province="+province+"&city="+city+"&carName="+carName+"&firstLicenseDate=2009-03-05"
        +"&mileAge=60000"+"&username="+username+"&phone="+phone+"&expectBrandId="+expectBrandId+"&sex="+sex
        +"&expectModelId="+expectModelId+"&expectModelYear="+expectModelYear+"&expectTrimId="+expectTrimId+"&expectCarName="
        + expectCarName + "&budgetPrice=" + expectPrice + "&budgetTime=" + expectTime;

    var url = "/exchange/add_exchange_info.jsp?"+param;



    url=encodeURI(url);
    url=encodeURI(url);
    //保存信息
    $.ajax({url:url, type:"post", success:function (data) {
        var dataObj = eval("(" + data + ")");
        if(dataObj.result == "success"){
            alert("注册成功！");
            //var id = dataObj.i;
            //alert(id);
//window.open("http://2sc.sohu.com/sell/exchange/success_"+id+"/", "about:blank");
            //document.location.href="/sell/exchange/success_"+id+"/";
        }
        if(dataObj.result == "failure"){
            alert(dataObj.msg);
        }
    }});

}
