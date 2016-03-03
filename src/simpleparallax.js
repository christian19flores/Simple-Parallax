(function( window, undefined){
    
    function TKP() {
        this.plaxY = [];
        this.elements = document.getElementsByClassName("TKP");
        this.elLength = this.elements.length;
        for(i=0;i<this.elLength;i++){
            //get attribute and pushes to array
            this.plaxY.push(parseInt(this.elements[i].getAttribute("data-plax-y")) || 1);   
        };
        // view port checker. True if element is visible at all
        this.inViewPort = function(el) {
            var top = el.offsetTop, left = el.offsetLeft, width = el.offsetWidth, height = el.offsetHeight;
            while(el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }
            return (
                top >= window.pageYOffset - height &&
                left >= window.pageXOffset - width &&
                (top + height) <= (window.pageYOffset + window.innerHeight + height) &&
                (left + width) <= (window.pageXOffset + window.innerWidth + width)
            );
        };
        // Moves the element up or down
        this.translate = function(){
            for(x=0;x<this.elLength;x++){
                var top = window.pageYOffset - (this.elements[x].offsetTop - this.elements[x].offsetHeight);
                // checks if in viewport, if it is move it!
                if(this.inViewPort(this.elements[x])){
                    this.elements[x].style.WebkitTransform = 'translate(0%, '+ top/this.plaxY[x] + '%)';
                    this.elements[x].style.msTransform = 'translate(0%, '+ top/this.plaxY[x] + '%)';
                    this.elements[x].style.transform = 'translate(0%, '+ top/this.plaxY[x] + '%)';
                }
            }
        };
    }

    TKP.prototype = {
        init: function() {
            var self = this;
            window.addEventListener("scroll", function(){self.translate();});
        }
    };
    var TK = new TKP();
    TK.init();
})( window );
