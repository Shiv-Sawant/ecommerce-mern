import React, { useEffect, useState } from 'react';
import ProceedPayment from './ProceedPayment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe } from '@stripe/react-stripe-js';


const StripeProcessPayment = () => {
    // const stripe = useStripe()
    const [stripeLoad, setStripeLoad] = useState()

    const stripePromise = async () => {
        const stripePromise = await loadStripe("pk_test_51NsTSESA97L9ozy2QgqGl3zoVMU5gtNIxsySW5rUZvcc4Cy45cNe2pW6T27rXxBmyGR9MLrwcXpeeXjphsxeIXSh00oDRKeXAm");
        setStripeLoad(stripePromise)
    }

    useEffect(() => {
        stripePromise()
    }, [stripeLoad])
    // Load Stripe using the loadStripe utility

    return (
        <Elements stripe={stripeLoad}>
            <ProceedPayment />
        </Elements>
    );
}

export default StripeProcessPayment;