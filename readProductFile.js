
import fs from 'fs';
import path from 'path';

const readProductFile = () => {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
};

export default readProductFile;

