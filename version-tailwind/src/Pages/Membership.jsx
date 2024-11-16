import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Components/UserContext';

const MembershipPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayPalForm, setShowPayPalForm] = useState(false); // New state to track PayPal form display
  const { userData } = useUserContext();
  const navigate = useNavigate();

  const handleConfirmSubscription = () => {
    // Navigate to '/overviewmember' page after confirmation
    navigate('/overviewmember');
  };

  const plans = [
    {
      name: 'BASIC',
      price: 1500,
      features: [
        'Unlimited access to the gym during REGULAR HOURS',
        'Use of standard gym equipment',
        'Access to locker room amenities',
        'Access to sauna room',
        'Participate in various group fitness classes',
        'Access to INITIAL BRANCH ONLY',
      ],
    },
    {
      name: 'PRIME',
      price: 3000,
      features: [
        'Unlimited access to the gym 24/7',
        'Use of standard gym equipment',
        'Access to locker room amenities',
        'Access to sauna room',
        'Access to any branch worldwide',
        'Participate in various group fitness classes',
      ],
    },
    {
      name: 'ELITE',
      price: 5000,
      features: [
        'Unlimited access to the gym 24/7',
        'Use of standard gym equipment',
        'Access to any branch worldwide',
        'Access to locker room amenities',
        'Access to sauna room',
        'Participate in various group fitness classes',
        'Personalized one-on-one consultation with a coach',
        'Access to premium and specialized gym equipment',
        'Access to the pool and all courts',
        'Access to personalized workout plans designed for your fitness goals',
      ],
    },
  ];

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    if (plan.name === 'BASIC') {
      setShowPayPalForm(true); // Show PayPal form for BASIC plan
    } else if (plan.name === 'PRIME') {
      setShowPayPalForm(true); // Show PayPal form for PRIME plan
    } else if (plan.name === 'ELITE') {
      setShowPayPalForm(true); // Show PayPal form for ELITE plan
    }
  };

  const PlanModal = ({ selectedPlan, onClose, onConfirm }) => {
    const handleConfirmAndClose = async () => {
      await onConfirm(); // Call the onConfirm function to handle subscription confirmation
      onClose(); // Close the modal
    };

    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="z-20 bg-white p-8">
          <h2 className="mb-4 text-2xl font-bold">
            Selected Plan: {selectedPlan.name}
          </h2>
          <ul>
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="mb-2">
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between">
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white"
              onClick={onClose}
            >
              Close
            </button>

            {/* If PayPal form should be shown, display it */}
            {showPayPalForm ? (
              <div>
                {/* For BASIC Plan */}
                {selectedPlan.name === 'BASIC' && (
                  <form
                    action="https://www.paypal.com/cgi-bin/webscr"
                    method="post"
                    target="_top"
                  >
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input
                      type="hidden"
                      name="hosted_button_id"
                      value="GV7PV6V9ADVAA" // PayPal button ID for BASIC plan
                    />
                    <input type="hidden" name="currency_code" value="PHP" />
                    <input
                      type="image"
                      src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribe_LG.gif"
                      border="0"
                      name="submit"
                      title="PayPal - The safer, easier way to pay online!"
                      alt="Subscribe"
                    />
                  </form>
                )}

                {/* For PRIME Plan */}
                {selectedPlan.name === 'PRIME' && (
                  <form
                    action="https://www.paypal.com/cgi-bin/webscr"
                    method="post"
                    target="_top"
                  >
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input
                      type="hidden"
                      name="hosted_button_id"
                      value="6MXPQ2W3XCY88" // PayPal button ID for PRIME plan
                    />
                    <input type="hidden" name="currency_code" value="PHP" />
                    <input
                      type="image"
                      src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribe_LG.gif"
                      border="0"
                      name="submit"
                      title="PayPal - The safer, easier way to pay online!"
                      alt="Subscribe"
                    />
                  </form>
                )}

                {/* For ELITE Plan */}
                {selectedPlan.name === 'ELITE' && (
                  <form
                    action="https://www.paypal.com/cgi-bin/webscr"
                    method="post"
                    target="_top"
                  >
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input
                      type="hidden"
                      name="hosted_button_id"
                      value="UNBRSDQNXDEGU" // PayPal button ID for ELITE plan
                    />
                    <input type="hidden" name="currency_code" value="PHP" />
                    <input
                      type="image"
                      src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribe_LG.gif"
                      border="0"
                      name="submit"
                      title="PayPal - The safer, easier way to pay online!"
                      alt="Subscribe"
                    />
                  </form>
                )}
              </div>
            ) : (
              <button
                className="mr-2 rounded bg-red-500 px-4 py-2 text-white"
                onClick={handleConfirmAndClose}
              >
                Confirm Subscription
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleCloseModal = () => {
    setSelectedPlan(null); // Reset selected plan when modal is closed
    setShowPayPalForm(false); // Reset PayPal form visibility
  };

  return (
    <div className="container mx-auto">
      <h1 className="mb-3 ml-8 text-7xl font-extrabold text-dark-elixir">
        MEMBERSHIP PLANS
      </h1>
      <div className="ml-44 mt-28 flex flex-row justify-center">
        {plans.map((plan) => (
          <div key={plan.name} className="m-2 w-1/3">
            <div
              className={`flex h-full flex-col justify-between rounded-lg ${
                plan.name === 'BASIC'
                  ? 'bg-gradient-to-b from-red-700 to-red-300'
                  : plan.name === 'PRIME'
                  ? 'bg-gradient-to-b from-indigo-700 to-indigo-300'
                  : 'bg-gradient-to-b from-purple-700 to-purple-300'
              } p-4 text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105`}
            >
              <div>
                <h2 className="text-center text-6xl font-bold">{plan.name}</h2>
                <p className="mb-4 mt-4 text-center text-xl font-bold">
                  ₱{plan.price}/MONTH
                </p>
                <ul className="list-inside list-none">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="mb-3 flex items-center font-semibold"
                    >
                      <svg
                        className="mr-2 h-5 w-5 rounded-full bg-green-800 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleSubscribe(plan)}
                className={`mt-4 self-center rounded ${
                  plan.name === 'BASIC'
                    ? 'bg-bronze'
                    : plan.name === 'PRIME'
                    ? 'bg-indigo-600'
                    : 'bg-violet-600'
                } py-2 px-4 font-semibold text-white shadow-lg`}
              >
                Choose {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <PlanModal
          selectedPlan={selectedPlan}
          onClose={handleCloseModal}
          onConfirm={handleConfirmSubscription}
        />
      )}
    </div>
  );
};

export default MembershipPlans;
