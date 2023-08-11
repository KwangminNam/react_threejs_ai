import { useSnapshot } from 'valtio';
import state from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  slideAnimation,
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from '../config/motion';
import {CustomButton} from '../components/index';


export default function Home() {
  const snap = useSnapshot(state)
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className='home' {...slideAnimation}>
          <motion.header {...slideAnimation('down')}>
            <img src="./threejs.png" alt="logo" className='w-8 h-8 object-contain' />
          </motion.header>
          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                LETS <br className='xl:block hidden'/>DOIT
              </h1>
            </motion.div>
            <motion.div {...headTextAnimation} className='flex flex-col gap-5'>
              <p className='max-w-md font-normal text-gray-600 text-base'>유니크한 티셔츠를 직접 만들어보세요.<strong>원하는 스타일을 직접 입력해주세요.</strong></p>
              <CustomButton
                type="filled"
                title="커스텀 해보세요!"
                handleClick={()=> state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>

  )
}
