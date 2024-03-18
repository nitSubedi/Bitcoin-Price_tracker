import {useEffect, useState} from 'react';

import AmountInput from './assets/AmoutInput';
import ResultRow from './ResultRow';
import axios from 'axios';
import {sortBy} from 'lodash-es';
import useDebouncedEffect from 'use-debounced-effect';

type CachedResults={
  provider:string;
  btc:string;
};

type offerResults={
 [key:string]:string;
};

const defaultAmount='100';

function App() {
  const[prevAmount, setPrevAmount]=useState(defaultAmount);
  const[amount,setAmount] = useState('100');
  const[cachedResults, setCachedResults]= useState<CachedResults[]>([]);
  const[offerResults, setOfferResults]=useState({});
  const[loading, setLoading]=useState(true);
  useEffect(()=>{
   
    axios.get('https://ei8zxka7cq.us.aircode.run/cachedValues').then(res=>{
      setCachedResults(res.data);
      setLoading(false);
    });
  },[]);

  useDebouncedEffect(()=>{
    setLoading(true)
    if(amount!==prevAmount){
      axios.get(`https://ei8zxka7cq.us.aircode.run/hello?amount=${amount}`).then(res =>{
        setLoading(false);
        setOfferResults(res.data);
        setPrevAmount(amount);

      })
    }
    console.log("check for"+amount);
  },700,[amount])

  const sortedCache = sortBy(cachedResults, 'btc').reverse();
  const sortedResults:CachedResults[]=sortBy(Object.keys(offerResults).map(provider =>({
    provider,
    btc:offerResults[provider]

  })),'btc').reverse();
  const showCached= amount == defaultAmount;
 

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="uppercase text-6xl text-center font-bold bg-gradient-to-br from-purple-600 to-sky-400 bg-clip-text text-transparent">Find Cheapest BTC</h1>
      <div className='flex justify-center mt-6'>
        <AmountInput
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />  
      </div>
      <div className='mt-6'>
        {loading&&(
          <>
          <ResultRow loading={true}/>
          <ResultRow loading={true}/>
          <ResultRow loading={true}/>
          <ResultRow loading={true}/>
          </>
        )}
        {!loading && showCached && sortBy(cachedResults, 'btc').reverse().map(result =>(
          <ResultRow 
          btc={result.btc}
          providerName={result.provider} />
        ))}
        {!loading && !showCached &&sortedResults.map(result =>(
           <ResultRow 
           btc={result.btc}
           providerName={result.provider} />

        ))}
      </div>
      


    </main>
  
  )
}

export default App
