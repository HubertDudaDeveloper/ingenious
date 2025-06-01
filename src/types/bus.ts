export interface StopRecord {
  line: number;
  stop: string;
  order: number;
  time: string;
}
export interface BusState {
  stopsData: StopRecord[];
  selectedLine: number | null;
  selectedStop: string | null;
  isLoading: boolean;
  error: string | null;
  sortAsc: boolean;
}

export interface BusLine {
  id: string
  name: string
}

export interface BusStop {
  stop: string
  order: number
}

export interface BusTime {
  id: string
  stopId: string
  time: string
}