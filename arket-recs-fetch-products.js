// Create a new <div> element to hold the recommendations
const recommendationsContainer = document.createElement("div");
recommendationsContainer.id = "recommendations-container";

// Create outer container for carousel
const carouselWrapper = document.createElement("div");
carouselWrapper.id = "carousel-wrapper";

// Keep only this one style block
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
    margin-top: 20px;
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
    font-size: 24px;
    color: #000;
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
    margin: 20px 0;
    font-weight: normal;
    color: #000000;
  }
`;
document.head.appendChild(style);

// Create navigation buttons
const prevButton = document.createElement("button");
prevButton.className = "carousel-button prev-button";
prevButton.innerHTML = "<";

const nextButton = document.createElement("button");
nextButton.className = "carousel-button next-button";
nextButton.innerHTML = ">";

// Function to create product element
const createProductElement = (product) => {
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
    
    return productElement;
};

// Function to fetch products
async function fetchProducts() {
    try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        
        // Map the API response to match our expected format
        return products.map(product => ({
            name: product.title,
            price: `$${product.price}`,
            image: product.image
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to default products if fetch fails
        return [
            { name: "Product 1", price: "$99", image: "https://via.placeholder.com/300x350" },
            { name: "Product 2", price: "$149", image: "https://via.placeholder.com/300x350" },
            { name: "Product 3", price: "$199", image: "https://via.placeholder.com/300x350" },
            { name: "Product 4", price: "$129", image: "https://via.placeholder.com/300x350" },
            { name: "Product 5", price: "$179", image: "https://via.placeholder.com/300x350" },
            { name: "Product 6", price: "$159", image: "https://via.placeholder.com/300x350" }
        ];
    }
}

// Initialize the carousel
async function initializeCarousel() {
    const products = await fetchProducts();
    
    // Clear existing content
    recommendationsContainer.innerHTML = '';
    
    // Add products
    products.forEach(product => {
        const productElement = createProductElement(product);
        recommendationsContainer.appendChild(productElement);
    });

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

        // Initialize carousel functionality
        let currentIndex = 0;
        const totalSlides = products.length;
        const getSlidesVisible = () => window.innerWidth <= 767 ? 2 : 3;

        // Move scrollToIndex function definition here, after container is populated
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

        window.addEventListener('resize', () => {
            scrollToIndex(currentIndex);
        });

        // Set initial position
        scrollToIndex(0);
    }
}

// Start the carousel
initializeCarousel();
