import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { customAlphabet } from 'nanoid';
import { db } from '../firebase';
import { FIXED_SIZE_CM } from '../data/pricing';

const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 8);

const NOTIFICATION_EMAIL = process.env.REACT_APP_ORDER_NOTIFICATION_EMAIL || '';

const CATEGORY_NAMES = {
  funko: 'Mini Funko',
  pet: 'Mini Pet',
};

function formatPriceBrl(cents) {
  return `R$${(cents / 100).toFixed(2).replace('.', ',')}`;
}

function generateOrderId() {
  return `ME-${nanoid()}`;
}

function buildEmailHtml(order) {
  const itemsHtml = order.items
    .map(
      (item, i) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${i + 1}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${item.name}${
        item.sizeCm ? ` (${item.sizeCm} cm)` : ''
      }</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${item.notes || '-'}</td>
      </tr>`
    )
    .join('');

  return `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#222;max-width:640px;margin:0 auto;">
      <h2 style="font-weight:400;">Novo pedido recebido</h2>
      <p><strong>Código:</strong> ${order.orderId}</p>
      <h3 style="font-weight:500;margin-top:24px;">Cliente</h3>
      <p style="line-height:1.6;">
        ${order.customer.name}<br/>
        ${order.customer.email}<br/>
        ${order.customer.phone}<br/>
        ${order.customer.address || ''} ${order.customer.city ? `- ${order.customer.city}` : ''} ${
    order.customer.state ? `/${order.customer.state}` : ''
  } ${order.customer.zip ? `- CEP ${order.customer.zip}` : ''}
      </p>
      ${
        order.customer.notes
          ? `<p><strong>Observações:</strong> ${order.customer.notes}</p>`
          : ''
      }
      <h3 style="font-weight:500;margin-top:24px;">Itens</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f6f4f0;">
            <th style="padding:8px;text-align:left;">#</th>
            <th style="padding:8px;text-align:left;">Produto</th>
            <th style="padding:8px;text-align:center;">Qtd</th>
            <th style="padding:8px;text-align:left;">Observação</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <p style="margin-top:24px;font-size:16px;"><strong>Total estimado:</strong> ${formatPriceBrl(
        order.totalCents
      )}</p>
      <p style="margin-top:16px;font-size:13px;color:#666;">
        Lembre-se de entrar em contato com o cliente para combinar os próximos
        passos e pedir as fotos de referência.
      </p>
    </div>
  `;
}

export async function createOrder({ customer, items }) {
  const orderId = generateOrderId();
  const totalCents = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const enrichedItems = items.map((item) => ({
    category: item.category,
    name: item.name || CATEGORY_NAMES[item.category] || item.category,
    sizeCm: item.sizeCm ?? FIXED_SIZE_CM,
    quantity: item.quantity,
    priceCents: item.price,
    notes: item.notes || '',
  }));

  const orderDoc = {
    orderId,
    status: 'received',
    customer: {
      name: customer.name.trim(),
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      address: customer.address?.trim() || '',
      city: customer.city?.trim() || '',
      state: customer.state?.trim() || '',
      zip: customer.zip?.trim() || '',
      notes: customer.notes?.trim() || '',
    },
    items: enrichedItems,
    totalCents,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, 'orders', orderId), orderDoc);

  if (NOTIFICATION_EMAIL) {
    const emailDoc = {
      to: NOTIFICATION_EMAIL,
      message: {
        subject: `Novo pedido ${orderId} - ${orderDoc.customer.name}`,
        html: buildEmailHtml({ ...orderDoc, items: enrichedItems }),
      },
      createdAt: serverTimestamp(),
    };
    try {
      await addDoc(collection(db, 'mail'), emailDoc);
    } catch (err) {
      console.warn('Falha ao enfileirar e-mail de notificação:', err);
    }
  }

  return { orderId, totalCents };
}

function serializeCreatedAt(createdAt) {
  if (!createdAt) return null;
  if (createdAt instanceof Timestamp) return createdAt.toDate().toISOString();
  if (createdAt.toDate) return createdAt.toDate().toISOString();
  return null;
}

export async function getOrderById(orderId) {
  const snap = await getDoc(doc(db, 'orders', orderId));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    ...data,
    createdAt: serializeCreatedAt(data.createdAt),
  };
}
