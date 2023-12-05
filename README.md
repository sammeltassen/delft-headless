# Delft headless IIIF

You will need to install Bun.sh to run this project.
```bash
curl -fsSL https://bun.sh/install | bash
```

To install dependencies:
```bash
bun install
```

To run development server:
```bash
bun run dev
```

To build for production:
```bash
bun run build
```

## Configuration
TBC

## Content

- libis
- content
- manifests

## Scripts

The following scripts have been created:

- delft-labels
- delft-image-source
- delft-related

These extract custom data out of the manifests, saving the results to disk. They can also add new data to the manifests.

2 main types of scripts:

- Extract
- Enrich

### Extract
If you create an extract script, it will be called with every type of resource you specify (e.g. Manifest). From the 
extract function you can return an object with the following shape:
```ts
type Return = {
  temp?: any;
  caches?: Record<string, any>;
  meta?: any;
  indices?: Record<string, string[]>;
}
```

Temp will be passed to a `collect()` after _all_ resources have been processed. This is useful for collecting data from
multiple resources and creating an aggregation.

Caches will be persisted between runs, so you can both read and write to that and avoid running heavy operations every
time.

Meta will be added to a file at the same path as the manifest, but ending in `/meta.json` instead of `/manifest.json`. This
is useful for adding data to the manifest that is not part of the IIIF spec.

Indicies are used to create reverse indices, so you can "tag" a resource with a type and a subtype:
```js
return {
  indicies: {
    Inventor: ['Some inventor'],
  }
}
```
Once all resources are processed, a collection will be created for each "tag" and each type of tag. So in this case, there
would be an "Inventor" collection that contains a single Collection ("Some inventor") and it would contain the Manifest.

When extracting (or enriching) you get access to the entire `meta.json` and caches that already exist on the resource. This
allows different scripts to build on each other.
