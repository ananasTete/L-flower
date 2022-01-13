import { App } from 'vue'
import useVant from './global-vant'

function useGlobal(app: App): void {
  useVant(app)
}

export default useGlobal
