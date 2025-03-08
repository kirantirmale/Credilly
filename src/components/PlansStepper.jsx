import React, { useState, useEffect } from "react";
import snb from '../images/bank/SNBLogo.jpg';
import alrajhibanklogo from '../images/bank/alrajhibanklogo.jpg';
import riyadhbankpng from '../images/bank/riyadhbankpng.png';
import anbBankLogo from '../images/bank/anbBankLogo.jpg';
import emiratesnbdlogok from '../images/bank/emiratesnbdlogok.png';
import BankAljazira from '../images/bank/BankAljazira.png';

const plans = [
  { id: 1, name: 'Basic Plan', price: '$10/month', apr: '4.65%', installment: '1442 SAR', residual: '40,000 SAR', image: snb },
  { id: 2, name: 'Standard Plan', price: '$20/month', apr: '4.90%', installment: '1525 SAR', residual: '35,000 SAR', image: alrajhibanklogo },
  { id: 3, name: 'Premium Plan', price: '$30/month', apr: '4.95%', installment: '1560 SAR', residual: '40,000 SAR', image: riyadhbankpng },
  { id: 4, name: 'Advanced Plan', price: '$40/month', apr: '5.25%', installment: '1550 SAR', residual: '30,000 SAR', image: anbBankLogo },
  { id: 5, name: 'Ultimate Plan', price: '$50/month', apr: '5.50%', installment: '1630 SAR', residual: '30,000 SAR', image: emiratesnbdlogok },
  { id: 6, name: 'Ultimate Plan', price: '$50/month', apr: '5.50%', installment: '1630 SAR', residual: '30,000 SAR', image: BankAljazira }
];

const PlansStepper = () => {
    const [selectedPlan, setSelectedPlan] = useState(() => {
        const savedPlan = localStorage.getItem("selectedPlan");
        return savedPlan ? JSON.parse(savedPlan).id : plans[0].id;
    });

    useEffect(() => {
        const planDetails = plans.find(plan => plan.id === selectedPlan);
        if (planDetails) {
            localStorage.setItem("selectedPlan", JSON.stringify(planDetails));
        }
    }, [selectedPlan]);

    return (
        <div className="containerr">
            <div className="containerrr">
                {/* Sidebar */}
                <div className="sidebar">
                    <ul>
                        {plans.map((plan) => (
                            <li
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                className={selectedPlan === plan.id ? "active" : ""}
                                style={{ fontSize: '10px', padding: '10px', cursor: 'pointer' }}
                            >
                                {plan.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    <div className="content-box">
                        <div className="info">
                            <div className="text">
                                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
                                    {plans.find(plan => plan.id === selectedPlan)?.name}
                                </h2>
                                <p style={{ fontSize: '12px' }}><strong>Price:</strong> {plans.find(plan => plan.id === selectedPlan)?.price}</p>
                                <p style={{ fontSize: '12px' }}><strong>APR:</strong> {plans.find(plan => plan.id === selectedPlan)?.apr}</p>
                                <p style={{ fontSize: '12px' }}><strong>Installment:</strong> {plans.find(plan => plan.id === selectedPlan)?.installment}</p>
                                <p style={{ fontSize: '12px' }}><strong>Residual:</strong> {plans.find(plan => plan.id === selectedPlan)?.residual}</p>
                            </div>
                            <img 
                                src={plans.find(plan => plan.id === selectedPlan)?.image} 
                                alt={plans.find(plan => plan.id === selectedPlan)?.name} 
                                className="plan-image" 
                                style={{ width: '220px', height: '160px', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlansStepper;