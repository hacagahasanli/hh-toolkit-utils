# React Utils Package

## Versioning Guide

This package follows **Semantic Versioning (SemVer)**:

- **PATCH (`1.0.0 → 1.0.1`)** – Small fixes (bug fixes, typing improvements, documentation updates).
- **MINOR (`1.0.0 → 1.1.0`)** – New features, hooks, or utilities added **without** breaking the existing API.
- **MAJOR (`1.1.0 → 2.0.0`)** – Breaking changes (API changes, renamed exports, function signature updates, etc.).

---

## Commands to Bump the Version

### PATCH bump (bug fix or non-breaking update)

```sh
npm version patch
```

This command:
- Updates `package.json` version from `x.y.z → x.y.(z+1)`
- Automatically creates a git commit and a git tag

---

### MINOR bump (new hook/utility, no breaking changes)

```sh
npm version minor
```

This command:   
- Updates `package.json` version from `x.y.z → x.(y+1).0`
- Creates a git commit + tag

---

### MAJOR bump (breaking API change)

```sh
npm version major
```

This command:
- Updates `package.json` version from `(x+1).0.0`
- Creates a git commit + tag

---

## 🚀 Release & Publish Workflow
Follow these steps to create a new release:

### [1] Make your code changes
Add a new hook/utility or fix a bug.

### [2] Update `CHANGELOG.md` under the [Unreleased] section 
Example:


### Feature
- `useScrollLock` hook added
### Fixed
- Fixed focus trap escape key handling

### [3] Bump the version according to the type of change
- Bug fix → `npm version patch`
- New non-breaking feature → `npm version minor`
- Breaking change → `npm version major`

### [4] Publish the package
```sh 
npm publish --access restricted
npm publish --access public ( WE ARE USING THIS APPROACH)
```

### [5] Finalize the changelog
Move the content from `[Unreleased]` to the new version section and add the release date.

## Version Bump Examples
| Change                                           | Command                           | New Version   | 
|--------------------------------------------------|-----------------------------------|---------------|
|  Bug fix in `usePortal`                          |         `npm version patch`       | 1.0.0 → 1.0.1 |
|  New hook added (useDisableScroll)               |         `npm version minor`       | 1.0.0 → 1.1.0 |
| `useFocusTrap` API changed (breaking)            |         `npm version major`       | 1.1.0 → 2.0.0 |

## Quick Reference
- `PATCH` – Small fixes → `npm version patch`
- `MINOR` – New, non-breaking features → `npm version minor`
- `MAJOR` – Breaking changes → `npm version major`