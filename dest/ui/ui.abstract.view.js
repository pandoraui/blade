define([],function(){var a=function(){var a=3e3;return function(b){return b+ ++a}}(),b=function(){var a={};return{addItem:function(b,c){a[b]=c},removeItem:function(b){a[b]&&delete a[b]},getItem:function(b){return b?a[b]:a}}}();return _.inherit({propertys:function(){this.template="",this.datamodel={},this.events={},this.wrapper=$("body"),this.id=_.uniqueId("ui-view-"),this.eventArr={},this.status="init"},on:function(a,b,c){this.eventArr[a]||(this.eventArr[a]=[]),c?this.eventArr[a].splice(0,0,b):this.eventArr[a].push(b)},off:function(a,b){this.eventArr[a]&&(this.eventArr[a]=b?_.without(this.eventArr[a],b):[])},trigger:function(a){var b,c,d=Array.prototype.slice,e=d.call(arguments,1),f=this.eventArr,g=[];if(f[a])for(b=0,c=f[a].length;c>b;b++)g[g.length]=f[a][b].apply(this,e);return g},createRoot:function(){this.$el=$('<div class="view" style="display: none; " id="'+this.id+'"></div>')},setOption:function(a){for(var b in a)"datamodel"!=b?this[b]=a[b]:_.extend(this.datamodel,a[b])},initialize:function(a){this.propertys(),this.setOption(a),this.resetPropery(),this.createRoot(),this.addSysEvents(),this.addEvent(),this.create(),this.initElement(),b.addItem(this.id,this)},getUIContainer:function(){return b.getItem()},addSysEvents:function(){"function"==typeof this.availableFn&&(this.removeSysEvents(),this.$el.on("click.system"+this.id,$.proxy(function(a){this.availableFn()||(a.preventDefault(),a.stopImmediatePropagation&&a.stopImmediatePropagation())},this)))},removeSysEvents:function(){this.$el.off(".system"+this.id)},$:function(a){return this.$el.find(a)},resetPropery:function(){},addEvent:function(){},create:function(){this.trigger("onPreCreate"),this.render(),this.status="create",this.trigger("onCreate")},initElement:function(){},render:function(a,b){a=this.getViewModel()||{};var c=this.template;return this.template?(a&&(c=_.template(this.template)(a)),"function"==typeof b&&b.call(this),this.$el.html(c),c):""},refresh:function(a){this.resetPropery(),a?this.create():this.render(),this.initElement(),"show"==this.status&&this.show()},show:function(){this.wrapper.append(this.$el),this.trigger("onPreShow"),this.$el.show(),this.status="show",this.bindEvents(),this.trigger("onShow")},hide:function(){this.trigger("onPreHide"),this.$el.hide(),this.status="hide",this.unBindEvents(),this.removeSysEvents(),this.trigger("onHide")},destroy:function(){this.unBindEvents(),this.removeSysEvents(),b.removeItem(this.id),this.$el.remove(),delete this},getViewModel:function(){return this.datamodel},setzIndexTop:function(b,c){b||(b=this.$el),(!c||c>10)&&(c=0),c=1e3*c,b.css("z-index",a(c))},bindEvents:function(){var a=this.events;if(!a&&!(a=_.result(this,"events")))return this;this.unBindEvents();var b,c,d,e,f,g=/^(\S+)\s*(.*)$/;for(b in a)c=a[b],_.isFunction(c)||(c=this[a[b]]),c&&(d=b.match(g),e=d[1],f=d[2],c=_.bind(c,this),e+=".delegateUIEvents"+this.id,""===f?this.$el.on(e,c):this.$el.on(e,f,c));return this},unBindEvents:function(){return this.$el.off(".delegateUIEvents"+this.id),this}})});