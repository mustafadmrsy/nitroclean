import crypto from "crypto";

import { env } from "@/lib/env";

function hmacSha256Base64(key: string, message: string) {
  return crypto.createHmac("sha256", key).update(message).digest("base64");
}

export type PaytrBasketItem = {
  name: string;
  priceTl: number;
  quantity: number;
};

type CreatePaytrTokenInput = {
  merchantOid: string;
  userIp: string;
  email: string;
  paymentAmountKurus: number;
  basket: PaytrBasketItem[];
  userName: string;
  userAddress: string;
  userPhone: string;
  okUrl: string;
  failUrl: string;
};

export async function createPaytrIframeToken(input: CreatePaytrTokenInput) {
  const merchantId = env.PAYTR_MERCHANT_ID;
  const merchantKey = env.PAYTR_MERCHANT_KEY;
  const merchantSalt = env.PAYTR_MERCHANT_SALT;

  if (!merchantId || !merchantKey || !merchantSalt) {
    throw new Error("Missing PayTR env vars");
  }

  const testMode = env.PAYTR_TEST_MODE ?? "1";

  const userBasket = JSON.stringify(
    input.basket.map((i) => [i.name, i.priceTl.toFixed(2), i.quantity])
  );

  const noInstallment = "1";
  const maxInstallment = "0";
  const currency = "TL";

  const hashStr =
    merchantId +
    input.userIp +
    input.merchantOid +
    input.email +
    input.paymentAmountKurus.toString() +
    userBasket +
    noInstallment +
    maxInstallment +
    currency +
    testMode;

  const paytrToken = hmacSha256Base64(merchantKey, hashStr + merchantSalt);

  const params = new URLSearchParams();
  params.set("merchant_id", merchantId);
  params.set("user_ip", input.userIp);
  params.set("merchant_oid", input.merchantOid);
  params.set("email", input.email);
  params.set("payment_amount", input.paymentAmountKurus.toString());
  params.set("paytr_token", paytrToken);
  params.set("user_basket", userBasket);
  params.set("no_installment", noInstallment);
  params.set("max_installment", maxInstallment);
  params.set("currency", currency);
  params.set("test_mode", testMode);
  params.set("debug_on", "1");
  params.set("lang", "tr");

  params.set("user_name", input.userName);
  params.set("user_address", input.userAddress);
  params.set("user_phone", input.userPhone);
  params.set("merchant_ok_url", input.okUrl);
  params.set("merchant_fail_url", input.failUrl);

  const res = await fetch("https://www.paytr.com/odeme/api/get-token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = (await res.json().catch(() => null)) as
    | { status: "success"; token: string }
    | { status: "failed"; reason: string }
    | null;

  if (!data) {
    throw new Error("PayTR response parse failed");
  }

  if (data.status !== "success") {
    throw new Error("PayTR token failed: " + ("reason" in data ? data.reason : "unknown"));
  }

  return data.token;
}

export function verifyPaytrWebhookHash(input: {
  merchantOid: string;
  status: string;
  totalAmountKurus: string;
  hash: string;
}) {
  const merchantKey = env.PAYTR_MERCHANT_KEY;
  const merchantSalt = env.PAYTR_MERCHANT_SALT;

  if (!merchantKey || !merchantSalt) {
    throw new Error("Missing PayTR env vars");
  }

  const hashStr = input.merchantOid + merchantSalt + input.status + input.totalAmountKurus;
  const expected = hmacSha256Base64(merchantKey, hashStr);

  return expected === input.hash;
}
