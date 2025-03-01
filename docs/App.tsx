import { DocCodeBlock, DocContainer, DocDemoBlock, DocHeader, DocProvider } from 'react-doc-ui';
import 'swagger-ui-react/swagger-ui.css';
import Demo from './Demo';
import demoCode from './Demo.tsx?raw';

export default function App() {
  return (
    <DocProvider>
      <DocContainer>
        <DocHeader title={`${PACKAGE_NAME}@${PACKAGE_VERSION}`} />

        <p>Authentication components and hooks for React applications.</p>

        <DocDemoBlock>
          <Demo />
        </DocDemoBlock>

        <DocCodeBlock code={demoCode.replaceAll('MemoryRouter', 'BrowserRouter')} language="tsx" />
      </DocContainer>
    </DocProvider>
  );
}
