let images = [{
  url: "https://famerfall.github.io/pictures01/img/slider_photo_01.jpg",
  title: "ROSTOV-ON-DON, ADMIRAL"
}, {
  url: "https://famerfall.github.io/pictures01/img/slider_photo_02.jpg",
  title: "SOCHI THIEVES"
}, {
  url: "https://famerfall.github.io/pictures01/img/slider_photo_03.jpg",
  title: "ROSTOV-ON-DON PATRIOTIC"
}];

function initSlider(options) {
  if (!images || !images.length) return;
  
  options = options || {
    titles: false,
    dots: true,
    autoplay: false
  };
  
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  let sliderTitles = document.querySelector(".slider__titles");
  
  initImages();
  initArrows();
  
  if (options.dots) {
    initDots();
  }
  
  if (options.titles) {
    initTitles();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }
  
 
  
    function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }
  
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        console.log('text');
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
  

  //Смотрим тут!

  function initTitles() {
    images.forEach((image, index) => {
      let title = `<div class="slider__titles-item n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].title}</div>`;
      sliderTitles.innerHTML += title;
    });
    sliderTitles.querySelectorAll(".slider__titles-item").forEach(title => {
      title.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }


  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) {
      sliderTitles.querySelector(".active").classList.remove("active");
      sliderTitles.querySelector(".n" + num).classList.add("active");
    }
  }

  
    
  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }
  
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: true,
  autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});