import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";


function Provider({children}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  return (
    //so here my app is wrapped inside convex provider so that my app can use convex data
    <div><ConvexProvider client={convex}>{children}</ConvexProvider></div>
  )
}

export default Provider