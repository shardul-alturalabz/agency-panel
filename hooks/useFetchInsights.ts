import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

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
interface SampleTalentData {
  id: string;
  name: string;
  totalEarnings: number;
  totalStreams: number;
  totalFollowers: number;
  totalPrivateCallDuration: number;
  avgStreamTime: number;
  avgViewersPerStream: number;
  avgDiamondsPerStream: number;
}

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
  setSampleTalentData: React.Dispatch<React.SetStateAction<SampleTalentData[]>>
): Promise<SampleTalentData[]> => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_INSIGHTS_API!, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.statusCode === 200 && response.data.data) {
      const mappedData: SampleTalentData[] = response.data.data.map((item: ApiTalentData) => ({
        id: `T${String(item.userId).padStart(3, '0')}`, // T001, T037, etc.
        name: `Talent ${item.userId}`, // Default name since not provided by API
        totalEarnings: Math.round(item.totalDiamonds || 0),
        totalStreams: item.totalStreams || 0,
        totalFollowers: item.followers || 0,
        totalPrivateCallDuration: 0, // Default value - not provided by API
        avgStreamTime: parseTimeToMinutes(item.avgStreamTime), // Convert to minutes
        avgViewersPerStream: 250, // Default value - not provided by API
        avgDiamondsPerStream: Math.round(item.avgDiamonds || 0)
      }));

      // Update the state with mapped data
      setSampleTalentData(mappedData);

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

    setSampleTalentData(defaultData);
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
  const [sampleTalentData, setSampleTalentData] = useState<SampleTalentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await fetchTalentData(setSampleTalentData);
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