# API Gateway Practice

A small microservices practice project: one **API Gateway** (Express + `http-proxy-middleware`) that routes requests to three backend services based on the URL path.

## Architecture

```
                         ┌──────────────────────┐
                    ┌──▶ │ order_service  :3001 │
client ──▶ gateway ─┼──▶ │ product_service:3002 │
           :3000    └──▶ │ user_service   :3003 │
                         └──────────────────────┘
```

The gateway reads the second path segment (`/api/<service>/...`) and forwards the request to the matching service. Unknown services get a `404 { "message": "Service not found" }`.

| Service         | Port | Endpoint                    |
| --------------- | ---- | --------------------------- |
| api_gateway     | 3000 | `/api/<service>/...`        |
| order_service   | 3001 | `GET /api/order/:orderId`   |
| product_service | 3002 | `GET /api/product/:productId` |
| user_service    | 3003 | `GET /api/user/:userId`     |

## Project structure

```
api_gateway_prac/
├── api_gateway/      # Gateway (port 3000)
├── order_service/    # Order service (port 3001)
├── product_service/  # Product service (port 3002)
└── user_service/     # User service (port 3003)
```

## Requirements

- Node.js 18+ (ES modules, Express 5)

## Setup

Install dependencies in each folder:

```bash
for d in api_gateway order_service product_service user_service; do
  (cd "$d" && npm install)
done
```

## Running

Start each service in its own terminal:

```bash
cd order_service   && node index.js
cd product_service && node index.js
cd user_service    && node index.js
cd api_gateway     && node index.js
```

## Try it

All requests go through the gateway on port 3000:

```bash
curl http://localhost:3000/api/order/101
# {"orderId":"101","message":"Order details for order ID: 101"}

curl http://localhost:3000/api/product/55
curl http://localhost:3000/api/user/7

curl http://localhost:3000/api/payment/1
# {"message":"Service not found"}
```
