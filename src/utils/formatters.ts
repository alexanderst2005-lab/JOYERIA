import type { CartItem, OrderDetails, StoreConfig } from '../types';

export const formatCurrency = (amount: number, symbol = '$'): string => {
  return `${symbol} ${amount.toLocaleString('es-CO')}`;
};

export const generateWhatsAppOrderUrl = (
  items: CartItem[],
  orderDetails: OrderDetails,
  config: StoreConfig,
  subtotal: number,
  shippingCost = 0
): string => {
  const total = subtotal + shippingCost;
  const shippingText = shippingCost === 0 ? 'Gratis (Asegurado)' : formatCurrency(shippingCost, config.currencySymbol);

  let message = `✨ *NUEVO PEDIDO - ${config.brandName.replace(/\s+/g, ' ').trim()}* ✨\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `👤 *DATOS DEL CLIENTE*\n`;
  message += `• *Nombre:* ${orderDetails.customerName.trim()}\n`;
  message += `• *Teléfono:* ${orderDetails.phone.trim()}\n`;
  message += `• *Ciudad:* ${orderDetails.city.trim()}\n`;
  message += `• *Dirección:* ${orderDetails.address.trim()}\n`;
  if (orderDetails.notes && orderDetails.notes.trim()) {
    message += `• *Notas / Indicaciones:* ${orderDetails.notes.trim()}\n`;
  }

  message += `\n🛍️ *PIEZAS SELECCIONADAS (${items.reduce((acc, i) => acc + i.quantity, 0)})*\n`;
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    message += `${index + 1}. *${item.product.name}*\n`;
    if (item.selectedSize) {
      message += `   ▫️ Medida / Talla: ${item.selectedSize}\n`;
    }
    if (item.selectedColor) {
      message += `   ▫️ Tono: ${item.selectedColor}\n`;
    }
    message += `   ▫️ Cantidad: ${item.quantity} × ${formatCurrency(item.product.price, config.currencySymbol)}\n`;
    message += `   ▫️ Subtotal: ${formatCurrency(itemTotal, config.currencySymbol)}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *RESUMEN DE CUENTA*\n`;
  message += `• Subtotal: ${formatCurrency(subtotal, config.currencySymbol)}\n`;
  message += `• Envío: ${shippingText}\n`;
  message += `• *TOTAL A PAGAR: ${formatCurrency(total, config.currencySymbol)}*\n\n`;

  message += `📍 *Origen:* Pedido generado a través de la tienda web oficial.\n`;
  message += `Quedo atento(a) para confirmar la disponibilidad y acordar el método de pago preferido. Gracias.`;

  const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export const generateWhatsAppProductInquiryUrl = (
  productName: string,
  price: number,
  config: StoreConfig,
  productUrl?: string
): string => {
  let message = `Hola, me interesa consultar información sobre la pieza: *${productName}* (${formatCurrency(price, config.currencySymbol)}).\n`;
  if (productUrl) {
    message += `Enlace: ${productUrl}\n`;
  }
  message += `¿Tienen disponibilidad y asesoría de tallas? Gracias.`;

  const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
