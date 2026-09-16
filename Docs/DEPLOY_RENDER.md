# Deploy VARXR Web to Render

## 1. Create the GitHub repository

Create a new repository, for example:

`VARXR-Web`

Do not put database passwords, API keys, or other secrets in the repository.

From this folder:

```bash
npm install
npm run build
```

Then commit and push all project files.

## 2. Create the Render site

In Render:
- New
- Static Site
- Connect the `VARXR-Web` GitHub repository

Use:

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

Deploy.

## 3. SPA routing

The repository includes:
- `render.yaml`
- `public/_redirects`

The Render configuration rewrites application routes to `index.html`.

## 4. Test

Open the Render URL and verify:

1. Projects load.
2. Project 1 loads.
3. Property list loads.
4. Property details load.
5. Rooms load.
6. GLB loads in the 3D viewer.
7. Inquiry submits.

Expected rooms endpoint:

`/api/rooms/property/1`

Expected XR model endpoint:

`/api/xrmodels/property/1`

## 5. If the 3D model does not appear

Open browser DevTools > Console/Network.

Check that the returned GLB URL is publicly accessible and uses HTTPS.

The VARXR web app does not upload or copy the GLB; it displays the model URL returned by the API.

## 6. CORS

If browser requests are blocked by CORS, update the ASP.NET Core API CORS policy to allow the deployed Render web URL. During development the existing permissive CORS policy may already allow it.

After adding the production domain, prefer an allow-list rather than a wildcard CORS policy.

## 7. Custom domain

After the Render site works, add the custom domain from Render's settings. Then update the backend CORS allow-list to include the final domain.
