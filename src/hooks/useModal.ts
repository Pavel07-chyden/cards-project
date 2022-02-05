import {useState} from 'react'

export const useModal = (openInit: boolean = false) => {
    const [isOpen, setIsOpen] = useState(openInit)

    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const onModalToggle = () => {
        setIsOpen((prev) => !prev)
    }

    const onToggle = () => {
        setIsOpen(!isOpen)
    }

    return {onOpen, onClose, isOpen, onToggle}
}