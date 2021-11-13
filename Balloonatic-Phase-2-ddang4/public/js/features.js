var slideIndex = [1];
var slideId = ["mySlides1"];


window.addEventListener('load', (event) => {
  showSlides();
})
function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no);
}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides1");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "flex";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
  }
