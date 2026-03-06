export const getTotalPrice = (params) => {
    const { pricePP, occupancyDetails, nights } = params;
    const { adults, children } = occupancyDetails;
    const totalGuests = adults + children * 0.5;
    if(pricePP && nights){
        return totalGuests * pricePP * nights
    }
    return undefined
};
