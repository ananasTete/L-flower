import { App } from 'vue'
import useNut from './global-nut'

function useGlobal(app: App): void {
  useNut(app)
}

export default useGlobal
