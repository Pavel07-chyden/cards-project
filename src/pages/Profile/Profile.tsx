import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/hooks'
import { useDispatch } from 'react-redux'
import { changeUsersInfo, checkAuth } from '../../store/reducers/auth-reducer'
import { Redirect } from 'react-router-dom'
import { PATH } from '../../routes/routes'

export const Profile: FC = () => {
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const { userInfo } = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const [newName, setNewName] = useState('')
    const [newAvatar, setNewAvatar] = useState('')

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(changeUsersInfo({ name: newName, avatar: newAvatar }))
    }
    if (!isLoggedIn) return <Redirect to={PATH.LOGIN} />


    return (
        <div>
            {userInfo && <div>
                <img src={userInfo.avatar}
                    alt={userInfo.name}
                    style={{ maxHeight: 400 }} />
                <div>{userInfo.name}</div>
                <div>{userInfo.publicCardPacksCount}</div>
                <div>
                    <input type='text' placeholder={'New Name'} 
                    value={newName}
                        onChange={e => setNewName(e.currentTarget.value)} />

                    <input type='text' placeholder={'New Avatar URL'} 
                    value={newAvatar}
                        onChange={e => setNewAvatar(e.currentTarget.value)} />
                    <button onClick={onSubmitHandler}>Change info</button>
                </div>
            </div>}

        </div>
    )
}





































// export const Profile: FC = () => {
//     const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
//     const { userInfo } = useTypedSelector(state => state.auth)
//     const dispatch = useDispatch()

//     const [newName, setNewName] = useState('')
//     const [newAvatar, setNewAvatar] = useState('')

//     useEffect(() => {
//         dispatch(checkAuth())
//     }, [dispatch])

//     if (!isLoggedIn) return <Redirect to={PATH.LOGIN} />

//     const onSubmitHandler = () => {
//         dispatch(changeUsersInfo({ name: newName, avatar: newAvatar }))
//     }

//     return (
//         <div>
//             <h1>Profile</h1>

//             {userInfo && <div>
//                 <img src={userInfo.avatar}
//                     alt={userInfo.name}
//                     style={{ maxHeight: 400 }} />
//                 <div>{userInfo.name}</div>
//                 <div>{userInfo.publicCardPacksCount}</div>

//                 <div>
//                     <input type='text' placeholder={'New Name'} value={newName}
//                         onChange={e => setNewName(e.currentTarget.value)} />

//                     <input type='text' placeholder={'New Avatar URL'} value={newAvatar}
//                         onChange={e => setNewAvatar(e.currentTarget.value)} />
//                     <button onClick={onSubmitHandler}>Change info</button>
//                 </div>
//             </div>}
//         </div>
//     )
// }