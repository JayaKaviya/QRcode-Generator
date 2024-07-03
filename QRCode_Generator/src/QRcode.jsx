import React, { useState } from 'react'

const QRcode = () => {  

  const [img,setImg]=useState('') 
  const [loading,setLoading]=useState(false); 
  const[qrData,setQrData]=useState("https://mern-front-rprc.onrender.com/");
  const[qrSize,setQrSize]=useState("150");



  async function generateQR()
  {  
    setLoading(true);
    try{ 
         const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`; 
         setImg(url);
    }
    catch(error)
    { 
       console.error('Error generating QR code',error);
    }
    finally{ 
      setLoading(false);
    }
    
  } 

  function downloadQR()
  { 
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{ 
          const link=document.createElement('a'); 
          link.href=URL.createObjectURL(blob); 
          link.download="qrcode.png"; 
          document.body.appendChild(link); 
          link.click(); 
          document.body.removeChild(link); 
        })
  }

  return (
    <div className="app-container">
      <div> 
        <h1>QR CODE GENERATOR</h1> 

        {loading && <p>Please wait...</p>}
        {img && <img src={img} className='qr-code-image'/>}
        <br/> 


        <label htmlFor="dataInput" className='input-label'>
            Data for QR Code
        </label>
        <input type='text' id="dataInput" placeholder='Enter data for QR code'  
        value={qrData} onChange={(e)=>setQrData(e.target.value)}/> 

      
        <label htmlFor="sizeInput" className='input-label'>
            Image size(ex., 150)
        </label> 
        <input type='text' id="sizeInput" placeholder='Enter image size'
         value={qrSize} onChange={(e)=>setQrSize(e.target.value)}/> 
         
       
        <button className="generate-button" onClick={generateQR} disabled={loading}>Generate QR Code</button> 
        <button className="download-button" onClick={downloadQR}>Download QR Code</button>  

        <p className='footer'>Designed by <a href="https://www.linkedin.com/in/jayakaviya/">Jaya Kaviya</a></p>

      </div>  
     
    </div>
  )
}

export default QRcode
