import React from 'react'


const OrderTabel = ({OrderItems, GT_Amount}) => {
  return (
    <table >
    <tr>
        <th>Line Item Name</th>
        <th>SKU</th>
        <th>HSN/SAC</th>
        <th>Qty</th>
        <th>Rate ₹</th>
        <th>Discount ₹</th>
        <th colspan="2">
            <table>
            <tr>CGST</tr>
            <tr>
                <td>%</td>
                <td>Amt ₹</td>
            </tr>
            </table>
        </th>
        <th colspan="2">
            <table>
            <tr>SGST</tr>
            <tr>
                <td>%</td>
                <td>Amt ₹</td>
            </tr>
            </table>
        </th>
        <th>Amount ₹</th>
        <th>Total Amount ₹</th>
    </tr>
    {OrderItems.map((value, i) => {
        return (
            <tr key={i}>
                <td>{value.item_name}</td>
                <td>{value.SKU}</td>
                <td>{value.HSN_SAC}</td>
                <td>{value.Qty}</td>
                <td>{value.Rate}</td>
                <td>{value.Discount}</td>
                <td>{value.CGST_P}</td>
                <td>{value.CGST_V}</td>
                <td>{value.SGST_P}</td>
                <td>{value.SGST_V}</td>
                <td>{value.Amount}</td>
                <td>{value.T_Amount}</td>
            </tr>
        )
    })}
    <tr>
        <th colspan="11">Grand Total</th>
        <td><strong>{GT_Amount}</strong></td>
    </tr>
</table>
  )
}

export default OrderTabel
