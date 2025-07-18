import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
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
  data: {
    userResults: ApiTalentData[];
    sourceSplit?: SourceSplit;
  };
}

const parseTimeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  
  const hourMatch = timeStr.match(/(\d+)h/);
  const minuteMatch = timeStr.match(/(\d+)m/);
  
  const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
  
  return hours * 60 + minutes;
};

const fetchTalentData = async (
  token: string,
  setTalentData: (data: SampleTalentData[]) => void,
  setSourceSplit: (split: SourceSplit) => void
): Promise<SampleTalentData[]> => {
  const response = await axios.get<ApiResponse>(process.env.NEXT_PUBLIC_INSIGHTS_API!, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.data.statusCode !== 200 || !response.data.data) {
    throw new Error(`API Error: ${response.data.message || 'Invalid response format'}`);
  }

  // Handle source split if available
  if (response.data.data.sourceSplit) {
    setSourceSplit(response.data.data.sourceSplit);
  }

  // Map the user results
  const userResults = response.data.data.userResults || [];
  const mappedData: SampleTalentData[] = userResults.map((item: ApiTalentData) => ({
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
};

interface UseFetchTalentDataReturn {
  sampleTalentData: SampleTalentData[];
  fetchData: () => Promise<void>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchTalentData = (): UseFetchTalentDataReturn => {
  const sampleTalentData = useTalentStore((state) => state.talentData);
  const setTalentData = useTalentStore((state) => state.setTalentData);
  const setSourceSplit = useTalentStore((state) => state.setSourceSplit);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use ref to track the current request to prevent race conditions
  const currentRequestRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    const token = Cookies.get('token');
    
    if (!token) {
      setError('No authentication token found');
      return;
    }

    // Cancel previous request if still pending
    if (currentRequestRef.current) {
      currentRequestRef.current.abort();
    }

    // Create new abort controller for this request
    currentRequestRef.current = new AbortController();
    
    setLoading(true);
    setError(null);
    
    try {
      await fetchTalentData(token, setTalentData, setSourceSplit);
    } catch (err) {
      // Don't set error if request was aborted
      if (axios.isCancel(err)) {
        return;
      }
      
      console.error('Error fetching talent data:', err);
      
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
      
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('An unknown error occurred while fetching talent data');
      }
    } finally {
      setLoading(false);
      currentRequestRef.current = null;
    }
  }, [setTalentData, setSourceSplit]);

  // Initial fetch on mount
  useEffect(() => {
    fetchData();
    
    // Cleanup function to cancel any pending requests
    return () => {
      if (currentRequestRef.current) {
        currentRequestRef.current.abort();
      }
    };
  }, [fetchData]);

  // Function to manually refetch data
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    sampleTalentData,
    fetchData,
    loading,
    error,
    refetch
  };
};