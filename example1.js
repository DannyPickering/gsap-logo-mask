import './example1.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all';
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis()

lenis.on('scroll', (e) => {
  // console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)


const topLayer = document.querySelector('.top-layer');
const logoFill = document.querySelector('.logo-fill');

const scrollHero = new gsap.timeline({
  scrollTrigger: {
    trigger: '#hero',
    pin: true,
    start: '0 top',
    end: 'bottom',
    toggleActions: 'play reverse play reverse',
    markers: true,
    scrub: true,
    onUpdate: (self) => {
      const topLayerScale = gsap.getProperty(topLayer, 'scale');
      const isScaled = topLayerScale !== 1;
      const direction = self.direction;
      isScaled ? fadeTL.play() : fadeTL.reverse();

      // console.log(gsap.getProperty(topLayer, 'scale'))
      topLayerScale >= 6 && direction === 1 ? gsap.set('#hero', { backgroundColor: 'transparent' }) : '';

      topLayerScale <= 6 && direction === -1 ? gsap.set('#hero', { backgroundColor: '#0b4021' }) : '';
    }
  },

});


gsap.set(topLayer, { transformOrigin: "50% 50%" });

scrollHero
  .addLabel('start')
  .to(topLayer, {
    scale: 20,
  }, 'start')

const fadeTL = gsap.timeline({ paused: true });

fadeTL
  .addLabel('start')
  .to(logoFill, {
    autoAlpha: 0,
    duration: 1.2
  }, 'start')

function updateFade() {
  const isScaled = gsap.getProperty(topLayer, 'scale') !== 1;
  gsap.set('#hero', { backgroundColor: 'transparent' })
  isScaled ? fadeTL.play() : fadeTL.reverse();
}