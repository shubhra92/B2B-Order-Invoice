import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import gifLogo from './asset/download.gif';
import pdfLogo from './asset/pdfLogo.png';
import OrderDetail from './components/orderDetail/OrderDetail';
import ProductTabel from './components/ProductTabel';

const App = () => {
    const [OrderItems, setOrderItems] =useState([])
    const [GT_Amount, setGT_Amount]=useState(0)
    const [logo, setLogo]=useState("logo")



    const order_detail = (itemDoc) =>{
        let _items=[...OrderItems]
        
        const index = _items.findIndex((e)=>e.SKU===itemDoc.SKU)

        if(index!==-1) {
            if(itemDoc.Qty===0) _items.splice(index,1)
            else _items[index].Qty=itemDoc.Qty
        } else _items.push({...itemDoc})

        let gt_Amount = 0
        
        _items=_items.map((e)=>{
            const T_Amount=Math.round((e.Amount * e.Qty)*100)/100
            gt_Amount +=T_Amount

            return {...e,T_Amount}
          })
          
        setOrderItems(_items)
        gt_Amount= Math.round(gt_Amount*100)/100
        setGT_Amount(gt_Amount)
    }

    const PdfDownloder = async (url, fileName)=>{
        const file = await axios({
            url: url,
            method: 'GET',
            responseType: "blob"
        })
        const Uri = window.URL.createObjectURL(new Blob([file.data]))

        const Link = document.createElement('a');
        Link.href = Uri
        Link.setAttribute('download',fileName)

        document.body.appendChild(Link)

        Link.click()
        
        document.body.removeChild(Link)
    }

    const AllItemsPdf = async ()=> {
        setLogo("downloding...")
        const url = "http://localhost:3001/pdf"
        const fileName = "All items.pdf"
        await PdfDownloder(url, fileName)
        setLogo("logo")

    }

  return (
      <div className='main'>
        <div className='logo--container'>
            <h1>All Products</h1>
            <img src={logo==='logo'?pdfLogo:gifLogo} onClick={logo==='logo' && AllItemsPdf}/>
        </div>
        <ProductTabel setOrder={order_detail}/>
        <OrderDetail OrderItems={OrderItems} GT_Amount={GT_Amount} PdfDownloder={PdfDownloder}/>
      </div>
  )
}

export default App;