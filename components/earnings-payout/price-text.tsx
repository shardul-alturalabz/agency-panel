export const PriceText = ({ text, price }: { text: string; price: number }) => {

    function formatPrice(price: number) {
        const priceStr = price.toString();
        const parts = priceStr.split('.');
    
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        return parts.length > 1 ? parts.join('.') : parts[0];
      }

    return (
        <p>{text} :<span className='font-semibold'> &#8377;{formatPrice(price)}</span></p>
    )
}