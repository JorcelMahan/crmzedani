import React, { useContext, useEffect } from 'react';
import VentasContext from '../../context/ventas/VentasContext';
const Review = () => {
  const ventasContext = useContext(VentasContext);
  const {
    products,
    promotora,
    cliente,
    removeProduct,
    total,
    calcTotal,
    addQuantity,
    restQuantity,
  } = ventasContext;
  useEffect(() => {
    calcTotal();
  }, [products]);
  return (
    <div>
      <h3>From Review</h3>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <p>{product.codigo}</p>
            <button onClick={() => addQuantity(product.id)}>+</button>
            <input type='number' value={product.quantity} />
            <button onClick={() => restQuantity(product.id)}>-</button>

            <button onClick={(e) => removeProduct(product.id)}>X</button>
          </div>
        ))
      ) : (
        <p>La lista de venta esta vacia, seleccione productos.</p>
      )}
      <p>Total: {total}</p>
    </div>
  );
};

export default Review;
