export interface SettingItem {
  label: string;
  value: string;
  link_url: string;
}

export interface SettingsResponse {
  phones: SettingItem[];
  emails: SettingItem[];
  addresses: SettingItem[];
  socials: SettingItem[];
}