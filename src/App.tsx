import './styles/app.scss'
import AppContexts from './contexts'
import AppRouter from './AppRouter'

export default function App() {
  return (
    <AppContexts>
      <AppRouter />
    </AppContexts>
  );
}
