/*
 * @Author: zhaoye 
 * @Date: 2018-01-17 15:06:07 
 * @Last Modified by: zhaoye
 * @Last Modified time: 2018-03-24 12:29:05
 */
import Sticker from './Sticker.js'

let stickers = []

function juedge () {
    if (stickers.length == 0) return
    let sticking
    let possibleDanger
    let danger
    let switching
    for (let i = 0; i < stickers.length; i++) {
        const sticker = stickers[i]
        if (!sticking && sticker.shouldStick()) {
            sticking = sticker
            if (stickers[i - 1]) {
                possibleDanger = stickers[i - 1]
            }
        } else {
            sticker.unstick()
        }
    }
    if (sticking && possibleDanger && possibleDanger.isInDangerZone(sticking)) {
        danger = possibleDanger
    }
    if (sticking) {
        sticking.stick()
    }
    if (sticking && danger) {
        sticking.smoothSwitch(danger)
    }
}

function stick ($el, {
    className,
    zIndex,
} = {}) {
    juedge()
    const sticker = new Sticker($el, className, zIndex)
    stickers.unshift(sticker)
    return sticker
}

function unstick (targetSticker) {
    stickers = stickers.filter(sticker => {
        if (targetSticker instanceof Sticker && sticker == targetSticker) {
            targetSticker.destroy()
            return false
        } else if (sticker.$el == targetSticker) {
            sticker.destroy()
            return false
        }
        return true
    })
}

document.addEventListener('scroll', juedge)

export {
    stick,
    unstick,
}