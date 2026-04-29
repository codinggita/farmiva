FARMIVA | Product Requirements Document | v1.0

FARMIVA

Farm-to-Consumer Platform

Product Requirements Document (PRD)

Version 1.0 | MVP Release

April 2026

Type Status Audience

Product Document Draft - MVP Phase Engineering / Design / Investors

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

Table of Contents

Table of Contents ....................................................................................................................... 2

1\. Product Overview ................................................................................................................... 6

1.1 Executive Summary .......................................................................................................... 6

1.2 Mission Statement ............................................................................................................ 6

1.3 Vision ............................................................................................................................... 6

1.4 Core Value Propositions ................................................................................................... 6

2\. Problem Statement ................................................................................................................ 7

2.1 Core Problems.................................................................................................................. 7

Urban Consumer Problems ................................................................................................. 7

Rural Consumer Problems .................................................................................................. 7

Farmer Problems ................................................................................................................ 7

Logistics & Operational Problems ....................................................................................... 7

2.2 Market Opportunity ........................................................................................................... 7

3\. Objectives & Goals ................................................................................................................. 9

3.1 Product Objectives ........................................................................................................... 9

3.2 Business Goals (MVP Phase — 6 Months) ....................................................................... 9

3.3 SMART Goals .................................................................................................................. 9

4\. Target Users & Personas ......................................................................................................10

4.1 Primary User Personas ....................................................................................................10

5\. User Roles ............................................................................................................................11

5.1 Role Definitions ...............................................................................................................11

Role 1: Customer (Consumer) ...........................................................................................11

Role 2: Farmer ...................................................................................................................11

Role 3: Admin ....................................................................................................................11

Role 4: Field Agent (Non-Technical Sub-Role under Admin) ..............................................11

6\. Role-Based Access Control (RBAC) .....................................................................................12

6.1 JWT Token Structure .......................................................................................................12

7\. Feature Breakdown ...............................................................................................................13

7.1 Authentication System .....................................................................................................13

Customer Registration / Login ............................................................................................13

Farmer Registration ...........................................................................................................13

Admin Login .......................................................................................................................13

7.2 Homepage (Already Built) ................................................................................................13

7.3 Product Listing Page (Already Built) ................................................................................13

7.4 Product Detail Page .........................................................................................................14

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

Product Information Panel ..................................................................................................14

Freshness Score Breakdown (MVP — Rule-Based) ..........................................................14

Quantity Selector & Cart CTA ............................................................................................14

Product Reviews Section ...................................................................................................14

7.5 Cart System .....................................................................................................................14

7.6 Checkout System ............................................................................................................15

Checkout Flow Steps .........................................................................................................15

Delivery Mode Logic ..........................................................................................................15

7.7 Order Management .........................................................................................................15

Customer Side ...................................................................................................................15

Farmer Side .......................................................................................................................15

Admin Side ........................................................................................................................16

7.8 Farmer Dashboard ..........................................................................................................16

Dashboard Widgets ...........................................................................................................16

Product Management .........................................................................................................16

Earnings & Payments ........................................................................................................16

Agent-Assisted Mode .........................................................................................................16

7.9 Admin Panel ....................................................................................................................16

Farmer Management .........................................................................................................16

Product Moderation ............................................................................................................17

Logistics Management .......................................................................................................17

Analytics & Reports ............................................................................................................17

8\. End-to-End User Flows .........................................................................................................18

8.1 Customer Journey ...........................................................................................................18

8.2 Farmer Journey ...............................................................................................................18

8.3 Admin Journey.................................................................................................................18

9\. System Architecture ..............................................................................................................19

9.1 Architecture Overview ......................................................................................................19

9.2 Architecture Layers ..........................................................................................................19

9.3 Infrastructure Diagram Summary .....................................................................................20

10\. Database Schema ...............................................................................................................21

10.1 Users Table ...................................................................................................................21

10.2 Farmer Profiles Table ....................................................................................................21

10.3 Products Table ..............................................................................................................22

10.4 Orders Table .................................................................................................................22

10.5 Order Items Table ..........................................................................................................23

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

10.6 Cart Table ......................................................................................................................23

10.7 Hubs Table (Rural Pickup) .............................................................................................24

11\. API Design ..........................................................................................................................25

11.1 Authentication Endpoints ...............................................................................................25

11.2 Product Endpoints .........................................................................................................25

11.3 Order Endpoints ............................................................................................................25

11.4 Cart Endpoints ...............................................................................................................26

11.5 Farmer & Admin Endpoints (Selected) ...........................................................................26

11.6 Payment Endpoints .......................................................................................................26

12\. State Management Strategy ................................................................................................28

13\. UI/UX Guidelines.................................................................................................................29

13.1 Design Principles ...........................................................................................................29

13.2 Color System .................................................................................................................29

13.3 Freshness Score Widget Design ...................................................................................29

13.4 Typography ...................................................................................................................30

13.5 Key UX Patterns ............................................................................................................30

14\. MVP Scope vs Future Scope ..............................................................................................31

14.1 MVP Scope (Launch — 16 Weeks) ...............................................................................31

14.2 Future Scope (Phase 2 & 3) ..........................................................................................31

15\. AI Integration .......................................................................................................................32

15.1 AI Freshness Detection (Future Phase) .........................................................................32

Problem It Solves ...............................................................................................................32

Technical Approach ...........................................................................................................32

Dataset Strategy ................................................................................................................32

15.2 Demand Forecasting (Future Phase) .............................................................................32

16\. Logistics Model ...................................................................................................................33

16.1 Urban Delivery Model (Micro-Fulfillment) .......................................................................33

Flow ...................................................................................................................................33

Smart Packaging Logic ......................................................................................................33

Urban Delivery SLA ...........................................................................................................33

16.2 Rural Hub-and-Agent Model ..........................................................................................33

Flow ...................................................................................................................................33

Hub Infrastructure ..............................................................................................................33

17\. Farmer Accessibility Solution ..............................................................................................35

17.1 The Problem ..................................................................................................................35

17.2 Solution: Agent-Based System ......................................................................................35

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

Field Agent Role ................................................................................................................35

17.3 WhatsApp-Based Listing Flow .......................................................................................35

17.4 Voice/Call-Based System (Phase 2) ..............................................................................35

17.5 Training & Onboarding ...................................................................................................35

18\. Security & Authentication ....................................................................................................36

18.1 Authentication ................................................................................................................36

18.2 Authorization .................................................................................................................36

18.3 Data Security .................................................................................................................36

18.4 API Security ...................................................................................................................36

19\. Performance Considerations ...............................................................................................37

19.1 Frontend Performance ...................................................................................................37

19.2 Backend Performance ...................................................................................................37

19.3 Load Targets .................................................................................................................37

20\. Error Handling & Edge Cases .............................................................................................38

