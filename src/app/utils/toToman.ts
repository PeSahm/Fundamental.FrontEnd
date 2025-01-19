function convertToToman(price: string) {
    return Math.abs(Math.round((parseInt(price.replace(/,/g, '')) / 10))).toLocaleString('en-US') + ' میلیون تومان ' 
}

export default convertToToman;