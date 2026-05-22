import { api } from './api';
import { INAMIGOS_LOGO_BASE64 } from '../data/logoBase64';

interface RazorpayOptions {
  amount: number;
  cause: string;
  donorName: string;
  email: string;
  phone: string;
  donorPan?: string;
}

interface RazorpaySuccessResponse {
  receiptNo: string;
  transactionId: string;
  date: string;
  amount: number;
  cause: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPan?: string;
  paymentMode: string;
}

let scriptLoaded = false;

function loadRazorpayScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();

  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="checkout.razorpay.com"]')) {
      scriptLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.head.appendChild(script);
  });
}

export async function initiateRazorpayPayment(
  options: RazorpayOptions
): Promise<RazorpaySuccessResponse> {
  // 1. Load Razorpay checkout script
  await loadRazorpayScript();

  // 2. Create order on our backend
  const receiptId = 'rcpt_' + Date.now();
  const orderRes = await api.createOrder(options.amount, options.cause, receiptId);

  if (!orderRes.success || !orderRes.data) {
    throw new Error(orderRes.error || 'Failed to create payment order');
  }

  const { orderId, amount: orderAmount, currency, key_id } = orderRes.data;

  // 3. Open Razorpay checkout modal
  return new Promise((resolve, reject) => {
    const rzpOptions = {
      key: key_id,
      amount: orderAmount,
      currency: currency,
      name: 'InAmigos Foundation',
      description: `Donation for ${options.cause}`,
      image: INAMIGOS_LOGO_BASE64,
      order_id: orderId,
      prefill: {
        name: options.donorName,
        email: options.email,
        contact: options.phone,
        method: 'upi',
      },
      notes: {
        cause: options.cause,
        donor_pan: options.donorPan || '',
      },
      theme: {
        color: '#003b22',
      },
      config: {
        display: {
          blocks: {
            upi: {
              name: 'Pay via UPI / QR Code',
              instruments: [
                {
                  method: 'upi',
                },
              ],
            },
            other: {
              name: 'Cards & NetBanking',
              instruments: [
                {
                  method: 'card',
                },
                {
                  method: 'netbanking',
                },
                {
                  method: 'wallet',
                },
              ],
            },
          },
          sequence: ['block.upi', 'block.other'],
          preferences: {
            show_default_blocks: true,
          },
        },
      },
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        try {
          // 4. Verify payment on our backend
          const verifyRes = await api.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            donorName: options.donorName,
            email: options.email,
            phone: options.phone,
            donorPan: options.donorPan,
            amount: options.amount,
            cause: options.cause,
            mode: 'RAZORPAY',
          });

          if (!verifyRes.success || !verifyRes.data) {
            reject(new Error(verifyRes.error || 'Payment verification failed'));
            return;
          }

          resolve(verifyRes.data);
        } catch (err) {
          reject(err instanceof Error ? err : new Error('Payment verification failed'));
        }
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment was cancelled'));
        },
        escape: true,
        confirm_close: true,
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp = new (window as any).Razorpay(rzpOptions);
    rzp.on('payment.failed', (response: { error: { description: string } }) => {
      reject(new Error(response.error.description || 'Payment failed'));
    });
    rzp.open();
  });
}