20.1 API Error Standard ........................................................................................................38

20.2 Key Edge Cases & Handling ..........................................................................................38

21\. Scalability Plan ....................................................................................................................39

21.1 Horizontal Scaling ..........................................................................................................39

21.2 Database Scaling ..........................................................................................................39

21.3 Geographic Expansion ..................................................................................................39

21.4 Microservices Path (Year 2+) ........................................................................................39

22\. Business Model ...................................................................................................................40

22.1 Revenue Streams ..........................................................................................................40

22.2 Unit Economics (Target — Month 6) ..............................................................................40

23\. Key Performance Indicators (KPIs) .....................................................................................41

23.1 Product KPIs .................................................................................................................41

24\. Risks & Mitigation ................................................................................................................42

25\. Deployment Strategy ...........................................................................................................43

25.1 Environments.................................................................................................................43

25.2 CI/CD Pipeline (GitHub Actions) ....................................................................................43

25.3 Release Strategy ...........................................................................................................43

25.4 Monitoring & Observability .............................................................................................43

26\. Testing Strategy ..................................................................................................................44

26.1 Testing Layers ...............................................................................................................44

26.2 Test Coverage Targets ..................................................................................................44

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

1\. Product Overview

Product Name: Farmiva

Tagline: Fresh from the farm. Delivered to your door.

Version: 1.0 — MVP

Platform: Web Application (Mobile-responsive)

Document Type: Product Requirements Document

1.1 Executive Summary

Farmiva is a full-stack farm-to-consumer web platform that directly connects local farmers with

end consumers, eliminating intermediary supply chains that degrade produce quality and inflate

prices. The platform introduces a rule-based freshness scoring system, transparent sourcing,

and a dual-mode delivery model that serves both urban and rural populations. Farmiva is built

for scale with an AI integration roadmap for automated freshness detection using computer

vision.

1.2 Mission Statement

To democratize access to fresh, high-quality produce for every household — urban or rural —

while empowering farmers with fair markets and digital tools.

1.3 Vision

A nationwide agri-commerce ecosystem where farmers earn more, consumers eat better, and

every product comes with complete traceability from soil to doorstep.

1.4 Core Value Propositions

• For Consumers: Verified fresh produce with freshness scores, direct farm sourcing, and

reliable delivery.

• For Farmers: Direct-to-consumer market access, higher margins, transparent pricing,

and non-tech-friendly onboarding.

• For Platform (Admin): Scalable marketplace with quality control, logistics oversight,

and business analytics.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

2\. Problem Statement

2.1 Core Problems

Urban Consumer Problems

• Supermarket produce travels 2–5 days through cold chains, arriving bruised and

nutrient-depleted.

• No transparency in sourcing — consumers cannot trace the origin of their food.

• Existing grocery apps focus on speed, not quality or freshness verification.

• High price markups due to multi-layer intermediary chains (farmer → mandi →

wholesaler → retailer → consumer).

Rural Consumer Problems

• Last-mile delivery infrastructure is largely absent in tier-3 towns and villages.

• Rural consumers rely entirely on local weekly markets with no reliable home delivery.

• Digital commerce platforms do not cater to low-bandwidth or low-literacy demographics.

Farmer Problems

• Farmers sell at mandi (wholesale market) prices, capturing only 20–30% of the

consumer rupee.

• Lack of digital tools to manage inventory, track sales, or build customer relationships.

• Tech-illiteracy creates a barrier to listing on standard e-commerce platforms.

• No visibility into consumer demand data, leading to overproduction or stock wastage.

Logistics & Operational Problems

• Traditional grocery logistics are not designed for perishable produce.

• Packaging at the mandi level does not prevent bruising during transit.

• No real-time inventory synchronization between farm stock and consumer-facing

catalog.

2.2 Market Opportunity

Metric Value Source / Note

Indian Online Grocery ~$5.5 Billion Statista

Market (2024)

Projected CAGR ~28% (2024–2028) Industry estimate

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

Farm-to-Consumer Gap 60–80% price lost in NABARD Report

chain

Rural Internet Users (India) 380+ Million TRAI 2024

Post-harvest losses ~30% of produce FAO India

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

3\. Objectives & Goals

3.1 Product Objectives

1\. Build a verified farm-to-consumer marketplace with quality assurance.

2\. Deploy a freshness scoring system at listing time (rule-based MVP, AI future).

3\. Enable dual-mode logistics: fast urban delivery + hub-based rural pickup.

4\. Onboard low-tech farmers via agent-assisted or WhatsApp-based listing flows.

5\. Provide role-separated dashboards for customers, farmers, and admin.

6\. Achieve sub-3-second page loads and support 10,000 concurrent users at launch.

3.2 Business Goals (MVP Phase — 6 Months)

Goal Target

Farmer Onboarding 500 verified farmers across 5 districts

Product Listings 2,000+ active SKUs

Monthly Active Users 15,000 consumers

Order Volume (Month 6) 5,000 orders/month

Delivery Coverage (Urban) 10 tier-1 and tier-2 cities

Rural Pickup Hubs 25 hubs in 3 states

Average Freshness Score >75/100 for all listed produce

3.3 SMART Goals

• Specific: Serve fresh produce to urban and rural consumers via a transparent digital

marketplace.

• Measurable: Defined KPIs (Section 23) track every objective.

• Achievable: Phased delivery with MVP scope clearly separated from future scope.

• Relevant: Addresses a $5.5B+ market with a clear pain point.

• Time-bound: MVP launch in 16 weeks from kickoff.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

4\. Target Users & Personas

4.1 Primary User Personas

Persona 1 — Priya Mehta | Urban Health-Conscious Consumer

• Age: 28, Location: Ahmedabad (Urban)

• Occupation: Software Engineer

• Problem: Tired of wilted vegetables from supermarkets; wants traceable, fresh produce.

• Behavior: Shops online 3x per week; uses apps for convenience; health-conscious.

• Goals: Fresh produce delivered within 24 hours, knows which farm it came from.

• Tech Savviness: High — uses smartphone apps daily.

• Pain Points: Poor quality in online grocery apps; no freshness guarantee.

Persona 2 — Ramesh Patel | Rural Consumer

• Age: 42, Location: Village near Mehsana, Gujarat

• Occupation: School Teacher

• Problem: No home delivery options; nearest grocery is 8 km away.

• Behavior: Visits weekly market; comfortable with basic smartphone use.

• Goals: Access quality groceries at a nearby pickup hub without travelling far.

• Tech Savviness: Low-Medium — uses WhatsApp, basic browsing.

• Pain Points: Limited selection, no delivery, relies on seasonal availability.

Persona 3 — Kiran Verma | Small-Scale Farmer

• Age: 55, Location: Farm in Anand, Gujarat

• Occupation: Farmer (2 acres, grows tomatoes, spinach, wheat)

