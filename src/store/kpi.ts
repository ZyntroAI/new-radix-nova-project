import { create } from "zustand";
import { Api } from "../lib/api";

interface KPIState {
  stats: {
    inboxCount: number;
    processedToday: number;
    dlqCount: number;
    lastRunAt?: string;
  } | null;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
}

export const useKPIStore = create<KPIState>((set) => ({
  stats: null,
  isLoading: false,
  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const data = await Api.getStats(); // ดึงข้อมูลจาก Apps Script [2]
      set({ stats: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Failed to fetch KPIs", error);
    }
  },
}));
