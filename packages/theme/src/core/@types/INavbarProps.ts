export interface INavbarProps {
  align: string
  tabs: {
    name: string
    href: string
    internal?: boolean
  }[]
}
