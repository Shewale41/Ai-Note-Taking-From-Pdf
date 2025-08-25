"use client"
import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


function Provider({children}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  return (
    //so here my app is wrapped inside convex provider so that my app can use convex data
    <div><ConvexProvider client={convex}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      {children}
      </PayPalScriptProvider>
      </ConvexProvider>
      </div>
  )
}

export default Provider