import xior from 'xior';
import MockAdapter from 'xior-mock-adapter';

const mock = new MockAdapter(xior, { delayResponse: 1000 });

const token = 'abcd';
const user = {
  id: 1,
  name: 'Guo Yunhe',
};

let loggedIn = false;

mock.onGet('/user').reply(() => {
  if (loggedIn) {
    return [200, user];
  } else {
    return [403, null];
  }
});

mock.onPost('/login').reply(() => {
  loggedIn = true;
  return [200, { user, token }];
});

mock.onPost('/logout').reply(() => {
  loggedIn = false;
  return [200];
});