• Problem: Sells at mandi for low prices; no way to reach consumers directly.

• Behavior: Not tech-savvy; does not own a smartphone or uses basic Android.

• Goals: Earn more per kg; know when to harvest based on demand.

• Tech Savviness: Very Low — needs agent/WhatsApp based system.

• Pain Points: High broker fees, no market intelligence, irregular income.

Persona 4 — Admin / Operations Manager

• Age: 30, Location: Operations HQ

• Occupation: Platform Operations Lead

• Goals: Approve farmers, manage catalog quality, track logistics, resolve disputes.

• Tech Savviness: High — uses admin dashboards, analytics tools.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

5\. User Roles

5.1 Role Definitions

Role 1: Customer (Consumer)

• Registers with email/phone, browses products, adds to cart, places and tracks orders.

• Views freshness scores, farm source details, and harvest dates.

• Selects urban delivery or rural hub pickup at checkout.

• Accesses order history, manages profile and saved addresses.

Role 2: Farmer

• Registers and awaits admin approval before listing products.

• Lists produce with pricing, freshness data, and harvest details.

• Manages active inventory, views incoming orders, and updates stock.

• Receives payments after order fulfillment; accesses earnings dashboard.

• Can be assisted by a Farmiva Field Agent for non-tech-savvy farmers.

Role 3: Admin

• Master role with full system access.

• Approves/rejects farmer registrations and product listings.

• Manages delivery zones, hub locations, and logistics partners.

• Monitors all orders, disputes, and platform health metrics.

• Manages promotions, categories, banners, and platform content.

Role 4: Field Agent (Non-Technical Sub-Role under Admin)

• Farmiva employee assigned to rural/semi-urban regions.

• Onboards farmers on their behalf, photographs produce, inputs data via app.

• Acts as last-mile communication bridge between farmer and platform.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

6\. Role-Based Access Control (RBAC)

All access is controlled via JWT tokens with embedded role claims. The backend middleware

validates the role before processing any protected route.

Feature / Resource Customer Farmer Admin

Browse Products Yes Yes (own) Yes (all)

Place Orders Yes No No

Manage Own Listings No Yes Yes

View All Orders Own only Farm orders only All orders

Approve Farmer No No Yes

Admin Panel Access No No Yes

Update Inventory No Yes Yes

View Analytics No Limited (own) Full

Manage Delivery Zones No No Yes

Issue Refunds No No Yes

Manage Promotions No No Yes

Edit Product Freshness No Yes (own) Yes

Access User Data Own only No Yes

6.1 JWT Token Structure

JWT Payload Schema

• { "userId": "uuid", "role": "customer | farmer | admin", "farmId": "uuid (if farmer)", "exp":

1714...}

• Tokens expire in 24 hours (access) / 7 days (refresh).

• Role is validated server-side on every protected request via authMiddleware.

• Refresh token rotation invalidates old tokens on reuse.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

7\. Feature Breakdown

7.1 Authentication System

Customer Registration / Login

• Email + password signup with email OTP verification.

• Phone number + OTP login (alternate flow for low-tech users).

• Google OAuth login (optional, Phase 2).

• JWT access token stored in httpOnly cookie; refresh token in localStorage.

• Forgot password via email link or SMS OTP.

Farmer Registration

• Multi-step registration: personal info → farm details → bank details → ID upload.

• Fields: Name, phone, aadhaar/pan, farm size, primary crops, district/state.

• Status: pending\_approval after submission.

• Admin approves; farmer receives SMS/email notification.

• Field Agent can complete registration on behalf of farmer.

Admin Login

• Username + password (no public signup).

• 2FA via TOTP (Google Authenticator) for admin accounts.

• IP whitelisting as optional additional layer.

7.2 Homepage (Already Built)

• Hero banner with seasonal highlights and trust badges.

• Location detection prompt (with manual override).

• Featured categories: Vegetables, Fruits, Grains, Dairy, Herbs.

• 'Freshness Picks' carousel — products with freshness score > 85.

• 'Nearby Farms' section — farms within 100 km of user location.

• Promotional banners managed by Admin via CMS.

7.3 Product Listing Page (Already Built)

• Grid/list view toggle; category and subcategory filters.

• Sort by: Freshness Score (desc), Price, Harvest Date, Distance.

• Filter by: Category, Distance, Organic/Non-organic, Price range, Rating.

• Freshness badge visible on every product card (color-coded: green/yellow/red).

• Pagination with lazy loading (20 items per page default).

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

• Search with autocomplete using product name, farm name, or district.

7.4 Product Detail Page

Product Information Panel

• Product name, category, unit (per kg / per bunch / per piece).

• Current price and MRP with discount %.

• Freshness Score widget (0–100 with color band and descriptor label).

• Harvest date, estimated shelf life, storage tip.

• Farm name, farmer name, district, distance from user (km).

• Certifications: Organic / Pesticide-free / Naturally grown badges.

Freshness Score Breakdown (MVP — Rule-Based)

Factor Weight

Days since harvest (< 1 day = 40%

max)

Seasonal availability match 20%

Storage method (cold/ambient) 20%

Farmer quality rating (avg reviews) 20%

Quantity Selector & Cart CTA

• Min/max quantity enforcement (stock-aware).

• Add to Cart and Buy Now buttons.

• Product quantity in cart shown if already added.

Product Reviews Section

• Verified purchase reviews only.

• 5-star rating + text comment + optional photo.

• Average rating displayed on listing card.

7.5 Cart System

• Persistent cart stored in backend (per user) — survives browser refresh.

• Cart sync across devices (tied to userId, not session).

• Real-time stock validation on cart open (items removed if out of stock).

• Grouped by farmer for logistics routing.

• Quantity edit, item remove, clear cart.

• Price summary: subtotal, platform fee, delivery fee, discount, GST, total.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

• Smart packaging note displayed if multiple fragile items are in cart.

7.6 Checkout System

Checkout Flow Steps

7\. Address Selection — saved addresses or new address entry with pin code → zone

detection.

8\. Delivery Mode Selection — Urban: doorstep delivery (date+slot) | Rural: hub pickup (hub

list + slot).

9\. Order Summary Review — itemized list with freshness score summary.

10\. Coupon/Promo Code — validated server-side.

11\. Payment — Razorpay integration (cards, UPI, netbanking, wallets, COD for rural).

12\. Order Confirmation — order ID, ETA, tracking link, SMS/email notification.

Delivery Mode Logic

Mode Logic & Details

Urban Doorstep Available if pin code maps to an urban delivery zone. Slots: Same-day

(order before 10 AM) or next-day.

Rural Hub Pickup Activated when pin code falls outside urban zone. Shows nearest hubs

(< 10 km), available slots, and agent contact.

Address Override User can manually switch mode if desired (with admin-configured rules

respected).

