(function(window, document, undefined){
    
    var SP = (function(options){
        this.defaults = {};
            // var[0][0] = data from html
            // var[0][1] = start value
            // var[0][2] = change value
            // var[0][3] = ease value
        // parallax variable arrays
        this.plaxY = [[]];
        this.plaxX = [[]];
        this.plaxZ = [[]];
        // rotate variable arrays
        this.rotateX = [[]];
        this.rotateY = [[]];
        this.rotateZ = [[]];
        // animation variables
        this.itr = [], this.itrTotal = [], this.i = 0;
        // x: Current Iteration s: Start Value c: Change In Value t: Total Iterations
        this.ease = {
            linear: function(x,s,c,t){ 
                return c*x/t+s; 
            },
            easeInCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
                return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
            },
            easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
            }
        };

        var requestAnimationFrame  =    window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        
        this.init = function(options){
            if(options){
                this.settings = (options) ? this.applyOptions(this.defaults, options) : defaults;
                
                this.setAttributes();
                
                var self = this;
                window.addEventListener("scroll", function(){self.startUp();});
                
                return this;
            }else{
                // default options
                alert("no settings");
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
        // finds all data from html file
        this.setAttributes = function(){
            var options = this.settings.options;
            // html element grabber
            this.elements = document.getElementsByClassName((options[0].className || "SP")), this.elLength = this.elements.length;
            // getAttribute for loop
            for(i=0;i<this.elLength;i++){
                //get attribute and pushes to array
                this.plaxY[i] = []; this.plaxX[i] = []; this.plaxZ[i] = []; this.rotateX[i] = []; this.rotateY[i] = []; this.rotateZ[i] = [];
                
                this.plaxY[i][0] = parseInt(this.elements[i].getAttribute("data-plax-y")) || options[0].parallaxY || undefined;  
                this.plaxX[i][0] = parseInt(this.elements[i].getAttribute("data-plax-x")) || options[0].parallaxX || undefined;
                this.plaxZ[i][0] = parseInt(this.elements[i].getAttribute("data-plax-z")) || options[0].parallaxZ || undefined;
                this.rotateX[i][0] = parseInt(this.elements[i].getAttribute("data-rotate-x")) || options[0].rotationX || undefined;
                this.rotateY[i][0] = parseInt(this.elements[i].getAttribute("data-rotate-y")) || options[0].rotationY || undefined;
                this.rotateZ[i][0] = parseInt(this.elements[i].getAttribute("data-rotate-z")) || options[0].rotationZ || undefined;
                this.itrTotal.push(parseInt(this.elements[i].getAttribute("data-TI")) || options[0].iterationTotal || 9);
            }
        };
        // handles all function basics
        this.startUp = function(){
            var options = this.settings.options;
            for(i=0;i<this.elLength;i++){ 
                // checks if in viewport, if it is move it!
                if(this.inViewPort(this.elements[i])){
                    // finds something similar to scrollTop()
                    var top = this.top(this.elements[i]);

                    // sets start position to 0 if it is the first itr
                    if(this.plaxY[i][1] === undefined){
                        this.plaxY[i][1] = this.plaxX[i][1] = this.plaxZ[i][1] = 0;
                        this.rotateX[i][1] = this.rotateY[i][1] = this.rotateZ[i][1] = 0;
                        this.itr[i] = 0;
                    }
                    // Set the amount of change in the parallax per animation
                    // parallax variables
                    this.plaxY[i][2] = ((top/1000)*this.plaxY[i][0]) - this.plaxY[i][1],
                    this.plaxX[i][2] = ((top/1000)*this.plaxX[i][0]) - this.plaxX[i][1],
                    this.plaxZ[i][2] = ((top/1000)*this.plaxZ[i][0]) - this.plaxZ[i][1];
                    // rotation variables
                    this.rotateX[i][2] = ((top/1000)*this.rotateX[i][0]) - this.rotateX[i][1],
                    this.rotateY[i][2] = ((top/1000)*this.rotateY[i][0]) - this.rotateY[i][1],
                    this.rotateZ[i][2] = ((top/1000)*this.rotateZ[i][0]) - this.rotateZ[i][1]; 
                    // if animation is true
                    if(options[0].animation){
                        this.i = i;
                        this.eF = options[0].easeFunction;
                        this.parallaxAnimate();
                    }else{
                        this.translate(i, (top/1000)*this.plaxX[i][0], (top/1000)*this.plaxY[i][0], (top/1000)*this.plaxZ[i][0], (top/1000)*this.rotateX[i], (top/1000)*this.rotateY[i][0], (top/1000)*this.rotateZ[i][0]);
                    }
                }
            }
        };
        // Animation Function
        this.parallaxAnimate = function(){
            var i = this.i;
            var ease = this.eF;
            // moving functions
            this.plaxY[i][3] = this.ease[ease](this.itr[i], this.plaxY[i][1], this.plaxY[i][2], this.itrTotal[i]);
            this.plaxX[i][3] = this.ease[ease](this.itr[i], this.plaxX[i][1], this.plaxX[i][2], this.itrTotal[i]);
            this.plaxZ[i][3] = this.ease[ease](this.itr[i], this.plaxZ[i][1], this.plaxZ[i][2], this.itrTotal[i]);
            // rotationn functions
            this.rotateX[i][3] = this.ease[ease](this.itr[i], this.rotateX[i][1], this.rotateX[i][2], this.itrTotal[i]);
            this.rotateY[i][3] = this.ease[ease](this.itr[i], this.rotateY[i][1], this.rotateY[i][2], this.itrTotal[i]);
            this.rotateZ[i][3] = this.ease[ease](this.itr[i], this.rotateZ[i][1], this.rotateZ[i][2], this.itrTotal[i]);
            // traslation function
            this.translate(i, this.plaxX[i][3], this.plaxY[i][3], this.plaxZ[i][3], this.rotateX[i][3], this.rotateY[i][3], this.rotateZ[i][3]);
            // Reset this.itr once the animation is done or iterate this.itr
            if(this.itr[i]>=this.itrTotal[i]){
                this.itr[i] = 0;
                // Start next itr at the last position
                // axis variables
                this.plaxY[i][1] = this.plaxY[i][3], this.plaxX[i][1] = this.plaxX[i][3], this.plaxZ[i][1] = this.plaxZ[i][3];
                // rotation variables
                this.rotateX[i][1] = this.rotateX[i][3], this.rotateY[i][1] = this.rotateY[i][3], this.rotateZ[i][1] = this.rotateZ[i][3];
            }else{
                this.itr[i]++;
                requestAnimationFrame(this.parallaxAnimate.bind(this));
            }
        };
        // 
        this.translate = function(){
            var arg =[];
            for(x=0;x<arguments.length;x++){
                arg.push(arguments[x]);
                if(isNaN(arg[x]))
                    arg[x] = 0;
            }
            var translate = 'translate3d(' +arg[1]+ '%,' +arg[2]+ '%,' +arg[3]+ 'px) rotateX('+arg[4]+'deg) rotateY('+arg[5]+'deg) rotateZ('+arg[6]+'deg)';
            this.elements[arg[0]].style.webkitTransform = translate;
            this.elements[arg[0]].style.MozTransform = translate;
            this.elements[arg[0]].style.msTransform = translate;
            this.elements[arg[0]].style.OTransform = translate;
            this.elements[arg[0]].style.transform = translate;
        };
        // How much has scrolled while element is in view
        this.top = function(el){
            var top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                top -= this.offSetTop(el);
                
            if(this.offSetTop(el) !== 0)
                top += el.offsetHeight*2;
            
            return top;
        };
        // Height above element
        this.offSetTop = function(obj){
            var curtop = 0;
            if(obj.offsetParent) {
                do{
                    curtop += obj.offsetTop;
                }while (obj = obj.offsetParent);
                return curtop;
            }
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
            easeFunction: "linear",
            //parallaxX: 50,
            //parallaxY: 50,
            //parallaxZ: 50,
            //rotationX: 50,
            //rotationY: 50,
            //rotationZ: 50,
            //iterationTotal: 8,
            className: "SP"
        }
    ]
});
