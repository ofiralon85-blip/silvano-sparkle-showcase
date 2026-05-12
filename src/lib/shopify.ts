// Shopify Storefront API client
// Connects the Lovable frontend to the Shopify backend

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || "silvano-2109.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || "";
const API_VERSION = "2025-01";

if (!STOREFRONT_ACCESS_TOKEN) {
  console.warn(
    "Missing VITE_SHOPIFY_STOREFRONT_TOKEN environment variable. Set it in your .env file or Lovable env settings."
  );
}

const ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  selectedOptions: { name: string; value: string }[];
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  productType: string;
  vendor: string;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  variants: ShopifyVariant[];
  options: { id: string; name: string; values: string[] }[];
}

interface ShopifyError {
  message: string;
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    const message = json.errors.map((e: ShopifyError) => e.message).join(", ");
    throw new Error(`Shopify GraphQL error: ${message}`);
  }
  return json.data as T;
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    productType
    vendor
    featuredImage {
      url
      altText
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    options {
      id
      name
      values
    }
  }
`;

interface RawProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  productType: string;
  vendor: string;
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  priceRange: ShopifyProduct["priceRange"];
  variants: { edges: { node: ShopifyVariant }[] };
  options: ShopifyProduct["options"];
}

function normalizeProduct(p: RawProduct): ShopifyProduct {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    tags: p.tags,
    productType: p.productType,
    vendor: p.vendor,
    featuredImage: p.featuredImage,
    images: p.images.edges.map((e) => e.node),
    priceRange: p.priceRange,
    variants: p.variants.edges.map((e) => e.node),
    options: p.options,
  };
}

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `;
  const data = await shopifyFetch<{ products: { edges: { node: RawProduct }[] } }>(query, {
    first,
  });
  return data.products.edges.map((edge) => normalizeProduct(edge.node));
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
  `;
  const data = await shopifyFetch<{ product: RawProduct | null }>(query, { handle });
  return data.product ? normalizeProduct(data.product) : null;
}

// ===== CART (Checkout) =====

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
    price: ShopifyMoney;
    selectedOptions: { name: string; value: string }[];
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: CartLine[];
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
                featuredImage {
                  url
                  altText
                }
              }
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

interface RawCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: Cart["cost"];
  lines: { edges: { node: CartLine }[] };
}

function normalizeCart(c: RawCart): Cart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    cost: c.cost,
    lines: c.lines.edges.map((e) => e.node),
  };
}

export async function createCart(): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation CartCreate {
      cartCreate {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const data = await shopifyFetch<{
    cartCreate: { cart: RawCart; userErrors: { message: string }[] };
  }>(query);
  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
  }
  return normalizeCart(data.cartCreate.cart);
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: RawCart; userErrors: { message: string }[] };
  }>(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  if (data.cartLinesAdd.userErrors?.length) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join(", "));
  }
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: RawCart; userErrors: { message: string }[] };
  }>(query, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  if (data.cartLinesUpdate.userErrors?.length) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join(", "));
  }
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: RawCart; userErrors: { message: string }[] };
  }>(query, {
    cartId,
    lineIds: [lineId],
  });
  if (data.cartLinesRemove.userErrors?.length) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join(", "));
  }
  return normalizeCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($id: ID!) {
      cart(id: $id) {
        ...CartFields
      }
    }
  `;
  const data = await shopifyFetch<{ cart: RawCart | null }>(query, { id: cartId });
  return data.cart ? normalizeCart(data.cart) : null;
}

export function formatPrice(money: ShopifyMoney): string {
  const amount = parseFloat(money.amount);
  if (money.currencyCode === "ILS") {
    return `${Math.round(amount)} ₪`;
  }
  return `${amount.toFixed(2)} ${money.currencyCode}`;
}
