import { CATEGORIES, toNumber } from "../utils/functions.js";
import puppeteer from "puppeteer";

(async () => {

    // Launch Browser
    const browser = await puppeteer.launch({
        headless: true
    });

    let productsData = {};

    // Loop through Categories
    for (let i = 0; i < CATEGORIES.length; i++) {
        let category = CATEGORIES[i],
            url = `https://www.czone.com.pk/search.aspx?kw=${category}`;

        //#region Page Open
        let page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });
        //#endregion Page Open 

        //#region Top Rated Filter
        await page.waitForSelector("#ddlSort");
        await page.select('#ddlSort', '6');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        //#endregion Top Rated Filter 

        //#region Per Page Results Filter
        await page.waitForSelector("#ddlResults");
        await page.select('#ddlResults', '1000');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        //#endregion Per Page Results Filter 

        // Start Getting Products Data
        let products = await page.evaluate(() => {

            //#region Functions
            // To Number
            function toNumber(str) {
                return str.replace(/\D/g, "");
            }

            //#endregion Functions 




            let products = [],
                largeThumbnailUrl = "https://www.czone.com.pk/images/thumbnails-large/",
                container = document.querySelector(".row.categoryProduct.xsResponse.clearfix");
            if (!container) return products;
            let productCards = container.querySelectorAll(".template");

            if (!productCards) return products;
            if (productCards.length == 0) return products;

            let productLength = productCards.length >= 100 ? 100 : productCards.length;
            // Start Looping
            for (let i = 0; i < productLength; i++) {
                let product = productCards[i];
                if (!product) continue;

                let innerDiv = product.querySelector('.col-lg-8.col-md-8.col-sm-8.col-xs-12.no-padding'),
                    title = innerDiv.querySelector("h4 a"),
                    price = product.querySelector('.price').querySelector('span').innerText,
                    image = product.querySelector('img.img-responsive').src,
                    rating = product.querySelector('.product-rating'),
                    description = product.querySelector('.description').querySelectorAll("p")[1].innerText,
                    ratingInfo = product.querySelector(".ratingInfo"),
                    ratingCount = '0';


                if (ratingInfo) ratingCount = ratingInfo.querySelector('.first').innerText;
                ratingCount = ratingCount.replace(/\D/g, "");

                // Check Rating
                if (rating) rating = rating.innerText;
                else rating = "0";

                image = image.split('/').pop();
                image = largeThumbnailUrl + image;

                // Push Single Product Data
                products.push({
                    name: title.innerText,
                    url: title.href,
                    price: toNumber(price),
                    imageUrl: image,
                    rating,
                    ratingCount,
                    description
                });
            }
            return products;
        });

        if (products.length > 0) {
            productsData[category] = products;
        }

        
    }

    // Close Browser
    await browser.close();

    console.log(JSON.stringify(productsData));
})();
