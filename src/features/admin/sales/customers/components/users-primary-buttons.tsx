import { Button } from '@/components/ui/button'
import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import { useUsers } from '../context/customers-context'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Invite User</span> <IconMailPlus size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add User</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
