# @guoyunhe/react-auth

React components & hooks for authentication. To be used with `xior` and `wouter`.

## Install

```bash
npm i @guoyunhe/react-auth xior wouter
```

## Usage

```tsx
import { Route, Switch } from 'wouter';
import { AuthProvider } from '@guoyunhe/react-auth';

const App = () => {
  return;
  <AuthProvider>
    <Switch>
      <Route path="/login"></Route>
    </Switch>
  </AuthProvider>;
};
```
