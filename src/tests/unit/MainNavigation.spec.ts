import { mount, flushPromises } from '@vue/test-utils'
import MainNavigation from '@/components/navigation/MainNavigation.vue'
import { createRouter, createWebHistory } from 'vue-router'
import BusLinesView from '@/components/views/BusLinesView.vue'
import StopsView from '@/components/views/StopsView.vue'
import { describe, it, expect } from 'vitest'

const routes = [
  {
    path: '/',
    name: 'Bus Lines',
    component: BusLinesView
  },
  {
    path: '/stops',
    name: 'Stops',
    component: StopsView
  }
]

const createTestRouter = (initialPath = '/') => {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  router.push(initialPath)
  return router
}

describe('MainNavigation.vue', () => {
  it('renders a tab for each route', async () => {
    const router = createTestRouter('/')
    await router.isReady()

    const wrapper = mount(MainNavigation, {
      global: {
        plugins: [router]
      }
    })

    const tabs = wrapper.findAll('.tab-item')
    expect(tabs).toHaveLength(routes.length)
    expect(tabs[0].text()).toBe('Bus Lines')
    expect(tabs[1].text()).toBe('Stops')
  })

  it('highlights active tab', async () => {
    const router = createTestRouter('/stops')
    await router.isReady()

    const wrapper = mount(MainNavigation, {
      global: {
        plugins: [router]
      }
    })

    await flushPromises()

    // Sprawdź wszystkie taby i znajdź ten z klasą aktywną
    const activeTab = wrapper.find('.tab-item.router-link-active')
    expect(activeTab.exists()).toBe(true)
    expect(activeTab.text()).toBe('Stops')
  })
})
