import React from 'react'
import { Button } from '../ui/button'
import { Download } from 'lucide-react'

type Props = {
    title:string,
    summaryText:string,
    fileName:string,
    createdAt:string
}

const DownloadSummaryButton = (props: Props) => {
  const handleDownload = () =>{
    
  }
  return (
    <Button size={"sm"} className='h-8 px-3 bg-rose-100 text-rose-600 hover:text-rose-700 hover:bg-rose-50' onClick={handleDownload}>
      <Download />
      Download Summary</Button>
  )
}

export default DownloadSummaryButton