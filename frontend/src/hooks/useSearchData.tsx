import { useSearchParams } from "react-router-dom";

export function useSearchData() {
    const [params] = useSearchParams();

    return {
        destination: params.get("destination"),
        checkin: params.get("checkin"),
        checkout: params.get("checkout"),
        adults: params.get("adults"),
        children: params.get("children"),
        rooms: params.get("rooms")
    };
}

export const normalizeParam = (value) => {
    if (value === "null" || value === "undefined" || value === "") {
        return null;
    }
    return value;
};