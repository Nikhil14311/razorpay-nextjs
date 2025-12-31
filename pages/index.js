export default function Home() {
  const payNow = async () => {
    // 1️⃣ Call backend to create order
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 500 }), // amount in ₹
    });

    const order = await res.json();

    // 2️⃣ Razorpay payment options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Demo App",
      description: "Payment Test",
      order_id: order.id,
      handler: async function (response) {
        // 3️⃣ Verify payment
        const verify = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const result = await verify.json();

        if (result.success) {
          alert("Payment Successful 🎉");
        } else {
          alert("Payment Failed ❌");
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Nikhil Super Market Payment gateway</h1>
      <button onClick={payNow}>Pay ₹500</button>
    </div>
  );
}
