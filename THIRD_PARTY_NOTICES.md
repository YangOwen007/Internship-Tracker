# Third-party notices

The project's original code is MIT-licensed; dependencies and vendored material retain their own licenses. [Full collected texts and inventory](public/third-party-licenses.txt) are also served at `/third-party-licenses.txt`.

Run `pnpm licenses:generate -- --registry` after a frozen dependency install. The optional registry flag retrieves missing platform-package metadata, not executable code. Run on the intended deployment platform and inspect the final artifact: metadata-only entries are not proof that notice/source obligations are satisfied.

## Distribution review

- Sharp/libvips platform binaries include LGPL-3.0-or-later components. Check applicable licenses, corresponding source, and relinking requirements before distributing binaries/containers. Hosting alone does not automatically license the app under LGPL.
- Lightning CSS and axe-core use MPL-2.0; elkjs uses EPL-2.0. Inspect covered files/source requirements when distributing them.
- caniuse-lite uses CC-BY-4.0. Preserve attribution/license information for distributed data.
- Prisma Studio's upstream NOTICE includes Prisma branding terms. It is currently a development-tool transitive, not an embedded app feature; preserve applicable notices if shipping it.
- Generated Prisma types include an upstream Stack Overflow reference. Do not strip attribution or assume generated code is free of third-party rights.
- Font families in CSS refer to local system fonts; no commercial font binaries are bundled. The checklist SVG/favicon are project-original. The committed screenshots use synthetic records.
- Node/PostgreSQL/container base images carry additional component licenses not fully represented by the npm lockfile. Review them if distributing a runtime/container.

## Locked packages

642 package/version entries; 114 use registry-only metadata on this platform. Full text coverage is listed per entry.