7.7 Order Management

Customer Side

• Order list with status: Placed → Confirmed → Packed → Dispatched → Delivered /

Ready for Pickup.

• Real-time order tracking with status timeline.

• Cancel order (allowed until 'Packed' status).

• Reorder button on past orders.

• Raise issue / request refund from order detail.

Farmer Side

• Incoming orders panel with new order notifications (push + email).

• Accept / Reject order within 2 hours (auto-reject if missed — configurable by admin).

• Mark order as Packed (triggers logistics pickup).

• View delivery details for urban orders, hub drop-off for rural.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

Admin Side

• Full order feed with filters (status, date, farmer, zone, payment type).

• Override order status if needed (e.g., manual confirmation after farmer failure).

• Initiate refund and flag farmer for quality issues.

7.8 Farmer Dashboard

Dashboard Widgets

• Revenue summary: Today / This Week / This Month.

• Pending orders requiring action.

• Top-performing products by units sold.

• Freshness score average across listings.

Product Management

• Add new product: name, category, price, harvest date, stock quantity, freshness inputs.

• Edit active listing (price, stock updates reflect immediately).

• Pause/unpause listing (soft delete).

• Bulk upload via CSV template (for larger farms).

• Photo upload: up to 5 images per product (compressed via browser, stored in S3).

Earnings & Payments

• Earnings breakdown per order after platform commission.

• Payment schedule: weekly auto-transfer to registered bank account.

• Download earnings report (CSV/PDF).

Agent-Assisted Mode

• Field Agent logs in with farmer's registered phone as proxy.

• All actions attributed to farmer's account, agent actions logged for audit.

• WhatsApp-based listing: Farmer sends photo + price via WhatsApp to Farmiva number

→ agent creates listing via dashboard.

7.9 Admin Panel

Farmer Management

• Review pending farmer applications with submitted documents.

• Approve / Reject with rejection reason (sent to farmer via SMS).

• Suspend active farmer (immediately pulls all listings).

• View farmer performance: freshness scores, order completion %, disputes raised.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

Product Moderation

• Review flagged listings (low freshness score, customer complaints, pricing anomalies).

• Approve or remove a listing with admin notes to farmer.

• Set platform-wide freshness score minimum threshold (default: 60).

Logistics Management

• Define and manage urban delivery zones (pin code range mapping).

• Add/edit hub locations: name, address, capacity, agent assigned.

• Assign delivery partners per zone (API integration or manual).

• Track all active deliveries on an operations map view.

Analytics & Reports

• GMV (Gross Merchandise Value) by day / week / month.

• Top products, top farmers, top regions by order volume.

• Freshness score distribution across platform.

• Delivery performance: on-time %, failed deliveries, hub pickup rates.

• User acquisition funnel: signups → first order → repeat order.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

8\. End-to-End User Flows

8.1 Customer Journey

13\. Land on Homepage → location auto-detected.

14\. Browse by category or search for a specific item.

15\. View Product Detail Page → read freshness score, farm source, harvest date.

16\. Add to cart; review smart packaging suggestions.

17\. Proceed to Checkout → select address → choose urban delivery or rural pickup.

18\. Select date/time slot → apply coupon → review total.

19\. Pay via Razorpay (UPI/card/COD).

20\. Receive order confirmation SMS + email.

21\. Track order in real-time → receive delivery / pickup notification.

22\. Post-delivery: rate product → leave review.

8.2 Farmer Journey

23\. Agent or Farmer completes registration form.

24\. Submits documents (Aadhaar, bank details, farm proof).

25\. Admin reviews and approves within 48 hours.

26\. Farmer logs in (or agent logs in on their behalf).

27\. Adds product listings with freshness inputs and photos.

28\. Listing goes live after passing freshness threshold check.

29\. Receives order notification → accepts → packs produce.

30\. Marks order packed → logistics partner picks up (urban) or farmer drops to hub (rural).

31\. Receives payment within 7 days.

8.3 Admin Journey

32\. Log in to Admin Panel.

33\. Review dashboard: pending farmers, flagged listings, open disputes.

34\. Approve farmer applications and moderate new product listings.

35\. Monitor order flow and intervene on exceptions.

36\. Review weekly analytics → make platform configuration decisions.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

9\. System Architecture

9.1 Architecture Overview

Farmiva follows a layered 3-tier architecture: Presentation Layer (React), Application Layer

(Node.js/Express REST API), and Data Layer (PostgreSQL + Redis). An optional AI

microservice (Python) runs independently for future freshness detection.

9.2 Architecture Layers

Layer 1 — Frontend (React + Vite + Tailwind CSS)

• Single Page Application (SPA) built with React 18 and Vite.

• React Router v6 for client-side routing.

• Zustand for global state management (cart, auth, user profile).

• React Query (TanStack Query) for server state and caching.

• Tailwind CSS for utility-first, responsive styling.

• Hosted on Vercel / Netlify with CDN edge delivery.

Layer 2 — Backend (Node.js + Express)

• RESTful API with Express.js, structured by domain (auth, products, orders, farmers,

admin).

• JWT-based authentication with role middleware.

• Multer + AWS S3 for image upload and storage.

• Razorpay SDK for payment gateway integration.

• Bull (Redis-backed) for background job queues (payment processing, notifications).

• Socket.io for real-time order status updates.

• Rate limiting via express-rate-limit (100 req/15 min per IP).

Layer 3 — Database (PostgreSQL)

• Primary relational database: PostgreSQL 15.

• Redis for session cache, cart cache, and delivery zone lookups.

• Prisma ORM for type-safe database access and migration management.

• Database hosted on Supabase (managed PostgreSQL) or AWS RDS.

AI Microservice (Future — Python)

• Standalone FastAPI service for image-based freshness detection.

• Input: product image uploaded by farmer.

• Output: freshness score override (confidence > 0.7 replaces rule-based score).

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

• Model: fine-tuned MobileNetV2 or YOLOv8 for produce classification.

• Communicates with main backend via internal REST call on product creation.

9.3 Infrastructure Diagram Summary

Component Technology / Provider

Frontend Hosting Vercel (with CDN)

Backend Hosting AWS EC2 or Railway.app

Database Supabase (PostgreSQL) or AWS RDS

Cache / Queue Redis (Upstash or AWS ElastiCache)

File Storage AWS S3 + CloudFront CDN

Email Notifications SendGrid API

SMS Notifications Twilio or MSG91 (India)

Payment Gateway Razorpay

Maps / Geocoding Google Maps API

AI Service (Future) AWS Lambda (Python FastAPI)

Monitoring Sentry (errors) + Grafana (metrics)

CI/CD GitHub Actions

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

10\. Database Schema

All tables use UUID primary keys. Timestamps (created\_at, updated\_at) are present on every

