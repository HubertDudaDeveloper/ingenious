import { createStore } from 'vuex'
import { bus } from '@/store/modules/bus'
import { stops } from '@/store/modules/stops'
import { BusState } from '@/types/bus'
import { StopsState } from '@/types/stops'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  bus: BusState,
  stops: StopsState
}

export const store = createStore<RootState>({
  modules: {
    bus,
    stops
  }
})