| Package/version | Declared license | Local evidence |
| --- | --- | --- |
| @alloc/quick-lru@5.2.0 | MIT | 1 notice/license file(s) |
| @babel/code-frame@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/compat-data@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/core@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/generator@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/helper-compilation-targets@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/helper-globals@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/helper-module-imports@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/helper-module-transforms@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/helper-string-parser@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/helper-validator-identifier@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/helper-validator-option@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/helpers@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/parser@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/runtime@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/template@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/traverse@7.29.7 | MIT | 1 notice/license file(s) |
| @babel/types@7.29.7 | MIT | 1 notice/license file(s) |
| @electric-sql/pglite-socket@0.1.3 | Apache-2.0 | 1 notice/license file(s) |
| @electric-sql/pglite-tools@0.3.3 | Apache-2.0 | 1 notice/license file(s) |
| @electric-sql/pglite@0.4.3 | Apache-2.0 | 1 notice/license file(s) |
| @emnapi/core@1.10.0 | MIT | Registry metadata only; verify target-platform files |
| @emnapi/runtime@1.10.0 | MIT | Registry metadata only; verify target-platform files |
| @emnapi/runtime@1.11.3 | MIT | Registry metadata only; verify target-platform files |
| @emnapi/wasi-threads@1.2.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/aix-ppc64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/android-arm64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/android-arm@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/android-x64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/darwin-arm64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/darwin-x64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/freebsd-arm64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/freebsd-x64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/linux-arm64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/linux-arm@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/linux-ia32@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/linux-loong64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/linux-mips64el@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/linux-ppc64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/linux-riscv64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/linux-s390x@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/linux-x64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/netbsd-arm64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/netbsd-x64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/openbsd-arm64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/openbsd-x64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/openharmony-arm64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/sunos-x64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/win32-arm64@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/win32-ia32@0.28.1 | MIT | Registry metadata only; verify target-platform files |
| @esbuild/win32-x64@0.28.1 | MIT | Metadata only; verify upstream text |
| @eslint-community/eslint-utils@4.9.1 | MIT | Registry metadata only; verify target-platform files |
| @eslint-community/regexpp@4.12.2 | MIT | 1 notice/license file(s) |
| @eslint/config-array@0.21.2 | Apache-2.0 | 1 notice/license file(s) |
| @eslint/config-helpers@0.4.2 | Apache-2.0 | 1 notice/license file(s) |
| @eslint/core@0.17.0 | Apache-2.0 | 1 notice/license file(s) |
| @eslint/eslintrc@3.3.5 | MIT | 1 notice/license file(s) |
| @eslint/js@9.39.4 | MIT | 1 notice/license file(s) |
| @eslint/object-schema@2.1.7 | Apache-2.0 | 1 notice/license file(s) |
| @eslint/plugin-kit@0.4.1 | Apache-2.0 | 1 notice/license file(s) |
| @humanfs/core@0.19.2 | Apache-2.0 | 1 notice/license file(s) |
| @humanfs/node@0.16.8 | Apache-2.0 | 1 notice/license file(s) |
| @humanfs/types@0.15.0 | Apache-2.0 | Metadata only; verify upstream text |
| @humanwhocodes/module-importer@1.0.1 | Apache-2.0 | 1 notice/license file(s) |
| @humanwhocodes/retry@0.4.3 | Apache-2.0 | 1 notice/license file(s) |
| @img/colour@1.1.0 | MIT | 1 notice/license file(s) |
| @img/sharp-darwin-arm64@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-darwin-x64@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-freebsd-wasm32@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-libvips-darwin-arm64@1.3.4 | LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-libvips-darwin-x64@1.3.4 | LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-libvips-linux-arm64@1.3.4 | LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-libvips-linux-arm@1.3.4 | LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-libvips-linux-ppc64@1.3.4 | LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-libvips-linux-riscv64@1.3.4 | LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-libvips-linux-s390x@1.3.4 | LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-libvips-linux-x64@1.3.4 | LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-libvips-linuxmusl-arm64@1.3.4 | LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-libvips-linuxmusl-x64@1.3.4 | LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-linux-arm64@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-linux-arm@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-linux-ppc64@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-linux-riscv64@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-linux-s390x@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-linux-x64@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-linuxmusl-arm64@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-linuxmusl-x64@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-wasm32@0.35.5 | Apache-2.0 AND LGPL-3.0-or-later AND MIT | Registry metadata only; verify target-platform files |
| @img/sharp-webcontainers-wasm32@0.35.5 | Apache-2.0 | Registry metadata only; verify target-platform files |
| @img/sharp-win32-arm64@0.35.5 | Apache-2.0 AND LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-win32-ia32@0.35.5 | Apache-2.0 AND LGPL-3.0-or-later | Registry metadata only; verify target-platform files |
| @img/sharp-win32-x64@0.35.5 | Apache-2.0 AND LGPL-3.0-or-later | 1 notice/license file(s) |
| @jridgewell/gen-mapping@0.3.13 | MIT | 1 notice/license file(s) |
| @jridgewell/remapping@2.3.5 | MIT | 1 notice/license file(s) |
| @jridgewell/resolve-uri@3.1.2 | MIT | 1 notice/license file(s) |
| @jridgewell/sourcemap-codec@1.5.5 | MIT | 1 notice/license file(s) |
| @jridgewell/trace-mapping@0.3.31 | MIT | 1 notice/license file(s) |
| @napi-rs/wasm-runtime@1.1.6 | MIT | Registry metadata only; verify target-platform files |
| @next/env@16.3.8 | MIT | Metadata only; verify upstream text |
| @next/eslint-plugin-next@16.3.8 | MIT | Metadata only; verify upstream text |
| @next/swc-darwin-arm64@16.3.8 | MIT | Registry metadata only; verify target-platform files |
| @next/swc-darwin-x64@16.3.8 | MIT | Registry metadata only; verify target-platform files |
| @next/swc-linux-arm64-gnu@16.3.8 | MIT | Registry metadata only; verify target-platform files |
| @next/swc-linux-arm64-musl@16.3.8 | MIT | Registry metadata only; verify target-platform files |
| @next/swc-linux-x64-gnu@16.3.8 | MIT | Registry metadata only; verify target-platform files |
| @next/swc-linux-x64-musl@16.3.8 | MIT | Registry metadata only; verify target-platform files |
| @next/swc-win32-arm64-msvc@16.3.8 | MIT | Registry metadata only; verify target-platform files |
| @next/swc-win32-x64-msvc@16.3.8 | MIT | Metadata only; verify upstream text |
| @nodelib/fs.scandir@2.1.5 | MIT | 1 notice/license file(s) |
| @nodelib/fs.stat@2.0.5 | MIT | 1 notice/license file(s) |
| @nodelib/fs.walk@1.2.8 | MIT | 1 notice/license file(s) |
| @nolyfill/is-core-module@1.0.39 | MIT | 1 notice/license file(s) |
| @panva/hkdf@1.2.1 | MIT | 1 notice/license file(s) |
| @prisma/adapter-pg@7.10.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/client-runtime-utils@7.10.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/client@7.10.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/config@7.10.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/debug@7.10.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/debug@7.2.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/dev@0.24.17 | ISC | Metadata only; verify upstream text |
| @prisma/driver-adapter-utils@7.10.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/engines-version@7.10.0-4.0edf323efd1d98336f3f0a68684b56f689b900d3 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/engines@7.10.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/fetch-engine@7.10.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/get-platform@7.10.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/get-platform@7.2.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/query-plan-executor@7.2.0 | Apache-2.0 | 1 notice/license file(s) |
| @prisma/streams-local@0.1.11 | Apache-2.0 | 5 notice/license file(s) |
| @prisma/studio-core@0.33.0 | Apache-2.0 | 2 notice/license file(s) |
| @radix-ui/primitive@1.1.3 | MIT | 1 notice/license file(s) |
| @radix-ui/react-compose-refs@1.1.2 | MIT | Registry metadata only; verify target-platform files |
| @radix-ui/react-primitive@2.1.3 | MIT | 1 notice/license file(s) |
| @radix-ui/react-slot@1.2.3 | MIT | 1 notice/license file(s) |
| @radix-ui/react-toggle@1.1.10 | MIT | 1 notice/license file(s) |
| @radix-ui/react-use-controllable-state@1.2.2 | MIT | Registry metadata only; verify target-platform files |
| @radix-ui/react-use-effect-event@0.0.2 | MIT | Registry metadata only; verify target-platform files |
| @radix-ui/react-use-layout-effect@1.1.1 | MIT | Registry metadata only; verify target-platform files |
| @reduxjs/toolkit@2.12.0 | MIT | 1 notice/license file(s) |
| @rtsao/scc@1.1.0 | MIT | 1 notice/license file(s) |
| @standard-schema/spec@1.1.0 | MIT | 1 notice/license file(s) |
| @standard-schema/utils@0.3.0 | MIT | 1 notice/license file(s) |
| @swc/helpers@0.5.23 | Apache-2.0 | 1 notice/license file(s) |
| @tailwindcss/node@4.3.2 | MIT | 1 notice/license file(s) |
| @tailwindcss/oxide-android-arm64@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-darwin-arm64@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-darwin-x64@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-freebsd-x64@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-linux-arm-gnueabihf@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-linux-arm64-gnu@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-linux-arm64-musl@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-linux-x64-gnu@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-linux-x64-musl@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-wasm32-wasi@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-win32-arm64-msvc@4.3.2 | MIT | Registry metadata only; verify target-platform files |
| @tailwindcss/oxide-win32-x64-msvc@4.3.2 | MIT | 1 notice/license file(s) |
| @tailwindcss/oxide@4.3.2 | MIT | 1 notice/license file(s) |
| @tailwindcss/postcss@4.3.2 | MIT | 1 notice/license file(s) |
| @tybys/wasm-util@0.10.3 | MIT | Registry metadata only; verify target-platform files |
| @types/d3-array@3.0.3 | MIT | 1 notice/license file(s) |
| @types/d3-array@3.2.2 | MIT | 1 notice/license file(s) |
| @types/d3-color@3.1.0 | MIT | 1 notice/license file(s) |
| @types/d3-color@3.1.3 | MIT | 1 notice/license file(s) |
| @types/d3-delaunay@6.0.1 | MIT | 1 notice/license file(s) |
| @types/d3-ease@3.0.2 | MIT | 1 notice/license file(s) |
| @types/d3-format@3.0.1 | MIT | 1 notice/license file(s) |
| @types/d3-geo@3.1.0 | MIT | 1 notice/license file(s) |
| @types/d3-interpolate@3.0.1 | MIT | 1 notice/license file(s) |
| @types/d3-interpolate@3.0.4 | MIT | 1 notice/license file(s) |
| @types/d3-path@3.1.1 | MIT | 1 notice/license file(s) |
| @types/d3-scale@4.0.2 | MIT | 1 notice/license file(s) |
| @types/d3-scale@4.0.9 | MIT | 1 notice/license file(s) |
| @types/d3-shape@3.1.7 | MIT | 1 notice/license file(s) |
| @types/d3-shape@3.1.8 | MIT | 1 notice/license file(s) |
| @types/d3-time-format@2.1.0 | MIT | 1 notice/license file(s) |
| @types/d3-time@3.0.0 | MIT | 1 notice/license file(s) |
| @types/d3-time@3.0.4 | MIT | 1 notice/license file(s) |
| @types/d3-timer@3.0.2 | MIT | 1 notice/license file(s) |
| @types/estree@1.0.9 | MIT | 1 notice/license file(s) |
| @types/geojson@7946.0.16 | MIT | 1 notice/license file(s) |
| @types/json-schema@7.0.15 | MIT | 1 notice/license file(s) |
| @types/json5@0.0.29 | MIT | Metadata only; verify upstream text |
| @types/lodash@4.17.25 | MIT | 1 notice/license file(s) |
| @types/node@20.19.43 | MIT | 1 notice/license file(s) |
| @types/pg@8.20.0 | MIT | 1 notice/license file(s) |
| @types/react-dom@19.2.3 | MIT | 1 notice/license file(s) |
| @types/react@19.2.17 | MIT | 1 notice/license file(s) |
| @types/use-sync-external-store@0.0.6 | MIT | 1 notice/license file(s) |
| @typescript-eslint/eslint-plugin@8.63.0 | MIT | Registry metadata only; verify target-platform files |
| @typescript-eslint/parser@8.63.0 | MIT | 1 notice/license file(s) |
| @typescript-eslint/project-service@8.63.0 | MIT | 1 notice/license file(s) |
| @typescript-eslint/scope-manager@8.63.0 | MIT | 1 notice/license file(s) |
| @typescript-eslint/tsconfig-utils@8.63.0 | MIT | 1 notice/license file(s) |
| @typescript-eslint/type-utils@8.63.0 | MIT | Registry metadata only; verify target-platform files |
| @typescript-eslint/types@8.63.0 | MIT | 1 notice/license file(s) |
| @typescript-eslint/typescript-estree@8.63.0 | MIT | 1 notice/license file(s) |
| @typescript-eslint/utils@8.63.0 | MIT | 1 notice/license file(s) |
| @typescript-eslint/visitor-keys@8.63.0 | MIT | 1 notice/license file(s) |
| @unrs/resolver-binding-android-arm-eabi@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-android-arm64@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-darwin-arm64@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-darwin-x64@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-freebsd-x64@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-arm-gnueabihf@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-arm-musleabihf@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-arm64-gnu@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-arm64-musl@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-loong64-gnu@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-loong64-musl@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-ppc64-gnu@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-riscv64-gnu@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-riscv64-musl@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-s390x-gnu@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-x64-gnu@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-linux-x64-musl@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-openharmony-arm64@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-wasm32-wasi@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-win32-arm64-msvc@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-win32-ia32-msvc@1.12.2 | MIT | Registry metadata only; verify target-platform files |
| @unrs/resolver-binding-win32-x64-msvc@1.12.2 | MIT | Metadata only; verify upstream text |
| @visx/curve@4.0.1-alpha.0 | MIT | 1 notice/license file(s) |
| @visx/event@4.0.1-alpha.0 | MIT | 1 notice/license file(s) |
| @visx/grid@4.0.1-alpha.0 | MIT | 1 notice/license file(s) |
| @visx/group@4.0.1-alpha.0 | MIT | 1 notice/license file(s) |
| @visx/point@4.0.1-alpha.0 | MIT | 1 notice/license file(s) |
| @visx/responsive@4.0.1-alpha.0 | MIT | 1 notice/license file(s) |
| @visx/scale@4.0.1-alpha.0 | MIT | 1 notice/license file(s) |
| @visx/shape@4.0.1-alpha.0 | MIT | 1 notice/license file(s) |
| @visx/vendor@4.0.0-alpha.0 | MIT and ISC | 13 notice/license file(s) |
| acorn-jsx@5.3.2 | MIT | 1 notice/license file(s) |
| acorn@8.17.0 | MIT | 1 notice/license file(s) |
| ajv@6.15.0 | MIT | 1 notice/license file(s) |
| ajv@8.20.0 | MIT | 1 notice/license file(s) |
| ansi-styles@4.3.0 | MIT | 1 notice/license file(s) |
| argparse@2.0.1 | Python-2.0 | 1 notice/license file(s) |
| aria-query@5.3.2 | Apache-2.0 | 1 notice/license file(s) |
| array-buffer-byte-length@1.0.2 | MIT | 1 notice/license file(s) |
| array-includes@3.1.9 | MIT | 1 notice/license file(s) |
| array.prototype.findlast@1.2.5 | MIT | 1 notice/license file(s) |
| array.prototype.findlastindex@1.2.6 | MIT | 1 notice/license file(s) |
| array.prototype.flat@1.3.3 | MIT | 1 notice/license file(s) |
| array.prototype.flatmap@1.3.3 | MIT | 1 notice/license file(s) |
| array.prototype.tosorted@1.1.4 | MIT | 1 notice/license file(s) |
| arraybuffer.prototype.slice@1.0.4 | MIT | 1 notice/license file(s) |
| ast-types-flow@0.0.8 | MIT | 1 notice/license file(s) |
| async-function@1.0.0 | MIT | 1 notice/license file(s) |
| available-typed-arrays@1.0.7 | MIT | 1 notice/license file(s) |
| aws-ssl-profiles@1.1.2 | MIT | 1 notice/license file(s) |
| axe-core@4.12.1 | MPL-2.0 | 2 notice/license file(s) |
| axobject-query@4.1.0 | Apache-2.0 | 1 notice/license file(s) |
| balanced-match@1.0.2 | MIT | 1 notice/license file(s) |
| balanced-match@4.0.4 | MIT | 1 notice/license file(s) |
| baseline-browser-mapping@2.11.27 | Apache-2.0 | 1 notice/license file(s) |
| bcryptjs@3.0.3 | BSD-3-Clause | 1 notice/license file(s) |
| better-result@2.9.2 | MIT | 1 notice/license file(s) |
| brace-expansion@1.1.21 | MIT | 1 notice/license file(s) |
| brace-expansion@5.0.12 | MIT | 1 notice/license file(s) |
| braces@3.0.3 | MIT | 1 notice/license file(s) |
| browserslist@4.29.3 | MIT | 1 notice/license file(s) |
| c12@3.3.4 | MIT | 1 notice/license file(s) |
| call-bind-apply-helpers@1.0.2 | MIT | 1 notice/license file(s) |
| call-bind@1.0.9 | MIT | 1 notice/license file(s) |
| call-bound@1.0.4 | MIT | 1 notice/license file(s) |
| callsites@3.1.0 | MIT | 1 notice/license file(s) |
| caniuse-lite@1.0.30001803 | CC-BY-4.0 | 1 notice/license file(s) |
| caniuse-lite@1.0.30001814 | CC-BY-4.0 | 1 notice/license file(s) |
| chalk@4.1.2 | MIT | 1 notice/license file(s) |
| chokidar@5.0.0 | MIT | 1 notice/license file(s) |
| classnames@2.5.1 | MIT | 1 notice/license file(s) |
| client-only@0.0.1 | MIT | Metadata only; verify upstream text |
| clsx@2.1.1 | MIT | 1 notice/license file(s) |
| color-convert@2.0.1 | MIT | 1 notice/license file(s) |
| color-name@1.1.4 | MIT | 1 notice/license file(s) |
| concat-map@0.0.1 | MIT | 1 notice/license file(s) |
| confbox@0.2.4 | MIT | 1 notice/license file(s) |
| convert-source-map@2.0.0 | MIT | 1 notice/license file(s) |
| cookie@0.7.2 | MIT | 1 notice/license file(s) |
| cross-spawn@7.0.6 | MIT | 1 notice/license file(s) |
| csstype@3.2.3 | MIT | 1 notice/license file(s) |
| d3-array@3.2.1 | ISC | 1 notice/license file(s) |
| d3-array@3.2.4 | ISC | 1 notice/license file(s) |
| d3-color@3.1.0 | ISC | 1 notice/license file(s) |
| d3-delaunay@6.0.2 | ISC | 1 notice/license file(s) |
| d3-ease@3.0.1 | BSD-3-Clause | 1 notice/license file(s) |
| d3-format@3.1.0 | ISC | 1 notice/license file(s) |
| d3-format@3.1.2 | ISC | 1 notice/license file(s) |
| d3-geo@3.1.0 | ISC | 1 notice/license file(s) |
| d3-interpolate@3.0.1 | ISC | 1 notice/license file(s) |
| d3-path@3.1.0 | ISC | 1 notice/license file(s) |
| d3-scale@4.0.2 | ISC | 1 notice/license file(s) |
| d3-shape@3.2.0 | ISC | 1 notice/license file(s) |
| d3-time-format@4.1.0 | ISC | 1 notice/license file(s) |
| d3-time@3.1.0 | ISC | 1 notice/license file(s) |
| d3-timer@3.0.1 | ISC | 1 notice/license file(s) |
| damerau-levenshtein@1.0.8 | BSD-2-Clause | 1 notice/license file(s) |
| data-view-buffer@1.0.2 | MIT | 1 notice/license file(s) |
| data-view-byte-length@1.0.2 | MIT | 1 notice/license file(s) |
| data-view-byte-offset@1.0.1 | MIT | 1 notice/license file(s) |
| debug@3.2.7 | MIT | 1 notice/license file(s) |
| debug@4.4.3 | MIT | 1 notice/license file(s) |
| decimal.js-light@2.5.1 | MIT | 1 notice/license file(s) |
| deep-is@0.1.4 | MIT | 1 notice/license file(s) |
| deepmerge-ts@8.0.2 | BSD-3-Clause | 1 notice/license file(s) |
| define-data-property@1.1.4 | MIT | 1 notice/license file(s) |
| define-properties@1.2.1 | MIT | 1 notice/license file(s) |
| defu@6.1.7 | MIT | 1 notice/license file(s) |
| delaunator@5.1.0 | ISC | 1 notice/license file(s) |
| destr@2.0.5 | MIT | 1 notice/license file(s) |
| detect-libc@2.1.2 | Apache-2.0 | 1 notice/license file(s) |
| doctrine@2.1.0 | Apache-2.0 | 3 notice/license file(s) |
| dotenv@17.4.2 | BSD-2-Clause | 1 notice/license file(s) |
| dunder-proto@1.0.1 | MIT | 1 notice/license file(s) |
| effect@3.20.0 | MIT | 1 notice/license file(s) |
| electron-to-chromium@1.5.445 | ISC | 1 notice/license file(s) |
| elkjs@0.11.1 | EPL-2.0 | 1 notice/license file(s) |
| emoji-regex@9.2.2 | MIT | 1 notice/license file(s) |
| empathic@2.0.0 | MIT | 1 notice/license file(s) |
| enhanced-resolve@5.21.6 | MIT | 1 notice/license file(s) |
| env-paths@3.0.0 | MIT | 1 notice/license file(s) |
| es-abstract-get@1.0.0 | MIT | 1 notice/license file(s) |
| es-abstract@1.24.2 | MIT | 1 notice/license file(s) |
| es-define-property@1.0.1 | MIT | 1 notice/license file(s) |
| es-errors@1.3.0 | MIT | 1 notice/license file(s) |
| es-iterator-helpers@1.3.3 | MIT | 1 notice/license file(s) |
| es-object-atoms@1.1.2 | MIT | 1 notice/license file(s) |
| es-set-tostringtag@2.1.0 | MIT | 1 notice/license file(s) |
| es-shim-unscopables@1.1.0 | MIT | 1 notice/license file(s) |
| es-to-primitive@1.3.4 | MIT | 1 notice/license file(s) |
| es-toolkit@1.49.0 | MIT | 1 notice/license file(s) |
| esbuild@0.28.1 | MIT | 1 notice/license file(s) |
| escalade@3.2.0 | MIT | 1 notice/license file(s) |
| escape-string-regexp@4.0.0 | MIT | 1 notice/license file(s) |
| eslint-config-next@16.3.8 | MIT | Metadata only; verify upstream text |
| eslint-import-resolver-node@0.3.10 | MIT | 1 notice/license file(s) |
| eslint-import-resolver-typescript@3.10.1 | ISC | Registry metadata only; verify target-platform files |
| eslint-module-utils@2.14.0 | MIT | 1 notice/license file(s) |
| eslint-plugin-import@2.32.0 | MIT | 2 notice/license file(s) |
| eslint-plugin-jsx-a11y@6.10.2 | MIT | 1 notice/license file(s) |
| eslint-plugin-react-hooks@7.1.1 | MIT | 1 notice/license file(s) |
| eslint-plugin-react@7.37.5 | MIT | 1 notice/license file(s) |
| eslint-scope@8.4.0 | BSD-2-Clause | 1 notice/license file(s) |
| eslint-visitor-keys@3.4.3 | Apache-2.0 | 1 notice/license file(s) |
| eslint-visitor-keys@4.2.1 | Apache-2.0 | 1 notice/license file(s) |
| eslint-visitor-keys@5.0.1 | Apache-2.0 | 1 notice/license file(s) |
| eslint@9.39.4 | MIT | 1 notice/license file(s) |
| espree@10.4.0 | BSD-2-Clause | 1 notice/license file(s) |
| esquery@1.7.0 | BSD-3-Clause | 1 notice/license file(s) |
| esrecurse@4.3.0 | BSD-2-Clause | Metadata only; verify upstream text |
| estraverse@5.3.0 | BSD-2-Clause | 1 notice/license file(s) |
| esutils@2.0.3 | BSD-2-Clause | 1 notice/license file(s) |
| eventemitter3@5.0.4 | MIT | 1 notice/license file(s) |
| exsolve@1.1.0 | MIT | 1 notice/license file(s) |
| fast-check@3.23.2 | MIT | 1 notice/license file(s) |
| fast-decode-uri-component@1.0.1 | MIT | 1 notice/license file(s) |
| fast-deep-equal@3.1.3 | MIT | 1 notice/license file(s) |
| fast-glob@3.3.1 | MIT | 1 notice/license file(s) |
| fast-json-stable-stringify@2.1.0 | MIT | 1 notice/license file(s) |
| fast-levenshtein@2.0.6 | MIT | 1 notice/license file(s) |
| fast-querystring@1.1.2 | MIT | 1 notice/license file(s) |
| fast-uri@3.1.8 | BSD-3-Clause | 1 notice/license file(s) |
| fastq@1.20.1 | ISC | 1 notice/license file(s) |
| fdir@6.5.0 | MIT | 1 notice/license file(s) |
| file-entry-cache@8.0.0 | MIT | 1 notice/license file(s) |
| fill-range@7.1.1 | MIT | 1 notice/license file(s) |
| find-my-way@9.7.0 | MIT | 1 notice/license file(s) |
| find-up@5.0.0 | MIT | 1 notice/license file(s) |
| flat-cache@4.0.1 | MIT | 1 notice/license file(s) |
| flatted@3.4.2 | ISC | 1 notice/license file(s) |
| for-each@0.3.5 | MIT | 1 notice/license file(s) |
| foreground-child@3.3.1 | ISC | 1 notice/license file(s) |
| fsevents@2.3.3 | MIT | Registry metadata only; verify target-platform files |
| function-bind@1.1.2 | MIT | 1 notice/license file(s) |
| function.prototype.name@1.2.0 | MIT | 1 notice/license file(s) |
| functions-have-names@1.2.3 | MIT | 1 notice/license file(s) |
| generate-function@2.3.1 | MIT | 1 notice/license file(s) |
| generator-function@2.0.1 | MIT | 1 notice/license file(s) |
| gensync@1.0.0-beta.2 | MIT | 1 notice/license file(s) |
| get-intrinsic@1.3.0 | MIT | 1 notice/license file(s) |
| get-port-please@3.2.0 | MIT | 1 notice/license file(s) |
| get-proto@1.0.1 | MIT | 1 notice/license file(s) |
| get-symbol-description@1.1.0 | MIT | 1 notice/license file(s) |
| get-tsconfig@4.14.0 | MIT | 1 notice/license file(s) |
| giget@3.3.0 | MIT | 1 notice/license file(s) |
| glob-parent@5.1.2 | ISC | 1 notice/license file(s) |
| glob-parent@6.0.2 | ISC | 1 notice/license file(s) |
| globals@14.0.0 | MIT | 1 notice/license file(s) |
| globals@16.4.0 | MIT | 1 notice/license file(s) |
| globalthis@1.0.4 | MIT | 1 notice/license file(s) |
| gopd@1.2.0 | MIT | 1 notice/license file(s) |
| graceful-fs@4.2.11 | ISC | 1 notice/license file(s) |
| grammex@3.1.12 | MIT | 1 notice/license file(s) |
| graphmatch@1.1.1 | MIT | 1 notice/license file(s) |
| has-bigints@1.1.0 | MIT | 1 notice/license file(s) |
| has-flag@4.0.0 | MIT | 1 notice/license file(s) |
| has-property-descriptors@1.0.2 | MIT | 1 notice/license file(s) |
| has-proto@1.2.0 | MIT | 1 notice/license file(s) |
| has-symbols@1.1.0 | MIT | 1 notice/license file(s) |
| has-tostringtag@1.0.2 | MIT | 1 notice/license file(s) |
| hasown@2.0.4 | MIT | 1 notice/license file(s) |
| hermes-estree@0.25.1 | MIT | 1 notice/license file(s) |
| hermes-parser@0.25.1 | MIT | 1 notice/license file(s) |
| iconv-lite@0.7.3 | MIT | 1 notice/license file(s) |
| ignore@5.3.2 | MIT | 1 notice/license file(s) |
| ignore@7.0.5 | MIT | 1 notice/license file(s) |
| immer@11.1.11 | MIT | 1 notice/license file(s) |
| import-fresh@3.3.1 | MIT | 1 notice/license file(s) |
| imurmurhash@0.1.4 | MIT | Metadata only; verify upstream text |
| internal-slot@1.1.0 | MIT | 1 notice/license file(s) |
| internmap@2.0.3 | ISC | 1 notice/license file(s) |
| is-array-buffer@3.0.5 | MIT | 1 notice/license file(s) |
| is-async-function@2.1.1 | MIT | 1 notice/license file(s) |
| is-bigint@1.1.0 | MIT | 1 notice/license file(s) |
| is-boolean-object@1.2.2 | MIT | 1 notice/license file(s) |
| is-bun-module@2.0.0 | MIT | 1 notice/license file(s) |
| is-callable@1.2.7 | MIT | 1 notice/license file(s) |
| is-core-module@2.16.2 | MIT | 1 notice/license file(s) |
| is-data-view@1.0.2 | MIT | 1 notice/license file(s) |
| is-date-object@1.1.0 | MIT | 1 notice/license file(s) |
| is-document.all@1.0.0 | MIT | 1 notice/license file(s) |
| is-extglob@2.1.1 | MIT | 1 notice/license file(s) |
| is-finalizationregistry@1.1.1 | MIT | 1 notice/license file(s) |
| is-generator-function@1.1.2 | MIT | 1 notice/license file(s) |
| is-glob@4.0.3 | MIT | 1 notice/license file(s) |
| is-map@2.0.3 | MIT | 1 notice/license file(s) |
| is-negative-zero@2.0.3 | MIT | 1 notice/license file(s) |
| is-number-object@1.1.1 | MIT | 1 notice/license file(s) |
| is-number@7.0.0 | MIT | 1 notice/license file(s) |
| is-property@1.0.2 | MIT | 1 notice/license file(s) |
| is-regex@1.2.1 | MIT | 1 notice/license file(s) |
| is-set@2.0.3 | MIT | 1 notice/license file(s) |
| is-shared-array-buffer@1.0.4 | MIT | 1 notice/license file(s) |
| is-string@1.1.1 | MIT | 1 notice/license file(s) |
| is-symbol@1.1.1 | MIT | 1 notice/license file(s) |
| is-typed-array@1.1.15 | MIT | 1 notice/license file(s) |
| is-weakmap@2.0.2 | MIT | 1 notice/license file(s) |
| is-weakref@1.1.1 | MIT | 1 notice/license file(s) |
| is-weakset@2.0.4 | MIT | 1 notice/license file(s) |
| isarray@2.0.5 | MIT | 1 notice/license file(s) |
| isexe@2.0.0 | ISC | 1 notice/license file(s) |
| iterator.prototype@1.1.5 | MIT | 1 notice/license file(s) |
| jiti@2.7.0 | MIT | 1 notice/license file(s) |
| jose@4.15.9 | MIT | 1 notice/license file(s) |
| js-tokens@4.0.0 | MIT | 1 notice/license file(s) |
| js-yaml@4.3.2 | MIT | 1 notice/license file(s) |
| jsesc@3.1.0 | MIT | 1 notice/license file(s) |
| json-buffer@3.0.1 | MIT | 1 notice/license file(s) |
| json-schema-traverse@0.4.1 | MIT | 1 notice/license file(s) |
| json-schema-traverse@1.0.0 | MIT | 1 notice/license file(s) |
| json-stable-stringify-without-jsonify@1.0.1 | MIT | 1 notice/license file(s) |
| json5@1.0.2 | MIT | 1 notice/license file(s) |
| json5@2.2.3 | MIT | 1 notice/license file(s) |
| jsx-ast-utils@3.3.5 | MIT | 1 notice/license file(s) |
| keyv@4.5.4 | MIT | Metadata only; verify upstream text |
| language-subtag-registry@0.3.23 | CC0-1.0 | Metadata only; verify upstream text |
| language-tags@1.0.9 | MIT | Metadata only; verify upstream text |
| levn@0.4.1 | MIT | 1 notice/license file(s) |
| lightningcss-android-arm64@1.32.0 | MPL-2.0 | Registry metadata only; verify target-platform files |
| lightningcss-darwin-arm64@1.32.0 | MPL-2.0 | Registry metadata only; verify target-platform files |
| lightningcss-darwin-x64@1.32.0 | MPL-2.0 | Registry metadata only; verify target-platform files |
| lightningcss-freebsd-x64@1.32.0 | MPL-2.0 | Registry metadata only; verify target-platform files |
| lightningcss-linux-arm-gnueabihf@1.32.0 | MPL-2.0 | Registry metadata only; verify target-platform files |
| lightningcss-linux-arm64-gnu@1.32.0 | MPL-2.0 | Registry metadata only; verify target-platform files |
| lightningcss-linux-arm64-musl@1.32.0 | MPL-2.0 | Registry metadata only; verify target-platform files |
| lightningcss-linux-x64-gnu@1.32.0 | MPL-2.0 | Registry metadata only; verify target-platform files |
| lightningcss-linux-x64-musl@1.32.0 | MPL-2.0 | Registry metadata only; verify target-platform files |
| lightningcss-win32-arm64-msvc@1.32.0 | MPL-2.0 | Registry metadata only; verify target-platform files |
| lightningcss-win32-x64-msvc@1.32.0 | MPL-2.0 | 1 notice/license file(s) |
| lightningcss@1.32.0 | MPL-2.0 | 1 notice/license file(s) |
| locate-path@6.0.0 | MIT | 1 notice/license file(s) |
| lodash.merge@4.6.2 | MIT | 1 notice/license file(s) |
| lodash@4.18.1 | MIT | 1 notice/license file(s) |
| long@5.3.2 | Apache-2.0 | 1 notice/license file(s) |
| loose-envify@1.4.0 | MIT | 1 notice/license file(s) |
| lru-cache@5.1.1 | ISC | 1 notice/license file(s) |
| lru-cache@6.0.0 | ISC | 1 notice/license file(s) |
| lru.min@1.1.4 | MIT | 1 notice/license file(s) |
| magic-string@0.30.21 | MIT | 1 notice/license file(s) |
| math-intrinsics@1.1.0 | MIT | 1 notice/license file(s) |
| merge2@1.4.1 | MIT | 1 notice/license file(s) |
| micromatch@4.0.8 | MIT | 1 notice/license file(s) |
| minimatch@10.2.5 | BlueOak-1.0.0 | 1 notice/license file(s) |
| minimatch@3.1.5 | ISC | 1 notice/license file(s) |
| minimist@1.2.8 | MIT | 1 notice/license file(s) |
| ms@2.1.3 | MIT | 1 notice/license file(s) |
| mysql2@3.24.5 | MIT | 2 notice/license file(s) |
| named-placeholders@1.1.6 | MIT | 1 notice/license file(s) |
| nanoid@3.3.20 | MIT | 1 notice/license file(s) |
| napi-postinstall@0.3.4 | MIT | 1 notice/license file(s) |
| natural-compare@1.4.0 | MIT | Metadata only; verify upstream text |
| next-auth@4.24.15 | ISC | Metadata only; verify upstream text |
| next@16.3.8 | MIT | 132 notice/license file(s) |
| node-exports-info@1.6.2 | MIT | 1 notice/license file(s) |
| node-releases@2.0.57 | MIT | 1 notice/license file(s) |
| oauth@0.9.15 | MIT | 1 notice/license file(s) |
| object-assign@4.1.1 | MIT | 1 notice/license file(s) |
| object-hash@2.2.0 | MIT | 1 notice/license file(s) |
| object-inspect@1.13.4 | MIT | 1 notice/license file(s) |
| object-keys@1.1.1 | MIT | 1 notice/license file(s) |
| object.assign@4.1.7 | MIT | 1 notice/license file(s) |
| object.entries@1.1.9 | MIT | 1 notice/license file(s) |
| object.fromentries@2.0.8 | MIT | 1 notice/license file(s) |
| object.groupby@1.0.3 | MIT | 1 notice/license file(s) |
| object.values@1.2.1 | MIT | 1 notice/license file(s) |
| ohash@2.0.11 | MIT | 1 notice/license file(s) |
| oidc-token-hash@5.2.0 | MIT | 1 notice/license file(s) |
| openid-client@5.7.1 | MIT | 1 notice/license file(s) |
| optionator@0.9.4 | MIT | 1 notice/license file(s) |
| own-keys@1.0.1 | MIT | 1 notice/license file(s) |
| p-limit@3.1.0 | MIT | 1 notice/license file(s) |
| p-locate@5.0.0 | MIT | 1 notice/license file(s) |
| parent-module@1.0.1 | MIT | 1 notice/license file(s) |
| path-exists@4.0.0 | MIT | 1 notice/license file(s) |
| path-key@3.1.1 | MIT | 1 notice/license file(s) |
| path-parse@1.0.7 | MIT | 1 notice/license file(s) |
| pathe@2.0.3 | MIT | 1 notice/license file(s) |
| perfect-debounce@2.1.0 | MIT | 1 notice/license file(s) |
| pg-cloudflare@1.4.0 | MIT | 1 notice/license file(s) |
| pg-connection-string@2.14.0 | MIT | 1 notice/license file(s) |
| pg-int8@1.0.1 | ISC | 1 notice/license file(s) |
| pg-pool@3.14.0 | MIT | 1 notice/license file(s) |
| pg-protocol@1.15.0 | MIT | 1 notice/license file(s) |
| pg-types@2.2.0 | MIT | Metadata only; verify upstream text |
| pg@8.22.0 | MIT | 1 notice/license file(s) |
| pgpass@1.0.5 | MIT | Metadata only; verify upstream text |
| picocolors@1.1.1 | ISC | 1 notice/license file(s) |
| picomatch@2.3.2 | MIT | 1 notice/license file(s) |
| picomatch@4.0.5 | MIT | 1 notice/license file(s) |
| pkg-types@2.3.1 | MIT | 1 notice/license file(s) |
| possible-typed-array-names@1.1.0 | MIT | 1 notice/license file(s) |
| postcss@8.5.23 | MIT | 1 notice/license file(s) |
| postgres-array@2.0.0 | MIT | 1 notice/license file(s) |
| postgres-array@3.0.4 | MIT | 1 notice/license file(s) |
| postgres-bytea@1.0.1 | MIT | 1 notice/license file(s) |
| postgres-date@1.0.7 | MIT | 1 notice/license file(s) |
| postgres-interval@1.2.0 | MIT | 1 notice/license file(s) |
| postgres@3.4.7 | Unlicense | Metadata only; verify upstream text |
| preact-render-to-string@5.2.6 | MIT | 1 notice/license file(s) |
| preact@10.29.7 | MIT | 1 notice/license file(s) |
| prelude-ls@1.2.1 | MIT | 1 notice/license file(s) |
| pretty-format@3.8.0 | MIT | 1 notice/license file(s) |
| prisma@7.10.0 | Apache-2.0 | 1 notice/license file(s) |
| prop-types@15.8.1 | MIT | 1 notice/license file(s) |
| proper-lockfile@4.1.2 | MIT | 1 notice/license file(s) |
| punycode@2.3.1 | MIT | 1 notice/license file(s) |
| pure-rand@6.1.0 | MIT | 1 notice/license file(s) |
| queue-microtask@1.2.3 | MIT | 1 notice/license file(s) |
| rc9@3.0.1 | MIT | 1 notice/license file(s) |
| react-dom@19.2.4 | MIT | 1 notice/license file(s) |
| react-is@16.13.1 | MIT | 1 notice/license file(s) |
| react-redux@9.3.0 | MIT | 1 notice/license file(s) |
| react@19.2.4 | MIT | 1 notice/license file(s) |
| readdirp@5.0.0 | MIT | 1 notice/license file(s) |
| recharts@3.9.2 | MIT | 1 notice/license file(s) |
| redux-thunk@3.1.0 | MIT | 1 notice/license file(s) |
| redux@5.0.1 | MIT | 1 notice/license file(s) |
| reflect.getprototypeof@1.0.10 | MIT | 1 notice/license file(s) |
| regexp.prototype.flags@1.5.4 | MIT | 1 notice/license file(s) |
| remeda@2.33.4 | MIT | Metadata only; verify upstream text |
| require-from-string@2.0.2 | MIT | 1 notice/license file(s) |
| reselect@5.2.0 | MIT | 1 notice/license file(s) |
| resolve-from@4.0.0 | MIT | 1 notice/license file(s) |
| resolve-pkg-maps@1.0.0 | MIT | 1 notice/license file(s) |
| resolve@2.0.0-next.7 | MIT | 1 notice/license file(s) |
| ret@0.5.0 | MIT | 1 notice/license file(s) |
| retry@0.12.0 | MIT | 1 notice/license file(s) |
| reusify@1.1.0 | MIT | 1 notice/license file(s) |
| robust-predicates@3.0.3 | Unlicense | 1 notice/license file(s) |
| run-parallel@1.2.0 | MIT | 1 notice/license file(s) |
| safe-array-concat@1.1.4 | MIT | 1 notice/license file(s) |
| safe-push-apply@1.0.0 | MIT | 1 notice/license file(s) |
| safe-regex-test@1.1.0 | MIT | 1 notice/license file(s) |
| safe-regex2@5.1.1 | MIT | 1 notice/license file(s) |
| safer-buffer@2.1.2 | MIT | 1 notice/license file(s) |
| scheduler@0.27.0 | MIT | 1 notice/license file(s) |
| semver@6.3.1 | ISC | 1 notice/license file(s) |
| semver@7.8.5 | ISC | 1 notice/license file(s) |
| set-function-length@1.2.2 | MIT | 1 notice/license file(s) |
| set-function-name@2.0.2 | MIT | 1 notice/license file(s) |
| set-proto@1.0.0 | MIT | 1 notice/license file(s) |
| sharp@0.35.5 | Apache-2.0 | 1 notice/license file(s) |
| shebang-command@2.0.0 | MIT | 1 notice/license file(s) |
| shebang-regex@3.0.0 | MIT | 1 notice/license file(s) |
| side-channel-list@1.0.1 | MIT | 1 notice/license file(s) |
| side-channel-map@1.0.1 | MIT | 1 notice/license file(s) |
| side-channel-weakmap@1.0.2 | MIT | 1 notice/license file(s) |
| side-channel@1.1.1 | MIT | 1 notice/license file(s) |
| signal-exit@3.0.7 | ISC | 1 notice/license file(s) |
| signal-exit@4.1.0 | ISC | 1 notice/license file(s) |
| source-map-js@1.2.2 | BSD-3-Clause | 1 notice/license file(s) |
| split2@4.2.0 | ISC | 1 notice/license file(s) |
| sql-escaper@1.5.2 | MIT | 1 notice/license file(s) |
| stable-hash@0.0.5 | MIT | Metadata only; verify upstream text |
| std-env@3.10.0 | MIT | 1 notice/license file(s) |
| stop-iteration-iterator@1.1.0 | MIT | 1 notice/license file(s) |
| string.prototype.includes@2.0.1 | MIT | 1 notice/license file(s) |
| string.prototype.matchall@4.0.12 | MIT | 1 notice/license file(s) |
| string.prototype.repeat@1.0.0 | MIT | 1 notice/license file(s) |
| string.prototype.trim@1.2.11 | MIT | 1 notice/license file(s) |
| string.prototype.trimend@1.0.10 | MIT | 1 notice/license file(s) |
| string.prototype.trimstart@1.0.8 | MIT | 1 notice/license file(s) |
| strip-bom@3.0.0 | MIT | 1 notice/license file(s) |
| strip-json-comments@3.1.1 | MIT | 1 notice/license file(s) |
| styled-jsx@5.1.6 | MIT | 1 notice/license file(s) |
| supports-color@7.2.0 | MIT | 1 notice/license file(s) |
| supports-preserve-symlinks-flag@1.0.0 | MIT | 1 notice/license file(s) |
| tailwindcss@4.3.2 | MIT | 1 notice/license file(s) |
| tapable@2.3.3 | MIT | 1 notice/license file(s) |
| tiny-invariant@1.3.3 | MIT | 1 notice/license file(s) |
| tinyglobby@0.2.17 | MIT | 1 notice/license file(s) |
| to-regex-range@5.0.1 | MIT | 1 notice/license file(s) |
| ts-api-utils@2.5.0 | MIT | 1 notice/license file(s) |
| tsconfig-paths@3.15.0 | MIT | 1 notice/license file(s) |
| tslib@2.8.1 | 0BSD | 1 notice/license file(s) |
| tsx@4.23.0 | MIT | 1 notice/license file(s) |
| type-check@0.4.0 | MIT | 1 notice/license file(s) |
| typed-array-buffer@1.0.3 | MIT | 1 notice/license file(s) |
| typed-array-byte-length@1.0.3 | MIT | 1 notice/license file(s) |
| typed-array-byte-offset@1.0.4 | MIT | 1 notice/license file(s) |
| typed-array-length@1.0.8 | MIT | 1 notice/license file(s) |
| typescript-eslint@8.63.0 | MIT | 1 notice/license file(s) |
| typescript@5.9.3 | Apache-2.0 | 1 notice/license file(s) |
| unbox-primitive@1.1.0 | MIT | 1 notice/license file(s) |
| undici-types@6.21.0 | MIT | 1 notice/license file(s) |
| unrs-resolver@1.12.2 | MIT | Metadata only; verify upstream text |
| update-browserslist-db@1.3.3 | MIT | 1 notice/license file(s) |
| uri-js@4.4.1 | BSD-2-Clause | 1 notice/license file(s) |
| use-sync-external-store@1.6.0 | MIT | 1 notice/license file(s) |
| uuid@11.1.1 | MIT | 1 notice/license file(s) |
| valibot@1.4.2 | MIT | 1 notice/license file(s) |
| victory-vendor@37.3.6 | MIT AND ISC | 13 notice/license file(s) |
| which-boxed-primitive@1.1.1 | MIT | 1 notice/license file(s) |
| which-builtin-type@1.2.1 | MIT | 1 notice/license file(s) |
| which-collection@1.0.2 | MIT | 1 notice/license file(s) |
| which-typed-array@1.1.22 | MIT | 1 notice/license file(s) |
| which@2.0.2 | ISC | 1 notice/license file(s) |
| word-wrap@1.2.5 | MIT | 1 notice/license file(s) |
| xtend@4.0.2 | MIT | 1 notice/license file(s) |
| yallist@3.1.1 | ISC | 1 notice/license file(s) |
| yallist@4.0.0 | ISC | 1 notice/license file(s) |
| yocto-queue@0.1.0 | MIT | 1 notice/license file(s) |
| zeptomatch@2.1.0 | MIT | 1 notice/license file(s) |
| zod-validation-error@4.0.2 | MIT | 1 notice/license file(s) |
| zod@4.4.3 | MIT | 1 notice/license file(s) |
