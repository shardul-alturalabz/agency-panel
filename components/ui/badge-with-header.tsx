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
