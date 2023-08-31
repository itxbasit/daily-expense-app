import { useState } from 'react'
import './content.css'
import { AiFillEdit, AiFillSwitcher, AiFillDelete } from "react-icons/ai";

function Content() {
    const [value, setValue] = useState()
    let [product, setProduct] = useState([]);
    const [pro, setPro] = useState()
    const [cost, setCost] = useState()
    const budget = localStorage.getItem("Budget_Value")
    let productDetail = []
    productDetail = localStorage.getItem("Expense");
    productDetail = JSON.parse(productDetail)
    product = productDetail;
    let exp = 0
        for (let key in product) {
            for (let key1 in key) {
                exp += +(product[key].productCost)
            }
        }
    let balance = budget - exp;
    return (
        <div className='content'>
            <div className='budget-expense'>
                <div className='box'>
                    <p>Budget</p>
                    <input value={value} onChange={(e) =>
                        setValue(e.target.value)} placeholder='Enter Total Amount' type='number' />
                    <br></br>
                    <button onClick={() => {
                        value && localStorage.setItem("Budget_Value", value)
                        setValue("")
                    }}>Set Budget</button>
                </div>
                <div className='box'>
                    <p>Expenses</p>
                    <input value={pro} onChange={(e) => e.target.value &&
                        setPro(e.target.value)} placeholder='Enter Title of Product' type='text' />
                    <br></br>
                    <input value={cost} onChange={(e) => e.target.value &&
                        setCost(e.target.value)} placeholder='Enter Cost of Product' type='number' />
                    <br></br>
                    <button onClick={() => {
                        {
                            let arr = []
                            arr = localStorage.getItem("Expense");
                            arr = JSON.parse(arr)
                            pro && cost && arr ? arr.unshift({
                                productName: pro, productCost: cost, edit: false
                            }) : console.log()
                            pro && cost && arr ? localStorage.setItem("Expense", JSON.stringify(arr)) : pro && cost && localStorage.setItem("Expense", JSON.stringify([{ "productName": pro, "productCost": cost, "edit": false }]))
                            setCost("")
                            setPro("")
                        }
                    }}>Check Amount</button>
                </div>
            </div>
            <div className='expense-balance-chart'>
                <div className='value'>
                    <p>Budget</p>
                    <p id='budget'>{budget ? budget : 0}</p>
                </div>
                <div className='value'>
                    <p>Expenses</p>
                    <p id='expense'>{exp ? exp : 0}</p>
                </div>
                <div className='value'>
                    <p>Balance</p>
                    <p id='balance'>{balance}</p>
                </div>
            </div>
            <div className='list'>
                <p>Expense List</p>
                <ul>
                    {product?.map((v, i) => <li key={i}>
                        {v.edit ? <div>
                            <input className="product-name-input input" type="text" onChange={(e) => {
                                product[i].productName = e.target.value;
                            }} defaultValue={v.productName} />
                            <input className="product-cost-input input" type="number" onChange={(e) => {
                                product[i].productCost = e.target.value;
                            }} defaultValue={v.productCost} />
                        </div> : <div>
                            <input className="product-name-input input-disabled" value={v.productName} disabled />
                            <input className="product-cost-input input-disabled" value={v.productCost} disabled />
                        </div>}
                        <div>
                            {v.edit
                                ? <label onClick={() => {
                                    const arr = [...product]
                                    arr[i].edit = false
                                    setProduct(arr)
                                    localStorage.setItem("Expense", JSON.stringify(arr))
                                }} className="edit-btn btn"><AiFillEdit /></label> :
                                <label onClick={() => {
                                    const arr = [...product]
                                    arr[i].edit = true
                                    setProduct(arr)
                                    localStorage.setItem("Expense", JSON.stringify(arr))
                                }}
                                    className="update-btn btn"><AiFillSwitcher /></label>
                            }<label onClick={() => {
                                const arr = [...product]
                                arr.splice(i, 1)
                                setProduct(arr)
                                localStorage.setItem("Expense", JSON.stringify(arr))
                            }} className="del-btn btn"><AiFillDelete /></label></div>
                    </li>)}
                </ul>
            </div>
        </div>
    )
}
export default Content;