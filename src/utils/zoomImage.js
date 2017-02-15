var ZoomImage =  function (){};
ZoomImage.prototype.init = function(opt){
	var that = this, photos;
	if(!opt.photos) return;
	if(typeof(opt.photos) === 'string') {
		photos = opt.photos.split(',');
	} else if(opt.photos.slice) {
		photos = opt.photos;
	} else {
		return;
	}
	this.photosSrc = photos;
	this.photos = photos;
	this.length = this.photos.length;

	if(!this.contanier) {
		this.contanier = $('<div class="zoomImage" id="ZoomImage">\
			<div class="z_loading">图片加载中...</div>\
		    <canvas id="canvas" data-rotate="0"></canvas>\
		    <button class="z_close z_svg"><svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" version="1.1"><g stroke="rgb(160, 160, 160)" stroke-width="4"><line x1="5" y1="5" x2="25" y2="25"></line><line x1="5" y1="25" x2="25" y2="5"></line>X</g></svg></button>\
		    <p class="z_index"></p>\
		    <div class="z_btns">\
			    <button class="z_rotateL iconfont" title="左旋转">&#xe627;</button>\
		    	<button class="iconfont disabledBtn z_prev" title="前一张图片">&#xe711;</button>\
				<button class="iconfont disabledBtn z_next" title="后一张图片">&#xe779;</button>\
		    </div>\
		</div>');
		this.canvas = this.contanier.find('#canvas')[0];
		this.canvas.width = $(window).width();
		this.canvas.height = $(window).height() - 150;
		this.ctx = this.canvas.getContext('2d');
		this.bindEvent();
	}
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.trackTransforms(this.ctx);
	this.ctx.save();
	this.contanier.appendTo('body').fadeIn(150);
	document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
	this.index = opt.index || 0;
	this.redraw();
	this.setDisabled();
	$(this.canvas).fadeIn();
};

ZoomImage.prototype.redraw = function(){
	var that = this;
	if(this.photos[this.index].src) {
		this.drawImg(this.photos[this.index]);
	} else {
		var img = new Image();
		that.loading.show();
		img.onload = function(){
			that.loading.hide();
			that.drawImg(img);
			that.photos[that.index] = img;
		};
		img.src = this.photos[this.index];
	}
	this.indexEl.html((this.index+1)+'/'+this.length);
}
ZoomImage.prototype.drawImg = function(img){
	var p1 = this.ctx.transformedPoint(0,0);
	var p2 = this.ctx.transformedPoint(this.canvas.width,this.canvas.height);
	var w = img.width, h = img.height, x = 0, y = 0, sh = img.height/this.canvas.height, sw = img.width/this.canvas.width;

	if(sw < 1 && sh < 1) {
		x = (this.canvas.width - img.width)/2;
		y = (this.canvas.height - img.height)/2;
		w = img.width;
		h = img.height;
	}

	if(sw >= 1 && sh < 1) {
		x = 0;
		w = this.canvas.width;
		h = img.height*this.canvas.width/img.width;
		y = (this.canvas.height - h)/2;
	}

	if(sh >= 1) {
		y = 0;
		h = this.canvas.height;
		w = this.canvas.height*img.width/img.height;
		x = (this.canvas.width - w)/2;
	}

	this.ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
	// this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.ctx.drawImage(img,x,y,w,h);
}
ZoomImage.prototype.bindEvent = function(){
	var that = this, canvas = this.canvas;
	this.prev = this.contanier.find('.z_prev');
	this.next = this.contanier.find('.z_next');
	this.indexEl = this.contanier.find('.z_index');
	this.loading = this.contanier.find('.z_loading');

	this.prev.mousedown(function(){ 	//上一张
		that.getImageSrc(-1);
		return false;
	});
	this.next.mousedown(function(){		//下一张
		that.getImageSrc(1);
		return false;
	});
	this.contanier.find('.z_close').mousedown(function(){ //关闭图片浏览
		that.close();
		return false;
	});
	this.contanier.find('.z_rotateL').mousedown(function(){ //左旋转
		that.rotate(1);
		return false;
	});

	var lastX=canvas.width/2, lastY=canvas.height/2;

	var dragStart,dragged, ctx = this.ctx;
	canvas.addEventListener('mousedown',function(evt){
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		dragStart = ctx.transformedPoint(lastX,lastY);
		dragged = false;
	},false);
	canvas.addEventListener('mousemove',function(evt){
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		dragged = true;
		if (dragStart){
			var pt = ctx.transformedPoint(lastX,lastY);
			ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
			that.drawImg(that.photos[that.index]);
		}
	},false);
	this.contanier[0].addEventListener('mouseup',function(evt){
		if(dragStart) {
			dragStart = null;
			if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
		}
	},false);

	var scaleFactor = 1.1;
	that.factor = 1;
	var zoom = function(clicks){
		var factor = Math.pow(scaleFactor,clicks), pt;
		var totalFactor = that.factor * factor;
		if(totalFactor>7 || totalFactor< 0.7) return;
		that.factor = totalFactor;

		pt = ctx.transformedPoint(lastX,lastY);
		ctx.translate(pt.x,pt.y);
		ctx.scale(factor,factor);
		ctx.translate(-pt.x,-pt.y);
		that.drawImg(that.photos[that.index]);
	}

	var handleScroll = function(evt){
		var delta = evt.wheelDelta ? evt.wheelDelta/60 : evt.detail ? -evt.detail : 0;
		if (delta) zoom(delta);
		return evt.preventDefault() && false;
	};
	canvas.addEventListener('DOMMouseScroll',handleScroll,false);
	canvas.addEventListener('mousewheel',handleScroll,false);

}
ZoomImage.prototype.setDisabled = function(){
	this.prev.attr('disabled', this.index <= 0);
	this.next.attr('disabled', this.index >= this.length - 1);
}
ZoomImage.prototype.getImageSrc = function(num) {
	var that = this;
	this.rotate(0);
	this.index += num;
	this.factor = 1;
	this.setDisabled();
	$(this.canvas).fadeOut(function(){
		that.ctx.restore();
		that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
		that.ctx.save();
		that.redraw();
	}).fadeIn();
}

