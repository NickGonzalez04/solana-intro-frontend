import type { NextPage } from 'next'
import * as web3 from '@solana/web3.js'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')

  const addressSubmittedHandler = (address: string) => {
    try {
      setAddress(address)
      const key = new web3.PublicKey(address)
      const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
      connection.getBalance(key).then((balance) => {
        setBalance(balance / web3.LAMPORTS_PER_SOL)
      })
    } catch (error) {
    setAddress('Invalid Address')
    setBalance(0)
    alert('Invalid address')
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey. Begin That Shit.
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Wallet Balance: ${balance} SOL`}</p>
      </header>
    </div>
  )
}

export default Home
