"use strict";
"undefined" == typeof window.SA && (window.SA = function ()
{
	var a = {},
	b = [],
	c = [],
	$ = jQuery;
	a.inc = function ()
    {
		return !0
	};
    //ע�����
	a.register = function (d, e)
    {
		for (var f = d.split("."), g = a, h = null; h = f.shift(); )
        {
			if (f.length)
            {
				void 0 === g[h] && (g[h] = {});//��aע�����¼���void 0����undefine
				g = g[h];//
			}
            else
            {
				if (void 0 === g[h])
                {
                    g[h] = e(a, $);//ִ��e
                    c.push(d);//����ַ���
				}
			}
		}
	};
    //���ע�����
	a.unregister = function (n)
    {
		for (var b = 0, f = c.length; b < f; b += 1)
        {
			if (c[b] === n)
            {
				for (var f = n.split("."), g = a, h = null; h = f.shift(); )
                {
					if (f.length)
                    {
						void 0 === g[h] && (g[h] = {});
						g = g[h];
					}
                    else
                    {
						if (void 0 !== g[h])
                        {
							g[h] = void 0;
						}
					}
				}
				return c[b] = null,
				c.splice(b, 1),
				!0
			}
		}
		return 0;//û�ҵ�����0
	};

    a.checkRegister = function (a) {
		for (var b = 0, f = c.length; b < f; b += 1) {
			if (c[b] === a) {
				return !0
			}
		}
		return !1
	};
	a.regShort = function (b, c) {
		if (void 0 !== a[b]) {
			throw "[" + b + "] : short : has been register"
		}
		a[b] = c
	};
	a.log = function (m, c, l, t) {
		var z = [m, l || "error", c || "system", t || (new Date).getTime()];
		b.push(z);
		if (a.DEBUG) {
			try {
				console.log(z)
			} catch (e) {}

		}
	};
	a.getLogList = function (a) {
		return b.splice(0, a || b.length)
	};
	a.IE = $.browser.msie;
	return a
}
	());
