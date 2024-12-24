import { exec } from 'child_process';
import fs from 'fs/promises';
import { isJson, getExecutionTime } from "./utils/functions.js";

let SCRAPER_FILES = [ 'priceoye', 'shophive','daraz' , 'czone'];

(async () => {
    let result = {},
        startTime = Date.now();

    for (let i = 0; i < SCRAPER_FILES.length; i++) {
        let filename = SCRAPER_FILES[i];

        console.log(`Start fetching data from ${filename} 🚀`);

        // Get File Output
        let res = await executeScraper(filename);
        result[filename] = res;
    };

    // Write Data to File
    await fs.writeFile('products.json', JSON.stringify(result, null, 2));

    // Get Execution Time
    let totalTime = getExecutionTime(startTime, Date.now()),
        { hours, minutes, seconds } = totalTime;

    console.log(`All Scrapers has been executed in ${hours}h ${minutes}m ${seconds}s 🎉\n`);
})();

// Get File Output
function executeScraper(filename, retry = 0) {
    return new Promise((res, rej) => {

        let startTime = Date.now();
        // Execute File
        exec(`node scrapers/${filename}.js`, async (err, output, stderr) => {

            if (!isJson(output)) {

                if (retry >= 3) {
                    console.log(`Retry Limit Exceeded for ${filename}! 🚨`);

                    res({
                        'message': err,
                    });
                    return false;
                }

                console.log(`Im facing some issues while fetching data from ${filename}! Retrying... 🔄\n`);
                let data = await executeScraper(filename, retry + 1);
                res(data);
            } else {

                let data = JSON.parse(output),
                    totalTime = getExecutionTime(startTime, Date.now()),
                    { hours, minutes, seconds } = totalTime;

                console.log(`Products has been fetched from ${filename} in ${hours}h ${minutes}m ${seconds}s 🎉\n`);
                res(data);
            }
        });
    });
}



