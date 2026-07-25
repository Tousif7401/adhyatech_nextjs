import { apiFetch } from "./api";
import { Service } from "@/types/service";

export async function getServices(): Promise<Service[]> {
  return apiFetch<Service[]>("/services");
}

// export async function getHomepageServices(): Promise<Service[]> {
//   return apiFetch<Service[]>(
//     "/services/homepage"
//   );
// }

// export async function getService(
//   slug: string
// ): Promise<Service> {
//   return apiFetch<Service>(
//     `/services/${slug}`
//   );
// }

// export async function getServicesByBand(
//   band: string
// ): Promise<Service[]> {
//   return apiFetch<Service[]>(
//     `/services/band/${band}`
//   );
// }