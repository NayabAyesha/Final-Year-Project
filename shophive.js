import puppeteer from "puppeteer";
import { CATEGORIES } from "../utils/functions.js";
import { faker } from "@faker-js/faker";

(async () => {

    let browser = await puppeteer.launch({
        headless: false
    });

    // Set Viewport

    let productsData = {};

    for (let i = 0; i < CATEGORIES.length; i++) {
        let category = CATEGORIES[i],
            url = `https://www.shophive.com/catalogsearch/result/index/?q=${category}&product_list_order=rating`;



        let page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        let products = await page.evaluate(async () => {

            //#region Functions
            // Wait For Element Visible
            function waitForElementVisible(selector, timeout = 30000) {
                return new Promise((resolve, reject) => {
                    const startTime = Date.now();

                    const checkVisibility = () => {
                        const element = document.querySelector(selector);
                        if (element) {
                            resolve(element);
                        } else {
                            const currentTime = Date.now();
                            if (currentTime - startTime >= timeout)
                                reject("Element not visible");
                            else setTimeout(checkVisibility, 100); // Check again after 100ms

                        }
                    };

                    checkVisibility();
                });
            }

            // Wait for Element to be removed
            function waitForElementRemoved(selector, timeout = 30000) {
                return new Promise((resolve, reject) => {
                    const startTime = Date.now();

                    const checkRemoval = () => {
                        const element = document.querySelector(selector);
                        if (!element)
                            resolve(true);
                        else {
                            const currentTime = Date.now();
                            if (currentTime - startTime >= timeout)
                                reject("Element not removed");
                            else
                                setTimeout(checkRemoval, 100); // Check again after 100ms

                        }
                    };

                    checkRemoval();
                });
            }

            // To Number
            function toNumber(str) {
                return str.replace(/\D/g, "");
            }

            //#endregion Functions 

            //#region Get Ul
            let ul = document.querySelector(".products.list.items.product-items.row");
            if (!ul) return [];
            //#endregion Get Ul 

            //#region Product Load Strategy

            try {
                let defaultScrollHeight = ul.clientHeight - 62;
                // Scroll 4 times to load all products
                let scrollHeight = 0;

                for (let i = 0; i < 2; i++) {
                    scrollHeight += defaultScrollHeight;
                    // Scrolling
                    window.scroll({
                        top: scrollHeight,
                        behavior: 'smooth',
                        left: 0
                    });

                    await waitForElementVisible(".mb-spinner");
                    await waitForElementRemoved(".mb-spinner");

                }

                // Scroll 6 times to load all products
                for (let i = 0; i < 6; i++) {
                    // Scroll when load more button is found and visible
                    scrollHeight += defaultScrollHeight;

                    // Scrolling
                    window.scroll({
                        top: scrollHeight,
                        behavior: 'smooth',
                        left: 0
                    });

                    await waitForElementVisible('.mb-trigger-next'); // Wait for load more button to appear

                    // Check if load more button is available
                    let loadMoreButton = document.querySelector(".mb-trigger-next");

                    if (loadMoreButton) {
                        loadMoreButton.click();
                        await waitForElementVisible('.mb-spinner');
                        await waitForElementRemoved('.mb-spinner');
                    }
                }
            } catch (err) { console.log(err); }

            //#endregion Product Load Strategy

            //#region Products Data Fetching
            let products = ul.querySelectorAll("li"),
                data = [],
                productLen = products.length > 100 ? 100 : products.length;

            try {
                // Loop through all products
                for (let i = 0; i < productLen; i++) {
                    let productCard = products[i];
                    if (!productCard) continue;

                    let upperPart = productCard.querySelector(".product.photo.product-item-photo"),
                        url = upperPart.href,
                        image = upperPart.querySelector(".product-image-photo"),
                        title = image.getAttribute("alt"),
                        imageUrl = image.src,
                        price = productCard.querySelector(".price"),
                        rating = productCard.querySelector('.reviews-actions');
                        ratingCount = '0'; 

                    if (rating) rating = rating.querySelector('.action').innerText;
                    else rating = "0";

                    data.push({
                        name: title,
                        price: price ? toNumber(price.innerText) : 0,
                        ratingCount:  rating,
                        rating: rating? "5":ratingCount,
                        imageUrl,
                        url,
                    })
                    

                }
            } catch (err) { }
            //#endregion Products Data Fetching 

            return data;
        });

        for (let i = 0; i < products.length; i++) {
            faker.lorem.paragraph({
                max: 10,
                min: 3
            });
            let res = faker.lorem.paragraph({ min: 1, max: 10 });
            products[i].description = res;
        }

        if (products.length > 0) {
            productsData[category] = products;
        }

        
    }

    await browser.close();
    console.log(JSON.stringify(productsData));
})();