SA.DEBUG = false;
SA.global = this;
SA.register("empty", function (a, $) {
	return function () {}
});
SA.register("templet",function(){return function(a,b){return a.replace(/\#\<(.+?)\>/gi,function(a,d){for(var e=d.replace(/\s/gi,""),f=a,e=e.split("||"),g=0,h=e.length;g<h;g+=1){if(/^default:.*$/.test(e[g])){f=e[g].replace(/^default:/,"");break}if(void 0!==b[e[g]]){f=b[e[g]];break}}return f})}});
SA.register("ui.tab",function(g,c){var d=function(a){a=this.tabs.index(a);a!=this.index&&(this.index=a,this.currentTab&&this.currentTab.removeClass("cur"),this.currentTab=this.tabs.eq(a).addClass("cur"),this.currentContent&&this.currentContent.hide(),this.currentContent=this.contents.eq(a).show())};return function(a,e,f){var b=this;this.change=d;this.tabs=c(a).children();this.contents=c(e).children();this.index=f?this.tabs.index(this.tabs.filter(".cur")):0;this.currentTab=this.tabs.eq(this.index); this.currentContent=this.contents.eq(this.index);this.time=null;this.tabs.mouseover(function(){window.beginTime=(new Date).getTime();b.time&&clearTimeout(b.time);var a=this;b.time=setTimeout(function(){b.change(a)},100)}).mouseout(function(){clearTimeout(b.time)})}});
SA.register("util.getUniqueKey", function () {
	var a = (new Date).getTime().toString(),
	b = 1;
	return function () {
		return a + b++
	}
});
SA.register("scriptLoader", function (a, $) {
	var b = {},
	c = {
		url : "",
		charset : "gb2312",
		timeout : 3e4,
		onComplete : a.empty,
		onTimeout : a.empty,
		isEncode : !1,
		uniqueID : null
	};
	return function (option) {
		var e,
		f,
		g = $.extend({}, c, option);
		if ("" == g.url) {
			throw "scriptLoader: url is null"
		}
		var d = g.uniqueID || a.util.getUniqueKey();
		e = b[d];
		null != e && !0 != a.IE && ($(e).remove(), e = null);
		null == e && (e = b[d] = document.createElement("script"));
		e.charset = g.charset;
		e.id = "scriptRequest_script_" + d;
		e.type = "text/javascript";
		null != g.onComplete && (a.IE ? e.onreadystatechange = function () {
			if ("loaded" == e.readyState.toLowerCase() || "complete" == e.readyState.toLowerCase()) {
				try {
					clearTimeout(f),
					document.getElementsByTagName("head")[0].removeChild(e),
					e.onreadystatechange = null
				} catch (a) {}
				g.onComplete()
			}
		}
			 : e.onload = function () {
			try {
				clearTimeout(f),
				$(e).remove()
			} catch (b) {}
			g.onComplete()
		});
		e.src = g.url;
		document.getElementsByTagName("head")[0].appendChild(e);
		0 < g.timeout && (f = setTimeout(function () {
					try {
						document.getElementsByTagName("head")[0].removeChild(e)
					} catch (a) {}
					g.onTimeout()
				}, g.timeout));
		return e
	}
});
SA.register("util.cookie",function(){var a={set:function(c,a,f){var h=[];f=$.extend({},{expire:null,path:"/",domain:null,secure:null,encode:!0},f);!0==f.encode&&(a=escape(a));h.push(c+"="+a);null!=f.path&&h.push("path="+f.path);null!=f.domain&&h.push("domain="+f.domain);null!=f.secure&&h.push(f.secure);null!=f.expire&&(c=new Date,a=c.getTime()+36E5*f.expire,c.setTime(a),h.push("expires="+c.toGMTString()));document.cookie=h.join(";")},get:function(a){a=a.replace(/([\.\[\]\$])/g,"\\$1");return(a=(document.cookie+ ";").match(RegExp(a+"=([^;]*)?;","i")))?a[1]||"":""},remove:function(c,e){e=e||{};e.expire=-10;a.set(c,"",e)}};return a});
SA.register("util.addFavorite",function(a){return function(c,e){c=c||window.location.href;e=e||window.document.title;try{document.all?window.external.addFavorite(c,e):alert("��ʹ�ÿ�ݼ�Ctrl+D�����ղ�")}catch(f){a.log(f,"util.addFavorite")}}}); 
SA.register('ui.blink',function(a,$){
    return function( $el ){
        var self=this;
        this.$el=$el.removeClass('inputno');
        this.n=6;
        this.i=150;
        this.t=setInterval(function(){
            self.n--;
            if(self.n<=0){
                self.$el.removeClass('ui-blink');
                clearInterval(self.t);
            }else{
                self.$el.toggleClass('ui-blink');
            }
        },this.i);
        clearInterval( $el.data( 'blink.t' ) );
        $el.data( 'blink.t', this.t );
    }
});
SA.register("ui.menuSelect",function(a,$){
	
	var els=[],group=[];
	
	var Menu=function( el, groupName, groupIndex, dropHeight ){
		var $el=typeof el=='string' ? $(el) : el
            , $menuList=$el.find('>.menu-list') ;
		var self=this;
		if( !$el.length ) return;
		
        self.dropHeight= dropHeight || parseInt( $menuList.css('height') ) || 240;
		

		if( typeof groupName=='string' && typeof groupIndex=='number' ){
			typeof group[groupName]=='undefined'&&( group[groupName]=[] );
			group[groupName][groupIndex]=this;
			this.groupName=groupName;
			this.groupIndex=groupIndex;
            this.isSingle=false;
		}else{
            this.isSingle=true;
        }
		this.$el=$el;
		this.isActive=false;
		this.isActiveTime=null;
		
		els.push( this );
		
		$menuList.find('ul:first').delegate(".option","click",function(event){
			var option=$(this);
			var name=option.find('span.item-text').text();
			var value=option.attr("value");
			if(value=="") return;
			
			option.closest('ul').find('li').removeClass('current');
			option.parent().addClass('current')
			
			$el.children(".menu-name").html(name).attr("value",value);
			$el.trigger("change",[{name:name,value:value,$el:option}]);
		});
		//$menuList.click(function(e){
		//	return $(e.target).closest('.option', this).length==1;
		//});
		$el.click(function(e){
			self.isActive=true;
			self.isActiveTime&&clearTimeout(self.isActiveTime);
			self.isActiveTime=setTimeout(function(){ self.isActive=false; },50);
			//clearMenu(this);
			if( $el.hasClass('disabled') && self.groupName ){
				runBlink( self, false );
				return;
			};
            var isShow= !$el.hasClass('ui-select-active');
			$el.toggleClass('ui-select-active');

            if( isShow ){
                $menuList.css({height:'auto'});
                $menuList[0].scrollHeight > self.dropHeight && $menuList.css('height', self.dropHeight );
            }
		});
		$el.bind('ui.menu.checkvalue',function(){
			runBlink( self, true );
		});
	}
	
	function clearMenu(){
		for(var i=0,j=els.length;i<j;i++){
			!els[i].isActive && els[i].$el.removeClass('ui-select-active');
		}
	}
	
	function runBlink( obj, checkAll ){
		if( obj.isSingle ){      //��鵥��menu
            obj.$el.hasClass('novalue') && new a.ui.blink( obj.$el );
        }else{
            var g=obj.groupName && group[obj.groupName]
                , groupIndex=obj.groupIndex;
            for(var i=0,j=g.length; i<j; i++){
                if( (checkAll||i<groupIndex) &&g[i].$el.hasClass('novalue')){
                    new a.ui.blink( g[i].$el );
                }
            }
        }
	}

	$(document).bind('click.menu',function(){clearMenu();});

	return Menu;
});


SA.register('ui.menu',function(a,$){
	var menus=[];
	function closeMenu()
	{
		for(var i=0;i<menus.length;i++){
			menus[i].hide();
		}
	}
	$(document).bind('click.menu',closeMenu);

	function menu( $wrapper )
	{
		this.E={};
		this.isIntWidth=false;
		this.E={
			$wrapper:$wrapper,
			$menu:$wrapper.find('>div.sMenu'),
			$text:$wrapper.find('h3'),
			$bg:$wrapper.children('div.tBg')
		};
		var self=this;

		var $menu=this.E.$menu,$wrapper=this.E.$wrapper,$text=this.E.$text;

		$wrapper.click(function(e){
			self.show();
			return false;
		});

		$menu.click(function(e){
			var $target=$(e.target);
			if(!$target.attr('data-id')) return;

			$text.text( $.trim( $target.text().replace('&nbsp;','') ) );

			$wrapper.trigger('change',[$target.attr('data-id'),$target.attr('data-index'),self,$target] );

			self.hide();
			return false;
		});
		menus.push( this );
	}
	menu.prototype={
		show:function(){
			var $bg=this.E.$bg,$menu=this.E.$menu,$wrapper=this.E.$wrapper;
			closeMenu();

			$menu.removeClass("hasScroll").css('width','auto');

			$menu.width($wrapper.width()-10>$menu.width() ? $wrapper.outerWidth() : $menu.width()+20 );
			$menu.height()>300 ? $menu.addClass("hasScroll") : $menu.removeClass("hasScroll");

			$menu.show();
			$bg.css({"width":$menu.width(),"height":$menu.height(),"opacity":.2}).show()

			$wrapper.addClass('selShow');
		},
		hide:function(){
			this.E.$menu.hide();
			this.E.$bg.hide();
			this.E.$wrapper.removeClass('selShow');
		}
	};
	return menu;
});


SA.register("app.carSelect",function(a,$){

    var trims=[]
        , first=true
        , useIndex=0;

    var Data=function( option )
    {
        this.url=option.url;
        this.option = option;
    };

    Data.prototype={
        cache:{
            brands:null,
            models:{},
            years:{},
            trims:{}
        },
        status:{
            init:false,
            list:[]
        },
        getBrand:function(callBack){
            var self=this;
            if(self.option.bid != '-1')
            {
                self.cache['brands']=[];
                for(var i=0, len =brandMods.length;i<len;i++){
                    if(brandMods[i].i == self.option.bid)
                    {
                        self.cache['brands'].push({i:brandMods[i].i,n:brandMods[i].n});
                        self.cache['models'][brandMods[i].i] = { l:brandMods[i].s, i:brandMods[i].i };
                    }
                }
            }
            if( this.cache['brands'] ){
                callBack(this.cache['brands']);
            }else{
                this.status.list.push(callBack);
                if( !this.status.init ){
                    this.status.init=true;
                    a.scriptLoader({
                        url : self.url.brand,
                        onComplete : function() {
                            self.cache['brands']=[];
                            var json = window.brandMods;
                            var ch =/^[a-zA-Z]{1}/;
                            if(self.option.bid != '-1')
                            {
                                for(var i=0, len =json.length;i<len;i++){
                                    if(json[i].i == self.option.bid)
                                    {
                                        self.cache['brands'].push({i:json[i].i,n:json[i].n});
                                        self.cache['models'][json[i].i] = { l:json[i].s, i:json[i].i };
                                    }
                                }
                            }
                            else
                            {
                                for(var i=0, len =json.length;i<len;i++){
                                    self.cache['brands'].push({i:json[i].i,n:json[i].n});
                                    self.cache['models'][json[i].i] = { l:json[i].s, i:json[i].i };
                                }
                            }
                            for(var i=0, j=self.status.list.length; i<j; i++){
                                self.status.list[i](self.cache['brands']);
                            }
                        }
                    })
                }
            }
        },
        getModel:function(bid,callBack){
            var self=this;
            if( !bid||bid=='-1' ){
                callBack([]);
            }else{
                this.cache['models'][bid] ? callBack(this.cache['models'][bid]) : callBack([]);
            }
        },
        getYear:function(mid,callBack){
            var self=this;
            if( !mid||mid=='-1' ){
                callBack([]);
            }else{
                //var data = {"m":2050,"l":[{"y":2003,"t":[{"i":107810,"n":"1.8T ������"},{"i":107793,"n":"1.8T �����ͣ�����һ�壩"},{"i":107794,"n":"1.8T �����ͣ�����һ�壩"},{"i":107796,"n":"2.4 ������"},{"i":107809,"n":"1.8T ���������ͣ�����һ�壩"},{"i":107797,"n":"2.4 ����������"},{"i":107795,"n":"2.4 �����˶���"},{"i":107798,"n":"3.0 ������(����һ��)"}]},{"y":2006,"t":[{"i":107828,"n":"1.8T ������(�ֶ�)"},{"i":107827,"n":"1.8T �����ͣ��Զ���"},{"i":107831,"n":"1.8T ������"},{"i":107832,"n":"1.8T ������+"},{"i":107834,"n":"1.8T ������"},{"i":107833,"n":"1.8T ������"},{"i":107843,"n":"��A4 2.0T FSI ����һ���׼��"},{"i":107829,"n":"2.0T FSI? ������"},{"i":107830,"n":"3.0 quattro �콢��"}]},{"y":2007,"t":[{"i":107845,"n":"07�� 1.8T �ֶ���׼��"},{"i":107835,"n":"��A4 1.8T �ֶ�������"},{"i":107846,"n":"07�� 1.8T �ֶ�������"},{"i":107847,"n":"07�� 1.8T ����һ���׼��"},{"i":107836,"n":"��A4 1.8T ����һ�������"},{"i":107849,"n":"07�� 1.8T ����һ��������"},{"i":107837,"n":"��A4 1.8T ����һ��������"},{"i":107848,"n":"07�� 2.0T ����һ���׼��"},{"i":107853,"n":"1.8T �ֶ�һ�� ���Է���"},{"i":107850,"n":"07�� 2.0T ����һ��������"},{"i":107838,"n":"��A4 1.8T ����һ��������+"},{"i":107851,"n":"07�� 1.8T ����һ�������"},{"i":107839,"n":"��A4 1.8T ����һ�������"},{"i":107852,"n":"07�� 2.0T ����һ�������"},{"i":107840,"n":"��A4 1.8T ����һ�弼����"},{"i":107841,"n":"��A4 2.0T FSI ����һ���׼��"},{"i":107842,"n":"��A4 2.0T FSI ����һ�������"},{"i":107844,"n":"��A4 3.0 Quattro ����һ���콢�� ����"},{"i":107854,"n":"07�� 3.0 ���� Quattro �콢��"}]},{"y":2004,"t":[{"i":107800,"n":"1.8T ������"},{"i":107811,"n":"1.8T �����ͣ�����һ�壩"},{"i":107816,"n":"1.8T �����ͣ�����һ�壩"},{"i":107814,"n":"1.8T ���������ͣ�����һ�壩"},{"i":107813,"n":"2.4 ������"},{"i":107815,"n":"2.4 ����������"},{"i":107812,"n":"2.4 �����˶���"},{"i":107817,"n":"2.4 ������"},{"i":107799,"n":"3.0 Quattro����������"}]},{"y":2005,"t":[{"i":107802,"n":"1.8T �����ͣ��ֶ���"},{"i":107818,"n":"1.8T �����ͣ��ֶ���"},{"i":107819,"n":"1.8T ������(�ֶ�)"},{"i":107820,"n":"1.8T �����ͣ�����һ�壩"},{"i":107801,"n":"1.8T �����ͣ�����һ�壩"},{"i":107805,"n":"1.8T �����ͣ�����һ�壩"},{"i":107821,"n":"1.8T �����ͣ�����һ�壩"},{"i":107806,"n":"1.8T ������+������һ�壩"},{"i":107808,"n":"1.8T ������"},{"i":107822,"n":"1.8T ���������ͣ�����һ�壩"},{"i":107807,"n":"1.8T �����ͣ�����һ�壩"},{"i":107823,"n":"2.4 ���������ͣ�����һ�壩"},{"i":107824,"n":"2.4 �˶��ͣ�����һ�壩"},{"i":107803,"n":"2.0 FSI�����ͣ�����һ�壩"},{"i":107804,"n":"3.0i Quattro�콢��"},{"i":107826,"n":"3.0 �����ͣ�����һ�壩"},{"i":107825,"n":"3.0 �˶��ͣ�����һ�壩"}]},{"y":2008,"t":[{"i":111024,"n":"1.8T ������MT"},{"i":111023,"n":"1.8T ������AT"},{"i":111021,"n":"1.8T Sline(���Է���)"},{"i":107857,"n":"1.8T ������"},{"i":107858,"n":"2.0TFSI Sline(���Է���)"}]}]};
                this.cache['years'][mid] ? callBack(this.cache['trims'][mid]) :
                    $.getJSON(self.url.trim, {modelid:mid}, function(json){
                        var data=json.l;
                        data=data.sort(function(a,b){
                            return b.y-a.y;
                        });
                        self.cache['years'][mid] = [];
                        $.each(data, function(i, item)
                        {
                            self.cache['years'][mid].push(item.y);
                            self.cache['trims'][item.y] = item.t;
                        });

                        callBack(self.cache['years'][mid]);
                    });
            }
        },
        getTrim:function(yid, callback)
        {
            var self = this;
            if(!yid || yid == '-1')
            {
                callback([]);
            }
            else
            {
                this.cache['trims'][yid] ? callback(this.cache['trims'][yid]): callback([]);
            }
        }
    };

    var view={
        renderBrand:function(data){
            var self=this
                , name=this.option.bText
                , options='<option value="-1">' + name + '</option>'
                , id=this.current.brand.value||-1
                , index='A'
                , lastIndex='A'
                , indexHtml=''
                , brandName='';
            $(data).each(function(i,v){
                index=v.n.split(' ')[0]
                    , brandName=v.n.split(' ')[1];
                options += '<option value="' + v.i + '">' + brandName + '</option>';
            });
            self.E.$brand.html(options);
        },
        renderModel:function(data){
            var self=this
                , id=self.current.model.value||-1
                , name=this.option.mText;
            var options='<option value="-1">' + name + '</option>';

            $(data.l).each(function(i,v){
                $(v.b).each(function(i,v){
                    options+='<option value="' + v.i + '">' + v.n + '</option>';
                });
            });
            self.E.$model.html(options);
        },
        renderYear:function(data){
            var self = this
                ,id = self.current.year.value || -1
                ,name = this.option.yText
                ,options = '<option value="-1">' + name + '</option>';
            $(data).each(function(i,v)
            {
                options += '<option value="' + v + '">' + v + '</option>';
            });
            self.E.$year.html(options);
        },
        renderTrim:function(data){
            var self=this
                , id=self.current.trim.value||-1
                , name=this.option.tText
                , options='<option value="-1">'+name+'</option>';

            $(data).each(function(i,v){
                if(v.n)
                {
                    options += '<option value="' + v.i + '">' + v.n + '</option>';
                }
            });
            self.E.$trim.html(options);

        }
    };
    var carSelect=function(option){

        this.option=$.extend({},this.defaultOption,option);
        this.current={
            brand:{ name:'', value:this.option.bid },
            model:{ name:'', value:this.option.mid },
            year:{ name:'', value:this.option.yid },
            trim:{ name:'', value:this.option.tid }
        };

        var self=this,o=this.option;

        this.E={
            $brand:$(o.b),
            $model:$(o.m),
            $year:$(o.y),
            $trim:$(o.t)
        };

        var groupName='carSelect'+useIndex;
        useIndex++;

        this.E.$brand.change(function(event){
            self.current.brand={
                name:self.E.$brand.find("option:selected").text(),
                value:self.E.$brand.find("option:selected").val()
            };
            self.onModelChange();
            self.option.onChange.call(self,'brand',self.current.brand);
            self.current.select='brand';

            self.current.brand.value&&self.current.brand.value!='-1' ? self.E.$brand.removeClass('novalue') : self.E.$brand.addClass('novalue');
            self.current.brand.value&&self.current.brand.value!='-1' ? self.E.$model.removeClass('disabled') : self.E.$model.addClass('disabled');
            return false;
        });
        this.E.$model.change(function(event){
            self.current.model={
                name:self.E.$model.find("option:selected").text(),
                value:self.E.$model.find("option:selected").val()
            };
            self.onYearChange();
            self.option.onChange.call(self,'model',self.current.model);
            self.current.select='model';

            self.current.model.value&&self.current.model.value!='-1' ? self.E.$model.removeClass('novalue') : self.E.$model.addClass('novalue');
            self.current.model.value&&self.current.model.value!='-1' ? self.E.$year.prop('disabled', false) : self.E.$year.prop('disabled', true);
            return false;
        });

        this.E.$year.change(function(event){
            self.current.year = {
                name:self.E.$year.find("option:selected").text(),
                value:self.E.$year.find("option:selected").val()
            };
            self.onTrimChange();
            self.option.onChange.call(self,'year',self.current.year);
            self.current.select='year';

            self.current.year.value&&self.current.year.value!='-1' ? self.E.$year.removeClass('novalue') : self.E.$year.addClass('novalue');
            self.current.year.value&&self.current.year.value!='-1' ? self.E.$trim.prop('disabled', false) : self.E.$trim.prop('disabled', true);
            return false;
        });

        self.E.$trim.change(function(event){
            self.current.trim = {
                name:self.E.$trim.find("option:selected").text(),
                value:self.E.$trim.find("option:selected").val()
            };
            self.option.onChange.call(self, 'trim', self.current.trim);
            self.current.select = 'trim';
            return false;
        });

        this.Data=new Data( this.option );
        this.View=this.option.view;

        this.Data.getBrand(function(data){
            self.View.renderBrand.call(self,data);

            self.current.brand.value&&self.current.brand.value!='-1' ? self.E.$brand.removeClass('novalue') : self.E.$brand.addClass('novalue');
            self.current.brand.value&&self.current.brand.value!='-1' ? self.E.$model.removeClass('disabled') : self.E.$model.addClass('disabled');

            self.Data.getModel(self.current.brand.value,function(data)
            {
                self.View.renderModel.call(self,data);

                self.current.model.value&&self.current.model.value!='-1' ? self.E.$model.removeClass('novalue') : self.E.$model.addClass('novalue');
                self.current.model.value&&self.current.model.value!='-1' ? self.E.$trim.removeClass('disabled') : self.E.$trim.addClass('disabled');

                self.E.$year.length && self.Data.getYear(self.current.model.value,function(data){
                    self.View.renderYear.call(self,data);

                    self.current.year.value&&self.current.year.value!='-1' ? self.E.$year.prop('disabled', true).addClass('novalue') : self.E.$year.prop("disabled", false).removeClass("novalue");
                });
                self.E.$trim.length && self.Data.getTrim(self.current.model.value,function(data){
                    self.View.renderTrim.call(self,data);

                    self.current.trim.value&&self.current.trim.value!='-1' ? self.E.$trim.prop('disabled', true).addClass('novalue') : self.E.$trim.prop("disabled", false).removeClass("novalue");
                });
            })
        });
    };
    carSelect.prototype={
        defaultOption:{
            b:'',
            bid:'-1',
            bText:'ѡ��Ʒ��',
            m:'',
            mid:'-1',
            mText:'ѡ����',
            y:'',
            yid:'-1',
            yText:'ѡ�����',
            t:'',
            tid:'-1',
            tText:'ѡ�񳵿�',
            url:{
                brand:'http://2sc.sohu.com/js/new_model.js',
                trim:'/util/getTrimmModelListJson.jsp'
            },
            onChange:function(){},
            view:view
        },
        onBrandChange:function(event,data){
            this.current.brand=data||{};
            this.option.onChange.call(this,'brand',this.current.brand);
            this.onModelChange();
        },
        onModelChange:function(event,data){
            var self=this;
            this.current.model=data||{};
            this.Data.getModel(this.current.brand?this.current.brand.value:0,function(json){

                self.View.renderModel.call(self,json);

                self.option.onChange.call(self,'model',self.current.model);
                self.onTrimChange();
            });

        },
        onYearChange:function(event,data){
            if( !this.E.$year.length ) return;
            var self=this;
            this.current.year=data||{};
            this.Data.getYear(this.current.model?this.current.model.value:0,function(json){

                self.View.renderYear.call(self,json);
                self.option.onChange.call(self,'year',self.current.year);
            });

        },
        onTrimChange:function(event,data){
            if( !this.E.$trim.length ) return;
            var self=this;
            this.current.trim=data||{};
            this.Data.getTrim(this.current.year?this.current.year.value:0,function(json){

                self.View.renderTrim.call(self,json);
                self.option.onChange.call(self,'trim',self.current.trim);
            });

        },
        clear:function(){
            this.E.$brand.find('.menu-name').text( this.option.bText );
            this.E.$brand.find('ul:first').children().removeClass('current');
            this.E.$brand.trigger("change",[{name:'',value:''}]);
        }
    };
    return carSelect;
});

SA.register('DATA.AREA',function(a,$){
	var areas=[["����","bj,110000"],
		["���","tj,120000"],
		["�ӱ�","hb,130000","ʯ��ׯ","sjz,130100","��ɽ","tangshan,130200","�ػʵ�","qinhuangdao,130300","����","handan,130400","��̨","xingtai,130500","����","baoding,130600","�żҿ�","zhangjiakou,130700","�е�","chengde,130800","����","cangzhou,130900","�ȷ�","langfang,131000","��ˮ","hengshui,131100"],
		["ɽ��","shanxi,140000","̫ԭ","ty,140100","��ͬ","datong,140200","��Ȫ","yangquan,140300","����","changzhi,140400","����","jincheng,140500","˷��","shuozhou,140600","����","jinzhong,140700","�˳�","yuncheng,140800","����","xinzhou,140900","�ٷ�","linfen,141000","����","lvliang,141100"],
		["���ɹ�","nmg,150000","���ͺ���","hhht,150100","��ͷ","baotou,150200","�ں�","wuhai,150300","���","chifeng,150400","ͨ��","tongliao,150500","������˹","eerduosi,150600","���ױ���","hulunbeier,150700","�����׶�","bayannaoer,150800","�����첼","wulanchabu,150900","�˰���","xinganmeng,152200","���ֹ���","xilinguolemeng,152500","������","alashanmeng,152900"],
		["����","ln,210000","����","sy,210100","����","dl,210200","��ɽ","anshan,210300","��˳","fushun,210400","��Ϫ","benxi,210500","����","dandong,210600","����","jinzhou,210700","Ӫ��","yingkou,210800","����","fuxin,210900","����","liaoyang,211000","�̽�","panjin,211100","����","tieling,211200","������","chaoyangshi,211300","��«��","huludao,211400"],
		["����","jl,220000","����","cc,220100","������","jilin,220200","��ƽ","siping,220300","��Դ","liaoyuan,220400","ͨ��","tonghua,220500","��ɽ","baishan,220600","��ԭ","songyuan,220700","�׳�","baicheng,220800","�ӱ�","ybcxz,222400"],
		["������","hlj,230000","������","hrb,230100","�������","qiqihaer,230200","����","jixi,230300","�׸�","hegang,230400","˫Ѽɽ","shuangyashan,230500","����","daqing,230600","����","yichunshi,230700","��ľ˹","jiamusi,230800","��̨��","qitaihe,230900","ĵ����","mudanjiang,231000","�ں�","heihe,231100","�绯","suihua,231200","���˰���","dxaldq,232700"],
		["�Ϻ�","sh,310000"],
		["����","js,320000","�Ͼ�","nj,320100","����","wuxi,320200","����","xuzhou,320300","����","changzhou,320400","����","suzhou,320500","��ͨ","nantong,320600","���Ƹ�","lianyungang,320700","����","huaian,320800","�γ�","yancheng,320900","����","yangzhou,321000","��","zhenjiang,321100","̩��","jstaizhou,321200","��Ǩ","suqian,321300"],
		["�㽭","zj,330000","����","hz,330100","����","ningbo,330200","����","wenzhou,330300","����","jiaxing,330400","����","huzhou,330500","����","shaoxing,330600","��","jinhua,330700","����","quzhou,330800","��ɽ","zhoushan,330900","̨��","taizhou,331000","��ˮ","lishui,331100"],
		["����","ah,340000","�Ϸ�","hf,340100","�ߺ�","wuhu,340200","����","bengbu,340300","����","huainan,340400","��ɽ","maanshan,340500","����","huaibei,340600","ͭ��","tongling,340700","����","anqing,340800","��ɽ","huangshan,341000","����","chuzhou,341100","����","fuyang,341200","����","ahsuzhou,341300","����","chaohu,341400","����","liuan,341500","����","bozhou,341600","����","chizhou,341700","����","xuancheng,341800"],
		["����","fj,350000","����","fz,350100","����","xiamen,350200","����","putian,350300","����","sanming,350400","Ȫ��","quanzhou,350500","����","zhangzhou,350600","��ƽ","nanping,350700","����","longyan,350800","����","ningde,350900"],
		["����","jx,360000","�ϲ�","nc,360100","������","jingdezhen,360200","Ƽ��","pingxiang,360300","�Ž�","jiujiang,360400","����","xinyu,360500","ӥ̶","yingtan,360600","����","ganzhou,360700","����","jian,360800","�˴�","yichun,360900","����","fuzhou,361000","����","shangrao,361100"],
		["ɽ��","sd,370000","����","jn,370100","�ൺ","qd,370200","�Ͳ�","zibo,370300","��ׯ","zaozhuang,370400","��Ӫ","dongying,370500","��̨","yantai,370600","Ϋ��","weifang,370700","����","jining,370800","̩��","taian,370900","����","weihai,371000","����","rizhao,371100","����","laiwu,371200","����","linyi,371300","����","dezhou,371400","�ĳ�","liaocheng,371500","����","binzhou,371600","����","heze,371700"],
		["����","hn,410000","֣��","zz,410100","����","kaifeng,410200","����","luoyang,410300","ƽ��ɽ","pingdingshan,410400","����","anyang,410500","�ױ�","hebi,410600","����","xinxiang,410700","����","jiaozuo,410800","���","puyang,410900","���","xuchang,411000","���","luohe,411100","����Ͽ","sanmenxia,411200","����","nanyang,411300","����","shangqiu,411400","����","xinyang,411500","�ܿ�","zhoukou,411600","פ���","zhumadian,411700"],
		["����","hubei,420000","�人","wx,420100","��ʯ","huangshi,420200","ʮ��","shiyan,420300","�˲�","yichang,420500","����","xiangfan,420600","����","ezhou,420700","����","jingmen,420800","Т��","xiaogan,420900","����","jingzhou,421000","�Ƹ�","huanggang,421100","����","xianning,421200","����","suizhou,421300","��ʩ","estjzmz,422800","����","xiantao,429004","Ǳ��","hbqianjiang,429005","����","tianmen,429006"],
		["����","hunan,430000","��ɳ","cs,430100","����","zhuzhou,430200","��̶","xiangtan,430300","����","hengyang,430400","����","shaoyang,430500","����","yueyang,430600","����","changde,430700","�żҽ�","zhangjiajie,430800","����","yiyang,430900","����","chenzhou,431000","����","yongzhou,431100","����","huaihua,431200","¦��","loudi,431300","����","xxtjzmz,433100"],
		["�㶫","gd,440000","����","gz,440100","�ع�","shaoguan,440200","����","sz,440300","�麣","zhuhai,440400","��ͷ","shantou,440500","��ɽ","foshan,440600","����","jiangmen,440700","տ��","zhanjiang,440800","ï��","maoming,440900","����","zhaoqing,441200","����","huizhou,441300","÷��","meizhou,441400","��β","shanwei,441500","��Դ","heyuan,441600","����","yangjiang,441700","��Զ","qingyuan,441800","��ݸ","dongguan,441900","��ɽ","zhongshan,442000","����","chaozhou,445100","����","jieyang,445200","�Ƹ�","yunfu,445300"],
		["����","gx,450000","����","nn,450100","����","liuzhou,450200","����","guilin,450300","����","wuzhou,450400","����","beihai,450500","���Ǹ�","fangchenggang,450600","����","qinzhou,450700","���","guigang,450800","����","yulinshi,450900","��ɫ","baise,451000","����","hezhou,451100","�ӳ�","hechi,451200","����","laibin,451300","����","chongzuo,451400"],
		["����","hainan,460000","����","haikou,460100","����","sanya,460200","��ָɽ","wuzhishan,469001","��","qionghai,469002","����","danzhou,469003","�Ĳ�","wenchang,469005","����","wanning,469006","����","dongfang,469007","����","dingan,469025","�Ͳ�","tunchang,469026","����","chengmai,469027","�ٸ�","lingao,469028","��ɳ","bslz,469030","����","cjlz,469031","�ֶ�","ldlz,469033","��ˮ","lslz,469034","��ͤ","btlzmz,469035","����","qzlzmz,469036","��ɳ","xisha,469037","��ɳ","nansha,469038"],
		["����","cq,500000"],
		["�Ĵ�","sc,510000","�ɶ�","cd,510100","�Թ�","zigong,510300","��֦��","panzhihua,510400","����","luzhou,510500","����","deyang,510600","����","mianyang,510700","��Ԫ","guangyuan,510800","����","suining,510900","�ڽ�","neijiang,511000","��ɽ","leshan,511100","�ϳ�","nanchong,511300","üɽ","meishan,511400","�˱�","yibin,511500","�㰲","guangan,511600","����","dazhou,511700","�Ű�","yaan,511800","����","bazhong,511900","����","ziyang,512000","����","abzzqz,513200","����","gzzz,513300","��ɽ","lsyz,513400"],
		["����","guizhou,520000","����","gy,520100","����ˮ","liupanshui,520200","����","zunyi,520300","��˳","anshun,520400","ͭ��","tongren,522200","ǭ����","qxnbyzmz,522300","�Ͻ�","bijie,522400","ǭ����","qdnmzdz,522600","ǭ��","qnbyzmz,522700"],
		["����","yn,530000","����","km,530100","����","qujing,530300","��Ϫ","yuxi,530400","��ɽ","baoshanshi,530500","��ͨ","zhaotong,530600","����","lijiang,530700","˼é","simao,530800","�ٲ�","lincang,530900","����","cxyz,532300","���","hhhnzyz,532500","��ɽ","wszzmz,532600","��˫����","xsbndz,532800","����","dlbz,532900","�º�","dhdzjpz,533100","ŭ��","njlsz,533300","����","dqzz,533400"],
		["����","xz,540000","����","lasa,540100","����","changdou,542100","ɽ��","shannan,542200","�տ���","rikaze,542300","����","neiqu,542400","����","ali,542500","��֥","linzhi,542600"],
		["����","sx,610000","����","xa,610100","ͭ��","tongchuan,610200","����","baoji,610300","����","xianyang,610400","μ��","weinan,610500","�Ӱ�","yanan,610600","����","hanzhong,610700","����","yulin,610800","����","ankang,610900","����","shangluo,611000"],
		["����","gs,620000","����","lz,620100","������","jiayuguan,620200","���","jinchang,620300","����","baiyin,620400","��ˮ","tianshui,620500","����","wuwei,620600","��Ҵ","zhangye,620700","ƽ��","pingliang,620800","��Ȫ","jiuquan,620900","����","qingyang,621000","����","dingxi,621100","¤��","longnan,621200","����","lxhz,622900","����","gnzz,623000"],
		["�ຣ","qh,630000","����","xn,630100","����","haidong,632100","����","hbzz,632200","����","huangnanzz,632300","���ϲ���","hnzz,632500","����","glzz,632600","����","yszz,632700","����","hxmg,632800"],
		["����","nx,640000","����","yc,640100","ʯ��ɽ","shizuishan,640200","����","wuzhong,640300","��ԭ","guyuan,640400","����","zhongwei,640500"],
		["�½�","xj,650000","��³ľ��","wlmq,650100","��������","kelamayi,650200","��³��","tulufan,652100","����","hami,652200","����","cjhz,652300","��������","betlmg,652700","��������","byglmg,652800","������","akesu,652900","��������","kzlskekz,653000","��ʲ","kashen,653100","����","hetian,653200","����","ylhsk,654000","����","tacheng,654200","����̩","aletai,654300","ʯ����","shihezi,659001","������","alaer,659002","ͼľ���","tumushuke,659003","�����","wujiaqu,659004"],
		["̨��","tw,710000"],
		["���","xg,810000"],
		["����","am,820000"]]
	return areas;
});


SA.register('util.soip',function(a,$){
	var url='http://txt.go.sohu.com/ip/soip',
		list=[],
		isGet=false,isLoad=false;
	function ipLoaded(){
		for(var i=0,j=list.length;i<j;i++){
			try{ list[i]() }catch(e){}
		}
	}
	function getIp(){
		if(isGet) return;
		isGet=true;
		if( typeof(window.sohu_IP_Loc)=="undefined" ){
			a.scriptLoader({
				url:url,
				onComplete:function(){
					isLoad=true;
					ipLoaded();
				}
			});
		}else{
			isLoad=true;
			ipLoaded();
		}
	}
	return function( func ){
		if( isLoad ){
			func();
		}else{
			getIp();
			list.push( func );
		}
	}
});

SA.register('app.iplocation',function(a,$){
	var Config={url:'http://txt.go.sohu.com/ip/soip'},
		area=a.DATA.AREA,
		baseUrl='/';

	function getItemByCode( code ){
		var nt='',nt2='';
		if( !/^[0-9]+$/.test(code) ) return null;
		for( var i=0,j=area.length; i<j; i++ ){
			nt=area[i][1].split(',');
			if( nt[1].indexOf(code)==0 ){
				return { name:area[i][0], path:nt[0], code:nt[1] };
				break;
			}else{
				var d=area[i];
				for( var x=2,y=d.length; x<y; x+=2 ){
					nt2=d[x+1].split(',');
					if( nt2[1].indexOf(code)==0 ){
						return { name:d[x], path:nt[0]+'-'+nt2[0], code:nt2[1] };
						break;
					}
				}
			}
		}
		return null;
	}

	function findItemByPath( path ){
		var rs=/^\/([a-z]+)(-([a-z]+))?\//.exec( path ),nt='',nt2='';
		var province=rs[1],city=rs[3];
		if(province&&city){
			for( var i=0,j=area.length; i<j; i++ ){
				nt=area[i][1].split(',');
				if( nt[0]==province ){
					if( city ){
						var d=area[i];
						for( var x=2,y=d.length; x<y; x+=2 ){
							nt2=d[x+1].split(',');
							if( nt2[0]==city ){
								return { name:d[x], path:nt[0]+'-'+nt2[0], code:nt2[1] };
							}
						}
					}
					return { name:area[i][0], path:nt[0]+'-'+nt2[0], code:nt2[1] };
				}
			}
		}else if( province ){
			for( var i=0,j=area.length; i<j; i++ ){
				nt=area[i][1].split(',');
				if( nt[0]==province ){
					return { name:area[i][0], path:nt[0], code:nt[1] };
				}
				var d=area[i];
				for( var x=2,y=d.length; x<y; x+=2 ){
					nt2=d[x+1].split(',');
					if( nt2[0]==province ){
						return { name:d[x], path:nt[0]+'-'+nt2[0], code:nt2[1] };
					}
				}
			}
		}
		return null;
	}

	function drawHtml( item ){
		$('#city').text( item.name );
	}

	function ipLoaded( jump ){
		var code=window.sohu_IP_Loc.substr(2,6);
		var item=getItemByCode( code );
		if( !item ) return;
		SA.util.cookie.set('CITYCODE',item.code);
		drawHtml( item );
		jump && ( window.location.href=baseUrl+item.path+'/' );
	};

	return function(){
		var cookieCode=a.util.cookie.get('CITYCODE'), path=window.location.pathname;
		if(/^\/[a-z]+(-[a-z]+)?\/$/.test( path )){    //������ҳ
			var item=findItemByPath( path );
			if( item ){
				drawHtml( item );
				SA.util.cookie.set('CITYCODE',item.code);
			}else{
				a.util.soip( function(){ ipLoaded(false); } );
			}
		}else if(path=='/'){    //�������ҳ
			if( cookieCode ){   //��cookie ͨ��cookie�жϲ���ת
				if( cookieCode=='000000' ){
					drawHtml( {name:'ȫ��', path:'' } );
					return;
				}
				var item=getItemByCode( cookieCode );
				if( !item ){
					a.util.soip( function(){ ipLoaded(true); } );
				}else{
					drawHtml( item );
					window.location.href=baseUrl+item.path+'/'
				}
			}else{   //û��cookie ͨ��ip�жϲ���ת
				a.util.soip( function(){ ipLoaded(true); } );
			}
		}else if(path!='/'){    //���������ҳ
			if( cookieCode ){   //��cookie ͨ��cookie�ж�
				if( cookieCode=='000000' ){
					drawHtml( {name:'ȫ��', path:'' } );
					return;
				}
				var item=getItemByCode( cookieCode );
				if( !item ){
					a.util.soip( function(){ ipLoaded(false); } );
				}else{
					drawHtml( item );
				}
			}else{   //û��cookie ͨ��ip�ж�
				a.util.soip( function(){ ipLoaded(false); } );
			}
		}
	}
});

SA.register('app.passport',function(a,$){
	window.Passport= {
		setOptions: function(options){
			this.userInfoUrl = options.userInfoUrl || '/util/getUserInfo.jsp';        // ��ȡ�û���Ϣ��URL
			this.noticeUrl = options.noticeUrl || 'http://i.auto.sohu.com/user/message/listNotice.at';         // ֪ͨ��URL
			this.messageUrl = options.messageUrl || 'http://i.auto.sohu.com/user/message/listRec.at';                // վ���ŵ�URL
			this.nicknameUrl = options.nicknameUrl || 'http://i.auto.sohu.com/user/inner/mainUser.at';               // �ǳƵ�URL
			this.activateUrl = options.activateUrl || 'http://saa.auto.sohu.com/reg/active.at';                  // ����ҳ���URL
			this.registerUrl = options.registerUrl || 'http://saa.auto.sohu.com/reg/register.at';                // ע���URL
			this.onlineUrl = options.onlineUrl || 'http://suvset.auto.sohu.com/autoOnlineTimer/touch';               // ����ͳ��URL
			this.levelUrl = options.levelUrl || 'http://saa.auto.sohu.com/club/10815/thread-TPVW7WOJ4z80hKBAAAA-1.shtml';	// �ȼ���URL
			this.isShowLevel = options.isShowLevel || false;
			this.onlineModule = options.onlineModule || '';

		},
		init: function(id, options){
			if( !PassportSC.cookieHandle() ) return;
			var that = this;
		
			/* ��¼�ɹ��� */
			PassportSC.drawPassportCard = function(){
				//this.cElement.innerHTML = '<span id="logoutBox"></span><span id="ppcontid"></span>';
				this._drawPassportCard();
			};
			PassportSC._drawPassportCard = function(){
				//this.cElement.innerHTML = '<span id="logoutBox"></span><span id="ppcontid"></span>';
				that.getUserInfo();
			};
			
			
			this.setOptions(options);
			PassportSC.drawLoginForm = function(){
				return;
				this.cElement.innerHTML = '<form onsubmit="return PassportSC.doLogin();" method="post" name="loginform">'+
					'<span id="ppcontid">'+
					'<input value="1" type="hidden" name="persistentcookie" /> '+
					'<label for="username">�û�����</label> '+
					'<input id="username" class="hl_input" value="ͨ��֤�ʺ�/�ֻ���" name="email" autocomplete="off" disableautocomplete="" />'+

					'<label for="passwd">���룺</label> '+
					'<input id="passwd" class="hl_input" value="" type="password" name="password" autocomplete="off" disableautocomplete="" />'+
					'<input class="hl_login" value="��¼" type="submit" />'+
					'<a class="register" href="http://saa.auto.sohu.com/reg/register.at" target="_blank">ע��</a></span>'+
					'</form>';
			};
			/* ��¼�ȴ���Ϣ */
			PassportSC.drawPassportWait = function(A){
				//this.cElement.innerHTML = '<span>ϵͳ���ڵ�¼�����Ժ�</span>';
			};
			PassportSC.doLogout=function(){
				document.location.href="http://passport.sohu.com/sso/logout_js.jsp?s="+(new Date()).getTime() + "&ru="+document.location.href;
			}

			var possportCard = document.getElementById(id);
			PassportSC.appid = 1066;
			PassportSC.drawPassport( possportCard );
		},
		getUserInfo: function(){
			var self = this;
			//var param={t:new Date().getTime(),func:'SA.app.passport.onUserInfoComplete'};
			//a.scriptLoader({url:this.userInfoUrl+'?'+$.param(param)});
			var getUserInfoUrl = this.userInfoUrl+'?passport='+PassportSC.cookieHandle();
			$.ajax({url:getUserInfoUrl, type:"post", success:function (data) {
					self.onUserInfoComplete(data);
				}
			})
		},
		onUserInfoComplete: function(data){
			var that = this;
			var dataObj = eval("("+data+")");
			if(dataObj.flag == 0){
				var userName = dataObj.userName;
				var carSize = dataObj.dealerCarSize;
				var text = '<a href="http://mobile.auto.sohu.com/mainpage/ershou.jsp" target="_blank">�ֻ��������ֳ�</a>&nbsp;|&nbsp;'
						+'<strong class="self-message">���ã�'+userName+'</strong>&nbsp;&nbsp;'
		      			+'<a href="/usercenter/car/" target="_blank">�����ҵĶ��ֳ�('+carSize+'̨)</a>&nbsp;&nbsp;'
		      			+'<a href="/usercenter/favorite/" target="_blank">�鿴�ҵ��ղ�</a>&nbsp;&nbsp;'
		      			+'<a href="/sell/addCar_1.shtml" target="_blank">������Դ</a>&nbsp;&nbsp;'
	      				+'<a href="javascript:logout();">�˳�</a>';
	      		PassportSC.cElement.innerHTML = text;
			}else if(dataObj.flag == 1){
				var userName = dataObj.userName;
				var dealerId = dataObj.dealerId;
				var dealerUrl = '/dealer/'+dealerId+'/';
				var text = '<a href="http://mobile.auto.sohu.com/mainpage/ershou.jsp" target="_blank">�ֻ��������ֳ�</a>&nbsp;|&nbsp;'
					+'<strong class="self-message">���ã�'+ userName+'</strong>&nbsp;&nbsp;'
			      		+'<a href="http://2sc.sohu.com/ctb/" target="_blank">���복ͨ��</a>&nbsp;&nbsp;'
			      		+'<a href="http://2sc.sohu.com/ctb/uscar-carAdd.do" target="_blank">������Դ</a>&nbsp;&nbsp;'
			      		+'<a href="'+dealerUrl+'" target="_blank">�鿴����</a>&nbsp;&nbsp;'
			      		+'<a href="javascript:logout();">�˳�</a>&nbsp;&nbsp;'
			      		+'<a href="http://2sc.sohu.com/t/" target="_blank" class="red">������������</a>&nbsp;&nbsp;'
			      		+'<a href="/s2013/2scganendapaisong/index.shtml" target="_blank" class="red">�Ƽ��н�</a>';
				PassportSC.cElement.innerHTML = text;
			}else{
				var text = '<a href="http://mobile.auto.sohu.com/mainpage/ershou.jsp" target="_blank">�ֻ��������ֳ�</a>&nbsp;|&nbsp;'
						+'<strong>���ˣ�</strong>'
						+'<a href="http://2sc.sohu.com/bj/sell/addCar_1.shtml" target="_blank">������Դ</a>&nbsp;'
						+'<a href="/usercenter/phone/" target="_blank">��Դ����</a>&nbsp;'
						+'<a href="/usercenter/login/" target="_blank">�ҵ��ղ�</a>&nbsp;|&nbsp;'
						+'<strong>�̼ң�</strong>'
						+'<a href="http://2sc.sohu.com/ctb/" target="_blank">��¼</a>&nbsp;'
						+'<a href="http://2sc.sohu.com/ctb/dealer-regDealer.do" target="_blank">�����������������</a>&nbsp;'
						+'<a href="http://2sc.sohu.com/t/" target="_blank" class="red">������������</a>&nbsp;'
						+'<a href="/s2013/2scganendapaisong/index.shtml" target="_blank" class="red">�Ƽ��н�</a>';
				PassportSC.cElement.innerHTML = text;
			}
		},
		setOnline: function(userid){
			return;
			var passport = PassportSC.cookieHandle();
			var module = this.onlineModule;
			if(module!=''){
				var param = {'passport': passport, 'module': module};
				a.scriptLoader({url:this.onlineUrl+'?'+$.param(param)});
			}
		}
	};

	return Passport
});


/**
 * @param {Bool} type [0,1,2]
 * @param {function} func
 */
SA.register('job',function(a,$){
	var jobs=[];
	var Job={
		add:function(namespace,func)
		{
			var s=namespace.split('.');
			jobs.push({category:s[1]||'global',name:s[0],func:func});
		},
		run:function( category )
		{
			for(var i=0,j=jobs.length;i<j;i++){
				if( !( category && jobs[i].category==category || jobs[i].category=='global') ) continue;

				try {
					var z=jobs[i],beginTime=(new Date).getTime();
					z.func(a,$);
					a.log( '{job:'+z.name+', category:'+z.category+'} have been run, use ' + ( (new Date).getTime()-beginTime ) + ' ms', 'profile', 'SA.job' );
				} catch (e) {
					a.log( e, 'SA.job');
				}
			}
		}
	}
	return Job;
});




var cityProvince2sc={hot:[{n:"ȫ��",en:"",i:'000000'},{n:"����",en:"bj",i:110000},{n:"�Ϻ�",en:"sh",i:310000},{n:"����",en:"gd-gz",i:440100},{n:"����",en:"gd-sz",i:440300},{n:"�ɶ�",en:"sc-cd",i:510100},{n:"����",en:"cq",i:500000},{n:"����",en:"zj-hz",i:330100},{n:"����",en:"js-suzhou",i:320500},{n:"֣��",en:"hn-zz",i:410100},{n:"�人",en:"hubei-wx",i:420100},{n:"�ൺ",en:"sd-qd",i:370200},{n:"����",en:"ln-sy",i:210100}],letter:[{a:[{n:"����",en:"ah",i:"340000",c:[{n:"�Ϸ�",en:"hf",i:"340100"},{n:"�ߺ�",en:"wuhu",i:"340200"},{n:"����",en:"bengbu",i:"340300"},{n:"����",en:"huainan",i:"340400"},{n:"��ɽ",en:"maanshan",i:"340500"},{n:"����",en:"huaibei",i:"340600"},{n:"ͭ��",en:"tongling",i:"340700"},{n:"����",en:"anqing",i:"340800"},{n:"��ɽ",en:"huangshan",i:"341000"},{n:"����",en:"chuzhou",i:"341100"},{n:"����",en:"fuyang",i:"341200"},{n:"����",en:"ahsuzhou",i:"341300"},{n:"����",en:"chaohu",i:"341400"},{n:"����",en:"liuan",i:"341500"},{n:"����",en:"bozhou",i:"341600"},{n:"����",en:"chizhou",i:"341700"},{n:"����",en:"xuancheng",i:"341800"}]}]},{b:[{n:"����",en:"bj",i:"110000",c:[]}]},{c:[{n:"����",en:"cq",i:"500000",c:[]}]},{d:[]},{e:[]},{f:[{n:"����",en:"fj",i:"350000",c:[{n:"����",en:"fz",i:"350100"},{n:"����",en:"xiamen",i:"350200"},{n:"����",en:"putian",i:"350300"},{n:"����",en:"sanming",i:"350400"},{n:"Ȫ��",en:"quanzhou",i:"350500"},{n:"����",en:"zhangzhou",i:"350600"},{n:"��ƽ",en:"nanping",i:"350700"},{n:"����",en:"longyan",i:"350800"},{n:"����",en:"ningde",i:"350900"}]}]},{g:[{n:"�㶫",en:"gd",i:"440000",c:[{n:"����",en:"gz",i:"440100"},{n:"�ع�",en:"shaoguan",i:"440200"},{n:"����",en:"sz",i:"440300"},{n:"�麣",en:"zhuhai",i:"440400"},{n:"��ͷ",en:"shantou",i:"440500"},{n:"��ɽ",en:"foshan",i:"440600"},{n:"����",en:"jiangmen",i:"440700"},{n:"տ��",en:"zhanjiang",i:"440800"},{n:"ï��",en:"maoming",i:"440900"},{n:"����",en:"zhaoqing",i:"441200"},{n:"����",en:"huizhou",i:"441300"},{n:"÷��",en:"meizhou",i:"441400"},{n:"��β",en:"shanwei",i:"441500"},{n:"��Դ",en:"heyuan",i:"441600"},{n:"����",en:"yangjiang",i:"441700"},{n:"��Զ",en:"qingyuan",i:"441800"},{n:"��ݸ",en:"dongguan",i:"441900"},{n:"��ɽ",en:"zhongshan",i:"442000"},{n:"����",en:"chaozhou",i:"445100"},{n:"����",en:"jieyang",i:"445200"},{n:"�Ƹ�",en:"yunfu",i:"445300"}]},{n:"����",en:"gx",i:"450000",c:[{n:"����",en:"nn",i:"450100"},{n:"����",en:"liuzhou",i:"450200"},{n:"����",en:"guilin",i:"450300"},{n:"����",en:"wuzhou",i:"450400"},{n:"����",en:"beihai",i:"450500"},{n:"���Ǹ�",en:"fangchenggang",i:"450600"},{n:"����",en:"qinzhou",i:"450700"},{n:"���",en:"guigang",i:"450800"},{n:"����",en:"yulinshi",i:"450900"},{n:"��ɫ",en:"baise",i:"451000"},{n:"����",en:"hezhou",i:"451100"},{n:"�ӳ�",en:"hechi",i:"451200"},{n:"����",en:"laibin",i:"451300"},{n:"����",en:"chongzuo",i:"451400"}]},{n:"����",en:"guizhou",i:"520000",c:[{n:"����",en:"gy",i:"520100"},{n:"����ˮ",en:"liupanshui",i:"520200"},{n:"����",en:"zunyi",i:"520300"},{n:"��˳",en:"anshun",i:"520400"},{n:"ͭ��",en:"tongren",i:"522200"},{n:"ǭ����",en:"qxnbyzmz",i:"522300"},{n:"�Ͻ�",en:"bijie",i:"522400"},{n:"ǭ����",en:"qdnmzdz",i:"522600"},{n:"ǭ��",en:"qnbyzmz",i:"522700"}]},{n:"����",en:"gs",i:"620000",c:[{n:"����",en:"lz",i:"620100"},{n:"������",en:"jiayuguan",i:"620200"},{n:"���",en:"jinchang",i:"620300"},{n:"����",en:"baiyin",i:"620400"},{n:"��ˮ",en:"tianshui",i:"620500"},{n:"����",en:"wuwei",i:"620600"},{n:"��Ҵ",en:"zhangye",i:"620700"},{n:"ƽ��",en:"pingliang",i:"620800"},{n:"��Ȫ",en:"jiuquan",i:"620900"},{n:"����",en:"qingyang",i:"621000"},{n:"����",en:"dingxi",i:"621100"},{n:"¤��",en:"longnan",i:"621200"},{n:"����",en:"lxhz",i:"622900"},{n:"����",en:"gnzz",i:"623000"}]}]},{h:[{n:"�ӱ�",en:"hb",i:"130000",c:[{n:"ʯ��ׯ",en:"sjz",i:"130100"},{n:"��ɽ",en:"tangshan",i:"130200"},{n:"�ػʵ�",en:"qinhuangdao",i:"130300"},{n:"����",en:"handan",i:"130400"},{n:"��̨",en:"xingtai",i:"130500"},{n:"����",en:"baoding",i:"130600"},{n:"�żҿ�",en:"zhangjiakou",i:"130700"},{n:"�е�",en:"chengde",i:"130800"},{n:"����",en:"cangzhou",i:"130900"},{n:"�ȷ�",en:"langfang",i:"131000"},{n:"��ˮ",en:"hengshui",i:"131100"}]},{n:"������",en:"hlj",i:"230000",c:[{n:"������",en:"hrb",i:"230100"},{n:"�������",en:"qiqihaer",i:"230200"},{n:"����",en:"jixi",i:"230300"},{n:"�׸�",en:"hegang",i:"230400"},{n:"˫Ѽɽ",en:"shuangyashan",i:"230500"},{n:"����",en:"daqing",i:"230600"},{n:"����",en:"yichunshi",i:"230700"},{n:"��ľ˹",en:"jiamusi",i:"230800"},{n:"��̨��",en:"qitaihe",i:"230900"},{n:"ĵ����",en:"mudanjiang",i:"231000"},{n:"�ں�",en:"heihe",i:"231100"},{n:"�绯",en:"suihua",i:"231200"},{n:"���˰���",en:"dxaldq",i:"232700"}]},{n:"����",en:"hn",i:"410000",c:[{n:"֣��",en:"zz",i:"410100"},{n:"����",en:"kaifeng",i:"410200"},{n:"����",en:"luoyang",i:"410300"},{n:"ƽ��ɽ",en:"pingdingshan",i:"410400"},{n:"����",en:"anyang",i:"410500"},{n:"�ױ�",en:"hebi",i:"410600"},{n:"����",en:"xinxiang",i:"410700"},{n:"����",en:"jiaozuo",i:"410800"},{n:"���",en:"puyang",i:"410900"},{n:"���",en:"xuchang",i:"411000"},{n:"���",en:"luohe",i:"411100"},{n:"����Ͽ",en:"sanmenxia",i:"411200"},{n:"����",en:"nanyang",i:"411300"},{n:"����",en:"shangqiu",i:"411400"},{n:"����",en:"xinyang",i:"411500"},{n:"�ܿ�",en:"zhoukou",i:"411600"},{n:"פ���",en:"zhumadian",i:"411700"}]},{n:"����",en:"hubei",i:"420000",c:[{n:"�人",en:"wx",i:"420100"},{n:"��ʯ",en:"huangshi",i:"420200"},{n:"ʮ��",en:"shiyan",i:"420300"},{n:"�˲�",en:"yichang",i:"420500"},{n:"�差",en:"xiangfan",i:"420600"},{n:"����",en:"ezhou",i:"420700"},{n:"����",en:"jingmen",i:"420800"},{n:"Т��",en:"xiaogan",i:"420900"},{n:"����",en:"jingzhou",i:"421000"},{n:"�Ƹ�",en:"huanggang",i:"421100"},{n:"����",en:"xianning",i:"421200"},{n:"����",en:"suizhou",i:"421300"},{n:"��ʩ",en:"estjzmz",i:"422800"},{n:"����",en:"xiantao",i:"429004"},{n:"Ǳ��",en:"hbqianjiang",i:"429005"},{n:"����",en:"tianmen",i:"429006"}]},{n:"����",en:"hunan",i:"430000",c:[{n:"��ɳ",en:"cs",i:"430100"},{n:"����",en:"zhuzhou",i:"430200"},{n:"��̶",en:"xiangtan",i:"430300"},{n:"����",en:"hengyang",i:"430400"},{n:"����",en:"shaoyang",i:"430500"},{n:"����",en:"yueyang",i:"430600"},{n:"����",en:"changde",i:"430700"},{n:"�żҽ�",en:"zhangjiajie",i:"430800"},{n:"����",en:"yiyang",i:"430900"},{n:"����",en:"chenzhou",i:"431000"},{n:"����",en:"yongzhou",i:"431100"},{n:"����",en:"huaihua",i:"431200"},{n:"¦��",en:"loudi",i:"431300"},{n:"����",en:"xxtjzmz",i:"433100"}]},{n:"����",en:"hainan",i:"460000",c:[{n:"����",en:"haikou",i:"460100"},{n:"����",en:"sanya",i:"460200"},{n:"��ָɽ",en:"wuzhishan",i:"469001"},{n:"��",en:"qionghai",i:"469002"},{n:"����",en:"danzhou",i:"469003"},{n:"�Ĳ�",en:"wenchang",i:"469005"},{n:"����",en:"wanning",i:"469006"},{n:"����",en:"dongfang",i:"469007"},{n:"����",en:"dingan",i:"469025"},{n:"�Ͳ�",en:"tunchang",i:"469026"},{n:"����",en:"chengmai",i:"469027"},{n:"�ٸ�",en:"lingao",i:"469028"},{n:"��ɳ",en:"bslz",i:"469030"},{n:"����",en:"cjlz",i:"469031"},{n:"�ֶ�",en:"ldlz",i:"469033"},{n:"��ˮ",en:"lslz",i:"469034"},{n:"��ͤ",en:"btlzmz",i:"469035"},{n:"����",en:"qzlzmz",i:"469036"},{n:"��ɳ",en:"xisha",i:"469037"},{n:"��ɳ",en:"nansha",i:"469038"}]}]},{i:[]},{j:[{n:"����",en:"jl",i:"220000",c:[{n:"����",en:"cc",i:"220100"},{n:"������",en:"jilin",i:"220200"},{n:"��ƽ",en:"siping",i:"220300"},{n:"��Դ",en:"liaoyuan",i:"220400"},{n:"ͨ��",en:"tonghua",i:"220500"},{n:"��ɽ",en:"baishan",i:"220600"},{n:"��ԭ",en:"songyuan",i:"220700"},{n:"�׳�",en:"baicheng",i:"220800"},{n:"�ӱ�",en:"ybcxz",i:"222400"}]},{n:"����",en:"js",i:"320000",c:[{n:"�Ͼ�",en:"nj",i:"320100"},{n:"����",en:"wuxi",i:"320200"},{n:"����",en:"xuzhou",i:"320300"},{n:"����",en:"changzhou",i:"320400"},{n:"����",en:"suzhou",i:"320500"},{n:"��ͨ",en:"nantong",i:"320600"},{n:"���Ƹ�",en:"lianyungang",i:"320700"},{n:"����",en:"huaian",i:"320800"},{n:"�γ�",en:"yancheng",i:"320900"},{n:"����",en:"yangzhou",i:"321000"},{n:"��",en:"zhenjiang",i:"321100"},{n:"̩��",en:"jstaizhou",i:"321200"},{n:"��Ǩ",en:"suqian",i:"321300"}]},{n:"����",en:"jx",i:"360000",c:[{n:"�ϲ�",en:"nc",i:"360100"},{n:"������",en:"jingdezhen",i:"360200"},{n:"Ƽ��",en:"pingxiang",i:"360300"},{n:"�Ž�",en:"jiujiang",i:"360400"},{n:"����",en:"xinyu",i:"360500"},{n:"ӥ̶",en:"yingtan",i:"360600"},{n:"����",en:"ganzhou",i:"360700"},{n:"����",en:"jian",i:"360800"},{n:"�˴�",en:"yichun",i:"360900"},{n:"����",en:"fuzhou",i:"361000"},{n:"����",en:"shangrao",i:"361100"}]}]},{k:[]},{l:[{n:"����",en:"ln",i:"210000",c:[{n:"����",en:"sy",i:"210100"},{n:"����",en:"dl",i:"210200"},{n:"��ɽ",en:"anshan",i:"210300"},{n:"��˳",en:"fushun",i:"210400"},{n:"��Ϫ",en:"benxi",i:"210500"},{n:"����",en:"dandong",i:"210600"},{n:"����",en:"jinzhou",i:"210700"},{n:"Ӫ��",en:"yingkou",i:"210800"},{n:"����",en:"fuxin",i:"210900"},{n:"����",en:"liaoyang",i:"211000"},{n:"�̽�",en:"panjin",i:"211100"},{n:"����",en:"tieling",i:"211200"},{n:"������",en:"chaoyangshi",i:"211300"},{n:"��«��",en:"huludao",i:"211400"}]}]},{m:[]},{n:[{n:"���ɹ�",en:"nmg",i:"150000",c:[{n:"���ͺ���",en:"hhht",i:"150100"},{n:"��ͷ",en:"baotou",i:"150200"},{n:"�ں�",en:"wuhai",i:"150300"},{n:"���",en:"chifeng",i:"150400"},{n:"ͨ��",en:"tongliao",i:"150500"},{n:"������˹",en:"eerduosi",i:"150600"},{n:"���ױ���",en:"hulunbeier",i:"150700"},{n:"�����׶�",en:"bayannaoer",i:"150800"},{n:"�����첼",en:"wulanchabu",i:"150900"},{n:"�˰���",en:"xinganmeng",i:"152200"},{n:"���ֹ���",en:"xilinguolemeng",i:"152500"},{n:"��������",en:"alashanmeng",i:"152900"}]},{n:"����",en:"nx",i:"640000",c:[{n:"����",en:"yc",i:"640100"},{n:"ʯ��ɽ",en:"shizuishan",i:"640200"},{n:"����",en:"wuzhong",i:"640300"},{n:"��ԭ",en:"guyuan",i:"640400"},{n:"����",en:"zhongwei",i:"640500"}]}]},{o:[]},{p:[]},{q:[{n:"�ຣ",en:"qh",i:"630000",c:[{n:"����",en:"xn",i:"630100"},{n:"����",en:"haidong",i:"632100"},{n:"����",en:"hbzz",i:"632200"},{n:"����",en:"huangnanzz",i:"632300"},{n:"����",en:"hnzz",i:"632500"},{n:"����",en:"glzz",i:"632600"},{n:"����",en:"yszz",i:"632700"},{n:"����",en:"hxmg",i:"632800"}]}]},{r:[]},{s:[{n:"ɽ��",en:"shanxi",i:"140000",c:[{n:"̫ԭ",en:"ty",i:"140100"},{n:"��ͬ",en:"datong",i:"140200"},{n:"��Ȫ",en:"yangquan",i:"140300"},{n:"����",en:"changzhi",i:"140400"},{n:"����",en:"jincheng",i:"140500"},{n:"˷��",en:"shuozhou",i:"140600"},{n:"����",en:"jinzhong",i:"140700"},{n:"�˳�",en:"yuncheng",i:"140800"},{n:"����",en:"xinzhou",i:"140900"},{n:"�ٷ�",en:"linfen",i:"141000"},{n:"����",en:"lvliang",i:"141100"}]},{n:"�Ϻ�",en:"sh",i:"310000",c:[]},{n:"ɽ��",en:"sd",i:"370000",c:[{n:"����",en:"jn",i:"370100"},{n:"�ൺ",en:"qd",i:"370200"},{n:"�Ͳ�",en:"zibo",i:"370300"},{n:"��ׯ",en:"zaozhuang",i:"370400"},{n:"��Ӫ",en:"dongying",i:"370500"},{n:"��̨",en:"yantai",i:"370600"},{n:"Ϋ��",en:"weifang",i:"370700"},{n:"����",en:"jining",i:"370800"},{n:"̩��",en:"taian",i:"370900"},{n:"����",en:"weihai",i:"371000"},{n:"����",en:"rizhao",i:"371100"},{n:"����",en:"laiwu",i:"371200"},{n:"����",en:"linyi",i:"371300"},{n:"����",en:"dezhou",i:"371400"},{n:"�ĳ�",en:"liaocheng",i:"371500"},{n:"����",en:"binzhou",i:"371600"},{n:"����",en:"heze",i:"371700"}]},{n:"�Ĵ�",en:"sc",i:"510000",c:[{n:"�ɶ�",en:"cd",i:"510100"},{n:"�Թ�",en:"zigong",i:"510300"},{n:"��֦��",en:"panzhihua",i:"510400"},{n:"����",en:"luzhou",i:"510500"},{n:"����",en:"deyang",i:"510600"},{n:"����",en:"mianyang",i:"510700"},{n:"��Ԫ",en:"guangyuan",i:"510800"},{n:"����",en:"suining",i:"510900"},{n:"�ڽ�",en:"neijiang",i:"511000"},{n:"��ɽ",en:"leshan",i:"511100"},{n:"�ϳ�",en:"nanchong",i:"511300"},{n:"üɽ",en:"meishan",i:"511400"},{n:"�˱�",en:"yibin",i:"511500"},{n:"�㰲",en:"guangan",i:"511600"},{n:"����",en:"dazhou",i:"511700"},{n:"�Ű�",en:"yaan",i:"511800"},{n:"����",en:"bazhong",i:"511900"},{n:"����",en:"ziyang",i:"512000"},{n:"����",en:"abzzqz",i:"513200"},{n:"����",en:"gzzz",i:"513300"},{n:"��ɽ",en:"lsyz",i:"513400"}]},{n:"����",en:"sx",i:"610000",c:[{n:"����",en:"xa",i:"610100"},{n:"ͭ��",en:"tongchuan",i:"610200"},{n:"����",en:"baoji",i:"610300"},{n:"����",en:"xianyang",i:"610400"},{n:"μ��",en:"weinan",i:"610500"},{n:"�Ӱ�",en:"yanan",i:"610600"},{n:"����",en:"hanzhong",i:"610700"},{n:"����",en:"yulin",i:"610800"},{n:"����",en:"ankang",i:"610900"},{n:"����",en:"shangluo",i:"611000"}]}]},{t:[{n:"���",en:"tj",i:"120000",c:[]}]},{u:[]},{v:[]},{w:[]},{x:[{n:"����",en:"xz",i:"540000",c:[{n:"����",en:"lasa",i:"540100"},{n:"����",en:"changdou",i:"542100"},{n:"ɽ��",en:"shannan",i:"542200"},{n:"�տ���",en:"rikaze",i:"542300"},{n:"����",en:"neiqu",i:"542400"},{n:"����",en:"ali",i:"542500"},{n:"��֥",en:"linzhi",i:"542600"}]},{n:"�½�",en:"xj",i:"650000",c:[{n:"��³ľ��",en:"wlmq",i:"650100"},{n:"��������",en:"kelamayi",i:"650200"},{n:"��³��",en:"tulufan",i:"652100"},{n:"����",en:"hami",i:"652200"},{n:"����",en:"cjhz",i:"652300"},{n:"��������",en:"betlmg",i:"652700"},{n:"��������",en:"byglmg",i:"652800"},{n:"������",en:"akesu",i:"652900"},{n:"��������",en:"kzlskekz",i:"653000"},{n:"��ʲ",en:"kashen",i:"653100"},{n:"����",en:"hetian",i:"653200"},{n:"����",en:"ylhsk",i:"654000"},{n:"����",en:"tacheng",i:"654200"},{n:"����̩",en:"aletai",i:"654300"},{n:"ʯ����",en:"shihezi",i:"659001"},{n:"������",en:"alaer",i:"659002"},{n:"ͼľ���",en:"tumushuke",i:"659003"},{n:"�����",en:"wujiaqu",i:"659004"}]}]},{y:[{n:"����",en:"yn",i:"530000",c:[{n:"����",en:"km",i:"530100"},{n:"����",en:"qujing",i:"530300"},{n:"��Ϫ",en:"yuxi",i:"530400"},{n:"��ɽ",en:"baoshanshi",i:"530500"},{n:"��ͨ",en:"zhaotong",i:"530600"},{n:"����",en:"lijiang",i:"530700"},{n:"˼é",en:"simao",i:"530800"},{n:"�ٲ�",en:"lincang",i:"530900"},{n:"����",en:"cxyz",i:"532300"},{n:"���",en:"hhhnzyz",i:"532500"},{n:"��ɽ",en:"wszzmz",i:"532600"},{n:"��˫����",en:"xsbndz",i:"532800"},{n:"����",en:"dlbz",i:"532900"},{n:"�º�",en:"dhdzjpz",i:"533100"},{n:"ŭ��",en:"njlsz",i:"533300"},{n:"����",en:"dqzz",i:"533400"}]}]},{z:[{n:"�㽭",en:"zj",i:"330000",c:[{n:"����",en:"hz",i:"330100"},{n:"����",en:"ningbo",i:"330200"},{n:"����",en:"wenzhou",i:"330300"},{n:"����",en:"jiaxing",i:"330400"},{n:"����",en:"huzhou",i:"330500"},{n:"����",en:"shaoxing",i:"330600"},{n:"��",en:"jinhua",i:"330700"},{n:"����",en:"quzhou",i:"330800"},{n:"��ɽ",en:"zhoushan",i:"330900"},{n:"̨��",en:"taizhou",i:"331000"},{n:"��ˮ",en:"lishui",i:"331100"}]}]}]};
SA.register('twosc.selectcity', function(a,$){
	var Data,
		View,
		hotArr = null,
		prov = [],
		cityobj ={},
		menuArr = [],
		select = null;
	var closeMenu = function (){
		for(var i=0,l=menuArr.length;i<l;i++){
			menuArr[i].css('display','none');
		}
		if(select){
			select.removeClass('city-select-active');
			select = null;
		}
	};
	Data ={
		source: cityProvince2sc,
		getProvs: function(data){
			hotArr = data.hot;
			var arr = data.letter,
				len = arr.length,
				temp;
			for(var i = 0; i< len; i++){
				temp = arr[i];
				for( var x in temp){
					prov.push({zm:x,v:temp[x]});
					var a = temp[x],
						l = a.length;
					for(var j = 0;j<l;j++){
						cityobj[a[j].i] = a[j].c;
					}
				}
			}
		},
		getCity: function(i){
			return cityobj[i];
		}
	};
	View={
		drawProvince: function(p,h,hd,pd){
			var pul = p.find('ul'),
				hhtml = [],
				phtml = [],
				hlen = hd.length,
				plen = pd.length;
			for(var i=0;i<hlen;i++){
				var item = hd[i];
				if(item.en){
					hhtml.push('<a data-index="'+item.i+'" href="/'+item.en+'/" >'+item.n+'</a>');
				}else{
					hhtml.push('<a data-index="'+item.i+'" href="/'+item.en+'" >'+item.n+'</a>');
				}
			}
			for(var j=0;j<plen;j++){
				var temp = pd[j];
				var letter = temp.zm;
				var arr = temp.v;
				var arrlen = arr.length;
				if(arrlen == 0){
					continue;
				}
				phtml.push('<li><strong>'+letter.toUpperCase()+'</strong>');
				for(var x=0; x<arrlen; x++){
					var item1 = arr[x];
					phtml.push('<a data-index="'+item1.i+'" href="/'+item1.en+'/" >'+item1.n+'</a>');
				}
				phtml.push('</li>');
			}
			pul.html(phtml.join(''));
			h.html(hhtml.join(''));
		},
		drawCity: function($wrapper,$obj,$tpl,data,prov){
			var chip=[],
			d = data;
			for (var i=0,j=d.length; i<j; i++) {
				var item1 = d[i];
				chip.push('<a data-index="'+item1.i+'" href="/'+prov+'-'+item1.en+'/" >'+item1.n+'</a>');
			}

			if( !chip.length ) return;
			var width=$wrapper.width();

			var o1=$obj.offset(),o2=$wrapper.offset();
			var top=o1.top-o2.top+$obj.innerHeight()-4;
			var left=o1.left-o2.left;

			if( left<width/2 ){
				$tpl.html( chip.join("\r\n") ).css({
					top:top,
					left:left+$obj.innerWidth()-8,
					right:'auto'
				}).show();
			}else{
				$tpl.html( chip.join("\r\n") ).css({
					top:top,
					right:width-left,
					left:'auto'
				}).show();
			}
		}
	};
	var selectCity = function(box){
		this.box = box;
		this.selectBtn = box.find('.city-select');
		this.contentBox = box.find('.city-content');
		this.hotbox = box.find('.hot-city-content');
		this.province = box.find('.provinces-content');
		this.city =$("<div class='city-box' style='display:none;'></div>");
		this.time = null;
		this.init();
	}
	selectCity.prototype = {
		init: function(){
			var k = this,
				delay=200;
			k.contentBox.append(k.city);
			k.city.hide;
			k.box.mouseover(function(e){
				e.stopPropagation()
				k.showprv.call(k,e);
			});
			k.contentBox.click(function(e){
				k.tocity.call(k, e);
			});
			Data.getProvs(Data.source);
			View.drawProvince(k.province,k.hotbox,hotArr,prov);
			k.province.mouseover(function(e){
				var t=$(e.target);
				if(!t.is('a')) return;
				clearTimeout(k.time);
				k.city.hide();
				k.time=setTimeout(function(){
					k.showcity.call(k,t,e);
				},delay)
			}).mouseout(function(){
					clearTimeout(k.time);
					k.time=setTimeout(function(){
						k.city.hide();
					},delay)
				});
			k.city.mouseover(function(){
				clearTimeout(k.time);
			}).mouseout(function(){
					k.time=setTimeout(function(){
						k.city.hide();
					},delay);
				});
			$(document).bind('mouseover.menu',closeMenu);
		},
		showprv: function(e){
			e.preventDefault();
			var k = this;
			k.contentBox.css('display','block');
			k.selectBtn.addClass('city-select-active');
			menuArr.push(k.contentBox);
			select = k.selectBtn;
			e.stopPropagation();
		},
		showcity: function (el, e) {
			var k  = this;
			var idx = el.attr('data-index');
			var uri = el.attr('href');
			if(uri.indexOf('2sc.sohu.com') != -1){
				uri = uri.replace('http://2sc.sohu.com','');
			}
			uri = uri.substring(1,uri.length-1);
			//alert(cityobj[idx]);
			var data = cityobj[idx];
			View.drawCity(k.contentBox, el, k.city, data, uri);
		},
		tocity: function(e){
			var t = e.target;
			if(t.tagName.toLowerCase() === 'a'){

				var code = $(t).attr('data-index');
				if(code!='')
					SA.util.cookie.set('CITYCODE',code,{expire:24})
				
			}
		}
		
	};
	return selectCity;
});

SA.job.add('passport',function(a,$){
	document.getElementById("passportDiv") && a.scriptLoader({url:'http://js.sohu.com/passport/pp18030_27.js',onComplete:function(){
		a.app.passport.init("passportDiv", {onlineModule: 'INDEX_AUTO'});
	}})
});
SA.job.add('iplocation',function(a,$){
	new SA.app.iplocation();
});
SA.job.add('selectcity',function(a,$){
	new SA.twosc.selectcity($('#citybox'));
});

SA.register("app.dateSelect", function (a, $) {
    var useIndex=0;
    function dateSelect( $year, $month, config, onChange )
    {
        this.first=true;
        this.$year=$year;
        this.$month=$month;
        this.config=config;
        this.year=-1;
        this.month=-1;
        this.onChange=onChange;
        this.curMonth = (new Date()).getMonth()+1;
        this.curYear = config.currentYear;
        var self=this;
        $year.on('change',function(event){
            self.year=self.$year.find("option").not(function(){ return !this.selected }).val();
            if(self.year.value == '0'){
                $year.removeClass('novalue');
                self.$month.hide();
            }else if(self.year.value=='-1'){
                //self.$month.hide();
                self.drawMonth($month,-1);
                self.$month.addClass('novalue disabled');
                $year.addClass('novalue');
            }else{
                self.drawMonth($month,-1);
                self.$month.show();
                self.$month.removeClass('disabled');
                $year.removeClass('novalue');
            }
            self.onChange( 'Year', data );
        });
        $month.on('change',function(event){
            self.month=self.$month.find("option").not(function(){ return !this.selected }).val();
            self.onChange( 'Month', self.month );

            self.month.value!='-1' ? $month.removeClass('novalue') : $month.addClass('novalue');
        });

        self.drawYear($year,-1);
        self.drawMonth($month,-1);

        var groupName='dateSelect'+useIndex;

        useIndex++;
    }

    dateSelect.prototype={
        drawYear:function($el,val){
            var chip=[],config=this.config,txt='ѡ�����';

            chip.push('<option value="-1">' + txt + '</option>');
            for( var m=config.maxYear; m>=config.minYear; m-- ){
                chip.push('<option value="'+ m +'">' + m + '</option>');
            }

            $el.html( chip.join("\r\n") );
        },
        drawMonth:function($el,val){
            var chip=[],config=this.config,txt='ѡ���·�';
            chip.push('<option value="-1">' + txt + '</option>');
            var max=12;
            for( var m=1; m<=max; m++ ){
                chip.push('<option value="'+ m +'">' + m + '</option>');
            }

            $el.html( chip.join("\r\n") );
        }
    };
    return dateSelect;
});

SA.register('app.areaSelect',function(a,$){
    var useIndex=0;
    var Area=function(option){
        var _default={
            p:'#province',
            c:'#city',pid:'-1',
            cid:'-1',
            onChange:function(){},
            pText:'ѡ�����',
            cText:'ѡ�����',
            areas:a.DATA.AREA
        };
        var o=$.extend({},_default,option);

        var $province=$(o.p),
            $city=$(o.c),
            onChange=o.onChange||function(){},
            pTxt=o.pText,
            cTxt=o.cText,
            areas=o.areas;


        var cityDataIndex=0;
        function showProvince(id){
            var txt=pTxt;
            var chip=[''];
            for (var i=areas.length,j=0; j<i; j++)
            {
                var nt=areas[j][1].split(',');
                if( id==nt[1] ){
                    txt=areas[j][0];
                    cityDataIndex=j;
                }
                chip.push('<option data-index="' + j + '" value="'+nt[1]+'">'+areas[j][0]+'</option>');
            }
            chip[0]='<option value="-1" data-index="-1">'+pTxt+'</option>';
            $province.html( chip.join("\r\n") );

            id&&id!='-1' && $province.removeClass('novalue');
            id&&id!='-1' && $city.removeClass('disabled');
        }

        function showCity(index,id){
            var txt=cTxt;
            var chip=[''];
            for (var i=areas[index]?areas[index].length:0,j=2; j<i; j+=2)
            {
                var nt=areas[index][j+1].split(',');
                if( id==nt[1] )
                    txt=areas[index][j];
                chip.push('<option data-index="' + j + '" value="'+nt[1]+'">' + areas[index][j] + '</option>');
            }
            chip[0]='<option value="-1" data-index="-1">'+cTxt+'</option>';
            $city.html( chip.join("\r\n") );
            chip.length==1 ? $city.hide() : $city.show();

            id&&id!='-1' && $province.removeClass('novalue');
        }

        $province.bind('change',function(e){
            showCity( $province.find("option").not(function(){ return !this.selected }).attr('data-index') );
            $province.find("option").not(function(){ return !this.selected }).val()=='-1' ? $city.addClass('disabled') : $city.removeClass('disabled');
            onChange('province',$province.find("option").not(function(){ return !this.selected }).val());
        });

        $city.bind('change',function(e,data){
            onChange('city',$city.find("option").not(function(){ return !this.selected }).val());
        });

        var groupName='areaSelect'+useIndex;

        useIndex++;
        showProvince( o.pid );
        if(o.pid!='-1'){
            showCity( cityDataIndex, o.cid );
        }
        else
        {
            showCity(cityDataIndex)
        }
    };
    return Area;
});