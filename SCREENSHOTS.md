# Before & After Screenshots

Visual comparison of the Inventory Management System before and after the feature implementation.

---

## 🔐 Login Page (NEW — After only)

A new authentication page guards all management sections. Demo credentials are displayed for convenience.

![Login Page](https://github.com/user-attachments/assets/5f364952-e4c2-47b2-8870-828c8445bdd3)

---

## 🏠 Dashboard

### Before
- No authentication required — dashboard opens immediately on load
- Navigation bar has 4 items (no Logout button)
- Orders show raw `Product #N` IDs, not product names

![Dashboard Before](https://github.com/user-attachments/assets/2793221f-a976-45e2-93fb-407ca78d326b)

### After
- Requires login to access — redirects to `/login` if unauthenticated
- Navigation bar now includes a **Logout** button
- Metric cards: Total Products, Total Inventory Value, Low Stock Items, Pending Orders

![Dashboard After](https://github.com/user-attachments/assets/9c853c7c-54d2-4c09-bc34-304b31b92da1)

---

## 📦 Products

### Before
- Tabs show static labels: "All Products" / "Low Stock Items" (no counts)
- Supplier names in original casing (e.g. "TechSupply Inc")
- No paginator
- Low-stock row has no visual highlighting

![Products Before](https://github.com/user-attachments/assets/5c0bfb5f-fcad-4f54-8ce8-ee2b203f974f)

### After
- Tabs show live counts: **"All Products (5)"** / **"Low Stock (1)"** — powered by the `LowStockPipe`
- Supplier names displayed in **UPPERCASE** via the `uppercase` pipe
- **Low-stock rows highlighted** in amber via `HighlightLowStockDirective`
- **MatPaginator** added at the bottom (Items per page selector + navigation)

![Products After](https://github.com/user-attachments/assets/dc7f95c2-e805-4bf4-a61e-604732a98e19)

---

## 🏢 Suppliers

### After
- Full supplier list with name, email (mailto links), phone (tel links), and address
- Template-driven form (NgModel) used for the Add/Edit supplier dialog

![Suppliers After](https://github.com/user-attachments/assets/8f83f4cf-cc37-4686-8794-ee9866aca3f5)

---

## 🛒 Orders

### Before
- No **Add New Order** button — orders could not be created from the UI
- **Product ID** column shows raw numeric IDs (1, 3, 2, 4, 5)
- Supplier names in original casing
- No paginator
- No Edit button — only Mark as Delivered and Delete

![Orders Before](https://github.com/user-attachments/assets/79f8d65e-7a9a-4a74-871b-2d1e20b641cc)

### After
- **Add New Order** button opens a reactive form dialog
- **Product** column resolves names (Laptop, USB-C Cable, Wireless Mouse, etc.)
- Supplier names in **UPPERCASE**
- **MatPaginator** added
- **Edit** button added alongside Mark as Delivered and Delete

![Orders After](https://github.com/user-attachments/assets/b2995b15-f048-4730-99b8-1d8050500368)

---

## ➕ Add New Order Dialog (NEW)

A reactive form dialog with:
- Product dropdown populated from live product data
- Quantity field with custom `positiveQuantity` validator (must be > 0)
- Supplier name field
- Order Date and Expected Delivery date pickers
- Cross-field `deliveryAfterOrder` validator (delivery must be ≥ order date)
- Status dropdown (Pending / Delivered / Cancelled)

![Add Order Dialog](https://github.com/user-attachments/assets/138d1f0a-78ab-4bb1-9588-94e8df906135)

---

## 🔍 Product Detail

### After
- Product title displayed in **UPPERCASE** via `uppercase` pipe
- Price formatted via `currency` pipe
- Supplier displayed in **UPPERCASE**
- Card border highlighted in amber via `HighlightLowStockDirective` when stock ≤ reorder level
- Accessed via child route `/products/:id` under the guarded `/products` parent

![Product Detail After](https://github.com/user-attachments/assets/10e86551-a19a-48c5-9b7a-3c146547b59d)
