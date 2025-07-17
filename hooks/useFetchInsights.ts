import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useTalentStore, SampleTalentData, SourceSplit } from "../zustand/stores/useTalentStore";

interface ApiTalentData {
  userId: number;
  totalStreams: number;
  totalDiamonds: number;
  avgDiamonds: number;
  avgStreamTime: string;
  totalStreamTime: string;
  followers: number;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: ApiTalentData[];
}

// Mapped Data Types
// SampleTalentData is imported from zustand store

const parseTimeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;

  const hourMatch = timeStr.match(/(\d+)h/);
  const minuteMatch = timeStr.match(/(\d+)m/);

  const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;

  return hours * 60 + minutes;
};

const token = Cookies.get('token');

const fetchTalentData = async (
  setTalentData: (data: SampleTalentData[]) => void,
  setSourceSplit: (split: SourceSplit) => void
): Promise<SampleTalentData[]> => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_INSIGHTS_API!, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.statusCode === 200 && response.data.data) {
      if (response.data.data.sourceSplit) {
        setSourceSplit(response.data.data.sourceSplit);
      }
      const mappedData: SampleTalentData[] = response.data.data.userResults.map((item: ApiTalentData) => ({
        id: `T${String(item.userId).padStart(3, '0')}`,
        name: `Talent ${item.userId}`,
        totalEarnings: Math.round(item.totalDiamonds || 0),
        totalStreams: item.totalStreams || 0,
        totalFollowers: item.followers || 0,
        totalPrivateCallDuration: 0,
        avgStreamTime: parseTimeToMinutes(item.avgStreamTime),
        avgViewersPerStream: 250,
        avgDiamondsPerStream: Math.round(item.avgDiamonds || 0)
      }));
      setTalentData(mappedData);
      console.log('Talent data fetched and mapped successfully:', mappedData);
      return mappedData;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching talent data:', error);
    // Set default data on error
    const defaultData: SampleTalentData[] = [{
      id: "T001",
      name: "Default Talent",
      totalEarnings: 0,
      totalStreams: 0,
      totalFollowers: 0,
      totalPrivateCallDuration: 0,
      avgStreamTime: 0,
      avgViewersPerStream: 0,
      avgDiamondsPerStream: 0
    }];
    setTalentData(defaultData);
    throw error;
  }
};

interface UseFetchTalentDataReturn {
  sampleTalentData: SampleTalentData[];
  fetchData: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useFetchTalentData = (): UseFetchTalentDataReturn => {
  const sampleTalentData = useTalentStore((state) => state.talentData);
  const setTalentData = useTalentStore((state) => state.setTalentData);
  const setSourceSplit = useTalentStore((state) => state.setSourceSplit);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await fetchTalentData(setTalentData, setSourceSplit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    sampleTalentData,
    fetchData,
    loading,
    error
  };
};