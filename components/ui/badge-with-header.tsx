export const BadgeWithHeader = ({
  text,
  price,
  currencySymbol = "₹",
  type = "text",
}: {
  text?: string;
  price?: number | string;
  currencySymbol?: string;
  type?: "price" | "text";
}) => {
  function formatPrice(price: number) {
    const priceStr = price.toString();
    const parts = priceStr.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.length > 1 ? parts.join(".") : parts[0];
  }

  const displayPrice =
    type === "price" && typeof price === "number" ? formatPrice(price) : price;

<<<<<<< HEAD
  return (
    <div className="flex w-[20%] flex-col items-start p-3 gap-0.5 rounded-md bg-[#1e1e1e] text-white">
      <span className="text-sm max-md:text-xs font-medium mb-0.5 opacity-60">
        {text}
      </span>
      <span className="text-lg max-md:text-base font-semibold tracking-tight">
        {type === "price" && currencySymbol}
        {displayPrice}
      </span>
    </div>
  );
};
=======
    return (
        <div className="flex w-[24%] h-full max-h-fit flex-col items-start p-4 gap-0.5 rounded-lg bg-[#1e1e1e] text-white">
            <span className=" max-md:text-sm max-sm:text-[0.6rem] text-lg font-medium mb-1 opacity-70">{text}</span>
            <span className="max-md:text-2xl max-sm:text-[0.8rem] text-[1.7rem] font-bold tracking-wide">{type=="price" && currencySymbol}{displayPrice}</span>
        </div>
    )
}
>>>>>>> c0df7d187d309dc5674777082dbd28a41115daf9