entity. Soft-delete pattern (deleted\_at) used for products and orders.

10.1 Users Table

Column Type & Notes

id UUID PRIMARY KEY

name VARCHAR(100)

email VARCHAR(150) UNIQUE NOT NULL

phone VARCHAR(15) UNIQUE

password\_hash TEXT (bcrypt, 10 rounds)

role ENUM: customer, farmer, admin

address\_default\_id UUID FK → addresses.id (nullable)

is\_verified BOOLEAN DEFAULT false

is\_active BOOLEAN DEFAULT true

created\_at / updated\_at TIMESTAMPTZ

10.2 Farmer Profiles Table

Column Type & Notes

id UUID PRIMARY KEY

user\_id UUID FK → users.id (1:1)

farm\_name VARCHAR(100)

farm\_district VARCHAR(100)

farm\_state VARCHAR(100)

farm\_size\_acres DECIMAL(6,2)

primary\_crops TEXT\[\] (array of crop names)

aadhaar\_number VARCHAR(12) ENCRYPTED

bank\_account\_no VARCHAR(20) ENCRYPTED

bank\_ifsc VARCHAR(11)

status ENUM: pending, approved, suspended

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

approval\_date TIMESTAMPTZ

agent\_id UUID FK → users.id (nullable — assigned agent)

avg\_freshness\_score DECIMAL(5,2) COMPUTED

total\_earnings DECIMAL(12,2)

10.3 Products Table

Column Type & Notes

id UUID PRIMARY KEY

farmer\_id UUID FK → farmer\_profiles.id

name VARCHAR(150)

category\_id UUID FK → categories.id

description TEXT

unit ENUM: kg, gram, bunch, piece, litre

price\_per\_unit DECIMAL(8,2)

mrp\_per\_unit DECIMAL(8,2)

stock\_quantity DECIMAL(8,2)

harvest\_date DATE

shelf\_life\_days INTEGER

storage\_type ENUM: cold, ambient, dry

is\_organic BOOLEAN DEFAULT false

freshness\_score INTEGER (0–100, computed on save)

images TEXT\[\] (S3 URLs)

status ENUM: active, paused, out\_of\_stock, flagged

deleted\_at TIMESTAMPTZ (soft delete)

10.4 Orders Table

Column Type & Notes

id UUID PRIMARY KEY

customer\_id UUID FK → users.id

delivery\_mode ENUM: urban\_doorstep, rural\_hub\_pickup

address\_id UUID FK → addresses.id

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

hub\_id UUID FK → hubs.id (nullable)

status ENUM: placed, confirmed, packed, dispatched, delivered, cancelled

payment\_status ENUM: pending, paid, refunded, failed

payment\_method ENUM: upi, card, netbanking, cod, wallet

razorpay\_order\_id VARCHAR(100)

subtotal DECIMAL(10,2)

delivery\_fee DECIMAL(8,2)

platform\_fee DECIMAL(8,2)

discount\_amount DECIMAL(8,2)

gst\_amount DECIMAL(8,2)

total\_amount DECIMAL(10,2)

estimated\_delivery TIMESTAMPTZ

delivered\_at TIMESTAMPTZ

deleted\_at TIMESTAMPTZ

10.5 Order Items Table

Column Type & Notes

id UUID PRIMARY KEY

order\_id UUID FK → orders.id

product\_id UUID FK → products.id

farmer\_id UUID FK → farmer\_profiles.id

quantity DECIMAL(8,2)

unit\_price\_at\_order DECIMAL(8,2) (locked at purchase time)

freshness\_score\_at\_order INTEGER

subtotal DECIMAL(10,2)

10.6 Cart Table

Column Type & Notes

id UUID PRIMARY KEY

user\_id UUID FK → users.id UNIQUE

items JSONB \[{product\_id, quantity, added\_at}\]

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

updated\_at TIMESTAMPTZ

10.7 Hubs Table (Rural Pickup)

Column Type & Notes

id UUID PRIMARY KEY

name VARCHAR(100)

address TEXT

district VARCHAR(100)

state VARCHAR(100)

pin\_codes\_served TEXT\[\] (array of pin codes)

latitude / longitude DECIMAL(9,6)

agent\_id UUID FK → users.id

capacity\_orders\_per\_day INTEGER

is\_active BOOLEAN DEFAULT true

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

11\. API Design

All endpoints follow REST conventions. Base URL: /api/v1. All protected routes require

Authorization: Bearer header.

11.1 Authentication Endpoints

Method Endpoint Auth Description

POST /auth/register Public Customer registration

POST /auth/login Public Login (returns JWT)

POST /auth/refresh Public Refresh access token

POST /auth/logout Customer Invalidate refresh token

POST /auth/forgot-password Public Send reset OTP

POST /auth/reset-password Public Reset with OTP

POST /auth/verify-email Public Email verification

POST /farmers/register Public Farmer registration

11.2 Product Endpoints

Method Endpoint Auth Description

GET /products Public List all products (filters, sort,

paginate)

GET /products/:id Public Product detail with freshness score

POST /products Farmer Create new listing

PUT /products/:id Farmer Update listing

DELETE /products/:id Farmer/Admin Soft delete listing

GET /products/category/:slug Public Products by category

GET /products/farm/:farmerId Public All products from a farm

PATCH /products/:id/status Admin Toggle product status

11.3 Order Endpoints

Method Endpoint Auth Description

POST /orders Customer Create order (post-payment)

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

GET /orders Customer List own orders

GET /orders/:id Customer/Farmer/Admin Order detail

PATCH /orders/:id/status Farmer/Admin Update order status

POST /orders/:id/cancel Customer Cancel order

POST /orders/:id/refund Admin Initiate refund

GET /admin/orders Admin All orders with filters

GET /farmers/orders Farmer Farmer's incoming orders

11.4 Cart Endpoints

Method Endpoint Auth Description

GET /cart Customer Get current cart

POST /cart/add Customer Add item to cart

PUT /cart/update Customer Update item quantity

DELETE /cart/remove/:productId Customer Remove item

DELETE /cart/clear Customer Clear entire cart

11.5 Farmer & Admin Endpoints (Selected)

Method Endpoint Auth Description

GET /admin/farmers Admin All farmer applications

PATCH /admin/farmers/:id/approve Admin Approve farmer

PATCH /admin/farmers/:id/suspend Admin Suspend farmer

GET /farmers/dashboard Farmer Earnings & order summary

GET /admin/analytics Admin Platform analytics

GET /admin/hubs Admin All hub locations

POST /admin/hubs Admin Create hub

GET /delivery/zone/:pincode Public Detect delivery mode for pincode

11.6 Payment Endpoints

Method Endpoint Auth Description

POST /payments/create-order Customer Create Razorpay order

POST /payments/verify Customer Verify payment signature

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

POST /payments/webhook Internal Razorpay webhook handler

