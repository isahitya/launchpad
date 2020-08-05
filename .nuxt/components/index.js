export { default as Content } from '../../components/Content.vue'
export { default as CreateDialog } from '../../components/CreateDialog.vue'
export { default as Navbar } from '../../components/Navbar.vue'
export { default as Sidebar } from '../../components/Sidebar.vue'
export { default as SidebarItem } from '../../components/SidebarItem.vue'
export { default as Tile } from '../../components/Tile.vue'

export const LazyContent = import('../../components/Content.vue' /* webpackChunkName: "components/Content'}" */).then(c => c.default || c)
export const LazyCreateDialog = import('../../components/CreateDialog.vue' /* webpackChunkName: "components/CreateDialog'}" */).then(c => c.default || c)
export const LazyNavbar = import('../../components/Navbar.vue' /* webpackChunkName: "components/Navbar'}" */).then(c => c.default || c)
export const LazySidebar = import('../../components/Sidebar.vue' /* webpackChunkName: "components/Sidebar'}" */).then(c => c.default || c)
export const LazySidebarItem = import('../../components/SidebarItem.vue' /* webpackChunkName: "components/SidebarItem'}" */).then(c => c.default || c)
export const LazyTile = import('../../components/Tile.vue' /* webpackChunkName: "components/Tile'}" */).then(c => c.default || c)
