# VARXR Web

React + TypeScript + Vite web application for the VARXR real-estate platform.

## Features

- Project discovery
- Property browsing
- Property details
- Room information from the VARXR API
- Interactive GLB/GLTF 3D viewer
- Inquiry form
- Responsive mobile/desktop UI
- Render deployment configuration

## Existing backend

Default API:

`https://varxr-api.onrender.com/api`

Override with:

`VITE_API_BASE_URL`

## Local development

Requirements:
- Node.js 20+ recommended

```bash
npm install
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Render deployment

Create a Render Static Site connected to this repository.

Build Command:
```text
npm install && npm run build
```

Publish Directory:
```text
dist
```

Environment variable:
```text
VITE_API_BASE_URL=https://varxr-api.onrender.com/api
```

The included `public/_redirects` file makes client-side React routes work on hosts that support redirects.

## API endpoints used

- GET `/projects`
- GET `/projects/{projectId}`
- GET `/projects/{projectId}/properties`
- GET `/rooms/property/{propertyId}`
- GET `/xrmodels/property/{propertyId}`
- POST `/inquiries`

The property page uses `/projects/{projectId}/properties` and selects the requested property by `propertyId`; it does not depend on `/properties/details/{id}`.

## Notes

The 3D viewer uses React Three Fiber and loads the GLB URL returned by the XR Models endpoint. If the XR model endpoint is unavailable, the page still shows the property information and rooms.
