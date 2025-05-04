export const BadgeWithHeader = ({ 
    text, 
    price, 
    currencySymbol = '₹',
    type = 'text'
}: { 
    text?: string; 
    price?: number | string;
    currencySymbol?: string;
    type?: 'price' | 'text';
}) => {
    function formatPrice(price: number) {
        const priceStr = price.toString();
        const parts = priceStr.split('.');
    
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        return parts.length > 1 ? parts.join('.') : parts[0];
    }

    const displayPrice = type === 'price' && typeof price === 'number' 
        ? formatPrice(price) 
        : price;

    return (
        <div className="flex w-[24%] flex-col items-start p-4 gap-0.5 rounded-lg bg-[#1e1e1e] text-white">
            <span className=" max-md:text-sm max-sm:text-[0.6rem] text-lg font-medium mb-1 opacity-70">{text}</span>
            <span className="max-md:text-2xl max-sm:text-[0.8rem] text-[1.7rem] font-bold tracking-wide">{type=="price" && currencySymbol}{displayPrice}</span>
        </div>
    )
}