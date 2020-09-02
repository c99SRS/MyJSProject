//Upload and display an image

var fimage=null;
var file;
var redImage=null;
var greyImge=null;
var blueImage=null;
var negImage=null;
var wimage=null;
var bImage=null;
var rainbowImg=null;
var context;
var secContext;
var blurValue=50;
var blur=0.5;
function uploadImage(){
  
   file = document.getElementById("fimg");
  fimage = new SimpleImage(file);
  redImage=fimage;
  blueImage=fimage;
  greyImge=fimage;
  negImage = fimage;
  wimage = fimage;
  bImage=fimage;
  rainbowImg=fimage;
  context = document.getElementById("imgcan");
  secContext=context;
  fimage.drawTo(context);
  //secContext = document.getElementById("pcan");
  //blueImage.drawTo(secContext);
}


function applyGreyFilter(){
  
  if(greyImge == null || !fimage.complete()){
    alert("Image is not present");
  }
  
  for(var pixel of greyImge.values()){
    var avg = (pixel.getGreen()+pixel.getRed()+pixel.getBlue())/3 ;
    
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  greyImge.drawTo(context);
}


function applyPatternFilter(){
  
  if(blueImage == null || !blueImage.complete()){
    alert("Image is not present!!");
  }
  
  var height = fimage.getHeight();
  for(var pixel of blueImage.values()){
    
    var y=pixel.getY();
    
    if(y<height/3){
      pixel.setRed(255);
    }else if(y>(2*height/3)){
      pixel.setGreen(255);
    }else if(y>(height/3) && y<(2*height/3)) {
      pixel.setBlue(255);
    }
}
  blueImage.drawTo(secContext);

}

function applyRedFilter(){
  
  if(redImage==null || !redImage.complete()){
    alert("Image is not present")
  }
  
  var consider_avg=128;
  for(var pixel of redImage.values()){
    
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
  
    if(avg <consider_avg){
      pixel.setRed(2*avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }else{
      pixel.setRed(255);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(2*avg-255);
    } 
  }
  redImage.drawTo(context);
  
}

function resetImage(){
  var res = document.getElementById("reset");
  var ctx = context.getContext("2d");
  ctx.clearRect(0,0,context.width,context.height);
  alert("Image is reset");
}

function resetFilterImage(){
  if(fimage ==null || !fimage.complete())
   {
     alert("Image is not present");
   }
  
  fimage=new SimpleImage(file);
  redImage=fimage;
  blueImage=fimage;
  greyImge=fimage;
  negImage = fimage;
  bImage=fimage;
  wimage=fimage;
  rainbowImg=fimage;
  //alert("fimage"+fimage.getWidth())
  fimage.drawTo(context); 
}


function doNegative(){
  
  if(negImage==null || !negImage.complete()){
    alert("Image is not present");
  }
  for(var pixel of negImage.values()){
    
    var redPx = pixel.getRed();
    var grnPx = pixel.getGreen();
    var bluePx = pixel.getBlue();
    
    pixel.setRed(255-redPx);
    pixel.setBlue(255-bluePx);
    pixel.setGreen(255-grnPx);
  }
  negImage.drawTo(context);
}

//Function for window pane 
function doWindowpane() {
  if (wimage == null  || ! wimage.complete()) {
    alert("Image Not Uploaded");
  }
  var finalImage = makeWindowPane();
  finalImage.drawTo(context);
}
//Function to make wndowpane
function makeWindowPane() {
   var w = wimage.getWidth();
  var h = wimage.getHeight();
  var th = w*0.0125
  var xx = (w-4*th)/3;
  var yy = (h-3*th)/2;
  for (var pixel of wimage.values()) {
    if (pixel.getY() < th || pixel.getY() >= h-th) {
      setBorder(pixel);
      }
    if (pixel.getX() < th || pixel.getX() >= w-th ) {
      setBorder(pixel);
      }
    if (pixel.getX() > xx && pixel.getX() < xx+th ) {
      setBorder(pixel);
      }
    if (pixel.getX() > 2*xx+th && pixel.getX() < 2*xx+2*th ) {
      setBorder(pixel);
      }
    if (pixel.getY() > yy && pixel.getY() < yy+th) {
      setBorder(pixel);
    }
  }
  return wimage;
}
//Window Pane Filter 
//set boarder function used in the doWindowPanefilter function
function setBorder(pixel) {
    var pixelBorder = pixel.setRed(254);
    pixelBorder = pixel.setGreen(111);
    pixelBorder = pixel.setBlue(94);
    return(pixelBorder);
}

function makeBlur(){
  if(bImage == null || !bImage.complete()){
    alert("Image not uploaded");
    return;
  }
  for(var pixel of bImage.values()){
    if(Math.random() > blur){
      var x = pixel.getX();
      var y = pixel.getY();
      
      var newx=x + (2*Math.floor(Math.random()*(blurValue + 1)) - blurValue);
      var newy = y + (2*Math.floor(Math.random()*(blurValue + 1)) - blurValue);
      
      if((newx < bImage.getWidth() && newx >= 0) && (newy < bImage.getHeight() && newy >= 0)){
        var newpixel = bImage.getPixel(newx, newy);
        bImage.setPixel(x,y,newpixel);
      }
    }
  }
  bImage.drawTo(context);
  
}

function rainbow(){
  if(rainbowImg==null||!rainbowImg.complete()){
    alert("Image not loaded");
    return;
  }
  var q=Math.trunc(rainbowImg.getHeight()/7);
  for(var p of rainbowImg.values()){
    var y=Math.trunc((p.getY())/q);
    var avg=(p.getRed()+p.getGreen()+p.getBlue())/3;
    switch(y){
      case 0:
        if(avg<128){
          p.setRed(2*avg);
          p.setGreen(0);
          p.setBlue(0);
        }
        else{
          p.setRed(255);
          p.setGreen(2*avg-255);
          p.setBlue(2*avg-255);
        }
        break;
      case 1:
        if(avg<128){
          p.setRed(2*avg);
          p.setGreen(0.8*avg);
          p.setBlue(0);
        }
        else{
          p.setRed(255);
          p.setGreen(1.2*avg-51);
          p.setBlue(2*avg-255);
        }
        break;
      case 2:
        if(avg<128){
          p.setRed(2*avg);
          p.setGreen(2*avg);
          p.setBlue(0);
        }
        else{
          p.setRed(255);
          p.setGreen(255);
          p.setBlue(2*avg-255);
        }
        break;
      case 3:
        if(avg<128){
          p.setRed(0);
          p.setGreen(2*avg);
          p.setBlue(0);
        }
        else{
          p.setRed(2*avg-255);
          p.setGreen(255);
          p.setBlue(2*avg-255);
        }
        break;
      case 4:
        if(avg<128){
          p.setRed(0);
          p.setGreen(0);
          p.setBlue(2*avg);
        }
        else{
          p.setRed(2*avg-255);
          p.setGreen(2*avg-255);
          p.setBlue(255);
        }
        break;
      case 5:
        if(avg<128){
          p.setRed(0.8*avg);
          p.setGreen(0);
          p.setBlue(2*avg);
        }
        else{
          p.setRed(1.2*avg-51);
          p.setGreen(2*avg-255);
          p.setBlue(255);
        }
        break;
      default:
        if(avg<128){
          p.setRed(1.6*avg);
          p.setGreen(0);
          p.setBlue(1.6*avg);
        }
        else{
          p.setRed(0.4*avg+153);
          p.setGreen(2*avg-255);
          p.setBlue(0.4*avg+153);
        }
        break;
    }
  }
  rainbowImg.drawTo(can);
}