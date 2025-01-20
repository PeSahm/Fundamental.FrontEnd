function convertToToman(amount: string) {
    const cleanedAmount = amount.replace(/,/g, '');
    const millionRial = parseFloat(cleanedAmount);
    const toman = Math.round(millionRial * 100000);
    return Math.abs(toman).toLocaleString('en-US') + ' تومان ';
}

export default convertToToman;