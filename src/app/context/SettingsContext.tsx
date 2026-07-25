// context/SettingsContext.tsx
"use client";

import { createContext, useContext } from "react";
import { SettingsResponse } from "@/types/setting";

const SettingsContext = createContext<SettingsResponse | null>(null);

export function SettingsProvider({
    settings,
    children,
}: {
    settings: SettingsResponse;
    children: React.ReactNode;
}) {
    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error("useSettings must be used within SettingsProvider");
    }

    return context;
}