/*
 * JQuery areaSelect v0.2.1
 * http://www.hiekn.com/
 *
 * Copyright (c) 2015 sofia
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: 451183365@qq.com
 * Date: 2015-10-30
 */
;(function ($, window, document, undefined) {
	$.fn.areaSelect = function (options) {		
		$.fn.areaSelect.options = { 
			sisClass: "select-item",
			onClass: "select-item-on",
			shiftKey:true,
			onRightClick: function(event,objs){
				
			},
			onItemSelectedChange:function(objs){
				
			}
		}; 
		var _determinant = function(v1, v2, v3, v4){  
		    return (v1*v4-v2*v3);  
		};
		  
		var _intersect = function (aa, bb, cc, dd){  
		    var delta = _determinant(bb.x-aa.x, cc.x-dd.x, bb.y-aa.y, cc.y-dd.y);  
		    if ( delta<=(1e-6) && delta>=-(1e-6) ){  
		        return false;  
		    }  
		    var namenda = _determinant(cc.x-aa.x, cc.x-dd.x, cc.y-aa.y, cc.y-dd.y) / delta;  
		    if ( namenda>1 || namenda<0 ){  
		        return false;  
		    }  
		    var miu = _determinant(bb.x-aa.x, cc.x-aa.x, bb.y-aa.y, cc.y-aa.y) / delta;  
		    if ( miu>1 || miu<0 ){  
		        return false;  
		    }  
		    return true;  
		};
		var _updateItems = function(items){
			var itemsInfo = {};
			for (var i = 0; i < items.length; i++) {
				var item = $(items[i]);
				var w = item.outerWidth();
				var h = item.outerHeight();
				var x = item.offset().left;
				var y = item.offset().top;
				var info = {x1:x,x2:x+w,y1:y,y2:y+h,item:item};
				itemsInfo[i] = info;
			}
			return itemsInfo;
		};
		
		return this.each(function () { 
			var opts = $.extend({},$.fn.areaSelect.options, options);
			var self = $(this);
			var downPx = 0;
			var downPy = 0;
			var itemsInfo = {};
			var start = false;
			var op = self.offsetParent();
			var startSc = 0;
			var nowPx = 0;
			var nowPy = 0;
			var lsi = -1;
			var lastSelectItems = 0;
			
			document.onkeydown = function(event) {    
		        var code = event.keyCode || event.which || event.charCode;    
		        if (code == 27) {    
		            self.find('.'+opts.onClass).removeClass(opts.onClass);
					var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
					if(selectItems.length != lastSelectItems){
						lastSelectItems = selectItems.length;
						opts.onItemSelectedChange(selectItems);
					}
		        }
		    };
			
			
			op.scroll(function(){
				if(start){
					var sc = op.scrollTop();
					var thisPy = nowPy + (sc - startSc);
					var endX = nowPx >= downPx ? nowPx : downPx;
					var startX = nowPx >= downPx ? downPx : nowPx;
					var endY = thisPy >= downPy ? thisPy : downPy;
					var startY = thisPy >= downPy ? downPy : thisPy;
					for ( var i in itemsInfo) {
						var info = itemsInfo[i];
						if(info.x1 <= nowPx && info.x2 >= nowPx && info.y1 <= nowPy && info.y2 >= nowPy){
							lsi = i;
						}
						if( ((info.x1 >= startX && info.x1 <= endX) && ((info.y1 >= startY && info.y1 <= endY) || (info.y2 >= startY && info.y2 <= endY))) 
								|| ((info.x2 >= startX && info.x2 <= endX) && ((info.y1 >= startY && info.y1 <= endY) || (info.y2 >= startY && info.y2 <= endY))) ){
							info.item.addClass(opts.onClass);
							var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
							if(selectItems.length != lastSelectItems){
								lastSelectItems = selectItems.length;
								opts.onItemSelectedChange(selectItems);
							}
						}else{
							var p1 = {x:info.x1,y:info.y1};
							var p2 = {x:info.x1,y:info.y2};
							var p3 = {x:info.x2,y:info.y1};
							var p4 = {x:info.x2,y:info.y2};
							var q1 = {x:downPx,y:downPy};
							var q2 = {x:nowPx,y:thisPy};
							if(_intersect(p1,p2,q1,q2) || _intersect(p1,p3,q1,q2) || _intersect(p2,p4,q1,q2) || _intersect(p3,p4,q1,q2)){
								info.item.addClass(opts.onClass);
								var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
								if(selectItems.length != lastSelectItems){
									lastSelectItems = selectItems.length;
									opts.onItemSelectedChange(selectItems);
								}
							}else{
								if(!event.ctrlKey){
									info.item.removeClass(opts.onClass);
									var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
									if(selectItems.length != lastSelectItems){
										lastSelectItems = selectItems.length;
										opts.onItemSelectedChange(selectItems);
									}
								}	
							}
						}
					}
				}
			});
			self.on({"mousedown":function(event){
				if(event.button == 0 && $(event.target).closest("."+opts.sisClass).length == 0){
					if(!opts.shiftKey || !event.shiftKey){
						var sis = $("."+opts.sisClass, self);
						if($(event.target).closest("." + opts.onClass).length == 0 && !event.ctrlKey){
							sis.removeClass(opts.onClass);
							var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
							if(selectItems.length != lastSelectItems){
								lastSelectItems = selectItems.length;
								opts.onItemSelectedChange(selectItems);
							}
						}
						startSc = op.scrollTop();
						downPx = event.pageX;
						downPy = event.pageY;
						itemsInfo = _updateItems(sis);
						var top = downPy + self.scrollTop() - self.offset().top;
						var left= downPx + self.scrollLeft() - self.offset().left;
						if(self.find("#areaselect-helper").length){
							self.find("#areaselect-helper").css({"top":top+"px","left":left+"px","width":0,"height":0}).show();
						}else{
							self.append("<div id='areaselect-helper' style='position: absolute;border:1px solid #ccc;top:"+top+"px;left:"+left+"px;width:0;height:0;'></div>");
						}
						start = true;
					}
				}else if(event.button == 2){
					opts.onRightClick(event,$("."+opts.sisClass+"."+opts.onClass, self));
				}
			},"mouseup":function(event){
				if(start){
					self.find("#areaselect-helper").hide();
					start = false;
				}
			},"mousemove":function(event){
					if(start){
						nowPx = event.pageX;
						nowPy = event.pageY;
						var helper = self.find("#areaselect-helper");
						if(nowPx < downPx){
							var left= nowPx + self.scrollLeft() - self.offset().left;
							helper.css({"left":left + "px"});
						}
						if(nowPy < downPy){
							var top = nowPy + self.scrollTop() - self.offset().top;
							helper.css({"top":top + "px"});
						}
						var w = Math.abs(nowPx - downPx);
						var h = Math.abs(nowPy - downPy);
						helper.css({"width":w+"px","height":h+"px"});
						var sc = op.scrollTop();
						var thisPy = nowPy + (sc - startSc);
						var endX = nowPx >= downPx ? nowPx : downPx;
						var startX = nowPx >= downPx ? downPx : nowPx;
						var endY = thisPy >= downPy ? thisPy : downPy;
						var startY = thisPy >= downPy ? downPy : thisPy;
						for ( var i in itemsInfo) {
							var info = itemsInfo[i];
							if(info.x1 <= nowPx && info.x2 >= nowPx && info.y1 <= nowPy && info.y2 >= nowPy){
								lsi = i;
							}
							if( ((info.x1 >= startX && info.x1 <= endX) && ((info.y1 >= startY && info.y1 <= endY) || (info.y2 >= startY && info.y2 <= endY))) 
									|| ((info.x2 >= startX && info.x2 <= endX) && ((info.y1 >= startY && info.y1 <= endY) || (info.y2 >= startY && info.y2 <= endY))) ){
								info.item.addClass(opts.onClass);
								var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
								if(selectItems.length != lastSelectItems){
									lastSelectItems = selectItems.length;
									opts.onItemSelectedChange(selectItems);
								}
							}else{
								var p1 = {x:info.x1,y:info.y1};
								var p2 = {x:info.x1,y:info.y2};
								var p3 = {x:info.x2,y:info.y1};
								var p4 = {x:info.x2,y:info.y2};
								var q1 = {x:downPx,y:downPy};
								var q2 = {x:nowPx,y:thisPy};
								if(_intersect(p1,p2,q1,q2) || _intersect(p1,p3,q1,q2) || _intersect(p2,p4,q1,q2) || _intersect(p3,p4,q1,q2)){
									info.item.addClass(opts.onClass);
									var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
									if(selectItems.length != lastSelectItems){
										lastSelectItems = selectItems.length;
										opts.onItemSelectedChange(selectItems);
									}
								}else{
									if(!event.ctrlKey){
										info.item.removeClass(opts.onClass);
										var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
										if(selectItems.length != lastSelectItems){
											lastSelectItems = selectItems.length;
											opts.onItemSelectedChange(selectItems);
										}
									}	
								}
							}
						}
					}
			}}).on("click","."+opts.sisClass,function (event){
				if(!opts.shiftKey || !event.shiftKey){
					if(!event.ctrlKey){
						$(this).addClass(opts.onClass).siblings("."+opts.sisClass).removeClass(opts.onClass);
						var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
						if(selectItems.length != lastSelectItems){
							lastSelectItems = selectItems.length;
							opts.onItemSelectedChange(selectItems);
						}
					}else{
						$(this).toggleClass(opts.onClass);
						var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
						if(selectItems.length != lastSelectItems){
							lastSelectItems = selectItems.length;
							opts.onItemSelectedChange(selectItems);
						}
					}
					lsi = $(this).prevAll("."+opts.sisClass).length;
				}
				if((opts.shiftKey && event.shiftKey) || event.ctrlKey){
					event.preventDefault();
				}
			}).on("mousedown","."+opts.sisClass,function (event){
				if(!$(this).hasClass(opts.onClass)){
					if(event.button == 2 || (!event.ctrlKey && event.button == 0 && (!opts.shiftKey || !event.shiftKey))){
						$(this).addClass(opts.onClass).siblings("."+opts.sisClass).removeClass(opts.onClass);
						var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
						if(selectItems.length != lastSelectItems){
							lastSelectItems = selectItems.length;
							opts.onItemSelectedChange(selectItems);
						}
						lsi = $(this).prevAll("."+opts.sisClass).length;
					}else if(event.button == 0 && opts.shiftKey && event.shiftKey && lsi >= 0){
						var nowIndex = $(this).prevAll("."+opts.sisClass).length;
						var b = lsi,a = nowIndex;
						if(lsi > nowIndex){
							a = lsi; b = nowIndex;
						}
						for ( var i in itemsInfo) {
							var info = itemsInfo[i];
							if(parseInt(i) >= b && parseInt(i) <= a){
								info.item.addClass(opts.onClass);
								var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
								if(selectItems.length != lastSelectItems){
									lastSelectItems = selectItems.length;
									opts.onItemSelectedChange(selectItems);
								}
							}else{
								info.item.removeClass(opts.onClass);
								var selectItems = $("."+opts.sisClass+"."+opts.onClass, self);
								if(selectItems.length != lastSelectItems){
									lastSelectItems = selectItems.length;
									opts.onItemSelectedChange(selectItems);
								}
							}
						}
					}
				}
			}).css({"moz-user-select": "-moz-none","-moz-user-select":" none","-o-user-select":"none","-khtml-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none","user-select":"none"});
		}); 
	};
})(jQuery, window, document); 