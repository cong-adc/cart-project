import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
const productsInit = [
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 1
    },
    {
        id: 2,
        name: 'Product 2',
        price: 200,
        quantity: 2
    }
]

export default function Cart() {

    const [products, setProducts] = React.useState(productsInit)
    const breadcrumb = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Cart'
        }]

    const totalCart = useMemo(() => {
        return products.reduce((sum, current) => {
            // current  = product
            return sum + (current.price * current.quantity)
        }, 0)
    }, [products])


    const handleChangeQuantity = (id, quantity) => {
        const productIndex = products.findIndex(product => product.id === id);

        // kiem tra xem product co ton tai khong
        if (productIndex !== -1) {
            // tham trị & tham chiếu
            // deep clone
            // mang => string => mang
            // mo rong
            // const newProducts = JSON.parse(JSON.stringify(products));
            const newProducts = [...products]; // nghỉ đơn giản nó tạo 1 mảng mới;
            // mang object => 
            // [x31238128382sjdj, {}, {}] => [0] => x31238128382sjdj
            // new arrays => [x31238128382sjdj,x3128382sjdj,x213]
            // thay doi 1 object cua mang moi => mang cu cung thay doi

            const newProduct = newProducts[productIndex];
            newProduct.quantity = quantity;

            setProducts(newProducts);
        }
    }


    return (
        <div style={{
            width: 1000,
            margin: '0 auto',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Breadcrumb list={breadcrumb} />
                <h1>Cart</h1>
            </div>

            <table style={{ margin: '0 auto' }}>
                <tr>
                    <th style={{ width: 400 }}>
                        Product
                    </th>
                    <th style={{ width: 200 }}>
                        Price
                    </th>
                    <th style={{ width: 200 }}>
                        Quantity
                    </th>
                    <th style={{ width: 200, textAlign: 'right' }}>
                        Total
                    </th>
                </tr>

                <tbody>

                    {
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <img src="https://via.placeholder.com/150" alt="product" style={{ width: 50, height: 50 }} />
                                        <p style={{ marginLeft: 10 }}>{product.name}</p>
                                    </div>
                                </td>
                                <td>
                                    ${product.price}
                                </td>
                                <td>
                                    <input type="number" onChange={(e) => handleChangeQuantity(product.id, e.target.value)} value={product.quantity} style={{ width: 50 }} />
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    ${product.price * product.quantity}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <input />
                </div>
                <div>
                    <span>Total: {totalCart}$</span>
                </div>
            </div>
        </div>
    )
}
