import { apiFetch } from "./api";
import { CareerResponse } from "@/types/career";

export async function getCareerData(): Promise<CareerResponse> {
    return apiFetch<CareerResponse>("/careers");
}