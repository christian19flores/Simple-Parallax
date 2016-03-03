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
    
        <!-- use the TKP class to taget the element and the data-plax-y to define the amount of parallax -->
        <h1 class="sample TKP" data-plax-y="20">This will PARALLAX</h1>
        
    </div>
  <div class="container"></div>
    <div class="container">
        <h1 class="sample TKP" data-plax-y="40">This will also PARALLAX less</h1>
    </div>
    
  <div class="container"></div>
  
      <!-- attach script at the end to ensure the page has loaded -->
      <script src="simpleparallax.js"></script>
        
</body>
</html>
```
Simpley add the **TKP** class and **data-plax-y="#"** data entry to any element, then link the script before the ending body tag.
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

Most important thing here is the **Display** Properties. SP does work with other display styles but works best with tables.

##Things to keep in mind:
The **data-plax-y** can be any number except 0 and the closer the number is to zero the more the element will parallax.