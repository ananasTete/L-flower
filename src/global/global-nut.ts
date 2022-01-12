import { Navbar, Icon } from '@nutui/nutui'
const nutArray: any[] = [Navbar, Icon]

function useNut(app: any): void {
  nutArray.forEach((nut) => {
    app.use(nut)
  })
}

export default useNut
