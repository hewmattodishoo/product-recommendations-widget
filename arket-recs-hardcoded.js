// Create a new <div> element to hold the recommendations
const recommendationsContainer = document.createElement("div");
recommendationsContainer.id = "recommendations-container";

// Create outer container for carousel
const carouselWrapper = document.createElement("div");
carouselWrapper.id = "carousel-wrapper";

const style = document.createElement("style");
style.textContent = `
  #carousel-wrapper {
    position: relative;
    width: calc(100% - 40px);
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }

  #recommendations-container {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    margin-top: 10px;
    padding: 20px 0;
    background-color: rgb(255, 255, 255);
    overflow: hidden;
    scroll-behavior: smooth;
    gap: 0;
    font-size: 0;
  }

  #recommendations-container div {
    flex: 0 0 33.333333%;
    min-width: 33.333333%;
    text-align: center;
    background-color: white;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-size: 14px;
  }

  @media (max-width: 767px) {
    #recommendations-container div {
      flex: 0 0 50%;
      min-width: 50%;
      padding: 0;
    }
  }

  #recommendations-container .image-container {
    width: 100%;
    aspect-ratio: 3/3.5;
    margin: 0;
    padding: 0;
    position: relative;
    display: block;
  }

  #recommendations-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    margin: 0;
    padding: 0;
  }

  #recommendations-container h3 {
    font-size: 14px;
    margin-top: 8px;
    color: #000000;
  }

  #recommendations-container p {
    font-size: 14px;
    margin-bottom: 4px;
    color: #000000;
  }

  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
  }

  .carousel-button:hover {
    opacity: 0.7;
  }

  .prev-button {
    left: 0;
  }

  .next-button {
    right: 0;
  }

  .recommendations-title {
    text-align: center;
    font-size: 24px;
    margin: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #000000;
    font-weight: normal;
    color: #000000;
  }

  .carousel-button img {
    width: 57px;
    height: 70px;
  }

  .prev-button img {
    transform: rotate(180deg);
  }
`;

// Append the style to the <head> of the page
document.head.appendChild(style);

// Create navigation buttons
const prevButton = document.createElement("button");
prevButton.className = "carousel-button prev-button";
prevButton.innerHTML = `<img src="https://www.arket.com/etc/designs/appeaser/p11/clientlibs/pattern-lib/images/icon_slideshow_right.png" alt="Previous">`;

const nextButton = document.createElement("button");
nextButton.className = "carousel-button next-button";
nextButton.innerHTML = `<img src="https://www.arket.com/etc/designs/appeaser/p11/clientlibs/pattern-lib/images/icon_slideshow_right.png" alt="Next">`;

// Create an array of product objects
const products = [
    { name: "Relaxed Fit Cotton T-shirt", price: "149 SEK", image: "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[2]&set=key[resolve.width],value[600]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.quality],value[80]&set=ImageVersion[2],origin[dam],source[%2F5e%2F5b%2F5e5b6bc8ffefdb75c572f292d65206b8890904bf.jpg],type[DESCRIPTIVESTILLLIFE]&call=url[file%3A%2Fproduct%2Fdynamic.chain]"},
    { name: "Oversized Cotton Hoodie", price: "299 SEK", image: "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[2]&set=key[resolve.width],value[600]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.quality],value[80]&set=ImageVersion[2],origin[dam],source[%2Fa7%2F58%2Fa7588250b7a34777f1bf3dd7e3d6a8c82039f0fc.jpg],type[DESCRIPTIVESTILLLIFE]&call=url[file%3A%2Fproduct%2Fdynamic.chain]"},
    { name: "Regular Fit Cargo Pants", price: "399 SEK", image: "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[2]&set=key[resolve.width],value[600]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.format],value[webp]&set=key[resolve.quality],value[80]&set=ImageVersion[1],origin[dam],source[%2F58%2Fbe%2F58bedb24a1d5e36a5280723972078f67af4702c1.jpg],type[DESCRIPTIVESTILLLIFE]&call=url[file%3A%2Fproduct%2Fdynamic.chain]"},
    { name: "Slim Fit Denim Jeans", price: "349 SEK", image: "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[2]&set=key[resolve.width],value[600]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.quality],value[80]&set=ImageVersion[2],origin[dam],source[%2Fce%2F7e%2Fce7e374bc78bf297bbd4217f687e538ad77fe02c.jpg],type[DESCRIPTIVESTILLLIFE]&call=url[file%3A%2Fproduct%2Fdynamic.chain]"},
    { name: "Cotton Blend Sweatshirt", price: "249 SEK", image: "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[2]&set=key[resolve.width],value[600]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.quality],value[80]&set=ImageVersion[2],origin[dam],source[%2F62%2F52%2F6252e930e52dd4ceccff4d6316aa379b5e12d89b.jpg],type[DESCRIPTIVESTILLLIFE]&call=url[file%3A%2Fproduct%2Fdynamic.chain]"},
    { name: "Linen Blend Shirt", price: "299 SEK", image: "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[1]&set=key[resolve.width],value[396]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.format],value[webp]&set=key[resolve.quality],value[80]&set=ImageVersion[1],origin[dam],source[/fa/6c/fa6c9832016024746acfc85568ae82a15448a473.jpg],type[LOOKBOOK]&call=url[file%3A%2Fproduct%2Fdynamic.chain]"},
];

// Add initial products
products.forEach((product) => {
    const productElement = document.createElement("div");
    
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    
    const productImage = document.createElement("img");
    productImage.src = product.image;
    
    const productTitle = document.createElement("h3");
    productTitle.textContent = product.name;
    
    const productPrice = document.createElement("p");
    productPrice.textContent = product.price;
    
    imageContainer.appendChild(productImage);
    productElement.appendChild(imageContainer);
    productElement.appendChild(productTitle);
    productElement.appendChild(productPrice);
    
    recommendationsContainer.appendChild(productElement);
});

// Select the element to place the container after (you'll need to update this selector)
const targetElement = document.querySelector("#oPage > div.o-page-content > div.o-product-details");

if (targetElement) {
    // Create title element
    const title = document.createElement("h2");
    title.textContent = "Personal recommendations";
    title.className = "recommendations-title";

    // Assemble the carousel with title
    carouselWrapper.appendChild(title);
    carouselWrapper.appendChild(prevButton);
    carouselWrapper.appendChild(recommendationsContainer);
    carouselWrapper.appendChild(nextButton);

    // Place the carousel after the target element
    targetElement.insertAdjacentElement("afterend", carouselWrapper);

    // Initialize variables and functions AFTER elements are created
    let currentIndex = 0;
    const totalSlides = products.length;
    const getSlidesVisible = () => window.innerWidth <= 767 ? 2 : 3;

    const scrollToIndex = (index) => {
        const slideWidth = recommendationsContainer.querySelector('div').offsetWidth;
        const scrollAmount = slideWidth * index;
        recommendationsContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    nextButton.addEventListener('click', () => {
        const slidesVisible = getSlidesVisible();
        currentIndex = (currentIndex + slidesVisible) % totalSlides;
        scrollToIndex(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        const slidesVisible = getSlidesVisible();
        currentIndex = (currentIndex - slidesVisible + totalSlides) % totalSlides;
        scrollToIndex(currentIndex);
    });

    // Add window resize handler
    window.addEventListener('resize', () => {
        scrollToIndex(currentIndex);
    });

    // Set initial position
    scrollToIndex(0);
}

