# @guoyunhe/react-auth

React components & hooks for authentication. To be used with `xior` and `wouter`.

## Install

```bash
npm install --save @guoyunhe/react-auth xior wouter
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

## API

### `useRequireAuth(): (callback?: (error?: Error) => void) => Promise<void>`

Return `requireAuth()` function, which can be called before user trigger some actions that require
authentication, for example, like/dislike, comment, subscription...

Callback style usage:

```js
const requireAuth = useRequireAuth();
const handleLike = () => {
  requireAuth((error) => {
    if (error) {
      console.error(error.message);
    } else {
      xior.post('/like');
    }
  });
};
```

Promise style usage:

```js
const requireAuth = useRequireAuth();
const handleLike = () => {
  requireAuth()
    .then(() => {
      xior.post('/like');
    })
    .catch((error) => {
      console.error(error.message);
    });
};
```
