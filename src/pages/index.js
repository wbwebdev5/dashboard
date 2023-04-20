import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Sidebar } from './sidebar'
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { Form } from './form';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="Dashboard" content="Administrative dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <header style={{ backgroundColor: 'aquamarine', padding: '20px' }}>
          <button onClick={toggleSidebar}>
            <img height="40px" src={"https://api.iconify.design/carbon:apps.svg"} />
          </button>
        </header>
        <h2 className={`${styles.center} ${styles.kanitTitle}`}>Upload Video</h2>
        <Sidebar isOpen={sidebarOpen} close={setSidebarOpen} />
        <Form />
      </div>
    </>
  )
}
