function convertToToman(amount: string | null | undefined): string {
    // Handle null, undefined, or empty values
    if (!amount || amount === '' || amount === '0') {
        return '—';
    }
    
    const cleanedAmount = amount.replace(/,/g, '');
    const millionRial = parseFloat(cleanedAmount);
    
    if (isNaN(millionRial) || millionRial === 0) {
        return '—';
    }
    
    // Convert million Rials to Toman
    const tomanValue = Math.abs(Math.round(millionRial * 100000));
    
    // Format the number with readable breakdowns
    const trillion = Math.floor(tomanValue / 1000000000000); // هزار میلیارد
    const billion = Math.floor((tomanValue % 1000000000000) / 1000000000); // میلیارد
    const million = Math.floor((tomanValue % 1000000000) / 1000000); // میلیون
    const thousand = Math.floor((tomanValue % 1000000) / 1000); // هزار
    const remainder = tomanValue % 1000;
    
    const parts: string[] = [];
    
    if (trillion > 0) {
        parts.push(`${trillion.toLocaleString('en-US')} هزار میلیارد`);
    }
    if (billion > 0) {
        parts.push(`${billion.toLocaleString('en-US')} میلیارد`);
    }
    if (million > 0) {
        parts.push(`${million.toLocaleString('en-US')} میلیون`);
    }
    if (thousand > 0) {
        parts.push(`${thousand.toLocaleString('en-US')} هزار`);
    }
    if (remainder > 0) {
        parts.push(remainder.toLocaleString('en-US'));
    }
    
    // If the number is very large, show a condensed version
    if (parts.length > 3) {
        // Show only the three most significant parts
        return parts.slice(0, 3).join(' و ') + ' تومان';
    }
    
    return parts.join(' و ') + ' تومان';
}

export default convertToToman;