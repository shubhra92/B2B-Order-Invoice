import React, { useState } from 'react';
import './App.css';
import pdfLogo from './asset/pdfLogo.png';
import OrderDetail from './components/orderDetail/OrderDetail';
import ProductTabel from './components/ProductTabel';

const App = () => {
    const [OrderItems, setOrderItems] =useState([])
    const [GT_Amount, setGT_Amount]=useState(0)



    const order_detail = (itemDoc) =>{
        let _items=[...OrderItems]
        
        const index = _items.findIndex((e)=>e.SKU===itemDoc.SKU)

        if(index!==-1) {
            if(itemDoc.Qty===0) _items.splice(index,1)
            else _items[index].Qty=itemDoc.Qty
        } else {
            _items.push({...itemDoc})
        }

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

    const AllItemsPdf = ()=>{
        document.getElementById('all-items-pdf').click()
    }

  return (
      <div className='main'>
        <div className='logo--container'>
            <h1>All Products</h1>
            <img src={pdfLogo} onClick={AllItemsPdf}/>
            <a href='http://localhost:3001/pdf' id="all-items-pdf"></a>
        </div>
        <ProductTabel setOrder={order_detail}/>
        <OrderDetail OrderItems={OrderItems} GT_Amount={GT_Amount}/>
      </div>
  )
}

export default App;