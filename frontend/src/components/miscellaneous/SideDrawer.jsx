import React, { useState } from 'react'

const SideDrawer = () => {
  const [search , setSearch] = useState();
  const [searchResult ,setSearchResult] = useState([]);
  const [loading , setLoading] =useState(false);
  const [loadingChat,setLoadingChat] = useState(false);
  
  return (
    <div className='inline-block'>SideDrawer</div>
  )
}

export default SideDrawer