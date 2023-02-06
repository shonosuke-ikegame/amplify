import { studioTheme } from './ui-components'
import { Amplify, API } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '@aws-amplify/ui-react'
import { NavBar, FAQItem } from './ui-components'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

function App() {
  const [wikis, setWikis] = useState([])
  useEffect(() => {
    const execRq = async () => {
      const wikiObj = (await API.get('shonosukeapi', '/handson')).query.pages
      const wikiArr = Object.entries(wikiObj).map(([_, val]) => val)
      console.log(wikiArr)
      setWikis(wikiArr)
    }
    execRq()
  }, [])

  return (
    <ThemeProvider theme={studioTheme}>
      <NavBar></NavBar>
      {wikis.map((w) => {
        //設定したコンポーネントプロパティのtitleとexplainプロパティにAPIから取得した値を入れてあげるだけ
        return (
          <FAQItem key={w.pageid} title={w.title} explain={w.extract}></FAQItem>
        )
      })}
    </ThemeProvider>
  )
}

export default App
