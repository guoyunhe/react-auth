# @guoyunhe/react-auth

React components & hooks for authentication. To be used with `axios` and `react-router-dom`.

## Install

```bash
npm i @guoyunhe/react-auth axios react-router-dom
```

## Usage

```tsx
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // v6
import { AuthProvider } from '@guoyunhe/react-auth';

const App = () => {
  return;
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route></Route>
      </Switch>
    </AuthProvider>
  </BrowserRouter>;
};
```