ZoomImage.prototype.close = function(){
	var that = this;
	this.contanier.fadeOut(function(){
		that.contanier.detach();
		that.factor = 1;
		that.rotate(0);
		$(that.canvas).hide();
		that.ctx.restore();
	});
	document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = '';
	this.photos = undefined;
	this.photosSrc = undefined;
},
ZoomImage.prototype.rotate = function(n){
	var rn = n?(this.canvas.dataset.rotate - 0 + 90*n):0;
	this.canvas.dataset.rotate = rn;
	this.canvas.style.transform = 'rotate('+ -rn+'deg)';
},
ZoomImage.prototype.trackTransforms = function(ctx){
	var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
	var xform = svg.createSVGMatrix();
	ctx.getTransform = function(){ return xform; };

	var savedTransforms = [];
	var save = ctx.save;
	ctx.save = function(){
		savedTransforms.push(xform.translate(0,0));
		return save.call(ctx);
	};
	var restore = ctx.restore;
	ctx.restore = function(){
		xform = savedTransforms.pop();
		return restore.call(ctx);
	};

	var scale = ctx.scale;
	ctx.scale = function(sx,sy){
		xform = xform.scaleNonUniform(sx,sy);
		return scale.call(ctx,sx,sy);
	};
	var rotate = ctx.rotate;
	ctx.rotate = function(radians){
		xform = xform.rotate(radians*180/Math.PI);
		return rotate.call(ctx,radians);
	};
	var translate = ctx.translate;
	ctx.translate = function(dx,dy){
		xform = xform.translate(dx,dy);
		return translate.call(ctx,dx,dy);
	};
	var transform = ctx.transform;
	ctx.transform = function(a,b,c,d,e,f){
		var m2 = svg.createSVGMatrix();
		m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
		xform = xform.multiply(m2);
		return transform.call(ctx,a,b,c,d,e,f);
	};
	var setTransform = ctx.setTransform;
	ctx.setTransform = function(a,b,c,d,e,f){
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;
		return setTransform.call(ctx,a,b,c,d,e,f);
	};
	var pt  = svg.createSVGPoint();
	ctx.transformedPoint = function(x,y){
		pt.x=x; pt.y=y;
		return pt.matrixTransform(xform.inverse());
	}
}
export default {
	zoomImage: new ZoomImage()
};