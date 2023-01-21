import React from 'react'
import "./Order.css"
import OrderTabel from './OrderTabel'

const OrderDetail = ({OrderItems, GT_Amount}) => {
  const jsonData =JSON.stringify(OrderItems) 
  const pdfDownloadLink = `http://localhost:3001/invoice?items=${jsonData}&GT_Amount=${GT_Amount}`
  
  const pdfDownload = ()=>{
    document.getElementById("invoice--DL").click()
  }

  return (
    <>
    <h1>Order Detail</h1>
    {!OrderItems.length?
        <p style={{opacity:0.5}}>---empty---</p>
        : 
        <div className='Order-container'>
            <OrderTabel OrderItems={OrderItems} GT_Amount={GT_Amount}/>
            <a id="invoice--DL" href={pdfDownloadLink} style={{display:'none'}}> Download Invoice</a>
            <button  onClick={pdfDownload}>Download Invoice</button>
        </div>

    }
    </>
  )
}

export default OrderDetail
