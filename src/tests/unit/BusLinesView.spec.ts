import { mount } from '@vue/test-utils'
import BusLinesView from '@/components/views/BusLinesView.vue'
import SelectBusLine from '@/components/busLines/SelectBusLine.vue'
import CardList from '@/components/busLines/CardList.vue'
import { describe, it, expect, vi } from 'vitest'
import { createStore, type Action } from 'vuex'

const createMockStore = (overrides = {}) =>
  createStore({
    modules: {
      bus: {
        namespaced: true,
        state: () => ({
          selectedLine: '102',
          selectedStop: 'Wilanowska',
          sortAsc: true,
          isLoading: false,
          ...overrides,
        }),
        getters: {
          stopsForSelectedLine: () => [
            { stop: 'Wilanowska' },
            { stop: 'Nowowiejska' },
          ],
          timesForSelectedStop: () => ['12:00', '12:15'],
        },
        actions: {
          selectStop: vi.fn() as Action<any, any>,
          toggleSort: vi.fn() as Action<any, any>,
        },
      },
    },
  })

describe('BusLinesView.vue', () => {
  it('renders SelectBusLine and two CardList components when not loading', () => {
    const store = createMockStore()

    const wrapper = mount(BusLinesView, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.findComponent(SelectBusLine).exists()).toBe(true)
    const cardLists = wrapper.findAllComponents(CardList)
    expect(cardLists.length).toBe(2)
    expect(cardLists[0].props('selectedValue')).toBe('102')
    expect(cardLists[0].props('selectedChild')).toBe('Wilanowska')
    expect(cardLists[1].props('list')).toEqual(['12:00', '12:15'])
  })

  it('shows loading spinner when isLoading is true', () => {
    const store = createMockStore({ isLoading: true })

    const wrapper = mount(BusLinesView, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.find('.is-loading').exists()).toBe(true)
    expect(wrapper.findComponent(SelectBusLine).exists()).toBe(false)
    expect(wrapper.findComponent(CardList).exists()).toBe(false)
  })
})
