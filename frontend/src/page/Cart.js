import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showBill, setShowBill] = useState(false);

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (!user.email) {
      toast("You have not logged in!");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productCartItem),
      }
    );

    const data = await res.json();
    toast("Redirecting to payment gateway...");
    stripePromise.redirectToCheckout({ sessionId: data });
  };

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">
        Your Cart Items
      </h2>

      {productCartItem.length ? (
        <div className="my-4 flex gap-3 flex-col md:flex-row">
          {/* Cart Items */}
          <div className="w-full max-w-3xl">
            {productCartItem.map((el) => (
              <CartProduct
                key={el._id}
                id={el._id}
                name={el.name}
                image={el.image}
                category={el.category}
                qty={el.qty}
                total={el.total}
                price={el.price}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="w-full max-w-md ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>

            <div className="flex py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto font-bold">{totalQty}</p>
            </div>

            <div className="flex py-2 text-lg border-b">
              <p>Total Price :</p>
              <p className="ml-auto font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>

            <button
              className="bg-red-500 w-full text-lg font-bold py-2 text-white mt-3"
              onClick={() => setShowBill(true)}
            >
              Generate Bill
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img src={emptyCartImage} className="w-full max-w-sm" />
          <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
        </div>
      )}

      {/* BILL SECTION */}
      {showBill && (
        <div className="mt-6 border p-4 bg-white shadow-md">
          <h2 className="text-xl font-bold mb-3 text-center">
            Restaurant Bill
          </h2>

          <table className="w-full border">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-2 border">Item</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {productCartItem.map((item) => (
                <tr key={item._id}>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.qty}</td>
                  <td className="p-2 border">₹{item.price}</td>
                  <td className="p-2 border">₹{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-right font-bold text-lg">
            Grand Total:{" "}
            <span className="text-red-500">₹{totalPrice}</span>
          </div>

          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            onClick={handlePayment}
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
