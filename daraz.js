import axios from "axios";
import { CATEGORIES, toNumber } from "../utils/functions.js";

(async () => {
    let pageCount = 1,
        finalData = {};

    // Fetch Products for each category
    for (let c = 0; c < CATEGORIES.length; c++) {
        let category = CATEGORIES[c],
            c_products = [];

        for (let i = 1; i <= pageCount; i++) {
            let products = await fetchProducts(category, i);
            if (!products.length || !products) break;

            c_products.push(...products);
        }
        if (c_products.length > 0) {
            finalData[category] = c_products;
        }
       
    }

    // Fetch Products
    function fetchProducts(category, pageNo = 1) {
        return new Promise(async (res, rej) => {

            let options = {
                method: 'GET',
                url: 'https://www.daraz.pk/catalog/',
                params: {
                    _keyori: 'ss',
                    ajax: 'true',
                    from: 'input',
                    page: pageNo,
                    q: category,
                    spm: 'a2a0e.searchlist.pagination.3.6e1927eeVQuaX1',
                    style: 'wf',
                },
                headers: { Accept: '*/*' }
            };

            let products = await axios.request(options);

            products = products.data.mods.listItems;

            if (!products) {
                res([]);
                return false;
            }

            // Map Products
            products = products.map(product => {
                let { name, productUrl, image, priceShow, ratingScore = "0", review = "0", description } = product;

                if (productUrl.startsWith('//')) productUrl = productUrl.replace('//', 'https://');

                return {
                    name,
                    price: toNumber(priceShow),
                    url: productUrl,
                    imageUrl: image,
                    rating: ratingScore,
                    ratingCount: review,
                    description: description.join("\n")
                };
            });
            

            res(products);
        });
    }

    console.log(JSON.stringify(finalData));
})();
