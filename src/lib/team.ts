import { apiFetch } from "./api";

import { Team } from "@/types/team";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getTeamData(): Promise<Team[]> {
  return apiFetch<Team[]>("/teams");
}