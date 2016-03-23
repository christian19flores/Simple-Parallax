(function(window, document, undefined){
    
    var SP = (function(options){
        this.defaults = {};
        
        this.plaxY = [];
        this.elements = document.getElementsByClassName("SP");
        this.elLength = this.elements.length;
        this.iteration = [];
        this.start = [];
        this.change = [];
        this.totalIterations = [];
        this.currentValue = [];
        this.i = 0;
        // x: Current Iteration s: Start Value c: Change In Value t: Total Iterations
        this.easeLinear = function(x,s,c,t){
            return c*x/t+s;
        };
        
        var requestAnimationFrame  =    window.requestAnimationFrame || window.mozRequestAnimationFrame || 
                                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        
        for(i=0;i<this.elLength;i++){
            //get attribute and pushes to array
            this.plaxY.push(parseInt(this.elements[i].getAttribute("data-plax-y")) || 1);   
            this.totalIterations.push(parseInt(this.elements[i].getAttribute("data-TI")) || 9);
        };
        
        this.init = function(options){
            if(options){
                this.settings = (options) ? this.applyOptions(this.defaults, options) : defaults;
                var self = this;
                window.addEventListener("scroll", function(){self.startUp();});
                
                return this;
            }else{
                // default options
            }
            
            if(window === this)
                return new SP(options);
            
            
        };
        
        this.applyOptions = function(defaults, options){
            for(var s in options) {
                try{
                    if(options[s].constructor === Object)
                        defaults[s] = applyOptions(defaults[s], options[s]);
                    else
                        defaults[s] = options[s];
                }catch (e) {
                    defaults[s] = options[s];
                }
            }
            return defaults;
        };
        
        this.startUp = function(){
            var options = this.settings.options;
            for(i=0;i<this.elLength;i++){ 
                // checks if in viewport, if it is move it!
                if(this.inViewPort(this.elements[i])){
                    // finds something similar to scrollTop()
                    var top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                    
                    // sets start position to 0 if it is the first iteration
                    if(this.start[i] === undefined){
                        this.start[i] = 0;
                        this.iteration[i] = 0;
                    }
                    
                    // Set the amount of change in the parallax per animation
                    this.change[i] = (top/this.plaxY[i]) - this.start[i];
                    
                    // if animation is true
                    if(options[0].animation[0]){
                        this.i = i;
                        this.parallaxAnimate();
                    }else{
                        this.translate(i, top/this.plaxY[i]);
                    }
                }
            }
        };
        
        // Animation Function
        this.parallaxAnimate = function(){
            var i = this.i;
            
            // easeing function call
            this.currentValue[i] = this.easeLinear(this.iteration[i], this.start[i], this.change[i], this.totalIterations[i]);
            
            // traslation function
            this.translate(i,this.currentValue[i]);
            
            // Reset this.iteration once the animation is done or iterate this.iteration
            if(this.iteration[i]>=this.totalIterations[i]){
                this.iteration[i] = 0;
                
                // Start next iteration at the last position
                this.start[i] = this.currentValue[i];
            }else{
                this.iteration[i]++;
                requestAnimationFrame(this.parallaxAnimate.bind(this));
            }
        };
        
        this.translate = function(i,y){
            this.elements[i].style.webkitTransform = 'translate(0%, '+ y + '%)';
            this.elements[i].style.msTransform = 'translate(0%, '+ y + '%)';
            this.elements[i].style.transform = 'translate(0%, '+ y + '%)';
        };  
        
        // view port checker. True if element is visible at all
        this.inViewPort = function(i) {
            var top = i.offsetTop, left = i.offsetLeft, width = i.offsetWidth, height = i.offsetHeight;
            while(i.offsetParent) {
                i = i.offsetParent;
                top += i.offsetTop;
                left += i.offsetLeft;
            }
            return (
                top >= window.pageYOffset - height &&
                left >= window.pageXOffset - width &&
                (top + height) <= (window.pageYOffset + window.innerHeight + height) &&
                (left + width) <= (window.pageXOffset + window.innerWidth + width)
            );
        };
        
        return this.init(options);
    });
    
SP.prototype = {
       
};
    window.SP = SP;
})( window , document );

var simpleparallax = new SP({
    options: [
        {
            animation: true,
            easeFunction: "linear"
        }
    ]
});