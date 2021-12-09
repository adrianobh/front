import { api } from "../config/api.js";

export async function inventoryByProductId(params) {
  try {
    const response = await api.get("/inventory-product", { params });
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}

export async function createInventoryProduct(data) {
  try {
    const response = await api.post("/inventory-product", data);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}
