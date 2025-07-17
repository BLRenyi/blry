import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios('http://localhost:8000/api/hello/')
      .then(res => setMessage(res.data.message))
  }, [])

  return <div><header>{message}</header></div>
}

export default App;
