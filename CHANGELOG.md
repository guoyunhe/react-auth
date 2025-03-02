# Changelog

## 3.0.0 - 2025-03-01

- **BREAKING CHANGE** Removed CJS support
- **BREAKING CHANGE** Changed build target from `es2015` to `es2017`
- **BREAKING CHANGE** Replaced `axios` with `xior`
- **BREAKING CHANGE** Replaced `react-router-dom` with `wouter`
- **BREAKING CHANGE** Removed `useAuth()` hook
- Added `userAuthStatus()` hook
- Added `userAuthToken()` hook
- Added `userAuthUser()` hook

## 2.3.0 - 2023-07-15

- Added `useRequreAuth()` hook

## 2.2.0 - 2023-07-03

- Changed `use-local-storage` to `@guoyunhe/react-storage`, to support ESM

## 2.1.0 - 2023-06-19

- Changed `react-use-localstorage` to `use-local-storage`
- Changed `status` and `user` to persist state in local storage

## 2.0.0 - 2023-06-18

- **BREAKING CHANGE** Changed to trigger suspense while validating auth status
- **BREAKING CHANGE** Removed `loadingIndicator` prop from `<AuthProvider/>` component

## 1.1.0 - 2023-06-16

- Added `to` prop to `<RedirectAfterAuth/>` component

## 1.0.0 - 2023-02-19

- First working version
