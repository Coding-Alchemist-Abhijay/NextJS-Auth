import React from "react";

export default async function Page({ params }: any) {
  const { id } = await params; 
  return <div>{id}</div>;
}
 