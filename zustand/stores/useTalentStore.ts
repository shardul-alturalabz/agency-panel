import { create } from 'zustand';

export interface SourceSplit {
  gift: number;
  call: number;
}

export interface SampleTalentData {
  id: string;
  name: string;
  totalEarnings: number;
  totalStreams: number;
  totalFollowers: number;
  totalPrivateCallDuration: number;
  avgStreamTime: number;
  totalStreamTime: number;
  avgViewersPerStream: number;
  avgDiamondsPerStream: number;
}

interface TalentStoreState {
  talentData: SampleTalentData[];
  sourceSplit: SourceSplit | null;
  setTalentData: (data: SampleTalentData[]) => void;
  setSourceSplit: (split: SourceSplit) => void;
  clearTalentData: () => void;
}

export const useTalentStore = create<TalentStoreState>((set) => ({
  talentData: [],
  sourceSplit: null,
  setTalentData: (data) => set({ talentData: data }),
  setSourceSplit: (split) => set({ sourceSplit: split }),
  clearTalentData: () => set({ talentData: [], sourceSplit: null }),
}));
