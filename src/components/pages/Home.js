
import  Header  from '../Header'




function Overlay() {


    return (
    
        
      <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%', zIndex:'1' }}>
            

        <h1 style={{ position: 'absolute', bottom: -90, left: 70, fontFamily: 'Krona One', fontSize: '150px' , color: 'white' }}>ARCHIDAO</h1>
        <a style={{ position: 'absolute', width:'450px', bottom: 55, left: 1150, lineHeight:'30px' , fontFamily: 'Eg Garamond', fontSize: '18px' , color: 'black' }}>
            We are a collective of architects and technologists building the future version of architecture, construction, and engineering industry together.</a>
        <a href="https://discord.gg/rVR4YAmCGj" style={{ position: 'absolute', bottom: 55, left: 1370, lineHeight:'30px' , fontFamily: 'Eg Garamond', fontSize: '18px' , color: 'darkgoldenrod'  }}>
          Join us!
        </a>
        {/* <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>😄 —</div>
        <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>27/10/2022</div> */}
      </div>
      
    )
  }

export default function Home() {
 
    // const [isOpen, setOpen] = useState(false)

  return (
    <>
 
          <Overlay />
          <Header />
          

    </>

  )
}

