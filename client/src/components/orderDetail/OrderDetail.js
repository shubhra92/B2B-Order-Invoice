import React, { useState } from 'react'
import "./Order.css"
import OrderTabel from './OrderTabel'

const OrderDetail = (props) => {
  const [dLabel, setDLabel]=useState('Download Invoice')
  const {
    OrderItems,
    GT_Amount,
    PdfDownloder
  }=props

  
  const pdfDownload = async()=>{
    setDLabel("Genarating pdf....")
    const jsonData =JSON.stringify(OrderItems) 
    const pdfDownloadLink = `http://localhost:3001/invoice?items=${jsonData}&GT_Amount=${GT_Amount}`
    await PdfDownloder(pdfDownloadLink, "invoice.pdf")
    setDLabel("Download Invoice")
  }

  return (
    <>
    <h1>Order Detail</h1>
    {!OrderItems.length?
        <p style={{opacity:0.5}}>---empty---</p>
        : 
        <div className='Order-container'>
            <OrderTabel OrderItems={OrderItems} GT_Amount={GT_Amount}/>
            <button  onClick={'Download Invoice' === dLabel && pdfDownload}>{dLabel}</button>
        </div>

    }
    </>
  )
}

export default OrderDetail
