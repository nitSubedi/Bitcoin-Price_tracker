import paybislogo from './assets/img/pay.png'
import moonlogo from './assets/img/moon.png'
import businesslogo from './assets/img/business.png'
import coinlogo from './assets/img/coin.jpg'

type ResultRowPorps={
    loading?:boolean;
    providerName?:string;
    btc?:string;
};

const logos ={
    Paybis: {source:paybislogo,},
    MoonPay:{source:moonlogo},
    Business_Insider:{source:businesslogo},
    Coin_Market_Cap:{source:coinlogo}

}

export default function ResultRow({loading, providerName, btc}:ResultRowPorps){
    let url = `https://${providerName}.com`;
    if(providerName=='Business_insider'){
        url = 'https://markets.businessinsider.com/currency-converter/united-states-dollar_btc';
    }
    if(providerName=='Coin_Marker_Cap'){
        url = 'https://coinmarketcap.com';
    }
    return(
        <a 
        href={url}
        target='_blank'
        className=" block relative border h-24 border-white/10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 my-2 overflow-hidden">
            <div className="flex gap-4">
                
                {providerName&&(
                <div className='grow items-center flex'>
                    <img src={logos[providerName].source} className='py-4'  alt=" "/>
                </div>
                )}
                
                {btc && (
                <div className="flex gap-2">
                    <span className="text-xl text-purple-200/80 py-4">{new Intl.NumberFormat('en-US',{minimumFractionDigits:8}).format(parseFloat(btc))}</span>
                    <span className="text-xl text-purple-300/50 py-4" >BTC</span>
                </div>
                )}
            </div>
            {loading && (
                <div className="inset-0 absolute bg-gradient-to-r from-transparent via-blue-900 to-transparent skeleton-animation"></div>
            )}

        </a>
        


    )
}