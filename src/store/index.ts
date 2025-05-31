import { createStore } from 'vuex'
import { bus } from './modules/bus'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
}

export const store = createStore<RootState>({
  modules: {
    bus
  }
})