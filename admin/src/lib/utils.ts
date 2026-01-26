export const formatPrice = (price: number) => {
    // Use a deterministic formatter to avoid Hydration Mismatch (Server vs Client differences in Intl)
    // Format: "15 000 000 so'm"
    const formattedNumber = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formattedNumber} so'm`;
};
