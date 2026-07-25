import { apiFetch } from "./api";
import { SettingsResponse } from "@/types/setting";

export async function getSettings() {
  return apiFetch<SettingsResponse>("/settings");
}