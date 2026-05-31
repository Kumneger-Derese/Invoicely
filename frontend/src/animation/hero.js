import {gsap, SplitText} from '../utils/gsap.js'

const heroAnimation = (ref) => {
    const newSplit = new SplitText(ref.current, {
        type:'lines',
        linesClass:'line-mask'
    })

    gsap.from(newSplit.lines, {
        yPercent:100,
        stagger:0.12,
        duration:0.9,
        ease:'power4.inOut'
    })

    return () => newSplit.revert()
}

export {heroAnimation}