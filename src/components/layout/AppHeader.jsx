import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from './CoinInfoModal';
import AddAssetForm from './AddAssetForm';

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const { crypto } = useCrypto()

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value))
    setModal(true)
  }

    return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: '20%' }}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handleSelect}
        value="press / to open"
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
      <Space>
        <img style={{width: '40%'}}
        src={option.data.icon}
        alt={option.data.label} 
        /> {option.data.label}
      </Space>
    )}
  />

  <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

  <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
      <CoinInfoModal coin={coin} />
  </Modal>

  <Drawer width={'35%'} title="Add Asset" onClose={() => setDrawer(false)} open={drawer}>
        <AddAssetForm />
      </Drawer>
    </Layout.Header>
  )
}