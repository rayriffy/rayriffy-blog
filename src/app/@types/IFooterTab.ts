export interface IFooterTab {
  name: string
  navs:  {
    href: string
    internal?: boolean
    name: string
  }[]
}
