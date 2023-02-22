import { Anchor } from 'antd';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import Demo from './Demo';
import demoCode from './Demo.tsx?raw';

export default function App() {
  return (
    <div style={{ display: 'flex', maxWidth: 1300, margin: 'auto' }}>
      <main style={{ flex: '1 1 auto', marginRight: 30 }}>
        <h1>@guoyunhe/react-auth</h1>

        <p>Authentication components and hooks for React applications.</p>

        <div style={{ padding: 12, background: '#ddd', height: 200 }}>
          <Demo />
        </div>
        <Highlight
          {...defaultProps}
          code={demoCode.replaceAll('MemoryRouter', 'BrowserRouter')}
          language="tsx"
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ padding: 12, marginTop: 0, ...style }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </main>
      <aside style={{ minWidth: 300 }}>
        <Anchor
          items={[
            {
              key: 'demo',
              href: '#demo',
              title: 'Demo',
            },
            {
              key: 'components',
              href: '#components',
              title: 'Components',
            },
            {
              key: 'hooks',
              href: '#hooks',
              title: 'Hooks',
            },
            {
              key: 'http-api',
              href: '#part-3',
              title: 'Part 3',
            },
          ]}
        />
      </aside>
    </div>
  );
}

function HttpApi() {
  return (
    <div>
      <h2>Compatible HTTP API specification</h2>
      <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" layout="" />
    </div>
  );
}

function Changelog() {
  return <div>TODO</div>;
}
