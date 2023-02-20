import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import Demo from './Demo';
import demoCode from './Demo.tsx?raw';

export default function App() {
  return (
    <div>
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
    </div>
  );
}
