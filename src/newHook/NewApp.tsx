import { useState, ChangeEvent, FC, useEffect } from 'react'

type Validators = {
   isEmpty: boolean
   isRequired?: boolean
   minLength?: number
   isEmail?: boolean
}

const useValidator = (value: string, validators: Validators) => {

   const [isValid, setIsValid] = useState(false)

   const [isEmpty, setIsEmpty] = useState(true)
   const [minLength, setMinLength] = useState('')
   const [isEmail, setIsEmail] = useState('')



   useEffect(() => {
      for (const validator in validators) {
         switch (validator) {
            case 'isEmpty':
               value ? setIsEmpty(false) : setIsEmpty(true)
               break

            case 'minLength':
               value.length < validators[validator]!
                  ? setMinLength(`Min length must be more than ${validators[validator]!}`)
                  : setMinLength('')
               break
            case 'isEmail':
               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  .test(String(value).toLowerCase())
                  ? setIsEmail('')
                  : setIsEmail('Wrong email address')
               break

         }
      }

   }, [value])

   useEffect(() => {
      (minLength || isEmail || isEmpty) ? setIsValid(false) : setIsValid(true)
   }, [isEmail, minLength, isEmpty])

   return {
      isEmpty,
      minLength,
      isEmail,
      isValid

   }
}


const useInputN = (initialValue: string, validators: Validators) => {


   const [value, setValue] = useState(initialValue)
   const [touch, setTouched] = useState(false)



   const onChange = (e: ChangeEvent<HTMLInputElement>) =>
      setValue(e.currentTarget.value)

   const onBlur = () => {
      setTouched(true)
   }
   const valid = useValidator(value, validators)
   return {
      value,
      touch,
      onChange,
      onBlur,
      ...valid

   }
}

export const NewApp: FC = () => {
   const email = useInputN('', { isEmpty: true, minLength: 8 })
   const password = useInputN('', { isEmpty: true, minLength: 5 })

   return (
      <div>
         <form>
            <h1>Registartor </h1>
            {/* {/* ///вывод ошибок оптимизировать: touch - т. е. ввошли в input и из него вышли (что б раньше времени не показывать error */}           {(email.touch && email.isEmpty) && <div style={{ color: 'red' }}> Pole ne pystoe </div>}
            {(email.touch && email.minLength) && <div style={{ color: 'red' }}> Pole ne pystoe </div>}
            <input value={email.value} onChange={email.onChange} type='text' />

            {(password.touch && password.isEmpty) && <div style={{ color: 'red' }}> Pole ne pystoe </div>}
            {(password.touch && password.minLength) && <div style={{ color: 'red' }}> Pole ne pystoe </div>}
            <input onBlur={password.onBlur} onChange={password.onChange} type='text' />
         </form>
      </div>
   )

}
