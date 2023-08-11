import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, Tab, ColorPicker, FilePicker, CustomButton } from '../components/index';


export default function Customizer() {
  const snap = useSnapshot(state);
  
  const [file,setFile] = useState('');

  const [prompt ,setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab , setActiveEditorTab ] = useState("");
  const [activeFillerTab, setActiveFillerTab] = useState({
    logoShirt:true,
    stylishShirt:false,
  });

  const generateTabContent = () => {
    switch(activeEditorTab){
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      // case 'aipicker' :
      //   return <AIPicker
      //     prompt={prompt}
      //     setPrompt={setPrompt}
      //     loading={generatingImg}
      //     handleSubmit={handleSubmit}
      //   /> 
      default:
        return null;
    }
  }


  const handleSubmit = async (type) => {
    console.log(type);
  }

  const handleDecals = (type,result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFillerTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch(tabName){
      case 'logoShirt':
        state.isLogoTexture = !activeFillerTab[tabName];
      break;
      case 'stylishShirt':
        state.isFullTexture = !activeFillerTab[tabName]
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
    }

    setActiveFillerTab((prev) => {
      return {
        ...prev,
        [tabName]: !prev[tabName]
      }
    })
  }

  const readFile = type => {
    reader(file)
    .then((result)=>{
      handleDecals(type,result);
      setActiveEditorTab("")
    })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((item) => (
                  <Tab
                    key={item.name}
                    tab={item}
                    handleClick={() => setActiveEditorTab(item.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <CustomButton
              type='filled'
              title='뒤로가기'
              handleClick={() => state.intro = true}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>
          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((item) => (
              <Tab
                key={item.name}
                tab={item}
                isFilterTab
                isActive={activeFillerTab[item.name]}
                handleClick={() => {handleActiveFilterTab(item.name)}}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
