type GridItemType = {
  name: string
}

type labelType = {
  id: number
  name: string
  imgUrl: string
  categoryId: number
}
type CategoryType = {
  id: number
  name: string
  labels: labelType[]
}

export { GridItemType, CategoryType }
