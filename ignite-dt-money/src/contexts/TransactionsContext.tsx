import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import * as z from 'zod'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type Transaction = {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}
type CreateTransactionInputs = z.infer<typeof newTransactionFormSchema>

type TransactionContextProps = {
  transactions: Transaction[]
  getTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInputs) => Promise<void>
}

type TransactionProviderProps = {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextProps)

export const TransactionsProvider = ({
  children,
}: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function getTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionInputs) {
    const { description, price, category, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [...state, response.data])
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, getTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
