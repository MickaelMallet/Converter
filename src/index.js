import { createRoot } from 'react-dom/client';

import Converter from './components/Converter';

const rootReactElement = <Converter />;

const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);
