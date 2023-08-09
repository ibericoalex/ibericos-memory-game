## **Table of Contents**

1. [Testing](#testing "Testing")
   - [User Testing](#user-testing "User Testing")
   - [Manual Testing](#manual-testing "Manual Testing")
   - [Cross-browser Testing](#cross-browser-testing "Cross-browser Testing")
   - [Compatability and Responsiveness Testing](#compatability-and-responsiveness-testing "Compatability and Responsiveness Testing")
2. [Bugs](#bugs "Bugs")
3. [Validator Testing](#validator-testing "Validator Testing")
   - [HTML Validator](#html-validator "HTML Validator")    
   - [CSS Validator](#css-validator "CSS Validator")
   - [Performance Testing](#performance-testing "Performance Testing")

    
    ## **Testing**

### **User Testing**
After deploying the site, I shared the link with my family and friends for testing purposes, and I received positive feedback from everyone. They found the site easy to navigate, and it displayed beautifully on all of their devices without any issues.


### **Manual Testing**
Thorough manual testing was conducted during the project's development, aligning with the User Stories. The final results of the testing are provided below.

- As a **user**, I want **to be able to view a consistent colour scheme across the website** so that it **provides a seamless and harmonious browsing experience**.

| **Test** | Issue | Result |
| -------- | ----- | ------ |
| 1        | The website features a consistent color palette, maintaining visual harmony throughout. | PASS   |

- As a **user**, I want **to be able to find and access the navigation bar** so that I can **navigate effortlessly through the platform**.

| **Test** | Issue | Result |
| -------- | ----- | ------ |
| 2        | The navigation bar appears on every page, ensuring seamless user navigation between pages. | PASS   |

- As a **user**, I want **to be able to view the footer section** so that I can **find social media links**.

| **Test** | Issue | Result |
| -------- | ----- | ------ |
| 3        | The footer appears on every page of the website, featuring social media links that enhance and complement the overall site experience. | PASS   |

- As a **user**, I want **to be able to explore Iberico Alex's work, including both photos and videos** so that I  **can appreciate the artist's talent and style**.

| **Test** | Issue | Result |
| -------- | ----- | ------ |
| 4        | Users can effortlessly access and enjoy both photos and videos on the respective pages. | PASS   |

- As a **user**, I want **to be able to learn more about the photographer** so that I can **ensure that his background and artistic approach align with my preferences**.

| **Test** | Issue | Result |
| -------- | ----- | ------ |
| 5        | Users can learn more about the photographer's background and experience with ease. | PASS   |

- As a **user**, I want **to be able to contact the artist** so that I can **inquire about the services offered**.

| **Test** | Issue | Result |
| -------- | ----- | ------ |
| 6        | Users can conveniently fill in the contact form and effortlessly reach out to the artist for any inquiries or information. | PASS   |

### **Cross-browser Testing**

Once the site was published on GitHub Pages, I conducted thorough testing on multiple browsers, including Chrome, Firefox, and Edge. I'm pleased to report that the site loaded flawlessly on all browsers without any issues or discrepancies.

### **Compatability and Responsiveness Testing**
I personally tested the site on my iPhone 13 Pro and utilized DevTools to ensure responsiveness across various screen sizes. The site performed seamlessly on all devices, and the content adjusted flawlessly as intended for each screen size.

- Iphone Pro 13

![Home](./assets/documentation/iphone13-home.jpg) 
![Videos](./assets/documentation/iphone13-videos.PNG)
![About](./assets/documentation/iphone13-about.PNG)
![Contact](./assets/documentation/iphone13-contact.PNG)

- iPad Air

![Home](./assets/documentation/iPad-home.png) 
![Videos](./assets/documentation/iPad-videos.png)
![About](./assets/documentation/iPad-about.png)
![Contact](./assets/documentation/iPad-contact.png)

## **Bugs**
During the website development process, no significant bugs were encountered. However, two minor issues were identified:

1. **Image Dimensions**: It was discovered that the images had dimensions of 1920x1080px, while only needing to be 500px in length on the widest side. This was adjusted to optimize display and performance.

2. **Navigation Bar on Smallest Screen Size**: On screens with a width of 320px, there is a slight overlap in the navigation bar links. 

## **Validator Testing**

### **HTML Validator**

The [W3C Markup Validation Service](https://validator.w3.org/) for the HTML code was passed in as a URL and returned no errors.

- [Portfolio Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fibericoalex.github.io%2Fiberico-alex-photography%2Findex.html)

![Portfolio Page Validation](./assets/documentation/html-validator-portfolio.png)

- [Videos Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fibericoalex.github.io%2Fiberico-alex-photography%2Fvideos.html)

![Videos Page Validation](./assets/documentation/html-validator-portfolio.png)

- [About Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fibericoalex.github.io%2Fiberico-alex-photography%2Fabout.html)

![About Page Validation](./assets/documentation/html-validator-portfolio.png)

- [Contact Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fibericoalex.github.io%2Fiberico-alex-photography%2Fcontact.html)

![Contact Page Validation](./assets/documentation/html-validator-portfolio.png)

### **CSS Validator**

No errors were returned through the official [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/).

![css-validator-results](./assets/documentation/CSS-validator.png)

### **Performance Testing**

The website underwent performance testing using the Lighthouse feature in Google Chrome's Developer Tools. The results can be found below. I am very pleased with the results.

- Portfolio page

![css-validator-results](./assets/documentation/lighthouse-portfolio.png)

- Videos page

![css-validator-results](./assets/documentation/lighthouse-videos.png)

- About page

![css-validator-results](./assets/documentation/lighthouse-about.png)

- Contact page

![css-validator-results](./assets/documentation/lighthouse-contact.png)