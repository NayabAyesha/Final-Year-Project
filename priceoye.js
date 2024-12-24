import puppeteer from "puppeteer";
import axios from "axios";
import { JSDOM } from "jsdom";
import { faker } from "@faker-js/faker";
import { CATEGORIES } from "../utils/functions.js";

const img = '../utils/Image_not_available.png';

(async () => {

    let URL_OBJ = {};
    // Maping Urls for single page
    for (let i = 0; i < CATEGORIES.length; i++) {
        let category = CATEGORIES[i],
            mainUrl = `https://priceoye.pk/search?q=${category}`,
            urls = [];
        urls.push(mainUrl);

        for (let i = 0; i <= 4; i++) {
            urls.push(`${mainUrl}&page=${i + 1}`);
        }

        URL_OBJ[category] = urls;
    }

    const browser = await puppeteer.launch({ headless: false });

    let finalProducts = {};

    // Maping
    for (const category in URL_OBJ) {

        let urls = URL_OBJ[category],
            page = await browser.newPage(),
            products = [];


        // Fetch Products Urls and Some basic info
        for (let i = 0; i < urls.length; i++) {
            await page.goto(urls[i], {
                waitUntil: "networkidle2"
            });

            await page.waitForSelector(".product-list");

            let productsObj = await page.evaluate(() => {

                //#region Functions

                // To Number
                function toNumber(str) {
                    return str.replace(/\D/g, "");
                }

                //#endregion Functions 

                let products = [],
                    productList = document.querySelector('.product-list'),
                    productCards = productList.querySelectorAll(".productBox");
                if (!productCards.length) return false;


                productCards.forEach(card => {
                    try {
                        let url = card.querySelector('a').href,
                            detailBox = card.querySelector('.detail-box'),
                            title = detailBox.querySelector('.p-title').innerText.trim(),
                            price = detailBox.querySelector('.price-box')?.innerText;
                        products.push({
                            name: title,
                            price: toNumber(price),
                            url
                        });
                    } catch (err) { }
                });
                return products;
            });

            if (!productsObj) break;

            products = [...products, ...productsObj];

        }

        // Fetching Advance Information for Product
        for (let i = 0; i < products.length; i++) {
            let singleProduct = products[i],
                url = singleProduct.url,
                response = await axios.get(url);

            let html = new JSDOM(response.data).window.document,
                rating = html.querySelector('.rating-points')?.textContent ?? '0',
                ratingCount = html.querySelector('.rating-count')?.textContent ?? '0',
                imageUrl = html.querySelector('.product-detail-image')?.src ?? img;


            faker.lorem.paragraph({
                max: 10,
                min: 3
            });

            let res = faker.lorem.paragraph({ min: 1, max: 10 });

            ratingCount = ratingCount.replace(/\D/g, "");

            // Push Products Data
            products[i] = {
                rating,
                ratingCount,
                imageUrl,
                description: res,
                ...singleProduct,
            }
        }

        if (products.length > 0) {
            finalProducts[category] = products;
        }
         // Assign Products Data
    }


    await browser.close(); // Close Browser

    console.log(JSON.stringify(finalProducts));

})();

