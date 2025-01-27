import { api } from "@/services/api";

const addCardsService = <T>(data: T) => api.post("/cards/add", { data });
const updateCardsService = <T>(data: T) => api.post("/cards/update", { data });

export { addCardsService ,updateCardsService };
