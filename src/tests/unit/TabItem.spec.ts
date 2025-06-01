import { mount } from '@vue/test-utils'
import TabItem from '@/components/navigation/TabItem.vue'
import { describe, it, expect } from 'vitest'
import { createMemoryHistory, createRouter, RouteRecordRaw, RouterLink } from 'vue-router'

const routes = [
  { path: '/', name: 'Home' },
  { path: '/stops', name: 'Stops' },
] as unknown as RouteRecordRaw[];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

describe('TabItem.vue', () => {
  it('renders label and path correctly', async () => {
    const wrapper = mount(TabItem, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: RouterLink,
        },
      },
      props: {
        label: 'Stops',
        path: '/stops',
      },
    })

    const link = wrapper.findComponent(RouterLink)
    expect(link.text()).toBe('Stops')
    expect(link.props('to')).toBe('/stops')
  })

  it('applies active class when route is active', async () => {
    router.push('/stops')
    await router.isReady()

    const wrapper = mount(TabItem, {
      global: {
        plugins: [router],
      },
      props: {
        label: 'Stops',
        path: '/stops',
      },
    })

    const link = wrapper.find('a.tab-item')
    expect(link.classes()).toContain('router-link-active')
  })
})
