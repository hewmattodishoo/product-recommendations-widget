// Create and inject styles
const styles = `
.recommendations-container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}
.recommendations-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
}
.recommendations-wrapper {
    position: relative;
    overflow: hidden;
}
.recommendations-track {
    display: flex;
    transition: transform 0.3s ease;
}
.product-card {
    flex: 0 0 calc(33.333% - 20px);
    margin: 0 10px;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: white;
}
.product-image {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: contain;
    border-radius: 4px;
    margin-bottom: 10px;
}
.product-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
}
.product-price {
    font-size: 18px;
    color: #2c5282;
    font-weight: bold;
}
.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 1;
}
.nav-button:hover {
    background: rgba(0, 0, 0, 0.7);
}
.prev-button {
    left: 10px;
}
.next-button {
    right: 10px;
}
.nav-button:disabled {
    background: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;
}
.carousel-button img {
    width: 20px;
    height: 20px;
}
.prev-button img {
    transform: rotate(180deg);
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
    opacity: 0.7;
    transition: opacity 0.3s ease;
}
.carousel-button:hover {
    opacity: 1;
}
`;

// Sample product data
const products = [
    {
        id: 1,
        title: "Classic White Sneakers",
        price: "$89.99",
        image: "https://cdn.shopify.com/s/files/1/0027/3953/5981/products/wt06-blue_main.jpg?v=1555601856"
    },
    {
        id: 2,
        title: "Running Performance Shoes",
        price: "$129.99",
        image: "https://cdn.shopify.com/s/files/1/0027/3953/5981/products/wh04-blue_main.jpg?v=1555602096"
    },
    {
        id: 3,
        title: "Casual Sport Sneakers",
        price: "$79.99",
        image: "https://cdn.shopify.com/s/files/1/0027/3953/5981/products/wj01-red_main.jpg?v=1555602286"
    },
    {
        id: 4,
        title: "Hiking Boots Premium",
        price: "$159.99",
        image: "https://cdn.shopify.com/s/files/1/0027/3953/5981/products/wj12-blue_main.jpg?v=1555602140"
    },
    {
        id: 5,
        title: "Urban Street Shoes",
        price: "$99.99",
        image: "https://cdn.shopify.com/s/files/1/0027/3953/5981/products/wj07-purple_main.jpg?v=1555602005"
    },
    {
        id: 6,
        title: "Athletic Training Shoes",
        price: "$119.99",
        image: "https://cdn.shopify.com/s/files/1/0027/3953/5981/products/wj11-blue_main.jpg?v=1555602123"
    }
];

// Create and inject stylesheet
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Create recommendations widget
function createRecommendationsWidget() {
    const container = document.createElement("div");
    container.className = "recommendations-container";

    // Add title
    const title = document.createElement("h2");
    title.className = "recommendations-title";
    title.textContent = "Recommended Products";
    container.appendChild(title);

    // Create wrapper and track
    const wrapper = document.createElement("div");
    wrapper.className = "recommendations-wrapper";
    
    const track = document.createElement("div");
    track.className = "recommendations-track";

    // Add product cards
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">${product.price}</div>
        `;
        
        track.appendChild(card);
    });

    // Add navigation buttons
    const prevButton = document.createElement("button");
    prevButton.className = "carousel-button prev-button";
    prevButton.innerHTML = `<img src="https://cdn.dynamicyield.com/api/8768845/images/1f76bf5d937e8__arrow.png" alt="Previous">`;

    const nextButton = document.createElement("button");
    nextButton.className = "carousel-button next-button";
    nextButton.innerHTML = `<img src="https://cdn.dynamicyield.com/api/8768845/images/1f76bf5d937e8__arrow.png" alt="Next">`;

    // Append elements
    wrapper.appendChild(prevButton);
    wrapper.appendChild(track);
    wrapper.appendChild(nextButton);
    container.appendChild(wrapper);

    // Current position tracking
    let currentPage = 0;
    const totalPages = Math.ceil(products.length / 3) - 1;

    // Navigation functionality
    function updateNavigation() {
        const slideWidth = wrapper.offsetWidth;
        track.style.transform = `translateX(-${currentPage * slideWidth}px)`;
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === totalPages;
    }

    prevButton.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            updateNavigation();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateNavigation();
        }
    });

    return container;
}

// Insert the widget below product information
const productInfo = document.querySelector("#ProductSection-product-template > div.grid.product-single.product-single--medium-image") || document.body;
const widget = createRecommendationsWidget();
productInfo.parentNode.insertBefore(widget, productInfo.nextSibling);
