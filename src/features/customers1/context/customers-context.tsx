import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Customer } from '../data/schema'

type CustomersDialogType = 'create' | 'update' | 'delete' | 'import'

interface CustomersContextType {
  open: CustomersDialogType | null
  setOpen: (str: CustomersDialogType | null) => void
  currentRow: Customer | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Customer | null>>
}

const CustomersContext = React.createContext<CustomersContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function CustomersProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CustomersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Customer | null>(null)
  return (
    <CustomersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CustomersContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomers = () => {
  const customersContext = React.useContext(CustomersContext)

  if (!customersContext) {
    throw new Error('usecustomers has to be used within <CustomersContext>')
  }

  return customersContext
}
