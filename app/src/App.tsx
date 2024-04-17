import './App.css';
import Query from "@namada/shared";
import { init as initShared } from "@namada/shared/src/init";
import { useState, useEffect } from 'react';

function App() {
  async function clickMe() {
    const epoch = await query?.query_epoch();
    const stuff = await query?.query_native_token();
    setNativeToken(stuff)
    setEpoch(epoch)
  }

  useEffect(() => {
    async function init() {
      await initShared()
      setQuery(new Query("https://rpc.luminara.icu:443"))
      setLoading(false)
    }
    init()
  }, [])

  const [nativeToken, setNativeToken] = useState<string | undefined>(undefined) 
  const [epoch, setEpoch] = useState<number | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [query, setQuery] = useState<Query | undefined>()

  return (
    <div className="App">
      {
      loading === false ? 
        <div>
          <button onClick={clickMe}>Click me</button>
          {epoch && <p>Epoch: {epoch}</p>}
          {nativeToken && <p>Native Token: {nativeToken}</p>}
        </div>
      : <p>Loading...</p>
      }
    </div>
  )
}

export default App;
