import {importFile} from './utils/utils';

const data = importFile(__filename);
console.log(data.trim())