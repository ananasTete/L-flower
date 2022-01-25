import localCache from './localCache'

export default function setSearchHistory(value: string): void {
  let history = localCache.getCache('searchHistory')
  if (!history) {
    history = []
  }
  history.push(value)
  localCache.setCache('searchHistory', history)
}
