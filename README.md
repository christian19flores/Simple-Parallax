# SP - Simple Parallax
Parallax without the hassle

##Usage

####HTML:
```html
<hmtl> 
<head>
  <title> SP - Simple Parallax </title>
</head>
<body>
  <div class="container"></div>
    <div class="container">
    
        <!-- use the SP class to taget the element and the data-plax-y to define the amount of parallax -->
        <h1 class="sample SP" data-plax-y="20">This will PARALLAX</h1>
        
    </div>
  <div class="container"></div>
    <div class="container">
        <h1 class="sample SP" data-plax-y="40">This will also PARALLAX less</h1>
    </div>
    
  <div class="container"></div>
  
      <!-- attach script at the end to ensure the page has loaded -->
      <script src="simpleparallax.min.js"></script>
        
</body>
</html>
```
Simpley add the **SP** class and **data-plax-y="#"** data entry to any element, then link the script before the ending body tag.

####Javascript - instantiation
After adding the **simpleparallax.min.js** file to your project you must instatiate the script by doing the following

```javascript
var simpleparallax = new SP({
  options: [
    {
      animation: true,
      easeFunction: "linear"
      //parallaxX: 50,
      //parallaxY: 50,
      //parallaxZ: 50,
      //rotationX: 50,
      //rotationY: 50,
      //rotationZ: 50,
      //iterationTotal: 8,
      //className: "SP"
    }
  ]
});
```
Can add default values for all parallax's and rotations. Also change the class name that is grabbed from the HTML file.
####CSS:

```css
*{
  font-family: Arial;
  color: #f2f2f2;
}
.container{
  /********************/
  display: table;
  /********************/
  height: 500px; width: 100%;
  background: #727272;
  border: 2px solid #262626;
}
.sample{
  /********************/
  display: table-cell;
  /********************/
  vertical-align: middle;
  text-align: center;
}
```

Most important thing here is the **Display** Properties. Although SP does work with other display styles but can become tricky in some situations.
##Data-Attribute Options:
<dl>
  <dt>data-plax-X:</dt>
  <dd>move left to right</dd>
  <dt>data-plax-Y:</dt> 
  <dd>move top to bottom</dd>
  <dt>data-plax-Z:</dt> 
  <dd>move front to back</dd>
  
  <dt>data-rotate-X:</dt> 
  <dd>flip horizontally</dd>
  
  <dt>data-rotate-Y:</dt> 
  <dd>flip vertically</dd>
  
  <dt>data-rotate-Z:</dt> 
  <dd>spin</dd>
  
  <dt>data-TI:</dt> 
  <dd>amount of iterations for animation</dd>
</dl>
##Things to keep in mind:
* The **data-plax-y** can be any number except **zero** and the further the number is from zero the more the element will parallax.
* The selected elements can not have a predefined translation. Otherwise it will jump to the newly defined position.
* Negative numbers will make things do the opposite.(data-rotate-Z="-150" will rotate counter clockwise)

##Features:
1. As many parallax elements as you like.
2. Lightweight at only 4.73KB!
3. Parallax on scroll.
4. Elements can parallax up or down(depending on the data-plax-y value being positive or negative).
5. Animation for a smooth scroll effect. With ease functions.
6. Animation can be toggled.
7. Rotate along any axis.
8. No Libraries needed!

##Example(JSFiddle):
[Parallax Version: 0.0.1](https://jsfiddle.net/Kree/v10yn98c/)

[Parallax Version: 0.2.0](http://jsfiddle.net/Kree/ju4d2c6L/3/)
