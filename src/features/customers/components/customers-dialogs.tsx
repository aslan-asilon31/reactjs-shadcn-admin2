import { ConfirmDialog } from '@/components/confirm-dialog'
import { toast } from '@/hooks/use-toast'
import { useCustomers } from '../context/customers-context'
import { CustomersImportDialog } from './customers-import-dialog'
import { CustomersMutateDrawer } from './customers-mutate-drawer'

export function CustomersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCustomers()
  return (
    <>
      <CustomersMutateDrawer
        key='customer-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <CustomersImportDialog
        key='Customers-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <CustomersMutateDrawer
            key={`customer-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='task-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
              toast({
                title: 'The following task has been deleted:',
                description: (
                  <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>
                      {JSON.stringify(currentRow, null, 2)}
                    </code>
                  </pre>
                ),
              })
            }}
            className='max-w-md'
            title={`Delete this customer: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a task with the ID{' '}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText='Delete'
          />
        </>
      )}
    </>
  )
}
