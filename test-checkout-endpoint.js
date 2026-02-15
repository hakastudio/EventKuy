// Native fetch is available in Node 18+

async function testCheckout() {
  console.log("Testing /api/checkout...");
  try {
    const response = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 20000,
        customerDetails: {
          first_name: "Test",
          email: "test@example.com",
          phone: "08123456789"
        }
      })
    });

    const data = await response.json();
    console.log("Response status:", response.status);
    console.log("Response data:", data);

    if (data.token) {
      console.log("✅ Checkout API works! Token received.");
    } else {
      console.error("❌ Checkout API failed. No token.");
    }
  } catch (error) {
    console.error("❌ Error calling API:", error);
  }
}

testCheckout();
