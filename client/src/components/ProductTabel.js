import axios from 'axios';
import React, { useState } from 'react';

const ProductTabel = ({setOrder}) => {

    const [items, setItems] = useState([])
    const [cart, setCart] = useState([])
    
    //onlode function
    const get_All_Items = async()=>{
        const allDoc = await axios.get("http://localhost:3001/item")
        const value = allDoc.data.data;
        setCart(new Array(value.length).fill(0))
        setItems(value)
    } 

    
    const changeCart = (index, op) =>{
        let _cart = [...cart]
        if( op === "+") {
            _cart[index]++
        }else if( op==="-") {
            _cart[index]--
        }
        setCart(_cart)
        const _OrderUp={...items[index], Qty:_cart[index]}
        setOrder(_OrderUp)
    }

    window.onload = get_All_Items
    
  return (
    <table >
        <tbody>
        <tr>
            <th>Line Item Name</th>
            <th>SKU</th>
            <th>HSN/SAC</th>
            <th>Qty</th>
            <th>Rate ₹</th>
            <th>Discount ₹</th>
            <th colSpan="2">
                <table>
                    <tbody>
                <tr>
                    <th colSpan="2">CGST</th>
                </tr>
                <tr>
                    <td>%</td>
                    <td>Amt ₹</td>
                </tr>
                </tbody>
                </table>
            </th>
            <th colSpan="2">
                <table>
                    <tbody>
                <tr>
                    <th colSpan="2">SGST</th>
                </tr>
                <tr>
                    <td>%</td>
                    <td>Amt ₹</td>
                </tr>
                </tbody>
                </table>
            </th>
            <th>Amount ₹</th>
            <th>Cart</th>
        </tr>
        {items.map((value, i) => {
            return (
                <tr key={i}>
                    <td>{value.item_name}</td>
                    <td>{value.SKU}</td>
                    <td>{value.HSN_SAC}</td>
                    <td>{value.quantity}</td>
                    <td>{value.Rate}</td>
                    <td>{value.Discount}</td>
                    <td>{value.CGST_P}</td>
                    <td>{value.CGST_V}</td>
                    <td>{value.SGST_P}</td>
                    <td>{value.SGST_V}</td>
                    <td>{value.Amount}</td>
                    <td>
                        <button onClick={()=>{
                            if(cart[i] > 0) changeCart(i,"-")
                            }}>-</button>
                            
                        <span> {cart[i]} </span>

                        <button onClick={()=>{
                            if(cart[i]<items[i].quantity) changeCart(i,"+")
                            }}>+</button>
                    </td>
                </tr>
            )
        })}
        </tbody>
    </table>
  
  )
}

export default ProductTabel;