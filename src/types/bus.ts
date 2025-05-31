export interface BusLine {
  id: string
  name: string
}

export interface BusStop {
  id: string
  name: string
  lineId: string
  order: number
}

export interface BusTime {
  id: string
  stopId: string
  time: string
}