GET /farmers/payouts Farmer List payout history

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

12\. State Management Strategy

State Type Solution & Rationale

Authentication / User Zustand store. Persisted to localStorage (access token removed on

logout). Role and userId drive conditional rendering.

Cart Zustand store synced with backend on add/remove. Optimistic UI

updates with rollback on API error.

Server Data (Products, TanStack Query (React Query). Handles caching, background refetch,

Orders) stale-while-revalidate. No redundant API calls.

Form State React Hook Form with Zod schema validation. Minimal re-renders;

schema shared with backend.

UI State (modals, Local useState/useReducer. Not stored globally.

toasts)

Real-time Order Status Socket.io client subscribed to order room (orderId). Updates TanStack

Query cache on event.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

13\. UI/UX Guidelines

13.1 Design Principles

• Trust-Driven Design: Every UI element reinforces trust — farm photos, verified badges,

freshness scores, review counts.

• Freshness-First: Freshness score is the primary differentiator; it must be visually

prominent on product cards and detail pages.

• Progressive Disclosure: Show summary data on listing; detailed breakdown on detail

page. Avoid overwhelming the user.

• Accessibility: WCAG 2.1 AA compliance. Minimum 4.5:1 contrast ratio. Keyboard

navigable. ARIA labels.

• Mobile-First: Design for 360px width up. Touch targets minimum 44px. No hover-only

interactions.

13.2 Color System

Usage Color & Hex

Primary Brand (CTA buttons, Forest Green — #2D6A4F

links)

Secondary Accent (badges, Sage Green — #52B788

highlights)

Freshness Score: High (80– Green — #40916C

100)

Freshness Score: Medium Amber — #F59E0B

(50–79)

Freshness Score: Low (0–49) Red — #EF4444

Background (Light) #F9FAFB

Text Primary #111827

Text Secondary #6B7280

Warning / Error #E76F51

13.3 Freshness Score Widget Design

• Displayed as a circular gauge (0–100) with color fill (green to red gradient).

• Label below gauge: 'Very Fresh' (80+), 'Fresh' (60–79), 'Moderate' (40–59), 'Declining'

(<40).

• Tooltip on hover: breakdown of score factors (days since harvest, storage method, etc.).

• On product cards: compact badge (color dot + score number).

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

13.4 Typography

Heading Font: Inter (700) — clean, modern, readable at all sizes

Body Font: Inter (400/500) — consistent with heading

Numeric Scores: JetBrains Mono (monospace) — emphasizes precision for freshness scores

Base Font Size: 16px; scale: 12/14/16/20/24/32/48px

13.5 Key UX Patterns

• Skeleton loading screens (not spinners) for all data-fetching states.

• Toast notifications (top-right) for all success/error feedback (4-second auto-dismiss).

• Empty states with actionable CTAs ('No products found — Browse all categories').

• Confirmation modals for destructive actions (remove from cart, cancel order).

• Smart packaging tip banner in cart if fragile items (e.g., tomatoes, berries) detected.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

14\. MVP Scope vs Future Scope

14.1 MVP Scope (Launch — 16 Weeks)

Included in MVP

• Customer: Registration, login, homepage, product listing, product detail, cart, checkout,

order tracking.

• Farmer: Registration (admin-approved), product listing/edit, order management, earnings

summary.

• Admin: Farmer approval, product moderation, hub management, order oversight, basic

analytics.

• Freshness Score: Rule-based calculation (no AI).

• Delivery: Urban doorstep (manual logistics partner), Rural hub pickup.

• Payment: Razorpay (UPI, card, netbanking). COD for rural.

• Notifications: Email (SendGrid) + SMS (MSG91).

• Authentication: JWT + OTP (email and phone).

14.2 Future Scope (Phase 2 & 3)

Post-MVP Features

• AI Freshness Detection: Computer vision model for image-based freshness scoring.

• Subscription Boxes: Weekly veggie box with farmer-curated selection.

• Demand Forecasting: ML model helping farmers decide what to grow.

• WhatsApp Bot: Farmer can list products, get orders, and respond via WhatsApp.

• Loyalty Program: Customer rewards for repeat purchases.

• Multi-language Support: Hindi, Gujarati, Marathi for farmer and rural consumer interfaces.

• Farmer Community Forum: Peer-to-peer knowledge sharing within the platform.

• Cold Chain Tracking: IoT temperature sensors on delivery vehicles.

• B2B Module: Bulk ordering for restaurants, hotels, canteens.

• Mobile Native App: React Native app for iOS and Android.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

15\. AI Integration

15.1 AI Freshness Detection (Future Phase)

Problem It Solves

• Rule-based freshness scores are limited to metadata (harvest date, storage type).

• Visual inspection by farmers is subjective and inconsistent.

• AI can detect bruising, discoloration, mold, and ripeness from images.

Technical Approach

• Input: Farmer uploads 1–5 product photos during listing creation.

• Model: Fine-tuned MobileNetV2 or YOLOv8 trained on labeled produce dataset.

• Output: Freshness score override (0–100) with detected defect tags (e.g., 'bruising

detected on 15% surface').

• Confidence threshold: AI score is used only if model confidence > 0.70; otherwise rule-

based score is kept.

• Microservice: Python FastAPI service deployed independently; called via internal HTTP

from Node backend.

Dataset Strategy

• Phase 1: Use open datasets (Kaggle Fruits-360, PlantVillage) for initial training.

• Phase 2: Label Farmiva's own uploaded product images (semi-supervised with admin

tagging tool).

• Continuous retraining pipeline via AWS SageMaker or Google Vertex AI.

15.2 Demand Forecasting (Future Phase)

• Time-series model (Prophet or LSTM) trained on order history per

product/region/season.

