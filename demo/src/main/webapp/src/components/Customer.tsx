import React from "react";

type Customer = {
  src: string;
  alt: string;
};

interface CustomerProps {
  customer?: Customer;
  date: string;
  email: string;
  name: string;
}

const Customer = ({ customer, date, email, name }: CustomerProps) => {
  return (
    <div>
      {customer && <img src={customer.src} alt={customer.alt} />}
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{date}</p>
    </div>
  );
};