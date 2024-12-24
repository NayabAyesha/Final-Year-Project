const CATEGORIES = ['led tv', 'Gaming Console',  'Smartwatch','IPhone', 'Laptop', 'Camera', 'Printer', 'Samsung Galaxy'];


// To Slug
function toSlug(str) {
    return str
        .toLowerCase()               // Convert the string to lowercase
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-')     // Replace multiple - with single -
        .replace(/^-+/, '')         // Trim - from start of text
        .replace(/-+$/, '');        // Trim - from end of text
}

// Get Execution Time
function getExecutionTime(startTime, endTime) {
    let elapsedTime = endTime - startTime,
        seconds = Math.floor((elapsedTime / 1000) % 60),
        minutes = Math.floor((elapsedTime / (1000 * 60)) % 60),
        hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    return {
        hours,
        minutes,
        seconds
    };
}

// Is Json Function 
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// Wait Function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// To Number
function toNumber(str = "") {
    if (!str.length || !str) return 0;
    return str.replace(/\D/g, "");
}

export {
    toSlug,
    getExecutionTime,
    isJson,
    CATEGORIES,
    wait,
    toNumber
}
