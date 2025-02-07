# product-recommendations-widget
This is a JavaScript you can paste in the console in your to simulate how my product recommendation engine could work on a prospects site

Product Recommendations Carousel
A lightweight, customizable product recommendations carousel widget for e-commerce websites. This widget creates a responsive, horizontally scrollable carousel that displays recommended products with smooth navigation controls.
Features

Responsive design that adapts to different screen sizes
Smooth sliding animations
Navigation controls with previous/next buttons
Support for multiple products per view (3 products visible at once)
Customizable styling through CSS
Automatic button state management (disabled when reaching ends)

Installation

Include the JavaScript code in your project
The widget will automatically inject the required styles into your page
The carousel will be inserted below the product information section (looks for #ProductSection-product-template)

Styling
The widget comes with default styles that can be customized by modifying the CSS variables or overriding the following classes:

.recommendations-container: Main container
.recommendations-title: Widget title
.recommendations-wrapper: Carousel wrapper
.recommendations-track: Sliding track
.product-card: Individual product cards
.product-image: Product images
.product-title: Product titles
.product-price: Product prices
.carousel-button: Navigation buttons
.prev-button: Previous button
.next-button: Next button

Features
Responsive Design

Automatically adjusts to container width
Shows 3 products per view on desktop
Smooth transitions between slides

Navigation

Previous/Next buttons for sliding between products
Buttons automatically disable at the start/end of the carousel
Smooth sliding animations with CSS transitions

Product Cards

Consistent card layout with image, title, and price
Responsive images with maintained aspect ratios
Clean, modern styling with hover effects

Dependencies
This widget is standalone and requires no external libraries or dependencies.
