import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'BASIC',
      price: 1000,
      features: [
        'Basic feature access',
        'Standard customer support',
        'Limited resources'
      ]
    },
    {
      id: 'prime',
      name: 'PRIME',
      price: 3000,
      features: [
        'Advanced feature access',
        'Priority support',
        'Extended resources'
      ]
    },
    {
      id: 'elite',
      name: 'ELITE',
      price: 5000,
      features: [
        'Full feature access',
        'Dedicated support',
        'Unlimited resources'
      ]
    }
  ];

  const handlePaymentSuccess = (plan) => {
    alert(`Successfully purchased ${plan.name} plan!`);
    setSelectedPlan(plan);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Choose Your Plan
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {plan.name}
                </h2>
                
                <div className="text-4xl font-bold text-blue-600 mb-6">
                  ₱{plan.price}
                  <span className="text-base text-gray-500 ml-2">/month</span>
                </div>
                
                <ul className="space-y-4 mb-8 text-gray-600">
                  {plan.features.map((feature, index) => (
                    <li 
                      key={index} 
                      className="flex items-center justify-center space-x-2"
                    >
                      <svg 
                        className="w-5 h-5 text-green-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <PayPalScriptProvider 
                  options={{ 
                    clientId: "AapBddC-erYLY82bQNxAxQjheI1NZUShEYsLWj9htdAWx3Zei-RVfpbdVIl--QOL1MvvXupm8UaH52Jx", 
                    currency: "PHP" 
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: {
                            value: plan.price.toString()
                          }
                        }]
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then(() => {
                        handlePaymentSuccess(plan);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
