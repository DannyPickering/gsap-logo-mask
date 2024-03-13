import './style.css'
import gsap from 'gsap'



const logoMask = document.querySelector('.logo-mask')
const logoColor = document.querySelector('.logo-color')
const logoColorPaths = logoColor.querySelectorAll('path')
const imgBox = document.querySelector('.img-box')
const logoBG = document.querySelector('.logo-bg')
const logoInner = document.querySelector('.logo-inner-container')


function stopLogoBGScale() {
  gsap.set(logoBG, {
    autoAlpha: 0
  })

  gsap.set(logoColorPaths, {
    autoAlpha: 0.4,
    fill: 'rgb(11, 64, 33)'
  })

  gsap.to('#hero', {
    backgroundColor: 'rgba(253, 245, 234, 1)',
    duration: 0.75
  })
  gsap.to(logoColorPaths, {
    autoAlpha: 0,
    duration: 2

  })

  gsap.to(imgBox, {
    autoAlpha: 1,
    duration: 0.5
  })
}

let isCallbackExecuted = false

const heroTL = new gsap.timeline({
  onUpdate: () => {

    if (isCallbackExecuted) {
      return
    }

    const scale = gsap.getProperty(logoInner, 'scaleX')
    const currentWidth = logoInner.offsetWidth * scale

    const scaleY = gsap.getProperty(logoInner, 'scaleY')
    const currentHeight = logoInner.offsetHeight * scaleY


    if (Math.abs(currentHeight - imgBox.offsetHeight > 0)) {
      stopLogoBGScale()
    }

    if (Math.abs(currentWidth - imgBox.offsetWidth > 0)) {
      // console.log(currentWidth)
      console.log('test')
      stopLogoBGScale()
      isCallbackExecuted = true
    }
  }
});

gsap.set(imgBox, {
  autoAlpha: 0
})

// gsap.set(logoBG, {
//   autoAlpha: 0
// })

heroTL.addLabel('start')
  .to([logoMask, logoColor], {
    scale: 50,
    duration: 6
  }, 'start+=1.5')
  .to(logoInner, {
    scale: 50,
    duration: 6
  }, 'start+=1.5')

  .to(logoBG, {
    autoAlpha: 1,
    duration: 0.25
  }, 'start+=1.5')
  .to(logoColorPaths, {
    autoAlpha: 0,
    duration: 0.75
  }, 'start+=1.5')

  .addLabel('startImgBox', 3)

