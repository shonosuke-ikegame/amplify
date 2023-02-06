import { Amplify, API } from 'aws-amplify'
import { useEffect, useState } from 'react'
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
    <div className="App">
           {' '}
      {wikis.map((w) => {
        return (
          <div key={w.pageid}>
                        {w.title}
            {w.extract}         {' '}
          </div>
        )
      })}
         {' '}
    </div>
  )
}
export default App
