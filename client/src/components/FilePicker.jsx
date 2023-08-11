import React from 'react';

import CustomButton from './CustomButton';

export default function FilePicker({
  file,
  setFile,
  readFile
}) {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          id='file-upload'
          type='file'
          accept='images/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className='filepicker-label'>
          업로드
        </label>
        <p className='mt-2 text-white text-xs truncate'>
          {file === '' ? "파일이 선택되지 않았습니다" : file.name}
        </p>
      </div>
      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton
          type='outline'
          title='Logo'
          handleClick={() => readFile('logo')}
          customStyles="text-xs"
        />
        <CustomButton
          type='filled'
          title='Full'
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  )
}