• Output: Weekly demand forecast displayed in farmer dashboard ('Expected demand

next week: 200 kg tomatoes').

• Helps farmers plan harvests, reduce waste, and optimize pricing.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

16\. Logistics Model

16.1 Urban Delivery Model (Micro-Fulfillment)

Flow

37\. Farmer receives order notification → marks produce as packed.

38\. Farmiva logistics partner (Dunzo / Shadowfax / in-house) picks up from farmer at

scheduled slot.

39\. Produce brought to micro-fulfillment hub (urban warehouse).

40\. Sorted, quality-checked, smart-packed (cushioned packaging for fragile items).

41\. Delivered to customer doorstep within same day or next day.

Smart Packaging Logic

• System flags orders with fragile items (e.g., tomatoes, mangoes, eggs).

• Picker notified to use partitioned packaging for flagged items.

• Packaging material: food-grade corrugated inserts + breathable mesh bags.

Urban Delivery SLA

Delivery Type SLA

Same-Day (order before 10 Delivery by 7 PM

AM)

Next-Day Standard Delivery by 2 PM

Express (future) Delivery in 3–4 hours

16.2 Rural Hub-and-Agent Model

Flow

42\. Customer selects hub pickup at checkout, chooses nearest hub and pickup slot.

43\. Farmer receives order → packs produce → delivers to designated hub by morning.

44\. Hub Agent receives produce, records batch in system, stores in hub.

45\. Customer receives SMS when order is ready for pickup.

46\. Customer visits hub with order ID and collects produce.

Hub Infrastructure

• Each hub serves a cluster of 5–10 villages within 10 km radius.

• Hub facility: 200–400 sq ft cooled storage room at a local shop/cooperative.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

• Hub Agent: Part-time Farmiva employee (local hire) handling receiving, storage, and

handoff.

• Hub equipped with basic Android tablet (Farmiva Agent App) for order verification and

scan.

• Cash-on-delivery accepted at hub pickup by Hub Agent.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

17\. Farmer Accessibility Solution

17.1 The Problem

• 65%+ of Indian farmers are over 50 years old with low smartphone proficiency.

• Standard app-based onboarding fails this demographic.

• Language barriers further reduce tech adoption.

17.2 Solution: Agent-Based System

Field Agent Role

• Hired locally by Farmiva; covers 30–50 farmers each.

• Visits farms for onboarding; photographs produce; inputs listing data.

• Agent App: simplified mobile UI (large buttons, local language, photo capture).

• All actions logged against farmer's account; auditable trail for disputes.

17.3 WhatsApp-Based Listing Flow

47\. Farmer sends WhatsApp message to Farmiva's dedicated number: photo + product

name + price + quantity.

48\. Automated bot (WhatsApp Business API) parses message using NLP.

49\. Draft listing created; Agent reviews and confirms within 4 hours.

50\. Farmer receives confirmation: 'Your tomatoes at ₹30/kg are now live on Farmiva.'

51\. Order alerts also sent to farmer via WhatsApp: 'New order: 5 kg tomatoes. Pack by

tomorrow 8 AM.'

17.4 Voice/Call-Based System (Phase 2)

• IVR system: Farmer calls Farmiva number, selects language, hears menu options.

• Options: 'Press 1 to hear your orders. Press 2 to update stock. Press 3 to speak to an

agent.'

• Powered by Twilio Voice + text-to-speech in Hindi/Gujarati/Marathi.

17.5 Training & Onboarding

• Field Agent conducts in-person training session during farm visit.

• Video tutorial (3 minutes, regional language) shared via WhatsApp on registration.

• Helpline number available 9 AM–6 PM, 6 days/week.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

18\. Security & Authentication

18.1 Authentication

• JWT access tokens (15-minute expiry) + refresh tokens (7-day expiry, httpOnly cookie).

• Refresh token rotation: each use issues a new token; old token invalidated.

• Password hashing: bcrypt with salt rounds = 12.

• Email/phone OTP: 6-digit, single-use, 10-minute expiry, stored in Redis.

• Admin accounts: TOTP 2FA enforced; no public registration route.

18.2 Authorization

• Role-based middleware on every protected route.

• Resource-level authorization: Farmers can only edit their own products; customers see

only their orders.

• Admin can impersonate users for support (logged in audit trail).

18.3 Data Security

• All data in transit: HTTPS enforced (TLS 1.3); HSTS header.

• Sensitive fields (Aadhaar, bank account): AES-256 encrypted at rest in database.

• Payment data: Never stored on Farmiva servers — Razorpay handles PCI DSS

compliance.

• Environment variables: stored in AWS Secrets Manager / Doppler (never in code).

• Database access: RLS (Row Level Security) on Supabase; no direct public access.

18.4 API Security

• Rate limiting: 100 requests/15 min per IP (express-rate-limit).

• Input validation: Zod schemas on all POST/PUT request bodies.

• SQL injection prevention: Prisma ORM (parameterized queries by default).

• XSS prevention: React escapes HTML by default; Content Security Policy headers set.

• CORS: Allowlist of trusted origins only; no wildcard in production.

• Helmet.js: Sets security HTTP headers (X-Frame-Options, Referrer-Policy, etc.).

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

19\. Performance Considerations

19.1 Frontend Performance

• Vite build: code splitting by route; vendor chunk separation.

• Lazy loading of route components (React.lazy + Suspense).

• Images: served from CloudFront CDN; WebP format with srcset for responsive sizes.

• React Query: 5-minute stale time for product listing; 30-second for cart.

• Target: Lighthouse score > 90 on mobile; First Contentful Paint < 1.5s.

19.2 Backend Performance

• Database: Indexes on user\_id, product category\_id, order customer\_id, farmer\_id,

status.

• Redis cache: product listing cache (TTL 5 min); delivery zone lookup cache (TTL 24 hr).

• Pagination: cursor-based pagination for large product feeds (avoids OFFSET

performance issues at scale).

• N+1 prevention: Prisma includes for eager loading related data in single query.

• Compression: gzip/brotli on all API responses.

19.3 Load Targets

Metric Target

API response time (p95) < 300ms

Page load (mobile 4G) < 3 seconds

Concurrent users (MVP 10,000

launch)

Database query time (p95) < 50ms

Image load time (product < 1 second

detail)

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

20\. Error Handling & Edge Cases

20.1 API Error Standard

Standardized Error Response Format

• { "status": "error", "code": "PRODUCT\_NOT\_FOUND", "message": "Product not found.",

"details": {} }

• HTTP status codes used correctly: 400 (bad input), 401 (unauthenticated), 403

(forbidden), 404 (not found), 409 (conflict), 500 (server error).

• All unhandled exceptions caught by Express global error handler — Sentry alert

triggered.

20.2 Key Edge Cases & Handling

Edge Case Trigger Handling User Message

Item out of stock at Stock = 0 when Block checkout; remove 'Tomatoes went out of

checkout order placed from cart stock. Removed from cart.'

Payment success DB write failure Background retry job; Order confirmed via

but order not after payment Razorpay webhook webhook catch

created reconciliation

Farmer doesn't 2-hour SLA Auto-cancel + refund; notify SMS to customer: 'Order

confirm order in missed admin cancelled. Refund initiated.'

time

Freshness score Staleness rule Auto-pause listing; notify Farmer alert: 'Spinach score

drops after listing re-runs daily farmer dropped below 60. Re-list or

update harvest date.'

Duplicate order Two identical Idempotency key on order Second request returns first

placed (double-tap) POST /orders creation order's ID

within 10s

Rural hub at Hub orders > Disable hub slot at checkout Show alternate hub options

capacity daily capacity

Farmer account Admin suspends Orders fulfill; no new orders Active orders proceed;

suspended mid- while orders allowed future orders blocked

order active

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

21\. Scalability Plan

21.1 Horizontal Scaling

• Backend: Node.js app deployed as stateless Docker containers behind AWS ALB

(Application Load Balancer).

• Auto-scaling group scales out at 70% CPU utilization.

• Target: Support 100,000 concurrent users by Year 2 with no architecture change.

21.2 Database Scaling

• PostgreSQL read replicas for read-heavy endpoints (product listings, order history).

• Prisma connection pooling via PgBouncer.

• Partition orders table by month for query performance beyond 1M rows.

• Redis cluster for distributed caching at scale.

21.3 Geographic Expansion

• Multi-region AWS deployment (India: Mumbai + Hyderabad availability zones).

• New state rollout: Add delivery zones and hub locations without code changes (admin

config).

• CDN (CloudFront): Serve static assets from edge for all-India coverage.

21.4 Microservices Path (Year 2+)

• Notification Service: Separate service for email/SMS/push with queue-based delivery.

• Analytics Service: Dedicated data pipeline (Kafka + ClickHouse) for high-throughput

event tracking.

• AI Service: Already designed as independent microservice (Section 15).

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

22\. Business Model

22.1 Revenue Streams

Revenue Stream Details

Platform Commission 8–12% commission on each completed order, deducted from

(Primary) farmer payout.

Delivery Fee ₹20–₹40 per urban order based on distance; ₹10 flat for rural hub

pickup.

Farmer Subscription ₹499/month for premium listings: higher search ranking, AI

(Phase 2) freshness score, analytics.

Logistics Margin Negotiated bulk rates with logistics partners; margin kept as

revenue.

Promoted Listings (Phase Farmers pay to boost product visibility in category/search results.

2)

B2B Bulk Orders (Phase 3) Volume-based contracts with restaurants/canteens; higher margin.

22.2 Unit Economics (Target — Month 6)

Metric Value

Average Order Value (AOV) ₹350

Platform Commission (10%) ₹35 per order

Delivery Revenue ₹30 per order

COGS per Order (logistics + ₹25

packaging)

Gross Profit per Order ₹40

Monthly Orders (Month 6 5,000

target)

Monthly Gross Profit ₹2,00,000

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

23\. Key Performance Indicators (KPIs)

23.1 Product KPIs

Category KPI Target (Month 6)

Growth Monthly Active Users (MAU) 15,000

Growth Monthly Orders 5,000

Growth Farmer Listings Active 2,000+

Quality Average Freshness Score > 75 / 100

Quality Order Completion Rate > 92%

Quality On-Time Delivery Rate (Urban) > 88%

Quality Customer Rating (Avg) > 4.2 / 5

Retention Month-2 Repeat Order Rate > 35%

Retention Farmer Churn Rate < 10% / quarter

Operations Farmer Response Time (orders) < 2 hours (90th percentile)

Operations Refund Rate < 3%

Business GMV (Month 6) ₹17.5L / month

Business Gross Margin > 35%

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

24\. Risks & Mitigation

Risk Category Likelihood Mitigation

Farmers reject Adoption High Agent-based onboarding + WhatsApp bot. In-

platform due to tech person training. Local language support.

barrier

Low produce Quality Medium Minimum freshness score threshold (60). Admin

freshness damaging moderation. Farmer suspension for repeated

brand trust complaints.

Logistics partner Operations Medium Multi-partner strategy (no single logistics

unreliability dependency). SLA agreements with penalty

clauses.

Payment fraud (COD Financial Medium COD only for rural hubs (agent collects). Urban

non-collection) COD disabled at launch.

Competitor replication Market Medium Patent freshness algorithm. Build community

of freshness model moat (farmer loyalty, subscription revenue).

Regulatory: FSSAI Legal Low- Legal review at onboarding. FSSAI registration

compliance for food Medium for platform. Farmer compliance checklist.

marketplace

Cold chain failure Operations Low Temperature-monitored packaging. Hub

causing spoilage refrigeration units. Real-time hub temperature

alerts.

Database breach of Security Low AES-256 encryption. RLS policies. Regular pen-

farmer financial data testing. Minimal PII retention.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

25\. Deployment Strategy

25.1 Environments

Environment Purpose & Notes

Development (local) Individual developer setup. SQLite or local PostgreSQL. .env.local.

Staging Full-stack replica on Railway/Render. Connected to test Razorpay

keys. Seed data loaded.

Production AWS EC2 (backend) + Vercel (frontend) + Supabase (DB). Live

Razorpay keys. Auto-scaling enabled.

25.2 CI/CD Pipeline (GitHub Actions)

52\. Push to feature branch → lint (ESLint) + type-check (TypeScript) runs.

53\. PR to develop → unit tests + integration tests run.

54\. Merge to develop → auto-deploy to staging.

55\. PR to main → manual review required.

56\. Merge to main → deploy to production with zero-downtime rolling update.

25.3 Release Strategy

• Semantic versioning: v1.0.0 (MVP launch), v1.1.x (patch), v1.x.0 (minor feature).

• Feature flags (LaunchDarkly or custom Redis-based) for controlled rollouts.

• Database migrations run automatically via Prisma migrate deploy in CI/CD.

• Rollback plan: Previous Docker image tagged and ready for instant redeployment.

25.4 Monitoring & Observability

• Sentry: Real-time error tracking for both frontend (React) and backend (Node.js).

• Grafana + Prometheus: API response time, database query latency, queue depth.

• Uptime monitoring: BetterUptime / UptimeRobot with SMS alert on downtime > 2 min.

• Log aggregation: Winston (structured JSON logs) → AWS CloudWatch.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026

FARMIVA | Product Requirements Document | v1.0

26\. Testing Strategy

26.1 Testing Layers

Layer Tools & Coverage

Unit Tests (Backend) Jest + Supertest. Cover all service layer functions. Target: 80% code

coverage.

Integration Tests Test full request-response cycle for all API endpoints. Use test

(Backend) database.

Unit Tests (Frontend) Vitest + React Testing Library. Cover all components and Zustand

store actions.

E2E Tests Playwright. Cover critical flows: signup → browse → add to cart →

checkout → order confirmation.

API Contract Tests Postman collection with Newman CI runner. Validates all endpoints

against schema.

Performance Tests k6 load testing: 1,000 concurrent users on /products endpoint. Baseline

before each release.

Security Tests OWASP ZAP automated scan on staging. Manual review of auth and

payment flows.

Manual / QA Exploratory testing by QA engineer before every production release.

26.2 Test Coverage Targets

• Backend unit + integration: >= 80% line coverage.

• Frontend unit: >= 70% for core components (cart, checkout, auth).

• E2E: 100% coverage of the 5 critical user journeys.

• All PRs require green CI pipeline before merge to main.

FARMIVA — Product Requirements Document

Version 1.0 | Confidential & Proprietary

For internal use, academic submission, and investor review.

Farmiva PRD v1.0 | Confidential & Proprietary | April 2026