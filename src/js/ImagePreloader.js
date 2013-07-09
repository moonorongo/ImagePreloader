/*
    ImagePreloader 
    Esta lib toma un array de objetos
    {
        src: 'img/image1.jpg',
        name : 'image1' // asigna a img
        id : 'identificador' // asigna como background
    } ...
    src: el archivo origen
    name: la imagen destino
*/

var ImagePreloader = function(images) {
    
    this.completeTask = null;
    this.imagesToPreload = images;
    this.options = null;
    this.callback = null;
}

ImagePreloader.prototype.startPreload = function(callback, options) {
        var _this = this;
        $.each(this.imagesToPreload, function(i,e){
            e._image = new Image();
            e._image.src = e.src;
        })
        
        if(typeof(options) == 'undefined') {
            this.options = {
                id : 'ImagePreloaderPercent'
            }
        } else {
            this.options = options;
        }
        this.callback = callback;
        this.completeTask = setTimeout(function(){_this.checkCompleteTask();},100);    
        
    };
    
   
ImagePreloader.prototype.checkCompleteTask = function() {
        var count = 0;
        var _this = this;
        
        $.each(this.imagesToPreload, function(i,e){
            if(e._image.complete) count++;
        })
        var percent = (count / this.imagesToPreload.length) * 100;
        $('#' + this.options.id).html(percent);
       
        if(count == this.imagesToPreload.length) { 
            clearTimeout(this.completeTask);
            
            $.each(this.imagesToPreload, function(i,e){
                if(typeof(e.name) == "string") {
                    document.images[e.name].src = e.src;
                }
                if(typeof(e.id) == "string") {
                    $('#' + e.id).css('background-image','url('+ e.src +')');
                }
            })
            this.callback();
        } else {
            this.completeTask = setTimeout(function(){_this.checkCompleteTask();},100);
        }
    };
