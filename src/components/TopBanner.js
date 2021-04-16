import React from 'react'
import { Link } from 'react-router-dom';

const TopBanner = () => {
  return (
    <div className="top-banner">
      <Link to="/"><h1>CpuStore</h1></Link>
    </div>
  )
}

export default TopBanner
