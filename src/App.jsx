import { Layout } from 'antd';
import AppSider from './components/layout/AppSider';
import AppHeader from './components/layout/AppHeader';
import AppContent from './components/layout/AppContent';

export default function App() {
  return (
  <Layout>
    <AppHeader></AppHeader>
    <Layout>
      <AppSider></AppSider>
      <AppContent></AppContent>
    </Layout>
  </Layout>
  )
}
