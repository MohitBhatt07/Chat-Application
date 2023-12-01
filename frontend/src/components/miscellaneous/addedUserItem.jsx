import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

const AddedUserItem = ({name ,handleRemove}) => {
  return (
    <div className='relative inline-block bg-cyan-300 rounded-lg p-2 pr-3 mr-1 mt-1 w-fit'>
      <span>{name.slice(0,5)}</span>
      
      <CancelIcon fontSize='12px' className='absolute right-0 top-0' onClick={handleRemove}/>
    </div>
  )
}

export default AddedUserItem